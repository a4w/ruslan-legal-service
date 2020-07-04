import React, {useState, useEffect} from "react";
import BlogList from "./BlogList";
import StickyBox from "react-sticky-box";
import {Router, Switch, Route, withRouter, Link} from "react-router-dom";
import BlogDetails from "./BlogDetails";
import History from "./History";
import {request} from "./Axios";
import queryString from "query-string"
import BlogImg from "./BlogImg";

const Blogs = (props) => {
    const test = [];
    for (let i = 0; i < 10; i++) {
        test.push({id: i});
    }
    const [blogs, setBlogs] = useState(null);
    useEffect(() => {
        let qs = '';
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
                                <Search setBlogs={setBlogs} />
                                <LatestBlogs latest={test} />
                                <Catagories />
                                <TagsList />
                            </StickyBox>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
};

const Search = ({setBlogs}) => {
    const [searchInput, setSearchInput] = useState("");
    const OnChangeHandler = ({target: {value}}) => {
        setSearchInput(value);
    };
    const OnSubmitHandler = (e) => {
        e.preventDefault();
        // On search here will set the new blog list
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

const LatestBlogs = ({latest}) => {
    return (
        <div className="card post-widget">
            <div className="card-header">
                <h4 className="card-title">Latest Posts</h4>
            </div>
            <div className="card-body">
                <LatestBlogList latest={latest} />
            </div>
        </div>
    );
};
const LatestBlogCard = () => {
    return (
        <>
            <div className="post-thumb">
                <BlogImg className="img-fluid" src={null} alt=""/>
            </div>
            <div className="post-info">
                <h4>
                    <a href="//">Title</a>
                </h4>
                <p>Date</p>
            </div>
        </>
    );
};
const LatestBlogList = ({latest}) => {
    return (
        <ul className="latest-posts">
            {latest.map((blog) => (
                <li key={blog.id}>
                    <LatestBlogCard lawer={blog} />
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
