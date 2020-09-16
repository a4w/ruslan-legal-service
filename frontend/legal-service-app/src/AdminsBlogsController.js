import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useAdminRequest from "./useAdminRequest";

const AdminsBlogsController = () => {
    const [blogs, setBlogs] = useState([]);
    const { request } = useAdminRequest();
    useEffect(() => {
        const url = "admin/blogs?status=UNDER_REVIEW";
        request({ url: url, method: "GET" })
            .then((data) => {
                console.log(data);
                setBlogs(data.blogs);
            })
            .catch(() => {})
            .finally(() => {});
    }, []);
    return <BlogList blogs={blogs} to="/admin/blog-details/" />;
};

export default AdminsBlogsController;
