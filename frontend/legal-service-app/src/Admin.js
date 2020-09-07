import React, { useState, useRef, useEffect } from "react";
import "./assets/css/admin.css";
import { Route, NavLink, Switch, Router } from "react-router-dom";
import AdminsLawyersController from "./AdminsLawyersController";
import History from "./History";
import AdminsBlogsController from "./AdminsBlogsController";
import AdminBlogDetails from "./AdminBlogDetails";

const Admin = () => {
    const [sidebarToggle, setToggle] = useState(false);
    const ref = useRef(null);
    const _path = "/admin";

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setToggle(false);
        }
    };

    const handleToggle = () => setToggle(!sidebarToggle);
    return (
        <div className={`main-wrapper ${sidebarToggle ? "slide-nav" : ""}`}>
            <div className="header">
                <div className="header-left">
                    <a href="index.html" className="logo">
                        <b>Lawbe</b>.co.uk
                    </a>
                    <a href="index.html" className="logo logo-small">
                        <b>Lawbe</b>
                    </a>
                </div>
                <a href="" id="toggle_btn">
                    <i className="fe fe-text-align-left"></i>
                </a>
                <a className="mobile_btn" onClick={handleToggle}>
                    <i className="fa fa-bars"></i>
                </a>
            </div>
            <div className="sidebar" id="sidebar" ref={ref}>
                <AdminSidebar close={() => setToggle(false)} _path={_path} />
            </div>
            <Router history={History}>
                <div className="page-wrapper">
                    <div className="content container-fluid">
                        <Switch>
                            <Route path={`${_path}/new-lawyers`}>
                                <AdminsLawyersController />
                            </Route>
                            <Route path={`${_path}/new-blogs`}>
                                <AdminsBlogsController />
                            </Route>
                            <Route
                                path={`${_path}/blog-details/:blogId`}
                                component={AdminBlogDetails}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </div>
    );
};

const AdminSidebar = ({_path, close}) => {
    return (
        <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink to={`${_path}/new-lawyers`} onClick={close}>
                            <span>New lawyers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`${_path}/new-blogs`} onClick={close}>
                            <span>New blogs</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Admin;
