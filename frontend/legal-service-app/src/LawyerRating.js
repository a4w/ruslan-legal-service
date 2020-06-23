import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const LawyerRating = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const imgStyle = {
        borderRadius: "120px",
        height: "120px",
        width: "120px",
        objectFit: "cover",
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
                </div>
            </div>
        </div>
    );
};
export default LawyerRating;
