import React from "react";
import LawyerDashboardSidebar from "./LawyerDashboardSidebar";
import StickyBox from "react-sticky-box";
import LawyerDashboardTabs from "./LawyerDashboardTabs";
import { BrowserRouter } from "react-router-dom";

const LawyerDashboard = () => {
    return (
        <BrowserRouter>
            <div className="row">
                <div className="col-md-5 col-lg-4 col-xl-3">
                    <StickyBox offsetTop={20} offsetBottom={20}>
                        <LawyerDashboardSidebar />
                    </StickyBox>
                </div>
                <div className="col-md-7 col-lg-8 col-xl-9 mt-4">
                    <LawyerDashboardTabs />
                </div>
            </div>
        </BrowserRouter>
    );
};
export default LawyerDashboard;
