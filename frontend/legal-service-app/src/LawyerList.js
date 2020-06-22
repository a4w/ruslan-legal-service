import React, { useState } from "react";
import { Link } from "react-router-dom";
import LawyerCardList from "./LawyerCardList";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import StickyBox from "react-sticky-box";
import "./Calendar.css";

function LawyerList() {
    const [sortBy, setSortBy] = useState(null);
    const [lawyerPopUp, setPopUp] = useState(null);
    const SortHandler = ([{ value }]) => {
        setSortBy(value);
        console.log("sort by: ", value);
    };
    const lawyers = [
        {
            id: "1",
        },
        {
            id: "2",
        },
        {
            id: "3",
        },
        {
            id: "4",
        },
        {
            id: "5",
        },
    ];
    return (
        <div>
            <LawyerListHeader
                OnChangeHandler={SortHandler}
                selectedValue={sortBy}
            />
            <StickyBox style={{ zIndex: 6 }}>
                <LawyerSearchFilter />
            </StickyBox>

            <div className="content">
                <div className="row justify-content-center align-content-center">
                    <div className="col-7">
                        <LawyerCardList lawyers={lawyers} setPopUp={setPopUp} />
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
        { value: 1, label: "f1" },
        { value: 2, label: "f2" },
        { value: 3, label: "f3" },
        { value: 4, label: "f4" },
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
                                setFilter({ ...filter, date: date })
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
                        onChange={([{ value }]) =>
                            setFilter({ ...filter, filterOne: value })
                        }
                        style={{ minHeight: "46px" }}
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

const LawyerListHeader = ({ OnChangeHandler, selectedValue }) => {
    const options = [
        { value: "rating", label: "Rating" },
        { value: "popular", label: "Popular" },
        { value: "latest", label: "Latest" },
        { value: "free", label: "Free" },
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

const PopUp = ({ lawyer }) => {
    return (
        lawyer && (
            <div className="card flex-fill mr-2">
                <div className="m-2">
                    <img
                        alt="Card Image"
                        src="./undraw_remote_meeting_cbfk.svg"
                        className="card-img-top"
                        style={{height:"30%"}}
                    />
                    <div className="card-header">
                        <h5 className="lawyer-name">
                            {"Lawyer ID: " + lawyer.id}
                        </h5>
                    </div>
                    <div className="card-body p-0">
                        <p className="card-text">Lawyer Bio</p>
                        <div style={{ display: "inline" }}>
                            <AvgCalendar />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

const AvgCalendar = () => {
    return (
        <table className="calender">
            <thead>
                <tr>
                    <th colspan="2"></th>
                    {GetDates().map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="2">Morning</td>
                </tr>
                <tr>
                    <td colspan="2">Afternoon</td>
                </tr>
                <tr>
                    <td colspan="2">Evening</td>
                </tr>
                <tr>
                    <td colspan="2">Night</td>
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
