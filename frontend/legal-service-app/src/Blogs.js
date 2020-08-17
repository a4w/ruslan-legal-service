import React, {useState, useEffect, useContext} from "react";
import BlogList from "./BlogList";
import StickyBox from "react-sticky-box";
import {Router, Switch, Route, withRouter, Link, Redirect} from "react-router-dom";
import History from "./History";
import queryString from "query-string"
import BlogImg from "./BlogImg";
import moment from "moment";
import PageHead from "./PageHead";
import useRequests from "./useRequests";
import {LoadingOverlayContext} from "./App";
import RoundImg from "./RoundImg";
import BlogDetails from "./BlogDetails";
import LoadingOverlay from "react-loading-overlay";

const Blogs = (props) => {
    const {request} = useRequests();
    const [blogs, setBlogs] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Router history={History}>
            <PageHead
                title="Top blogs written by the best lawyers"
                description="Understand your legal advice now. Enjoy reading a list of the blogs written by the best lawyers from all across the country."
            />

            <div class="breadcrumb-bar">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-md-12 col-12">
                            <nav aria-label="breadcrumb" class="page-breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                                    <li class="breadcrumb-item active">Blog</li>
                                </ol>
                            </nav>
                            <h2 class="breadcrumb-title">Blog List</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <Switch history={History}>
                                <Route exact path="/blogs">
                                    <Redirect replace to="blogs/all" />
                                </Route>
                                <Route
                                    path="/blogs/blog/:blogId"
                                    component={BlogDetails}
                                />
                                <Route
                                    path="/blogs"
                                    render={(props) => (
                                        <BlogGrid
                                            {...props}
                                            blogs={blogs}
                                            isLoading={isLoading}
                                            setIsLoading={setIsLoading}
                                        />
                                    )}
                                />
                            </Switch>
                        </div>
                        <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">
                            <StickyBox offsetTop={85} offsetBottom={20}>
                                <Search />
                                <LatestBlogs />
                                {/* <Catagories /> */}
                                <TagsList />
                            </StickyBox>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
};
const BlogGrid = (props) => {
    const [blogs, setBlogs] = useState(null);
    const {request} = useRequests();
    console.log(History);
    useEffect(() => {
        props.setIsLoading(true);
        const url = History.location.pathname + History.location.search;
        request({url: url, method: "GET"})
            .then((data) => {
                console.log(data);
                setBlogs(data.blogs);
            })
            .catch(() => {})
            .finally(() => {
                props.setIsLoading(false);
            });
    }, [History.location]);
    return (
        <LoadingOverlay active={props.isLoading} spinner text={"Loading"}>
            {blogs && <BlogList {...props} blogs={blogs} />}
        </LoadingOverlay>
    );
};
const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const OnChangeHandler = ({target: {value}}) => {
        setSearchInput(value);
    };
    const OnSubmitHandler = (e) => {
        e.preventDefault();
        History.push({
            pathname: "/blogs/search",
            search: queryString.stringify({term: searchInput}),
        });
    }
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

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState(null);
    const {request} = useRequests();
    useEffect(() => {
        request({url: `/blogs/latest/${3}`, method: "GET"})
            .then((response) => {
                setBlogs(response.blogs);
            })
            .catch((err) => {});
    }, []);
    return (
        <div className="card post-widget">
            <div className="card-header">
                <h4 className="card-title">Latest Posts</h4>
            </div>
            <div className="card-body">
                {blogs && <LatestBlogList latest={blogs} />}
            </div>
        </div>
    );
};
const LatestBlogCard = ({blog}) => {
    return (
        <>
            <div className="post-thumb">
                <RoundImg
                    src={blog.cover_photo_link}
                    alt=""
                    diameter={80}
                />
            </div>
            <div className="post-info">
                <h4>
                    <Link to={`/blogs/blog/${blog.id}`}>{blog.title}</Link>
                </h4>
                <p>{moment(blog.publish_date).format("Do of MMMM, hh:mm a")}</p>
            </div>
        </>
    );
};
const LatestBlogList = ({latest}) => {
    return (
        <ul className="latest-posts">
            {latest.map((blog) => (
                <li key={blog.id}>
                    <LatestBlogCard blog={blog} />
                </li>
            ))}
        </ul>
    );
};
const Catagories = ({cats}) => {
    cats = ["cat 1", "cat 2", "cat 3"];
    return (
        <div className="card category-widget">
            <div className="card-header">
                <h4 className="card-title">Blog Categories</h4>
            </div>
            <div className="card-body">
                <ul className="categories">
                    {cats.map((cat) => (
                        <li key={cat}>
                            <a href="//">
                                {cat} <span>subject num</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const TagsList = () => {
    const [tags, setTags] = useState();
    const {request} = useRequests();
    useEffect(() => {
        request({url: "/lawyer/practice-areas", method: "GET"})
            .then((data) => {
                console.log(data);
                setTags(data.areas);
            })
            .catch(() => {});

    }, []);
    return (
        <div className="card tags-widget">
            <div className="card-header">
                <h4 className="card-title">Tags</h4>
            </div>
            <div className="card-body">
                <ul className="tags">
                    {tags &&
                        tags.map((tag) => (
                            <li key={tag.id}>
                                <Link
                                    to={{
                                        pathname: "/blogs/all",
                                        search: queryString.stringify({
                                            tag: tag.id,
                                        }),
                                    }}
                                    className="tag"
                                >
                                    {tag.area}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};
export default withRouter(Blogs);
