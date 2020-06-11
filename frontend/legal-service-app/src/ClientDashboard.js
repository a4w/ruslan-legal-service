import React from "react";
import ClientDashboardSidebar from "./ClientDashboardSidebar";
import StickyBox from "react-sticky-box";
import Tab from "react-bootstrap/Tab";
import ClientDashboardTabs from "./ClientDashboardTabs";

const ClientDashboard = () => {
    return (
        <div className="row">
            {" "}
            <Tab.Container id="client-dashboard" defaultActiveKey="dashboard">
                <div className="col-md-5 col-lg-4 col-xl-3">
                    <StickyBox offsetTop={20} offsetBottom={20}>
                        <ClientDashboardSidebar />
                    </StickyBox>
                </div>
                <div className="col-md-7 col-lg-8 col-xl-9">
                    <ClientDashboardTabs />
                </div>
            </Tab.Container>
        </div>
    );
};
export default ClientDashboard;
