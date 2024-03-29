import React, {useEffect, useState} from "react";
import StarRatings from "react-star-ratings";
import moment from "moment";
import Img from "./Img";
import useRequests from "./useRequests";
import NoContent from "./NoContent";
import LoadingOverlay from "react-loading-overlay";

const LawyerReviews = ({lawyer}) => {
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const {request} = useRequests();
    useEffect(() => {
        if (!lawyer)
            request({ url: "/lawyer/me", method: "GET" })
                .then((data) => {
                    setComments(data.lawyer.ratings);
                })
                .catch((err) => {})
                .finally(() => {
                    setLoading(false);
                });
        else setComments(lawyer.ratings);
    }, []);
    return (
        <LoadingOverlay active={loading} spinner text={"Loading"}>
            <ReviewList comments={comments} />
        </LoadingOverlay>
    );
};

const ReviewList = ({comments}) => {
    return (
        <div className="lawyer-review review-listing">
            <ul className="comments-list">
                {comments && comments.length ? (
                    comments.map((comment) => (
                        <li key={comment.id}>
                            <Comment
                                comment={comment}
                                account={comment.appointment.client.account}
                            />
                        </li>
                    ))
                ) : (
                    <NoContent>There are no reviews yet</NoContent>
                )}
            </ul>
        </div>
    );
};
const Comment = ({comment, account = {}}) => {
    const date = moment(comment.created_at).format("MMMM Do YYYY, hh:mm a");

    return (
        <div className="comment">
            <Img
                className="avatar rounded-circle"
                alt="User"
                src={account.profile_picture}
                overwrite={false}
            />
            <div className="comment-body" style={{width: "100%"}}>
                <div className="meta-data">
                    <span className="comment-author">{`${account.name} ${account.surname}`}</span>
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
