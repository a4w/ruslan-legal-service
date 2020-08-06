import React from "react";
import EditBasicInfo from "./EditBasicInfo";
import EditInfo from "./EditInfo";
import EditLawyerInfo from "./EditLawyerInfo";
import EditEmail from "./EditEmail";
import EditAddress from "./EditAddress";
import {Router, Switch, Route, Link, Redirect} from "react-router-dom";
import {NavTab} from "react-router-tabs";
import "./Tabs.css";
import history from "./History";
import LawyerPaymentSettings from "./LawyerPaymentSettings"
import PageHead from "./PageHead";

const EditPersonal = () => {
    const path = "/dashboard/settings";
    // const path = history.location.pathname;
    return (
        <Router history={history}>
            <PageHead
                title={"Edit profile | Lawbe.co.uk"}
                description={"Edit your profile | Lawbe.co.uk"}
            />
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
                            <li>
                                <NavTab
                                    exact
                                    to="/dashboard/settings/payment-settings"
                                >
                                    Payment settings
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
                                {/* <EditBasicInfo /> */}
                                <EditInfo />
                                <hr></hr>
                                <EditEmail />
                                {/* <hr></hr>
                                <EditAddress />{" "} */}
                            </div>
                        </Route>
                        <Route path="/dashboard/settings/lawyer-info">
                            <EditLawyerInfo />
                        </Route>
                        <Route path="/dashboard/settings/payment-settings">
                            <LawyerPaymentSettings />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default EditPersonal;
