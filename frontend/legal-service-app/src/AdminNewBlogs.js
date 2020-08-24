import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useRequests from "./useRequests";

const AdminNewBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const { request } = useRequests();
    useEffect(() => {
        const url = "/blogs/all";
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

export default AdminNewBlogs;