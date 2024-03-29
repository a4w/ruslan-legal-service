import React, {useEffect, useState} from "react";
import {Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {NavTab} from "react-router-tabs";
import "./Tabs.css";
import history from "./History";
import WriteBlog from "./WriteBlog";
import BlogList from "./BlogList";
import useRequests from "./useRequests";
import LoadingOverlay from "react-loading-overlay";

const LawyerBlogs = () => {
    const path = "/dashboard/blogs";
    const [isEditting, setIsEditting] = useState(false);
    // const path = history.location.pathname;
    return (
        <Router history={history}>
            <div className="card">
                <div className="card-body pt-0">
                    <div className="user-tabs mb-4">
                        <ul
                            className="nav nav-tabs nav-tabs-bottom nav-justified"
                            style={{width: "100%"}}
                        >
                            <li>
                                <NavTab exact to={`${path}/my-blogs`}>
                                    My Blogs
                                </NavTab>
                            </li>
                            <li>
                                <NavTab exact to={`${path}/write-blog`}>
                                    Write Blog
                                </NavTab>
                            </li>
                            {isEditting && (
                                <li>
                                    <NavTab to={`${path}/edit-blog/`}>
                                        Edit Blog
                                    </NavTab>
                                </li>
                            )}
                        </ul>
                    </div>

                    <Switch>
                        <Route exact path={path}>
                            <Redirect replace to={`${path}/my-blogs`} />
                        </Route>
                        <Route path={`${path}/my-blogs`}>
                            <Blogs setIsEditting={setIsEditting} />
                        </Route>
                        <Route
                            key={"1"}
                            path={`${path}/edit-blog/:blogId`}
                            render={(props) => (<WriteBlog {...props} setIsEditting={setIsEditting} />)}
                        />
                        <Route
                            key={"2"}
                            path={`${path}/write-blog`}
                            render={(props) => (<WriteBlog {...props} setIsEditting={setIsEditting} />)}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

const Blogs = ({setIsEditting}) => {
    const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const {request} = useRequests();
    useEffect(() => {
        setIsEditting(false);
        request({ url: `/blogs/mine`, method: "GET" })
            .then((data) => {
                console.log(data);
                setBlogs(data.blogs);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    }, []);
    return (
        <LoadingOverlay active={loading} spinner text={"Loading"}>
            {blogs && <BlogList blogs={blogs} editable={true} col={4} />}
        </LoadingOverlay>
    );
}
export default LawyerBlogs;
