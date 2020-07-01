import React from "react";
import {Link} from "react-router-dom";

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
        <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="blog grid-blog">
                <div className="blog-image">
                    <Link
                        to={{
                            pathname: `/blogs/${id}`,
                            state: {blog: blog, lawyer: lawyer},
                        }}
                    >
                        <img className="img-fluid" src={blog.cover_photo_link} alt="Post Image" />
                    </Link>
                </div>
                <div className="blog-content">
                    <ul className="entry-meta meta-item">
                        <li>
                            <div className="post-author">
                                <Link
                                    to={{
                                        pathname: `/profile/${lawyer.id}`,
                                        state: {lawyer: lawyer},
                                    }}
                                >
                                    <img src={account.profile_picture ? account.profile_picture : "/test.jpg"} alt="Post Author" style={{width: '30px', height: '30px'}} />
                                    <span>{`${lawyer.account.name} ${lawyer.account.surname}`}</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-clock"></i> {new Date(blog.created_at).toLocaleTimeString()}
                        </li>
                    </ul>
                    <h3 className="blog-title">
                        <Link to={`/blogs/${id}`}>{blog.title}</Link>
                    </h3>
                    <p className="mb-0">Preview</p>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
