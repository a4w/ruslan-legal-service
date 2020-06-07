import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import EditBasicInfo from "./EditBasicInfo";
import EditLawyerInfo from "./EditLawyerInfo";
import EditEmail from "./EditEmail";
import EditAddress from "./EditAddress";

const EditPersonal = () => {
    return (
        <div className="card">
            <div className="card-body pt-0">
                <Tab.Container id="personal-info" defaultActiveKey="basic-info">
                    <Nav className="user-tabs mb-4">
                        <ul
                            className="nav nav-tabs nav-tabs-bottom nav-justified"
                            style={{ width: "100%" }}
                        >
                            <li className="nav-item">
                                <Nav.Link eventKey="basic-info">Basic</Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link eventKey="lawyer-info">
                                    Lawyer
                                </Nav.Link>
                            </li>
                        </ul>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="basic-info">
                            <EditBasicInfo />
                            <hr></hr>
                            <EditEmail />
                            <hr></hr>
                            <EditAddress />{" "}
                        </Tab.Pane>
                        <Tab.Pane eventKey="lawyer-info">
                            <EditLawyerInfo />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
};

export default EditPersonal;
