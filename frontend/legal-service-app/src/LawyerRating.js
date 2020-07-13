import React, {useState, useEffect} from "react";
import StarRatings from "react-star-ratings";
import {toast} from "react-toastify";
import Img from "./Img";
import {Link} from "react-router-dom";
import useRequests from "./useRequests";

const LawyerRating = ({appId, lawyerId}) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [account, setAccount] = useState({});
    const {request} = useRequests();
    const imgStyle = {
        borderRadius: "120px",
        height: "120px",
        width: "120px",
        objectFit: "cover",
    };
    useEffect(() => {
        request({url: `lawyer/${lawyerId}`, method: "GET"})
            .then((data) => {
                setAccount(data.lawyer.account);
            })
            .catch((e) => {});
    }, []);
    const OnSubmitHandler = (e) => {
        e.preventDefault();
        console.log("done");
        request({
            url: `/rating/rate/${appId}`,
            method: "POST",
            data: {rating: rating, comment: review},
        })
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
                        <Link to={`profile/${lawyerId}`} className="booking-lawyer-img">
                            <Img
                                src={account.profile_picture}
                                className="img-fluid"
                                style={imgStyle}
                            />
                        </Link>
                    </div>
                    <div
                        className="profile-det-info mt-4"
                        style={{textAlign: "center"}}
                    >
                        <h2>{`${account.name} ${account.surname}`}</h2>
                    </div>
                    <div
                        className="justify-content-center"
                        style={{display: "flex"}}
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
                            style={{display: "flex", height: "auto"}}
                        >
                            <textarea
                                style={{height: "auto"}}
                                className="form-control"
                                value={review}
                                onChange={({target: {value}}) =>
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
