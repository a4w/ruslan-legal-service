import React, {useState, useEffect, useContext} from "react";
import {Link, withRouter} from "react-router-dom";
import LawyerCardList from "./LawyerCardList";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import {FaSearch, FaArrowLeft, FaChevronLeft, FaCalendarPlus} from "react-icons/fa";
import {MdClear} from "react-icons/md";
import {AiOutlineCloseCircle} from "react-icons/ai";
import StickyBox from "react-sticky-box";
import "./Calendar.css";
import queryString from "query-string"
import PageHead from "./PageHead";
import useRequests from "./useRequests";
import {get} from "jquery";
import {LoadingOverlayContext} from "./App"
import LoadingOverlay from "react-loading-overlay";
import Img from "./Img";
import StarRatings from "react-star-ratings";
import RoundImg from "./RoundImg";

function LawyerList(props) {
    const [sortBy, setSortBy] = useState(null);
    const [offset, setOffset] = useState(0);
    const [length, setLength] = useState(3);
    const [lawyers, setLawyers] = useState(null);
    const [otherLawyers, setOtherLawyers] = useState(null);
    const [lawyerPopUp, setPopUp] = useState(null);
    const [filter, setFilter] = useState({date: new Date()});
    const [params, setParams] = useState({
        ...queryString.parse(props.location.search),
        offset: offset,
        length: length,
    });
    const loading = useContext(LoadingOverlayContext);

    const {request} = useRequests();

    const getList = (params, keep = false) => {
        loading.setLoadingOverlayText("Loading...");
        loading.setIsLoadingOverlayShown(true);
        console.log("params : ", params);
        console.log("qs: ", queryString.stringify(params));
        request({
            url: "/lawyer/all?" + (params !== null ? queryString.stringify(params) : ''),
            method: "GET",
        })
            .then((data) => {
                let _lawyers = new Array();
                if (!Array.isArray(data.lawyers)) {
                    Object.keys(data.lawyers).map((key, index) => {
                        _lawyers.push(data.lawyers[key]);
                    });
                } else _lawyers = data.lawyers;
                console.log(_lawyers);
                if (keep) setLawyers([...lawyers, ..._lawyers]);
                else setLawyers(_lawyers);
                if (_lawyers.length === 0) {
                    getOtherLawyers();
                }
            })
            .catch((_errors) => {})
            .finally(() => {
                loading.setIsLoadingOverlayShown(false);
            })
    };

    const getOtherLawyers = () => {

        loading.setLoadingOverlayText("Loading...");
        loading.setIsLoadingOverlayShown(true);
        request({
            url: "/lawyer/all",
            method: "GET",
        })
            .then((data) => {
                let _lawyers = new Array();
                if (!Array.isArray(data.lawyers)) {
                    Object.keys(data.lawyers).map((key, index) => {
                        _lawyers.push(data.lawyers[key]);
                    });
                } else _lawyers = data.lawyers;
                console.log(_lawyers);
                setOtherLawyers(_lawyers);
            })
            .catch((_errors) => {})
            .finally(() => {
                loading.setIsLoadingOverlayShown(false);
            })
    }

    const SortHandler = ([{value}]) => {
        setSortBy(value);
        setOffset(0);
        const next = {
            ...params,
            offset: 0,
            length: length,
            order: value
        };
        setParams(next);
        console.log("Sort: ", next);
        getList(next);
        setPopUp(null);
    };

    useEffect(() => {
        console.log(params);
        getList(params);

    }, []);
    useEffect(() => {
        console.log(props.location.search);
        const next = {
            ...queryString.parse(props.location.search),
            offset: 0,
            length: length,
        };
        setParams(next);
        getList(next);
    }, [props.location.search]);
    const GetMore = (e) => {
        e.preventDefault();
        setOffset(offset + length);
        const next = {...params, offset: (offset + length), length: length};
        setParams(next);
        getList(next, true);
    };

    const filterHandler = () => {
        let date = new Date(filter.date);
        date = date.toISOString().slice(0, 10);
        console.log("date : ", date);
        const next = {
            ...params,
            available_on: date,
            offset: 0,
            length: length,
        };
        setPopUp(null);
        setParams(next);
        // params["filter_by"] = filter.filters;
        getList(next);
    }
    const filterClear = () => {
        const next = {offset: 0, length: length};
        setParams(next);
        getList(next);
    }
    return (
        <div>
            <PageHead
                title="Available Lawyers list | Lawbe"
                description="A list of the best lawyers from all across the country, book them now!"
            />
            {/* <StickyBox style={{ zIndex: 10 }} offsetTop={85}> */}
            <LawyerListHeader
                params={params}
                OnChangeHandler={SortHandler}
                selectedValue={sortBy}
                filter={filter}
                setFilter={setFilter}
                filterHandler={filterHandler}
                filterClear={filterClear}
            />
            {/* </StickyBox> */}

            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="content">
                            <div className="row justify-content-center align-content-center">
                                <div className="col-sm-12 col-md-12 col-lg-8">
                                    {lawyers && <LawyerCardList lawyers={lawyers} setPopUp={setPopUp} />}
                                    {lawyers && lawyers.length === 0 && <>
                                        <h3>No lawyers matched your criteria. Check out those lawyers</h3>
                                        {otherLawyers && <LawyerCardList lawyers={otherLawyers} setPopUp={setPopUp} />}
                                    </>}
                                    <div className="load-more text-center">
                                        <a
                                            className="btn btn-primary btn-sm"
                                            href="//"
                                            onClick={GetMore}
                                        >
                                            Load More
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-0 col-md-0 col-lg-4">
                                    <StickyBox offsetTop={90}>
                                            <PopUp lawyer={lawyerPopUp} />
                                    </StickyBox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const LawyerSearchFilter = ({filter, setFilter, filterHandler}) => {
    const options = [
        {value: 1, label: "f1"},
        {value: 2, label: "f2"},
        {value: 3, label: "f3"},
        {value: 4, label: "f4"},
    ];
    return (
        <div className="card search-filter">
            <form className="card-body form-row p-2">
                <div className="filter-widget mb-0" style={{width: "40%"}}>
                    <div className="cal-icon">
                        <DatePicker
                            className="form-control mb-0"
                            selected={filter.date}
                            onChange={(date) =>
                                setFilter({...filter, date: date})
                            }
                            minDate={new Date()}
                            placeholderText="Available on"
                        />
                    </div>
                </div>
                {/* <div className="filter-widget mb-0 ml-2" style={{width: "40%"}}>
                    <Select
                        className="form-control mb-0"
                        value={filter.filters}
                        placeholder="Filter"
                        options={options}
                        onChange={([{value}]) =>
                            setFilter({...filter, filters: value})
                        }
                        style={{minHeight: "46px"}}
                    />
                </div> */}
                <div className="btn-search align-left ml-2" style={{Width: "10%"}}>
                    <button
                        type="button"
                        className="btn btn-block font-weight-bold"
                        onClick={filterHandler}
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>
        </div>
    );
};

const LawyerListHeader = ({
    params,
    OnChangeHandler,
    selectedValue,
    filter,
    setFilter,
    filterHandler,
    filterClear,
}) => {
    const options = [
        {value: "ratings", label: "Rating"},
        {value: "price", label: "Price"},
        {value: "popular", label: "Popular"},
    ];
    const selectStyle = {
        borderColor: "#dcdcdc",
        backgroundColor: "#ffffff",
        color: "#333",
        minHeight: "45px",
        borderRadius: ".25rem",
    };
    return (
        <div className="breadcrumb-bar">
            <div className="container-fluid">
                <div className="row align-items-center" style={{flexWrap: "inherit"}} >
                    <form className="card-body form-row p-2">
                        <div className="filter-widget calendar-filter-widget mb-0 ">
                            <div className="cal-icon">
                                <DatePicker
                                    className="form-control mb-0"
                                    selected={filter.date}
                                    onChange={(date) =>
                                        setFilter({...filter, date: date})
                                    }
                                    minDate={new Date()}
                                    placeholderText="Available on"
                                />
                            </div>
                        </div>
                        <div className="btn-search align-left ml-2">
                            <button
                                type="button"
                                className="btn btn-block font-weight-bold"
                                onClick={filterHandler}
                            >
                                <FaSearch />
                            </button>
                        </div>
                        <div className="btn-search align-left ml-2">
                            <button
                                type="button"
                                className="btn btn-block font-weight-bold"
                                onClick={filterClear}
                            >
                                <AiOutlineCloseCircle />
                            </button>
                        </div>
                    </form>
                    <div className="sort-by">
                        <span className="sort-title">Sort by</span>
                        <span className="sortby-fliter">
                            <Select
                                style={selectStyle}
                                value={selectedValue}
                                options={options}
                                onChange={OnChangeHandler}
                            />
                        </span>
                    </div>
                </div>
                <div className="row align-items-center d-none display-xs-flex" style={{flexWrap: "inherit"}} >
                    <div className="btn-search-2 mr-2">
                        <button
                            type="button"
                            className="btn btn-block font-weight-bold"
                            onClick={filterHandler}
                        >
                            <FaSearch />
                        </button>
                    </div>
                    <div className="btn-search-2">
                        <button
                            type="button"
                            className="btn btn-block font-weight-bold"
                            onClick={filterClear}
                        >
                            <AiOutlineCloseCircle />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PopUp = ({lawyer}) => {
    const {account} = {...lawyer};
    const imgStyle = {
        borderRadius: "120px",
        height: "100px",
        width: "100px",
        objectFit: "cover",
    };
    return (
        lawyer && (
            <div className="card flex-fill mr-2 d-none d-lg-flex">
                <div className="arrow-left" style={{
                    marginLeft: '-10px'
                }}>

                </div>
                <div style={{width: "100%"}}>
                    <div className="profile-info-widget justify-content-center">
                        <Link to={{pathname: `/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`, state: {lawyer: lawyer}}}>
                            <RoundImg
                                src={account.profile_picture}
                                diameter={100}
                            />
                        </Link>
                    </div>
                    <div
                        className="profile-det-info mt-4"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <h2>{`${account.name} ${account.surname}`}</h2>
                    </div>

                    <div
                        className="profile-det-info"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <span><strong>{lawyer.lawyer_type.type}</strong></span>
                    </div>
                    <div
                        className="profile-det-info"
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <span>{account.city}</span>
                    </div>
                    <div
                        className="justify-content-center"
                        style={{
                            display: "flex",
                        }}
                    >
                        <StarRatings
                            rating={parseFloat(lawyer.ratings_average)}
                            starRatedColor="gold"
                            starDimension="20px"
                            starSpacing="0px"
                            numberOfStars={5}
                            name="rating"
                        />
                    </div>
                </div>
                <div className="m-2">
                    <div className="card-body p-0">
                        <div style={{display: "inline"}}>
                            <AvgCalendar lawyer={lawyer} />
                        </div>
                    </div>
                </div>

                <div className="m-2">
                    <Link
                        className="btn btn-primary btn-block"
                        to={{
                            pathname: `list/book-lawyer/${lawyer.id}`,
                        }}
                    >
                        <FaCalendarPlus />&nbsp;Book Appointment
                    </Link>
                </div>
            </div>
        )
    );
};

const AvgCalendar = ({lawyer}) => {
    // Get availability
    const [days, setDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let initAvail = [];
    for (let i = 0; i < 7; ++i) {
        initAvail.push([]);
        for (let j = 0; j < 4; ++j) {
            initAvail[i].push(0);
        }
    }
    const [availability, setAvailability] = useState(initAvail);
    const [avgSlotLength, setAvgSlotLength] = useState(1);
    const {request} = useRequests();
    useEffect(() => {
        if (lawyer !== null) {
            setIsLoading(true);
            request({
                url: `lawyer/${lawyer.id}/schedule`,
                method: 'POST',
                data: {
                    days_to_show: 7
                }
            }).then((response) => {
                console.log(response);
                const nextDays = response.schedule.days.map((day, i) => {
                    return day.name;
                });
                setDays(nextDays);
                // Calculate availability
                const nextAvailability = initAvail.slice();
                let avg = 0;
                let count = 0;
                response.schedule.days.map((day, i) => {
                    for (let j = 0; j < day.slots.length; ++j) {
                        const time = day.slots[j].time;
                        if (time >= "00:00" && time < "06:00" && !day.slots[j].reserved) {
                            nextAvailability[i][0]++;
                        } else if (time >= "06:00" && time < "12:00" && !day.slots[j].reserved) {
                            nextAvailability[i][1]++;
                        } else if (time >= "12:00" && time < "18:00" && !day.slots[j].reserved) {
                            nextAvailability[i][2]++;
                        } else if (!day.slots[j].reserved) {
                            nextAvailability[i][3]++;
                        }
                        avg += day.slots[j].length;
                        count++;
                    }
                });
                setAvgSlotLength(avg / count);
                setAvailability(nextAvailability);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [lawyer]);
    return (

        <>
            <LoadingOverlay
                active={isLoading}
                spinner
                text={"Loading"}
            >
                <table className="calender">
                    <thead>
                        <tr>
                            <th colSpan="2"></th>
                            {days.map((day) => (
                                <th key={day} style={{fontSize: '12px', textAlign: 'center', padding: '2px', whiteSpace: 'nowrap'}}>{day.substr(0, 3)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="2" style={{whiteSpace: 'nowrap', fontSize: '12px'}}>Morning<br /><small className="text-muted">00:00 - 06:00</small></td>
                            {availability.map((a, i) => {
                                const brightness = (a[0] * avgSlotLength) / (6 * 60);
                                return (<td key={i} style={{backgroundColor: 'rgba(9, 229, 171, ' + brightness + ')'}}></td>);
                            })}
                        </tr>
                        <tr>
                            <td colSpan="2" style={{whiteSpace: 'nowrap', fontSize: '12px'}}>Afternoon<br /><small className="text-muted">06:00 - 12:00</small></td>
                            {availability.map((a, i) => {
                                const brightness = (a[1] * avgSlotLength) / (6 * 60);
                                return (<td key={i} style={{backgroundColor: 'rgba(9, 229, 171, ' + brightness + ')'}}></td>);
                            })}
                        </tr>
                        <tr>
                            <td colSpan="2" style={{whiteSpace: 'nowrap', fontSize: '12px'}}>Evening<br /><small className="text-muted">12:00 - 18:00</small></td>
                            {availability.map((a, i) => {
                                const brightness = (a[2] * avgSlotLength) / (6 * 60);
                                return (<td key={i} style={{backgroundColor: 'rgba(9, 229, 171, ' + brightness + ')'}}></td>);
                            })}
                        </tr>
                        <tr>
                            <td colSpan="2" style={{whiteSpace: 'nowrap', fontSize: '12px'}}>Night<br /><small className="text-muted">18:00 - 00:00</small></td>
                            {availability.map((a, i) => {
                                const brightness = (a[3] * avgSlotLength) / (6 * 60);
                                return (<td key={i} style={{backgroundColor: 'rgba(9, 229, 171, ' + brightness + ')'}}></td>);
                            })}
                        </tr>
                    </tbody>
                </table>
            </LoadingOverlay>
        </>
    );
    return <div className="popup-calender-cell">test</div>;
};
function GetDates(startDate = new Date(), daysToAdd = 6) {
    var aryDates = [];
    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryDates.push(DayAsString(currentDate.getDay()));
    }

    return aryDates;
}
function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tue";
    weekdays[3] = "Wed";
    weekdays[4] = "Thu";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";

    return weekdays[dayIndex];
}
export default withRouter(LawyerList);
