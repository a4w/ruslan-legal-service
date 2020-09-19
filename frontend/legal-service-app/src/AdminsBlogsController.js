import React, { useState, useEffect } from "react";
import BlogList from "./BlogList";
import useAdminRequest from "./useAdminRequest";

const AdminsBlogsController = () => {
    const [newBlogs, setNew] = useState([]);
    const [allBlogs, setAll] = useState([]);
    const { request } = useAdminRequest();
    useEffect(() => {
        const url = "/admin/blogs";
        request({ url: url, method: "GET" })
            .then((data) => {
                console.log(data);
                setNew(data.blogs);
                return request({ url: "/blogs/all", method: "GET" });
            })
            .then((data) => {
                console.log(data);
                setAll(data.blogs);
            })
            .catch(() => {})
            .finally(() => {});
    }, []);
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs nav-tabs-solid nav-justified">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="#solid-rounded-justified-tab1"
                                data-toggle="tab"
                            >
                                New Blogs
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#solid-rounded-justified-tab2"
                                data-toggle="tab"
                            >
                                All Blogs
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div
                            className="tab-pane show active"
                            id="solid-rounded-justified-tab1"
                        >
                            <BlogList
                                blogs={newBlogs}
                                to="/admin/blog-details/"
                            />
                        </div>
                        <div
                            className="tab-pane"
                            id="solid-rounded-justified-tab2"
                        >
                            <BlogList
                                blogs={allBlogs}
                                to="/admin/blog-details/"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminsBlogsController;
