import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const LawyerDashboardStatus = () => {
    const appointments = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    return <AppointmentsListTabs appointments={appointments} />;
};

const ListItem = () => {
    const [cancel, setCancel] = useState(false);
    const [date, setDate] = useState(null);
    const OnReject = () => {
        setDate(new Date());
        setCancel(false);
        // The API cancel Rquest will be sent here
    };
    return (
        <tr>
            <td>
                <h2 className="table-avatar">
                    <a
                        href="client-profile.html"
                        className="avatar avatar-sm mr-2"
                    >
                        Img
                    </a>
                    <a href="//">Name </a>
                </h2>
            </td>
            <td>
                Session date{" "}
                <span className="d-block text-info">Session time</span>
            </td>
            <td>{cancel ? "Rejected" : "Upcoming or Done"}</td>
            <td className="text-center">paid amount</td>
            <td className="text-right">
                <div className="table-action">
                    <a
                        href="//"
                        className="btn btn-sm bg-danger-light"
                        onClick={OnReject}
                    >
                        <i className="fas fa-times"></i> Cancel
                    </a>
                </div>
            </td>
        </tr>
    );
};
const AppointmentsTable = (props) => {
    return (
        <div className="tab-pane show active" id="upcoming-appointments">
            <div className="card card-table mb-0">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                            <thead>
                                <tr>
                                    <th>Client Name</th>
                                    <th>Appt Date</th>
                                    <th>Status</th>
                                    <th className="text-center">Paid Amount</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{props.children}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpcomingAppointments = ({ appointments }) => {
    return (
        <AppointmentsTable>
            {appointments.map((appointment) => (
                <ListItem key={appointment.id} />
            ))}
        </AppointmentsTable>
    );
};
const TodayAppointments = ({ appointments }) => {
    return (
        <AppointmentsTable>
            {appointments.map((appointment) => (
                <ListItem key={appointment.id} />
            ))}
        </AppointmentsTable>
    );
};
const AppointmentsListTabs = ({ appointments }) => {
    return (
        <Tab.Container id="appointments-dashboard" defaultActiveKey="today">
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                <Nav className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                    <li className="nav-item">
                        <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
                    </li>
                    <li className="nav-item">
                        <Nav.Link eventKey="today">Today</Nav.Link>
                    </li>
                </Nav>
            </ul>

            <Tab.Content>
                <Tab.Pane eventKey="upcoming">
                    <UpcomingAppointments appointments={appointments} />
                </Tab.Pane>
                <Tab.Pane eventKey="today">
                    <TodayAppointments appointments={appointments} />
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
};
export default LawyerDashboardStatus;
