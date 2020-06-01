import React from "react";

const BlogList = ({ blogs }) => {
    if (blogs) return blogs.map((blog) => <Blog key={blog.id} lawer={blog} />);
    else return <Blog />;
};

const Blog = () => {
    return <div>blog</div>;
};

export default BlogList;
