import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const ClientDashboardStatus = () => {
    const appointments = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    return (
        <div className="row">
            <div className="col-12">
                {" "}
                <AppointmentsListTabs appointments={appointments} />{" "}
            </div>
        </div>
    );
};

const Appointment = ({ done }) => {
    const [cancel, setCancel] = useState(false);
    const [status, setStatus] = useState("badge badge-pill bg-warning-light");
    const [date, setDate] = useState(null);
    useEffect(() => {
        if (done) setStatus("badge badge-pill bg-success-light");
    }, []);
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
                        href="lawyer-profile.html"
                        className="avatar avatar-sm mr-2"
                    >
                        {/* <img
                                className="avatar-img rounded-circle"
                                src="assets/img/doctors/lawyer-thumb-01.jpg"
                                alt="User Image"
                            /> */}
                        IMG
                    </a>
                    <a href="lawyer-profile.html">
                        Lawyer's Name <span>Type</span>
                    </a>
                </h2>
            </td>
            <td>
                Appt Date <span className="d-block text-info">Time</span>
            </td>
            <td>Booking Date</td>
            <td>Price</td>
            <td>
                <span
                    className={
                        cancel ? "badge badge-pill bg-danger-light" : status
                    }
                >
                    {cancel ? "Cancelled" : done ? "Done" : "Upcoming"}
                </span>
            </td>
            <td className="text-right">
                <div className="table-action">
                    {!done && cancel === false && (
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
                                    <th>Lawyer</th>
                                    <th>Appt Date</th>
                                    <th>Booking Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
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
                <Appointment key={appointment.id} />
            ))}
        </AppointmentsTable>
    );
};
const PreviousAppointments = ({ appointments }) => {
    return (
        <AppointmentsTable>
            {appointments.map((appointment) => (
                <Appointment key={appointment.id} done={true} />
            ))}
        </AppointmentsTable>
    );
};
const AppointmentsListTabs = ({ appointments }) => {
    return (
        <div className="card">
            <div className="card-body pt-0">
                <Tab.Container
                    id="appointments-dashboard"
                    defaultActiveKey="upcoming"
                >
                    <Nav className="user-tabs mb-4">
                        <ul
                            className="nav nav-tabs nav-tabs-bottom nav-justified"
                            style={{ width: "100%" }}
                        >
                            <li className="nav-item">
                                <Nav.Link eventKey="upcoming">
                                    Upcoming
                                </Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link eventKey="previous">
                                    Previous
                                </Nav.Link>
                            </li>
                            <li className="nav-item">
                                <Nav.Link eventKey="billing">Billing</Nav.Link>
                            </li>
                        </ul>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="upcoming">
                            <UpcomingAppointments appointments={appointments} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="previous">
                            <PreviousAppointments appointments={appointments} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="billing">
                            <BillingTable appointments={appointments} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
};

const BillingTable = (props) => {
    return (
        <div id="pat_billing" class="tab-pane fade">
            <div class="card card-table mb-0">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-center mb-0">
                            <thead>
                                <tr>
                                    <th>Invoice No</th>
                                    <th>Doctor</th>
                                    <th>Amount</th>
                                    <th>Paid On</th>
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
export default ClientDashboardStatus;
