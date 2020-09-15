import React from "react";
import BlogDetails from "./BlogDetails";
import StickyBox from "react-sticky-box";
import SpinnerButton from "./SpinnerButton";
import "./AdminBlogDetails.css";
import { useState } from "react";
import useAdminRequest from "./useAdminRequest";
import { toast } from "react-toastify";

const AdminBlogDetails = (props) => {
    const [loading, setLoading] = useState();
    const { request } = useAdminRequest();
    const OnClick = (data) => {
        let url = "";
        setLoading(true);
        request({
            url: `/admin/blog/${props.match.params.blogId}`,
            method: "POST",
            data: { status: data },
        })
            .then((r) => {
                toast.success("Published succefully");
            })
            .catch((e) => {
                toast.error("Error Occurred");
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <>
            <StickyBox offsetTop={85} style={{ zIndex: 99 }}>
                <div className="blog-publish">
                    <SpinnerButton
                        type="button"
                        className="btn btn-sm btn-rounded btn-success mr-2"
                        onClick={() => OnClick("PUBLISHED")}
                        loading={loading}
                    >
                        Publish
                    </SpinnerButton>
                    <SpinnerButton
                        type="button"
                        className="btn btn-sm btn-rounded btn-danger"
                        onClick={() => OnClick("UNDER_REVIEW")}
                        loading={loading}
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
