import React from "react";
import StarRatings from "react-star-ratings";
import moment from "moment";

const LawyerReviews = ({lawyer}) => {
    const comments = lawyer.ratings;

    return <ReviewList comments={comments} />;
};

const ReviewList = ({ comments }) => {
    return (
        <div className="lawyer-review review-listing">
            <ul className="comments-list">
                {comments && comments.map((comment) => (
                    <li key={comment.id}>
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
const Comment = ({comment}) => {
    const date = moment(comment.created_at).format("MMMM Do YYYY, hh:mm a"); 
    
    return (
        <div className="comment">
            {/* <img
                className="avatar rounded-circle"
                alt="User"
                src="assets/img/patients/patient.jpg"
            /> */}
            Client's Pic
            <div className="comment-body" style={{ width: "100%" }}>
                <div className="meta-data">
                    <span className="comment-author">Clients name</span>
                    <span className="comment-date">{date}</span>
                    <div className="review-count rating">
                        <StarRatings
                            rating={comment.rating}
                            starRatedColor="gold"
                            starDimension="20px"
                            starSpacing="0px"
                            numberOfStars={5}
                            name="rating"
                        />
                    </div>
                </div>
                {comment.rating >= 3 ? (
                    <p className="recommended">
                        <i className="far fa-thumbs-up"></i> I recommend this
                        Lawyer
                    </p>
                ) : (
                    <p className="not-recommended">
                        <i className="far fa-thumbs-down"></i> I don't recommend
                        this Lawyer
                    </p>
                )}
                <p className="comment-content">{comment.comment}</p>
            </div>
        </div>
    );
};
export default LawyerReviews;
