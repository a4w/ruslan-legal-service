import React from "react";
import Tab from "react-bootstrap/Tab";
import EditPassword from "./EditPassword";
import EditPersonal, {Content} from "./EditPersonal";

const LawyerDashboardTabs = () => {
    return (
        <Tab.Content>
            <Tab.Pane eventKey="dashboard">test 1</Tab.Pane>
            <Tab.Pane eventKey="appointments">test 2</Tab.Pane>
            <Tab.Pane eventKey="clients">test 3</Tab.Pane>
            <Tab.Pane eventKey="schedule">test 4</Tab.Pane>
            <Tab.Pane eventKey="invoices">test 5</Tab.Pane>
            <Tab.Pane eventKey="reviews">test 6</Tab.Pane>
            <Tab.Pane eventKey="messages">test 7</Tab.Pane>
            <Tab.Pane eventKey="settings">
                <EditPersonal />
            </Tab.Pane>
            <Tab.Pane eventKey="social-media">test 9</Tab.Pane>
            <Tab.Pane eventKey="change-password">
                <Content>
                    <EditPassword />
                </Content>
            </Tab.Pane>
            <Tab.Pane eventKey="logout">test 11</Tab.Pane>
        </Tab.Content>
    );
};
export default LawyerDashboardTabs;
