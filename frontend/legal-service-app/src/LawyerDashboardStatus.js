import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const LawyerDashboardStatus = () => {
    const appointments = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    return (
        <div className="row">
            <div className="col-12">
                <LawyerStatus />
            </div>
            <div className="col-12">
                <AppointmentsListTabs appointments={appointments} />
            </div>
        </div>
    );
};
const LawyerStatus = () => {
    const date = new Date().toLocaleString("en-GB", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    return (
        <div className="card dash-card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-4">
                        <div className="dash-widget dct-border-rht">
                            <div className="circle-bar circle-bar1">
                                <div
                                    className="circle-graph1"
                                    data-percent="75"
                                >
                                    <div className="img-fluid">ICON</div>
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Total Clients</h6>
                                <h3>Number</h3>
                                <p className="text-muted">Till Today</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="dash-widget dct-border-rht">
                            <div className="circle-bar circle-bar2">
                                <div
                                    className="circle-graph2"
                                    data-percent="65"
                                >
                                    <div className="img-fluid">ICON</div>
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Today Clients</h6>
                                <h3>Number</h3>
                                <p className="text-muted">{date}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="dash-widget">
                            <div className="circle-bar circle-bar3">
                                <div
                                    className="circle-graph3"
                                    data-percent="50"
                                >
                                    <div className="img-fluid">ICON</div>
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Appoinments</h6>
                                <h3>Total</h3>
                                <p className="text-muted">
                                    Date of next session
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const ListItem = () => {
    const [cancel, setCancel] = useState(false);
    const [date, setDate] = useState(null);
    const OnReject = (e) => {
        e.preventDefault();
        setDate(new Date());
        setCancel(true);
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
            <td>{cancel ? "Cancelled" : "Upcoming or Done"}</td>
            <td className="text-center">paid amount</td>
            <td className="text-right">
                <div className="table-action">
                    {cancel === false && (
                        <a
                            href="//"
                            className="btn btn-sm bg-danger-light"
                            onClick={OnReject}
                        >
                            <i className="fas fa-times"></i> Cancel
                        </a>
                    )}
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