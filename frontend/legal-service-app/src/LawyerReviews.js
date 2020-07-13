import React, {useEffect, useState} from "react";
import StarRatings from "react-star-ratings";
import moment from "moment";
import Img from "./Img";
import useRequests from "./useRequests";

const LawyerReviews = ({lawyer}) => {
    const [comments, setComments] = useState(null);
    const {request} = useRequests();
    useEffect(() => {
        if (!lawyer)
            request({url: "/lawyer/me", method: "GET"})
                .then((data) => {
                    setComments(data.lawyer.ratings);
                })
                .catch((err) => {});
        else setComments(lawyer.ratings);
    }, []);
    return <ReviewList comments={comments} />;
};

const ReviewList = ({comments}) => {
    return (
        <div className="lawyer-review review-listing">
            <ul className="comments-list">
                {comments && comments.map((comment) => (
                    <li key={comment.id}>
                        <Comment comment={comment} account={comment.appointment.client.account} />
                    </li>
                ))}
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
