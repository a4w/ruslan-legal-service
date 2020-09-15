import React, {useState, useEffect, useRef, useContext} from "react";
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
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import Slider from "react-slick";
import {BlogCard} from "./Home";
import {Blog} from "./BlogList";
import {LoadingOverlayContext} from "./App";
import {AuthContext} from "./App"

const BlogDetails = ({match}) => {
    const [lawyer, setLawyer] = useState(null);
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {request} = useRequests();
    const [auth,] = useContext(AuthContext);

    console.log(match);
    useEffect(() => {
        setIsLoading(true);
        let url = `/blogs/${match.params.blogId}`;
        if (auth.accountType === "ADMIN")
            url = `/admin/blog/${match.params.blogId}`;
        request({
            url: url,
            method: "GET",
        }).then((response) => {
            setLawyer(response.blog.lawyer);
            setBlog(response.blog);
        }).catch(() => {
             console.error("Error occurred loading blog post");
        }).finally(() => {
            setIsLoading(false);
        });
    }, [match.params.blogId]);
    return (
        <LoadingOverlay active={isLoading} spinner text={"Loading"}>
            <PageHead
                title={blog !== null && blog.title}
                description={blog !== null && blog.body.substr(0, 128)}
            />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="blog-view">
                            {blog && <Post blog={blog} lawyer={lawyer} />}
                            {blog && <ShareSection id={match.params.blogId} />}
                            {lawyer && <AboutAuthor lawyer={lawyer} />}
                            {lawyer && <OtherBlogs lawyer={lawyer} />}
                        </div>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    );
};
const AboutAuthor = ({lawyer}) => {
    const {account} = {...lawyer};
    return (
        <div className="card author-widget clearfix">
            <div className="card-header">
                <h4 className="card-title">About Author</h4>
            </div>
            <div className="card-body" style={{display: "flex"}}>
                <div className="about-author" style={{display: "flex"}}>
                    <div className="about-author-img">
                        <div className="author-img-wrap" style={{display: "flex", justifyContent: "center"}}>
                            <Link
                                to={{
                                    pathname: `/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`,
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
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="author-details">
                                <Link
                                    className="blog-author-name"
                                    to={{
                                        pathname: `/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`,
                                        state: {lawyer: lawyer},
                                    }}
                                >
                                    {`${lawyer.account.name} ${lawyer.account.surname}`}
                                </Link>
                                <p className="lawyer-bio mb-0">{lawyer.biography}</p>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="session-booking p-3">
                                <Link
                                    className="view-pro-btn"
                                    to={{
                                        pathname: `/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`,
                                        state: {lawyer: lawyer},
                                    }}
                                >
                                    View Profile
                        </Link>


                                <Link
                                    className="apt-btn"
                                    to={{
                                        pathname: `${History.location.pathname}/book-lawyer/${lawyer.id}`,
                                    }}
                                >
                                    Book Appointment
                        </Link>
                            </div>

                        </div>
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
    const loader = useContext(LoadingOverlayContext);

    useEffect(() => {
        loaderStackEdit.openFile({
            name: "blog details",
            content: {
                text: blog.body
            }
        }, true);
        loaderStackEdit.on("fileChange", (file) => {
            if (md_preview.current) {
                loader.setIsLoadingOverlayShown(false);
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
                            <div className="post-author-2">
                                <Link
                                    to={{
                                        pathname: `/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`,
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
                            {moment(new Date(blog.publish_date)).format("Do of MMMM, hh:mm a")}
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
var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};
const OtherBlogs = ({lawyer}) => {
    const [blogs, setBlogs] = useState(null);
    const {request} = useRequests();
    useEffect(() => {
        request({url: `/blogs/lawyer/${lawyer.id}`, method: "GET"})
            .then((data) => {
                console.log(data);
                setBlogs(data.blogs);
            })
            .catch(() => {});
    }, []);
    return (
        <div className="card author-widget clearfix">
            <div className="card-header">
                <h4 className="card-title">Other blogs by this author</h4>
            </div>
            <div className="card-body">
                <div className="lawyer-slider slider">

                    <Slider {...settings}>
                        {blogs &&
                            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
                    </Slider>
                </div>
            </div>
        </div>
    );
};
export default BlogDetails;
