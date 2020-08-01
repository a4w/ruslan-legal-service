import React, {useState, useEffect, useRef} from "react";
import History from "./History";
import {Link} from "react-router-dom";
import Stackedit from "stackedit-js";
import BlogImg from "./BlogImg";
import Img from "./Img";
import {Twitter, Facebook, Linkedin, Google} from 'react-social-sharing'
import PageHead from "./PageHead";
import useRequests from "./useRequests";
import env from "./env";
import RoundImg from "./RoundImg";


const BlogDetails = ({match}) => {
    const [lawyer, setLawyer] = useState(null);
    const [blog, setBlog] = useState(null);
    const {request} = useRequests();
    console.log(match);
    useEffect(() => {
        request({
            url: `/blogs/${match.params.blogId}`,
            method: 'GET'
        }).then(response => {
            setLawyer(response.blog.lawyer);
            setBlog(response.blog);
        }).catch(error => {
            console.error("Error occurred loading blog post");
        });
    }, []);
    return (
        <>
            <PageHead
                title={blog !== null && blog.title}
                description={blog !== null && blog.body.substr(0, 128)}
            />
            <div className="container">
                <div className="row">
                    <div className="col-12">

                        <div className="blog-view">
                            {blog && <Post blog={blog} lawyer={lawyer} />}
                            <ShareSection id={match.params.blogId} />
                            {lawyer && <AboutAuthor lawyer={lawyer} />}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
const AboutAuthor = ({lawyer}) => {
    const {account} = {...lawyer};
    return (
        <div className="card author-widget clearfix">
            <div className="card-header">
                <h4 className="card-title">About Author</h4>
            </div>
            <div className="card-body">
                <div className="about-author">
                    <div className="about-author-img">
                        <div className="author-img-wrap">
                            <Link
                                to={{
                                    pathname: `/profile/${lawyer.id}`,
                                    state: {lawyer: lawyer},
                                }}
                            >
                                <RoundImg
                                    alt="Author"
                                    src={account.profile_picture}
                                    diameter={60}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="author-details">
                        <Link
                            className="blog-author-name"
                            to={{
                                pathname: `/profile/${lawyer.id}`,
                                state: {lawyer: lawyer},
                            }}
                        >
                            {`${lawyer.account.name} ${lawyer.account.surname}`}
                        </Link>
                        <p className="mb-0">{lawyer.biography}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
const ShareSection = ({id}) => {
    const url = env.url + History.location.pathname
    return (
        <div className="card blog-share clearfix">
            <div className="card-header">
                <h4 className="card-title">Share the post</h4>
            </div>
            <div className="card-body">
                <Facebook small circle solid link={url} />
                <Twitter small circle solid link={url} />
                <Linkedin small circle solid link={url} />
                <Google small circle solid link={url} />
            </div>
        </div>
    );
};
const Post = ({blog, lawyer}) => {
    const {account} = {...lawyer};
    const loaderStackEdit = new Stackedit();
    const md_preview = useRef(null);

    useEffect(() => {
        loaderStackEdit.openFile({
            name: "blog details",
            content: {
                text: blog.body
            }
        }, true);
        loaderStackEdit.on("fileChange", (file) => {
            if (md_preview.current) {
                md_preview.current.innerHTML = file.content.html;
            }
        });
    }, []);
    return (
        <div className="blog blog-single-post">
            <div className="blog-image">
                <BlogImg alt="" src={blog.cover_photo_link} style={{
                    maxHeight: '400px',
                    display: 'block',
                    margin: 'auto'
                }} className="img-fluid" />
            </div>
            <h3 className="blog-title">{blog.title}</h3>
            <div className="blog-info clearfix">
                <div className="post-left">
                    <ul>
                        <li>
                            <div className="post-author">
                                <Link
                                    to={{
                                        pathname: `/profile/${lawyer.id}`,
                                        state: {lawyer: lawyer},
                                    }}
                                >
                                    <RoundImg
                                        src={account.profile_picture}
                                        alt="Post Author"
                                        diameter={40}
                                    />
                                    <span>&nbsp;{`${lawyer.account.name} ${lawyer.account.surname}`}</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <i className="far fa-calendar"></i>
                            {new Date(blog.created_at).toLocaleTimeString()}
                        </li>
                        <li>
                            <i className="fa fa-tags"></i> {blog.tag.area}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="blog-content" ref={md_preview}></div>
        </div>
    );
};
export default BlogDetails;
