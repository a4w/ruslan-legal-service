import React from "react";
import LawyerDashboardSidebar from "./LawyerDashboardSidebar";
import StickyBox from "react-sticky-box";
import Tab from "react-bootstrap/Tab";
import LawyerDashboardTabs from "./LawyerDashboardTabs";

const LawyerDashboard = () => {
    return (
        <div className="row">
            {" "}
            <Tab.Container id="dashboard" defaultActiveKey="reviews">
                <div className="col-md-5 col-lg-4 col-xl-3">
                    <StickyBox offsetTop={20} offsetBottom={20}>
                        <LawyerDashboardSidebar />
                    </StickyBox>
                </div>
                <div className="col-md-7 col-lg-8 col-xl-9">
                    <LawyerDashboardTabs />
                </div>
            </Tab.Container>
        </div>
    );
};
export default LawyerDashboard;
