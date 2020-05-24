import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LawyerCardList from "./LawyerCardList";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StickyContainer, Sticky } from "react-sticky";

function LawyerList() {
    const [selectedValue, setSelected] = useState(null);
    const OnChangeHandler = ({ value }) => {
        setSelected(value);
        console.log(value);
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
    ];
    return (
        <>
            <LawyerListHeader
                OnChangeHandler={OnChangeHandler}
                selectedValue={selectedValue}
            />
            <StickyContainer>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12 col-lg-4 col-xl-3">
                            <Sticky>
                                {({ style }) => (
                                    <div style={style}>
                                        <LawyerSearchFilter />
                                    </div>
                                )}
                            </Sticky>
                        </div>
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            <LawyerCardList lawyers={lawyers} />
                        </div>
                    </div>
                </div>
            </StickyContainer>
        </>
    );
}

const LawyerSearchFilter = () => {
    const [selectedDate, handleDateChange] = useState();
    return (
        <div className="card search-filter">
            <div className="card-header">
                <h4 className="card-title mb-0">Search Filter</h4>
            </div>
            <div className="card-body">
                <div className="filter-widget">
                    <div className="cal-icon">
                        <DatePicker
                            className="form-control datetimepicker"
                            selected={selectedDate}
                            onChange={(date) => handleDateChange(date)}
                            maxDate={new Date()}
                            placeholderText="Select Date"
                        />
                    </div>
                </div>
                <div className="filter-widget">
                    <h4>Some Filteration Header</h4>
                    <div>
                        <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark"></span> F1
                        </label>
                    </div>
                    <div>
                        <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark"></span> F2
                        </label>
                    </div>
                    <div>
                        <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark"></span> F3
                        </label>
                    </div>
                    <div>
                        <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark"></span> F4
                        </label>
                    </div>
                    <div>
                        <label className="custom_check">
                            <input type="checkbox" name="select_specialist" />
                            <span className="checkmark"></span> F5
                        </label>
                    </div>
                </div>
                <div className="btn-search">
                    <button type="button" className="btn btn-block">
                        Search
                    </button>
                </div>
            </div>
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

export default LawyerList;
