import React from "react";
import {Link} from "react-router-dom";
import Img from "./Img";
import BlogImg from "./BlogImg";
import moment from "moment";
import NoContent from "./NoContent";

const BlogList = ({blogs, editable}) => {
    if (blogs)
        return (
            <div className="row blog-grid-row">
                {blogs.length ? (
                    blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} editable={editable} />
                    ))
                ) : (
                    <NoContent>There ara no published blogs</NoContent>
                )}
            </div>
        );
    else return <Blog />;
};

const ButtonStyle = {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    padding: "12px 24px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    height: "80px",
};

const Blog = ({blog, editable}) => {
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
                            className="img-fluid circle-blog-card"
                            src={blog.cover_photo_link}
                            alt="Post Image"
                        />
                    </Link>
                    {editable && 
                        <Link
                            to={`/dashboard/blogs/edit-blog/${id}`}
                            className="btn btn-primary"
                            style={ButtonStyle}
                        >
                            Edit
                        </Link>
                    }
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
                            {moment(blog.publish_date).format("Do of MMMM, hh:mm a")}
                        </li>
                    </ul>
                    <h3 className="blog-title">
                        <Link to={`/blog/${id}`}>{blog.title}</Link>
                    </h3>
                    <ul className="tags mt-2">
                        <li>
                            <a href="#" className="tag">
                                {blog.tag.area}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
