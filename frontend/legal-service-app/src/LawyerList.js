import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import LawyerCardList from "./LawyerCardList";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FaSearch} from "react-icons/fa";
import StickyBox from "react-sticky-box";
import "./Calendar.css";
import {request} from "./Axios";

function LawyerList() {
    const [sortBy, setSortBy] = useState(null);
    const [offset, setOffset] = useState(0);
    const [length, setLength] = useState(2);
    const [lawyers, setLawyers] = useState([]);
    const [lawyerPopUp, setPopUp] = useState(null);
    const SortHandler = ([{value}]) => {
        setSortBy(value);
        console.log("sort by: ", value);
    };
    useEffect(() => {
        request({
            url: "/lawyer/all",
            method: "GET",
            data: {offset: offset, length: length},
        })
            .then((data) => {
                setLawyers(data.lawyers);
            })
            .catch((_errors) => {});
    }, []);
    const GetMore = (e) => {
        e.preventDefault();
        setOffset(offset + length);
        request({
            url: "/lawyer/all",
            method: "GET",
            data: {offset: offset, length: length},
        })
            .then((data) => {
                setLawyers(data.lawyers);
            })
            .catch((_errors) => {});
    };
    return (
        <div>
            <LawyerListHeader
                OnChangeHandler={SortHandler}
                selectedValue={sortBy}
            />
            <StickyBox style={{zIndex: 6}}>
                <LawyerSearchFilter />
            </StickyBox>

            <div className="content">
                <div className="row justify-content-center align-content-center">
                    <div className="col-7">
                        <LawyerCardList lawyers={lawyers} setPopUp={setPopUp} />
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

const LawyerSearchFilter = () => {
    const options = [
        {value: 1, label: "f1"},
        {value: 2, label: "f2"},
        {value: 3, label: "f3"},
        {value: 4, label: "f4"},
    ];
    const [filter, setFilter] = useState({});
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
                            maxDate={new Date()}
                            placeholderText="Available on"
                        />
                    </div>
                </div>
                <div className="filter-widget col-md-12 col-lg-3 col-xl-3 mb-0">
                    <Select
                        className="form-control mb-0"
                        value={filter.filterOne}
                        placeholder="Filter"
                        options={options}
                        onChange={([{value}]) =>
                            setFilter({...filter, filterOne: value})
                        }
                        style={{minHeight: "46px"}}
                    />
                </div>
                <div className="btn-search col-md-12 col-lg-1 col-xl-1 align-left">
                    <button
                        type="button"
                        className="btn btn-block font-weight-bold"
                    >
                        <FaSearch />
                    </button>
                </div>
            </form>
        </div>
    );
};

const LawyerListHeader = ({OnChangeHandler, selectedValue}) => {
    const options = [
        {value: "rating", label: "Rating"},
        {value: "popular", label: "Popular"},
        {value: "latest", label: "Latest"},
        {value: "free", label: "Free"},
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
                        <h2 className="breadcrumb-title">
                            [#matches] found for : Lawyers In [Location] Expert
                            in [Field]
                        </h2>
                    </div>
                    <div className="col-md-4 col-12 d-md-block d-none">
                        <div className="sort-by">
                            <span className="sort-title">Sort by</span>
                            <span className="sortby-fliter">
                                <Select
                                    className="select-form-control"
                                    value={selectedValue}
                                    placeholder={
                                        selectedValue ? selectedValue : "select"
                                    }
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
                    <div className="card-header">
                        <h5 className="lawyer-name">
                            {lawyer.account.name} {lawyer.account.surname}
                        </h5>
                    </div>
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
    const [slotLength, setSlotLength] = useState(1);
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
                setSlotLength(response.schedule.slot_length);
                // Calculate availability
                const nextAvailability = initAvail.slice();
                response.schedule.days.map((day, i) => {
                    for (let j = 0; j < day.slots.length; ++j) {
                        const time = day.slots[j].from;
                        if (time >= "00:00" && time < "06:00" && !day.slots[j].reserved) {
                            nextAvailability[i][0]++;
                        } else if (time >= "06:00" && time < "12:00" && !day.slots[j].reserved) {
                            nextAvailability[i][1]++;
                        } else if (time >= "12:00" && time < "18:00" && !day.slots[j].reserved) {
                            nextAvailability[i][2]++;
                        } else if (!day.slots[j].reserved) {
                            nextAvailability[i][3]++;
                        }
                    }
                });
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
                    <th colspan="2"></th>
                    {days.map((day) => (
                        <th key={day}>{day.substr(0, 3)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">Morning</td>
                    {availability.map((a, i) => {
                        const brightness = (a[0] * slotLength) / (6 * 60);
                        return (<td style={{backgroundColor: 'rgba(0, 255, 0, ' + brightness + ')'}}></td>);
                    })}
                </tr>
                <tr>
                    <td colspan="2">Afternoon</td>
                    {availability.map((a, i) => {
                        const brightness = (a[1] * slotLength) / (6 * 60);
                        return (<td style={{backgroundColor: 'rgba(0, 255, 0, ' + brightness + ')'}}></td>);
                    })}
                </tr>
                <tr>
                    <td colspan="2">Evening</td>
                    {availability.map((a, i) => {
                        const brightness = (a[2] * slotLength) / (6 * 60);
                        return (<td style={{backgroundColor: 'rgba(0, 255, 0, ' + brightness + ')'}}></td>);
                    })}
                </tr>
                <tr>
                    <td colspan="2">Night</td>
                    {availability.map((a, i) => {
                        const brightness = (a[3] * slotLength) / (6 * 60);
                        return (<td style={{backgroundColor: 'rgba(0, 255, 0, ' + brightness + ')'}}></td>);
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
export default LawyerList;
