import React from "react";
import {Link} from "react-router-dom";
import Img from "./Img";
import BlogImg from "./BlogImg";
import moment from "moment";
import NoContent from "./NoContent";
import RoundImg from "./RoundImg";

const BlogList = ({blogs, editable, col}) => {
    if (blogs)
        return (
            <div className="row blog-grid-row">
                {blogs.length ? (
                    blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} editable={editable} col={col} />
                    ))
                ) : (
                    <NoContent>There ara no published blogs</NoContent>
                )}
            </div>
        );
    else return <Blog />;
};

const ButtonStyle = {
    // position: "absolute",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // msTransform: "translate(-50%, -50%)",
    // padding: "12px 24px",
    // border: "none",
    // cursor: "pointer",
    // borderRadius: "5px",
    // height: "80px",
    position: "absolute",
    padding: "12px 24px",
    border: "medium none",
    cursor: "pointer",
    borderRadius: "5px",
    right: "0",
    bottom: "0"
};

const Blog = ({blog, editable, col=6}) => {
    const {lawyer, id} = {...blog};
    const {account} = {...lawyer};
    return (
        <div className={`col-md-${col} col-sm-12`}>
            <div className="blog grid-blog">
                <div className="blog-image">
                    <Link
                        to={{
                            pathname: `/blogs/blog/${id}`,
                            state: { blog: blog, lawyer: lawyer },
                        }}
                    >
                        <BlogImg
                            src={blog.cover_photo_link}
                            alt="Post Image"
                            className="img-fluid"
                            containerStyle={{
                                height: "210px",
                                maxHeight: "210px",
                            }}
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
                    <h3 className="blog-title">
                        <Link to={`/blogs/blog/${id}`}>{blog.title}</Link>
                    </h3>
                    <ul className="entry-meta meta-item">
                        <li>
                            <div>
                                <Link
                                    to={{
                                        pathname: `/profile/${lawyer.id}`,
                                        state: { lawyer: lawyer },
                                    }}
                                    style={{display: "flex", alignItems: "center"}}
                                >
                                    <RoundImg
                                        src={account.profile_picture}
                                        alt="Post Author"
                                        diameter={28}
                                    />
                                    <span className="ml-3">{`${lawyer.account.name} ${lawyer.account.surname}`}</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-clock"></i>{" "}
                            {moment(blog.publish_date).format("Do of MMM YYYY")}
                        </li>
                    </ul>
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
