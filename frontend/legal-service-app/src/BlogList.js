import React from "react";
import {Link} from "react-router-dom";
import Img from "./Img";
import BlogImg from "./BlogImg";

const BlogList = ({blogs}) => {
    if (blogs)
        return (
            <div className="row blog-grid-row">
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        );
    else return <Blog />;
};

const Blog = ({blog}) => {
    const {lawyer, id} = {...blog};
    const {account} = {...lawyer};
    return (
        <div className="col-md-6 col-sm-12">
            <div className="blog grid-blog">
                <div className="blog-image">
                    <Link
                        to={{
                            pathname: `/blog/${id}`,
                            state: { blog: blog, lawyer: lawyer },
                        }}
                    >
                        <BlogImg
                            className="img-fluid"
                            src={blog.cover_photo_link}
                            alt="Post Image"
                        />
                    </Link>
                </div>
                <div className="blog-content">
                    <ul className="entry-meta meta-item">
                        <li>
                            <div className="post-author">
                                <Link
                                    to={{
                                        pathname: `/profile/${lawyer.id}`,
                                        state: { lawyer: lawyer },
                                    }}
                                >
                                    <Img
                                        src={account.profile_picture}
                                        alt="Post Author"
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                    <span>{`${lawyer.account.name} ${lawyer.account.surname}`}</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-clock"></i>{" "}
                            {new Date(blog.created_at).toLocaleTimeString()}
                        </li>
                    </ul>
                    <h3 className="blog-title">
                        <Link to={`/blog/${id}`}>{blog.title}</Link>
                    </h3>
                    <p className="mb-0">
                        <ul className="tags">
                            <li>
                                <a href="#" className="tag">
                                    {blog.tag.area}
                                </a>
                            </li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
