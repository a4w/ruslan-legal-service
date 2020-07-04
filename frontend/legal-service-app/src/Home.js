import React, {useState, useEffect} from "react";
import Select from "react-dropdown-select";
import History from "./History";
import {request} from "./Axios"
import * as $ from "jquery"
import Slider from "react-slick";

const Home = () => {
    const [location, setLocation] = useState({value: null, label: "Select location"});
    const [practiceAreas, setPracticeAreas] = useState([]);
    const [practiceAreaOptions, setPracticeAreaOptions] = useState([]);
    const [isLocationBased, setIsLocationBased] = useState(false);

    useEffect(() => {
        request({
            url: 'lawyer/practice-areas',
            method: 'GET'
        }).then(response => {
            const areas = response.areas.map((area, i) => {
                return {
                    label: area.area,
                    value: area.id,
                    name: 'practiceAreas'
                };
            });
            setPracticeAreaOptions(areas);
        });
    }, []);

    const locationOptions = [
        {value: "london", label: "London"},
        {value: "paris", label: "Paris"},
        {value: "rome", label: "Rome"},
        {value: "uk", label: "UK"},
    ];

    useEffect(() => {
        $.get("http://ipinfo.io", function (response) {
            const city = response.city;
            for (let i = 0; i < locationOptions.length; ++i) {
                console.log(city, locationOptions[i].value);
                if (city.toLowerCase() == locationOptions[i].value) {
                    setLocation(locationOptions[i]);
                    setIsLocationBased(true);
                    break;
                }
            }
        }, "jsonp");

    }, []);

    const OnSubmitHandler = (event) => {
        event.preventDefault();
        //History.push("/list");
        const areas = practiceAreas.map(area => {
            return area.value;
        });
        const queryString = areas.join(',');
        const sLocation = location.value === null ? '' : location.value;
        History.push({
            pathname: '/list',
            search: (sLocation !== '' || queryString !== '') ? `?location=${sLocation}&practice_areas=${queryString}` : '',
            // state: {detail: response.data}
        })
    };
    return (
        <>
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
                                    values={[location]}
                                    searchable
                                    options={locationOptions}
                                    onChange={([obj]) => {
                                        setLocation(obj);
                                        console.log(obj);
                                    }}
                                    style={{ minHeight: "46px" }}
                                />
                                {isLocationBased && (
                                    <span className="form-text">
                                        Based on your Location
                                    </span>
                                )}
                            </div>
                            <div className="form-group search-info">
                                <Select
                                    multi
                                    className="select-form-control"
                                    placeholder="Select Area of Practice"
                                    value={practiceAreas}
                                    searchable
                                    options={practiceAreaOptions}
                                    onChange={(obj) => setPracticeAreas(obj)}
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
                        <div className="separator">
                            or Search lawyer by name!
                        </div>
                        <SearchLawyerByName />
                    </div>
                </div>
            </div>
        </section>
        <AreaOfExpertices />
        </>
    );
};

const SearchLawyerByName = () => {
    const [name, setName] = useState("");
    const OnChangeHandler = ({ target: { value } }) => {
        setName(value);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        History.push({
            pathname: '/list',
            search: (name !== '') ? `?lawyerName=${name.replace(/\s/g,'+')}` : '',
        })
    };
    return (
        <form style={{ marginTop: "8px" }} onSubmit={OnSubmitHandler}>
            <div className="form-group search-info" style={{ minWidth: "93%" }}>
                <input
                    className="form-control"
                    placeholder="Enter Lawyer Name"
                    value={name}
                    onChange={OnChangeHandler}
                />
            </div>
            <button type="submit" className="btn btn-primary search-btn">
                <i className="fas fa-search"></i> <span>Search</span>
            </button>
        </form>
    );
};
export default Home;
const AreaOfExpertices = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const [areas, setAreas] = useState([]);
    useEffect(() => {
        request({
            url: "lawyer/practice-areas",
            method: "GET",
        }).then((response) => {
            setAreas(response.areas);
        });
    }, []);

    return (
        <section className="section section-specialities">
            <div className="container-fluid">
                <div className="section-header text-center">
                    <h2>Area of expertises</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <div className="specialities-slider slider">
                            <Slider {...settings}>
                                {areas.map((area, i) => (
                                    <SlickIcon key={i} url="" label={area.area} />
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SlickIcon = ({url, label})=>{
    return (
        <div className="speicality-item text-center">
            <div className="speicality-img">
                <img className="img-fluid" alt="Speciality" />
                <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                </span>
            </div>
            <p>{label}</p>
        </div>
    );
}