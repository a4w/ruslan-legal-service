import React from "react";
import StarRatings from "react-star-ratings";
import LawyerCardList from "./LawyerCardList";
import AppointmentTimeForm from "./AppointmentTimeForm";

const LawyerBooking = () => {
    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <LawyerCard />
                        <TodayIs />
                        <AppointmentTimeForm />
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
const LawyerCard = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="booking-doc-info">
                    <a href="doctor-profile.html" className="booking-doc-img">
                        Profile Pic
                    </a>
                    <div className="booking-info">
                        <h4>
                            <a href="doctor-profile.html">Name</a>
                        </h4>
                        <div className="rating">
                            <StarRatings
                                rating={4}
                                starRatedColor="gold"
                                starDimension="20px"
                                starSpacing="0px"
                                numberOfStars={5}
                                name="rating"
                            />
                            &nbsp;
                            <span className="d-inline-block text-xs average-rating">
                                (number of clients rated, percentage)
                            </span>
                        </div>
                        <p className="text-muted mb-0">
                            <i className="fas fa-map-marker-alt"></i> City,
                            Country
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LawyerBooking;
