import React, {useState, useEffect} from "react";
import StarRatings from "react-star-ratings";
import LawyerCardList from "./LawyerCardList";
import AppointmentTimeForm from "./AppointmentTimeForm";
import {request} from "./Axios";

const LawyerBooking = ({LawyerId}) => {
    const [lawyer, setLawyer] = useState(null);
    useEffect(() => {
        request({url: `/lawyer/${LawyerId}`, method: "GET"})
            .then((data) => {
                setLawyer(data.lawyer);
            })
            .catch((err) => {});

    }, []);
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12" style={{minHeight: '400px'}}>
                        {/* <LawyerCard lawyer={lawyer} />
                        <TodayIs /> */}
                        <AppointmentTimeForm lawyer_id={LawyerId} />
                    </div>
                </div>
            </div>
        </div>
    );
};
const TodayIs = () => {
    const date = new Date();
    const _date = date.toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const WeekDay = date.toLocaleString("en-GB", {
        weekday: "long",
    });

    return (
        <div class="row">
            <div class="col-12 col-sm-4 col-md-6">
                <h4 class="mb-1">{_date}</h4>
                <p class="text-muted">{WeekDay}</p>
            </div>
        </div>
    );
};
const LawyerCard = ({lawyer}) => {
    return (lawyer &&
        <div className="card">
            <div className="card-body">
                <div className="booking-lawyer-info">
                    <a
                        href="lawyer-profile.html"
                        className="booking-lawyer-img"
                    >
                        <img src={lawyer.account.profile_picture} alt="Lawyer Image" />
                    </a>
                    <div className="booking-info">
                        <h4>
                            <a href="lawyer-profile.html"> {`${lawyer.account.name} ${lawyer.account.surname}`}</a>
                        </h4>
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
                                ({lawyer.ratings_count})
                            </span>
                        </div>
                        <p className="text-muted mb-0">
                            <i className="fas fa-map-marker-alt"></i> {`${lawyer.account.city}, ${lawyer.account.country}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LawyerBooking;
