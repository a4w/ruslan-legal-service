import React from "react";
import LawyerDashboardSidebar from "./LawyerDashboardSidebar";

const LawyerDashboard = () => {
    return (
        <div>
            {" "}
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <LawyerDashboardSidebar />
            </div>
        </div>
    );
};
export default LawyerDashboard;
