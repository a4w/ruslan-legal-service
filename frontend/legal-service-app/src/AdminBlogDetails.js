import React from "react";
import BlogDetails from "./BlogDetails";
import StickyBox from "react-sticky-box";
import SpinnerButton from "./SpinnerButton";
import "./AdminBlogDetails.css";

const AdminBlogDetails = (props) => {
    return (
        <>
            <StickyBox offsetTop={85} style={{ zIndex: 99 }}>
                <div className="blog-publish">
                    <SpinnerButton
                        type="button"
                        className="btn btn-sm btn-rounded btn-success mr-2"
                    >
                        Publish
                    </SpinnerButton>
                    <SpinnerButton
                        type="button"
                        className="btn btn-sm btn-rounded btn-danger"
                    >
                        Reject
                    </SpinnerButton>
                </div>
            </StickyBox>
            <BlogDetails {...props} />
        </>
    );
};

export default AdminBlogDetails;
