import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Link, Route, Router, Switch, Redirect } from "react-router-dom";
import History from "./History";
import {NavTab} from "react-router-tabs";
import Img from "./Img";

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
                        <Img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                        />
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
                    {!done && cancel === false ? (
                        <a
                            href="//"
                            className="btn btn-sm bg-danger-light"
                            onClick={OnReject}
                        >
                            <i className="fas fa-times"></i> Cancel
                        </a>
                    ) : (
                        <Link
                            to={`${History.location.pathname}/rate-lawyer/`}
                            className="btn btn-sm bg-primary-light m-1"
                        >
                            <i className="fas fa-star"></i> Rate
                        </Link>
                    )}
                </div>
            </td>
        </tr>
    );
};
const AppointmentsTable = (props) => {
    return (
        <div className="tab-pane" id="upcoming-appointments">
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
const AllAppointments = ({ appointments }) => {
    return (
        <AppointmentsTable>
            {appointments.map((appointment) => (
                <Appointment key={appointment.id} done={true} />
            ))}
        </AppointmentsTable>
    );
};
const AppointmentsListTabs = ({ appointments }) => {
    const path = "/client-dashboard/status";
    // const path = History.location.pathname;
    return (
        <div className="card">
            <div className="card-body pt-0">
                <Router history={History}>
                    <Nav className="user-tabs mb-4">
                        <ul
                            className="nav nav-tabs nav-tabs-bottom nav-justified"
                            style={{ width: "100%" }}
                        >
                            <li className="nav-item">
                                <NavTab to={`${path}/upcoming`}>
                                    Upcoming
                                </NavTab>
                            </li>
                            <li className="nav-item">
                                <NavTab to={`${path}/all`}>
                                    All
                                </NavTab>
                            </li>
                            <li className="nav-item">
                                <NavTab to={`${path}/billing`}>Billing</NavTab>
                            </li>
                        </ul>
                    </Nav>
                    <Switch>
                        <Route exact path={"/client-dashboard/status"}>
                            <Redirect replace to={`${path}/upcoming`} />
                        </Route>
                        <Route path={`${path}/upcoming`}>
                            <UpcomingAppointments appointments={appointments} />
                        </Route>
                        <Route path={`${path}/all`}>
                            <AllAppointments appointments={appointments} />
                        </Route>
                        <Route path={`${path}/billing`}>
                            <Billings billings={appointments} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
};
const Billings = ({ billings }) => {
    return (
        <BillingTable>
            {billings.map((bill) => (
                <BillingTableRow key={bill.id} />
            ))}
        </BillingTable>
    );
};
const BillingTableRow = () => {
    return (
        <tr>
            <td>
                <a href="invoice-view.html">#INV-0010</a>
            </td>
            <td>
                <h2 className="table-avatar">
                    <a
                        href="lawyer-profile.html"
                        className="avatar avatar-sm mr-2"
                    >
                        <Img
                            className="avatar-img rounded-circle"
                            alt="User Image"
                        />
                    </a>
                    <a href="lawyer-profile.html">
                        Lawyer's name <span>Type</span>
                    </a>
                </h2>
            </td>
            <td>Price</td>
            <td>Payment Date</td>
            <td className="text-right">
                <div className="table-action">
                    <button className="btn btn-sm bg-info-light m-1">
                        <i className="far fa-eye"></i> View
                    </button>
                    <button className="btn btn-sm bg-primary-light m-1">
                        <i className="fas fa-print"></i> Print
                    </button>
                </div>
            </td>
        </tr>
    );
};
const BillingTable = (props) => {
    return (
        <div id="pat_billing" className="tab-pane">
            <div className="card card-table mb-0">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-center mb-0">
                            <thead>
                                <tr>
                                    <th>Invoice No</th>
                                    <th>Lawyer</th>
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
