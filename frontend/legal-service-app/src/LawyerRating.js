import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import {request} from "./Axios";
import {toast} from "react-toastify";

const LawyerRating = ({appointment_id = 0}) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const imgStyle = {
        borderRadius: "120px",
        height: "120px",
        width: "120px",
        objectFit: "cover",
    };

    const OnSubmitHandler = (e) => {
        e.preventDefault();
        console.log("done");
        request({ url: `/rating/rate/${appointment_id}`, method: "POST" })
            .then((data) => {
                toast.success("Thank You!");
            })
            .catch((e) => {
                toast.error("An error occured");
            });
        
        
    };
    return (
        <div className="content">
            <div className="container">
                <div className="blog blog-grid-row">
                    <div className="profile-info-widget justify-content-center">
                        <a href="//" className="booking-lawyer-img">
                            <img
                                src="./test.jpg"
                                className="img-fluid"
                                style={imgStyle}
                            />
                        </a>
                    </div>
                    <div
                        className="profile-det-info mt-4"
                        style={{ textAlign: "center" }}
                    >
                        <h2>Lawyer's Name</h2>
                    </div>
                    <div
                        className="justify-content-center"
                        style={{ display: "flex" }}
                    >
                        <StarRatings
                            rating={rating}
                            starRatedColor="gold"
                            starHoverColor="gold"
                            starDimension="30px"
                            starSpacing="5px"
                            changeRating={(r, n) => setRating(r)}
                            numberOfStars={5}
                            name="rating"
                        />
                    </div>
                    <div className="justify-content-center mt-4">
                        <div
                            className={
                                "justify-content-center mt-4 " +
                                (!review || review === ""
                                    ? "form-group form-focus"
                                    : "form-group form-focus focused")
                            }
                            style={{ display: "flex" }}
                        >
                            <textarea
                                style={{ minHeight: "100px" }}
                                className="form-control"
                                value={review}
                                onChange={({ target: { value } }) =>
                                    setReview(value)
                                }
                            ></textarea>
                            <label className="focus-label">
                                Please write a review
                            </label>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary btn-block btn-lg login-btn "
                        type="submit"
                        onClick={OnSubmitHandler}
                    >
                        &nbsp;Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
export default LawyerRating;
