import React, { useState } from "react";
import { Link } from "react-router-dom";
import LawyerCardList from "./LawyerCardList";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import StickyBox from "react-sticky-box";

function LawyerList() {
    const [sortBy, setSortBy] = useState(null);
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
                <div className="row">
                    <div className="col-md-12 col-lg-8 col-xl-9">
                        <LawyerCardList lawyers={lawyers} />
                    </div>
                    <div className="col-md-12 col-lg-4 col-xl-3">
                        <div>
                            <h1>Lawyer's Pop Up</h1>
                        </div>
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
