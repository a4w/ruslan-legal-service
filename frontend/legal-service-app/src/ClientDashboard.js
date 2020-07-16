import React from "react";
import ClientDashboardSidebar from "./ClientDashboardSidebar";
import StickyBox from "react-sticky-box";
import ClientDashboardTabs from "./ClientDashboardTabs";
import {Router} from "react-router-dom";
import History from "./History";
import {FaBars} from "react-icons/fa";
import PageHead from "./PageHead";

const ClientDashboard = () => {
    return (
        <Router history={History}>
            <PageHead
                title={"Edit profile | Lawbe.co.uk"}
                description={"Edit your profile | Lawbe.co.uk"}
            />
            <div className="row">
                <div className="col-12 d-md-none">
                    <button className="btn btn-primary mb-2 sticky-top float-right btn-block" data-toggle="collapse" data-target="#dashboard_nav" style={{zIndex: 0}}><FaBars /></button>
                </div>
                <div className="col-12 col-md-3 col-lg-3 collapse d-md-block" id="dashboard_nav">
                    <StickyBox>
                        <ClientDashboardSidebar />
                    </StickyBox>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col-12">
                            <ClientDashboardTabs />
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
};
export default ClientDashboard;
