import React, {useState, useEffect} from "react";
import Select from "react-dropdown-select";
import History from "./History";
import {request} from "./Axios"
import * as $ from "jquery"
import Slider from "react-slick";
import Img from "./Img";
import BlogImg from "./BlogImg";
import {Discount} from "./LawyerCardList";
import StarRatings from "react-star-ratings";
import {Link} from "react-router-dom";
import queryString from "query-string"
import moment from "moment";
import PageHead from "./PageHead";

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
            <PageHead
                title="Find and book lawyers in your area | Lawbe"
                description="Lawbe helps you find, compare and book meetings with the best lawyers from the comfort of your home"
            />
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
                                        style={{minHeight: "46px"}}
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
                                        style={{minHeight: "46px"}}
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
            <PopularLawyers />
            <LatestBlogs />
        </>
    );
};

const SearchLawyerByName = () => {
    const [name, setName] = useState("");
    const OnChangeHandler = ({target: {value}}) => {
        setName(value);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        History.push({
            pathname: '/list',
            search: (name !== '') ? `?lawyerName=${name.replace(/\s/g, '+')}` : '',
        })
    };
    return (
        <form style={{marginTop: "8px"}} onSubmit={OnSubmitHandler}>
            <div className="form-group search-info" style={{minWidth: "93%"}}>
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
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
const AreaOfExpertices = () => {
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

const SlickIcon = ({url, label}) => {
    return (
        <div className="speicality-item text-center">
            <div className="speicality-img">
                <img className="img-fluid" alt="Speciality" src="/avatar.svg" />
                <span>
                    <i className="fa fa-circle" aria-hidden="true"></i>
                </span>
            </div>
            <p>{label}</p>
        </div>
    );
}

const PopularLawyers = () => {
    const [lawyers, setLawyers] = useState([]);
    const [params, setParams] = useState({length: 7, order: "ratings"});

    useEffect(() => {
        request({
            url: "/lawyer/all?" + queryString.stringify(params),
            method: "GET",
        })
            .then((data) => {
                setLawyers(data.lawyers);
            })
            .catch((_errors) => {});
    }, []);
    return (
        <section className="section section-lawyer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="section-header ">
                            <h2>Book Our Lawyers</h2>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="lawyer-slider slider">
                            <Slider {...settings}>
                                {lawyers.map((lawyer, i) => (
                                    <LawyerCard
                                        key={i}
                                        account={lawyer.account}
                                        lawyer={lawyer}
                                    />
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
const LawyerCard = ({account, lawyer}) => {
    return (
        <div className="profile-widget">
            <div className="lawyer-img">
                <Link to={{pathname: `/profile/${lawyer.id}`, state: {lawyer: lawyer}}}>
                    <Img
                        className="img-fluid"
                        alt="User Image"
                        src={account.profile_picture}
                    />
                </Link>
            </div>
            <div className="pro-content">
                <h3 className="title">
                    <Link to={{pathname: `/profile/${lawyer.id}`, state: {lawyer: lawyer}}}>{`${account.name} ${account.surname}`}</Link>
                    <i className="fas fa-check-circle verified"></i>
                </h3>
                <div className="session-services">
                    {lawyer.practice_areas &&
                        lawyer.practice_areas.map((area) => (
                            <span key={area.id}>{area.area}</span>
                        ))}
                </div>
                <div className="rating">
                    <StarRatings
                        rating={parseFloat(lawyer.ratings_average)}
                        starRatedColor="gold"
                        starDimension="20px"
                        starSpacing="0px"
                        numberOfStars={5}
                        name="rating"
                    />
                    &nbsp;
                    <span className="d-inline-block text-xs average-rating">
                        ({lawyer.ratings.length})
                    </span>
                </div>
                <div className="row row-sm">
                    <div className="col-6">
                        <Link
                            to={{
                                pathname: `/profile/${lawyer.id}`,
                                state: {lawyer: lawyer},
                            }}
                            className="btn view-btn"
                        >
                            View Profile
                        </Link>
                    </div>
                    <div className="col-6">
                        <Link
                            to={{
                                pathname: `${History.location.pathname}/book-lawyer/${lawyer.id}`,
                                state: {lawyer_id: lawyer.id},
                            }}
                            className="btn book-btn"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
                <ul className="available-info mt-2" style={{minHeight: "125px"}} >
                    <li>
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {`${account.city}, ${account.country}`}
                    </li>
                    <Discount
                        secsTillEnd={new Date(lawyer.discount_end)}
                        cost={lawyer.price_per_hour}
                        costAfterDiscount={lawyer.discounted_price_per_hour}
                        isPercent={lawyer.is_percent_discount}
                        discount={lawyer.discount}
                    />
                </ul>
            </div>
        </div>
    );
}

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        request({url: `/blogs/latest/${4}`, method: "GET"})
            .then((response) => {
                setBlogs(response.blogs);
            })
            .catch((err) => {});
    }, []);
    return (
        <section
            className="section section-blogs"
            style={{backgroundColor: "#fff"}}
        >
            <div className="container-fluid">
                <div className="section-header text-center">
                    <h2>Blogs and News</h2>
                </div>
                <div className="row blog-grid-row">
                    {blogs.map((blog, i) => (
                        <BlogCard key={i} blog={blog} />
                    ))}
                </div>
                <div className="view-all text-center">
                    <Link to="/blogs" className="btn btn-primary">
                        View All
                    </Link>
                </div>
            </div>
        </section>
    );
}
const BlogCard = ({blog}) => {
    const {lawyer, id} = {...blog};
    const {account} = {...lawyer};
    return (
        <div className="col-md-6 col-lg-3 col-sm-12">
            <div className="blog grid-blog">
                <div className="blog-image">
                    <Link to={`/blog/${id}`}>
                        <BlogImg
                            className="img-fluid"
                            src={blog.cover_photo_link}
                            alt="Post Image"
                        />
                    </Link>
                </div>
                <div className="blog-content">
                    <ul className="entry-meta meta-item">
                        <li>
                            <div className="post-author">
                                <Link to={`/profile/${lawyer.id}`}>
                                    <Img
                                        src={account.profile_picture}
                                        alt="Post Author"
                                    />
                                    <span>{`${account.name} ${account.surname}`}</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-clock"></i>{" "}
                            {moment(blog.puplished_at).format("D MMMM YYYY")}
                        </li>
                    </ul>
                    <h3 className="blog-title">
                        <Link to={`/blog/${id}`}>{blog.title}</Link>
                    </h3>
                    <p className="mb-0">
                        Preview..
                    </p>
                </div>
            </div>
        </div>
    );
}
