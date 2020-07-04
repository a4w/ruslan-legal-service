import React, {useState, useEffect} from "react";
import BlogList from "./BlogList";
import StickyBox from "react-sticky-box";
import {Router, Switch, Route, withRouter, Link} from "react-router-dom";
import BlogDetails from "./BlogDetails";
import History from "./History";
import {request} from "./Axios";
import queryString from "query-string"
import BlogImg from "./BlogImg";
import moment from "moment";

const Blogs = (props) => {
    const [blogs, setBlogs] = useState(null);
    const [search, setSearch] = useState();
    
    useEffect(() => {
        setSearch(queryString.parse(props.location.search));
        
    },[props.location.search]);

    useEffect(() => {
        let qs = '';
        
        console.log(props.match);
        
        if (props.match.params.tag) {
            qs = `?tag=${props.match.params.tag}`;
        }
        request({url: "/blogs/all" + qs, method: "GET"})
            .then((data) => {
                console.log(data);
                setBlogs(data.blogs);
            })
            .catch(() => {});
    }, []);
    return (
        <Router history={History}>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            {blogs && <BlogList blogs={blogs} />}
                        </div>
                        <div className="col-lg-4 col-md-12 sidebar-right theiaStickySidebar">
                            <StickyBox offsetTop={20} offsetBottom={20}>
                                <Search/>
                                <LatestBlogs/>
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

const Search = () => {
    const [searchInput, setSearchInput] = useState("");
    const OnChangeHandler = ({target: {value}}) => {
        setSearchInput(value);
    };
    const OnSubmitHandler = (e) => {
        e.preventDefault();
        History.push({
            pathname: '/blogs',
            search: (searchInput !== '') ? `?search=${searchInput.replace(/\s/g,'+')}` : '',
        })
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

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState(null);
    useEffect(() => {
        request({ url: `/blogs/latest/${3}`, method: "GET" })
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
                <BlogImg
                    className="img-fluid"
                    src={blog.cover_photo_link}
                    alt=""
                />
            </div>
            <div className="post-info">
                <h4>
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
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
                    {tags && tags.map((tag) => (
                        <li key={tag.id}>
                            <Link to={`/blogs/${tag.id}`} className="tag">
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
