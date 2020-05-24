import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LawyerCardList from "./LawyerCardList";
import Select from "react-select";

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
            <LawyerCardList lawyers={lawyers} />
        </>
    );
}

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
