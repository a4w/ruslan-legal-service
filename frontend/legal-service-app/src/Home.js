import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import History from "./History";

const Home = () => {
    const [location, setLocation] = useState({ value: null, label: "" });
    const [expertises, setExpertises] = useState([]);
    useEffect(() => {
        console.log("location: ", location);
        console.log("Areas: ", expertises);
    }, [location, expertises]);
    const locationOptions = [
        { value: "london", label: "London" },
        { value: "paris", label: "Paris" },
        { value: "rome", label: "Rome" },
        { value: "uk", label: "UK" },
    ];
    const expertisesOptions = [
        { value: "bl", label: "Business law" },
        { value: "crl", label: "Civil rights law" },
        { value: "cl", label: "Criminal law" },
        { value: "el", label: "Environmental law" },
        { value: "fl", label: "Family law" },
        { value: "hl", label: "Health law" },
        { value: "il", label: "Immigration law" },
    ];
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        History.push("/list");
        // History.push({
        //     pathname: '/template',
        //     search: '?query=abc',
        //     state: { detail: response.data }
        //   })
    };
    return (
        <section className="section section-search">
            <div className="container-fluid">
                <div className="banner-wrapper">
                    <div className="banner-header text-center">
                        <h1>Search Lawyer, Book an Appointment</h1>
                        <p>
                            Discover the best lawyers the city nearest to you.
                        </p>
                    </div>
                    <div className="search-box">
                        <form onSubmit={OnSubmitHandler}>
                            <div className="form-group search-location">
                                <Select
                                    className="select-form-control"
                                    placeholder="Select Location"
                                    value={location.label}
                                    searchable
                                    options={locationOptions}
                                    onChange={([obj]) => setLocation(obj)}
                                    style={{ minHeight: "46px" }}
                                />
                                <span className="form-text">
                                    Based on your Location
                                </span>
                            </div>
                            <div className="form-group search-info">
                                <Select
                                    multi
                                    className="select-form-control"
                                    placeholder="Select Area of Practice"
                                    value={expertises}
                                    searchable
                                    options={expertisesOptions}
                                    onChange={(obj) => setExpertises(obj)}
                                    style={{ minHeight: "46px" }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary search-btn"
                            >
                                <i className="fas fa-search"></i>{" "}
                                <span>Search</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Home;
