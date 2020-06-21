import React from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
    if (blogs)
        return (
            <div className="row blog-grid-row">
                {blogs.map((blog) => (
                    <Blog key={blog.id} id={blog.id} />
                ))}
            </div>
        );
    else return <Blog />;
};

const Blog = ({ id }) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="blog grid-blog">
                <div className="blog-image">
                    <a href="//">Blog cover photo here</a>
                </div>
                <div className="blog-content">
                    <ul className="entry-meta meta-item">
                        <li>
                            <div className="post-author">
                                <a href="//">
                                    Lawyer Photo - <span> - Lawyer Name</span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-clock"></i> publish date
                        </li>
                    </ul>
                    <h3 className="blog-title">
                        <Link to={`/blogs/${id}`}>Title</Link>
                    </h3>
                    <p className="mb-0">Preview</p>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
