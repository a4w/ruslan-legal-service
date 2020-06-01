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
    return <BlogList blogs={blogs} />;
};

export default Blogs;
