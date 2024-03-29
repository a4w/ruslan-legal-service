import React from "react";
import {Link} from "react-router-dom";
import Img from "./Img";
import BlogImg from "./BlogImg";
import moment from "moment";
import NoContent from "./NoContent";
import RoundImg from "./RoundImg";
import queryString from "query-string"

const BlogList = ({blogs, editable, col, to}) => {
    if (blogs)
        return (
            <div className="row blog-grid-row">
                {blogs.length ? (
                    blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} editable={editable} col={col} to={to} />
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

const Blog = ({blog, editable, col = 6, to = "/blogs/blog/"}) => {
    const {lawyer, id} = {...blog};
    const {account} = {...lawyer};
    return (
        <div className={`col-md-${col} col-sm-12`}>
            <div className="blog grid-blog">
                <div className="blog-image">
                    <Link
                        to={{
                            pathname: `${to}${id}`,
                            state: {blog: blog, lawyer: lawyer},
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
                    <ul className="entry-meta meta-item" style={{display: 'flex'}}>
                        <li>
                            <div>
                                <Link
                                    to={{
                                        pathname: `/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`,
                                        state: {lawyer: lawyer},
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
                        <li style={{display: 'inline', maxWidth: 'unset', width: 'unset', flex: '0 0 auto'}}>
                            <i className="far fa-clock"></i>{" "}
                            {moment(blog.publish_date).format("D MMM YYYY")}
                        </li>
                    </ul>
                    <h3 className="blog-title">
                        <Link to={`${to}${id}`}>{blog.title}</Link>
                    </h3>
                    <ul className="tags mt-2">
                        <li>
                            <Link
                                to={{
                                    pathname: "/blogs/all",
                                    search: queryString.stringify({
                                        tag: blog.tag.id,
                                    }),
                                }}
                                className="tag"
                            >
                                {blog.tag.area}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
export {Blog};
