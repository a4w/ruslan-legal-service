import React from "react";
import LawyerDashboardSidebar from "./LawyerDashboardSidebar";
import StickyBox from "react-sticky-box";
import LawyerDashboardTabs from "./LawyerDashboardTabs";
import {Router} from "react-router-dom";
import History from "./History";
import {FaBars} from "react-icons/fa";

const LawyerDashboard = () => {
    return (
        <Router history={History}>
            <div className="row">
                <div className="col-12 d-md-none">
                    <button className="btn btn-primary mb-2 sticky-top float-right btn-block" data-toggle="collapse" data-target="#dashboard_nav"><FaBars /></button>
                </div>
                <div className="col-12 col-md-3 col-lg-3 collapse d-md-block" id="dashboard_nav">
                    <StickyBox>
                        <LawyerDashboardSidebar />
                    </StickyBox>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col-12">
                            <LawyerDashboardTabs />
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
};
export default LawyerDashboard;
