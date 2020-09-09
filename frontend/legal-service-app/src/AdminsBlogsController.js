import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useRequests from "./useRequests";

const AdminsBlogsController = () => {
    const [blogs, setBlogs] = useState([]);
    const { request } = useRequests();
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
