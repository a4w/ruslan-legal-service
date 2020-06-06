import React from "react";
import Tab from "react-bootstrap/Tab";
import EditPassword from "./EditPassword";
import EditPersonal, { Content } from "./EditPersonal";
import ClientDashboardStatus from "./ClientDashboardStatus";

const ClientDashboardTabs = () => {
    return (
        <Tab.Content>
            <Tab.Pane eventKey="dashboard">
                <ClientDashboardStatus />
            </Tab.Pane>
            <Tab.Pane eventKey="messages">test</Tab.Pane>
            <Tab.Pane eventKey="settings">test</Tab.Pane>
            <Tab.Pane eventKey="change-password">
                <Content>
                    <EditPassword />
                </Content>
            </Tab.Pane>
            <Tab.Pane eventKey="logout">test</Tab.Pane>
        </Tab.Content>
    );
};
export default ClientDashboardTabs;
