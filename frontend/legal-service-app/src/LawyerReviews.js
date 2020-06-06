import React from "react";
import StarRatings from "react-star-ratings";

const LawyerReviews = () => {
    const comments = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    return <ReviewList comments={comments} />;
};

const ReviewList = ({ comments }) => {
    return (
        <div className="lawyer-review review-listing">
            <ul className="comments-list">
                {comments.map((comment) => (
                    <li>
                        <Comment key={comment.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
const Comment = () => {
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
                    <span className="comment-date">Review Date</span>
                    <div className="review-count rating">
                        <StarRatings
                            rating={4}
                            starRatedColor="gold"
                            starDimension="20px"
                            starSpacing="0px"
                            numberOfStars={5}
                            name="rating"
                        />
                    </div>
                </div>
                <p className="recommended">
                    <i className="far fa-thumbs-up"></i> I recommend this Lawyer
                </p>
                <p className="comment-content">Coments...</p>
            </div>
        </div>
    );
};
export default LawyerReviews;
