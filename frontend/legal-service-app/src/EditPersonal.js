import React from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import EditBasicInfo from "./EditBasicInfo";
import EditLawyerInfo from "./EditLawyerInfo";

const EditPersonal = () => {
    return (
        <Tab.Container id="personal-info" defaultActiveKey="peronal-info">
            <div className="row">
                <div className="col-lg-3 col-md-2 col-sm-12">
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="peronal-info">Personal Info</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="lawyer-info">Lawyer Info</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="col-lg-9 col-md-10 col-sm-12">
                    <Tab.Content>
                        <Tab.Pane eventKey="peronal-info">
                            <Content>
                                <EditBasicInfo />
                            </Content>
                        </Tab.Pane>
                        <Tab.Pane eventKey="lawyer-info">
                            <Content>
                                <EditLawyerInfo />
                            </Content>
                        </Tab.Pane>
                    </Tab.Content>
                </div>
            </div>
        </Tab.Container>
    );
};
const Content = (props) => {
    return (
        <div className="align-items-center justify-content-center m-1">
            <div className="tab-form">{props.children}</div>
        </div>
    );
};
export default EditPersonal;
export {Content};
