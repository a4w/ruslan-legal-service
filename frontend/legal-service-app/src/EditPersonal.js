import React from "react";
import EditBasicInfo from "./EditBasicInfo";
import EditLawyerInfo from "./EditLawyerInfo";
import EditEmail from "./EditEmail";
import EditAddress from "./EditAddress";
import {Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {NavTab} from "react-router-tabs";
import "./Tabs.css";
import history from "./History";

const EditPersonal = () => {
    const path = "/dashboard/settings";
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
                                <NavTab
                                    exact
                                    to="/dashboard/settings/basic-info"
                                >
                                    Basic
                                </NavTab>
                            </li>
                            <li>
                                <NavTab
                                    exact
                                    to="/dashboard/settings/lawyer-info"
                                >
                                    Lawyer
                                </NavTab>
                            </li>
                        </ul>
                    </div>

                    <Switch>
                        <Route exact path={path}>
                            <Redirect
                                replace
                                to="/dashboard/settings/lawyer-info"
                            />
                        </Route>
                        <Route path="/dashboard/settings/basic-info">
                            <div>
                                <EditBasicInfo />
                                <hr></hr>
                                <EditEmail />
                                <hr></hr>
                                <EditAddress />{" "}
                            </div>
                        </Route>
                        <Route path="/dashboard/settings/lawyer-info">
                            <EditLawyerInfo />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default EditPersonal;
