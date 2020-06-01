import React, { useState } from "react";
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
                <Search />
                <LatestBlogs latest={blogs} />
            </div>
        </div>
    );
};

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const OnChangeHandler = ({ target: { value } }) => {
        setSearchInput(value);
    };
    const OnSubmitHandler = (e) => {
        e.preventDefault();
    };
    return (
        <div className="card search-widget">
            <div className="card-body">
                <form className="search-form" onSubmit={OnSubmitHandler}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            value={searchInput}
                            name="searchInput"
                            onChange={OnChangeHandler}
                        />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LatestBlogs = ({ latest }) => {
    return (
        <div className="card post-widget">
            <div className="card-header">
                <h4 className="card-title">Latest Posts</h4>
            </div>
            <div className="card-body">
                <LatestBlogList latest={latest} />
            </div>
        </div>
    );
};
const LatestBlogCard = () => {
    return (
        <>
            <div className="post-thumb">
                <a href="blog-details.html">Thumbnail</a>
            </div>
            <div className="post-info">
                <h4>
                    <a href="blog-details.html">Title</a>
                </h4>
                <p>Date</p>
            </div>
        </>
    );
};
const LatestBlogList = ({ latest }) => {
    return (
        <ul className="latest-posts">
            <li>
                {latest.map((blog) => (
                    <LatestBlogCard key={blog.id} lawer={blog} />
                ))}
            </li>
        </ul>
    );
};
export default Blogs;
