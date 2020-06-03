import React from "react";
import LawyerDashboardSidebar from "./LawyerDashboardSidebar";
import Tab from "react-bootstrap/Tab";

const LawyerDashboard = () => {
    return (
        <div>
            {" "}
            <Tab.Container id="dashboard" defaultActiveKey="first">
                <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                    <LawyerDashboardSidebar />
                </div>
            </Tab.Container>
        </div>
    );
};
export default LawyerDashboard;
