import React from "react";
import BlogList from "./BlogList";

const Blogs = () => {
    const blogs = [
        {
            id: "1",
        },
        {
            id: "2",
        },
        {
            id: "3",
        },
        {
            id: "4",
        },
        {
            id: "5",
        },
    ];
    return (
        <div className="row">
            <div className="col-lg-8 col-md-12">
                <BlogList blogs={blogs} />
            </div>
            <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">
                sideBar
            </div>
        </div>
    );
};

export default Blogs;
