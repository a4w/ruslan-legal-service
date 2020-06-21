import React from "react";
import ClientDashboardSidebar from "./ClientDashboardSidebar";
import StickyBox from "react-sticky-box";
import ClientDashboardTabs from "./ClientDashboardTabs";
import { BrowserRouter } from "react-router-dom";

const ClientDashboard = () => {
    return (
        <BrowserRouter>
            <div className="row">
                <div className="col-md-5 col-lg-4 col-xl-3">
                    <StickyBox offsetTop={20} offsetBottom={20}>
                        <ClientDashboardSidebar />
                    </StickyBox>
                </div>
                <div className="col-md-7 col-lg-8 col-xl-9 mt-4">
                    <ClientDashboardTabs />
                </div>
            </div>
        </BrowserRouter>
    );
};
export default ClientDashboard;
