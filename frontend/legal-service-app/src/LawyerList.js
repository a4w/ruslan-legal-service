import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import LawyerCardList from "./LawyerCardList";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import {FaSearch} from "react-icons/fa";
import StickyBox from "react-sticky-box";
import "./Calendar.css";
import {request} from "./Axios";
import queryString from "query-string"

function LawyerList(props) {
    const [sortBy, setSortBy] = useState(null);
    const [offset, setOffset] = useState(0);
    const [length, setLength] = useState(3);
    const [lawyers, setLawyers] = useState(null);
    const [lawyerPopUp, setPopUp] = useState(null);
    const [filter, setFilter] = useState({ date: new Date() });
    const [params, setParams] = useState({
        ...queryString.parse(props.location.search),
        offset: offset,
        length: length,
    });
    
    const getList = (params, keep = false) => {
        console.log("params : ", params);
        console.log("qs: ", queryString.stringify(params));
        request({
            url: "/lawyer/all?" + queryString.stringify(params),

            method: "GET",
        })
            .then((data) => {
                if (keep) setLawyers([...lawyers, ...data.lawyers]);
                else setLawyers(data.lawyers);
            })
            .catch((_errors) => {});
    };

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
    };

    useEffect(() => {
        getList(params);        
    }, []);

    const GetMore = (e) => {
        e.preventDefault();
        setOffset(offset + length);
        const next = { ...params, offset: (offset + length), length: length };
        setParams(next);
        getList(next, true);
    };

    const filterHandler = ()=>{
        let date = new Date(filter.date);
        date = date.toISOString().slice(0,10);
        console.log("date : ", date); 
        const next = {
            ...params,
            available_on: date,
            offset: 0,
            length: length,
        };
        setParams(next);
        // params["filter_by"] = filter.filters;
        getList(next);       
    }
    return (
        <div>
            <LawyerListHeader
                params={params}
                OnChangeHandler={SortHandler}
                selectedValue={sortBy}
            />
            <StickyBox style={{ zIndex: 6 }}>
                <LawyerSearchFilter
                    filter={filter}
                    setFilter={setFilter}
                    filterHandler={filterHandler}
                />
            </StickyBox>

            <div className="content">
                <div className="row justify-content-center align-content-center">
                    <div className="col-7">
                        {lawyers && <LawyerCardList lawyers={lawyers} setPopUp={setPopUp} />}
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
                    <div className="col-5">
                        <StickyBox offsetTop={80} offsetBottom={20}>
                            <PopUp lawyer={lawyerPopUp} />
                        </StickyBox>
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
                <div className="filter-widget col-md-12 col-lg-3 col-xl-3 mb-0">
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
                <div className="filter-widget col-md-12 col-lg-3 col-xl-3 mb-0">
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
                </div>
                <div className="btn-search col-md-12 col-lg-1 col-xl-1 align-left">
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

const LawyerListHeader = ({params, OnChangeHandler, selectedValue}) => {
    const options = [
        {value: "ratings", label: "Rating"},
        {value: "price", label: "Price"},
        {value: "popular", label: "Popular"},
    ];
    return (
        <div className="breadcrumb-bar">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-8 col-12">
                        <nav
                            aria-label="breadcrumb"
                            className="page-breadcrumb"
                        >
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Search
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-4 col-12 d-md-block d-none">
                        <div className="sort-by">
                            <span className="sort-title">Sort by</span>
                            <span className="sortby-fliter">
                                <Select
                                    className="select-form-control"
                                    value={selectedValue}
                                    options={options}
                                    onChange={OnChangeHandler}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PopUp = ({lawyer}) => {
    return (
        lawyer && (
            <div className="card flex-fill mr-2">
                <div className="m-2">
                    <div className="card-body p-0">
                        <div style={{display: "inline"}}>
                            <AvgCalendar lawyer={lawyer} />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

const AvgCalendar = ({lawyer}) => {
    // Get availability
    const [days, setDays] = useState([]);
    let initAvail = [];
    for (let i = 0; i < 7; ++i) {
        initAvail.push([]);
        for (let j = 0; j < 4; ++j) {
            initAvail[i].push(0);
        }
    }
    const [availability, setAvailability] = useState(initAvail);
    const [avgSlotLength, setAvgSlotLength] = useState(1);
    useEffect(() => {
        if (lawyer !== null) {
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
            });
        }
    }, [lawyer]);
    return (
        <table className="calender">
            <thead>
                <tr>
                    <th colSpan="2"></th>
                    {days.map((day) => (
                        <th key={day}>{day.substr(0, 3)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan="2">Morning</td>
                    {availability.map((a, i) => {
                        const brightness = (a[0] * avgSlotLength) / (6 * 60);
                        return (<td key={i} style={{backgroundColor: 'rgba(0, 255, 0, ' + brightness + ')'}}></td>);
                    })}
                </tr>
                <tr>
                    <td colSpan="2">Afternoon</td>
                    {availability.map((a, i) => {
                        const brightness = (a[1] * avgSlotLength) / (6 * 60);
                        return (<td key={i} style={{backgroundColor: 'rgba(0, 255, 0, ' + brightness + ')'}}></td>);
                    })}
                </tr>
                <tr>
                    <td colSpan="2">Evening</td>
                    {availability.map((a, i) => {
                        const brightness = (a[2] * avgSlotLength) / (6 * 60);
                        return (<td key={i} style={{backgroundColor: 'rgba(0, 255, 0, ' + brightness + ')'}}></td>);
                    })}
                </tr>
                <tr>
                    <td colSpan="2">Night</td>
                    {availability.map((a, i) => {
                        const brightness = (a[3] * avgSlotLength) / (6 * 60);
                        return (<td key={i} style={{backgroundColor: 'rgba(0, 255, 0, ' + brightness + ')'}}></td>);
                    })}
                </tr>
            </tbody>
        </table>
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
