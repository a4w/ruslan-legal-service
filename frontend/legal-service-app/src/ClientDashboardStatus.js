import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Link, Route, Router, Switch, Redirect } from "react-router-dom";
import History from "./History";
import {NavTab} from "react-router-tabs";
import Img from "./Img";
import { request } from "./Axios";
import moment from "moment";
import {toast} from "react-toastify";

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

const Appointment = ({
    id,
    lawyer_id,
    appointment_time,
    created_at,
    status,
    price,
    duration,
    is_cancellable,
}) => {
    const [appStatus, setStatus] = useState(
        "badge badge-pill bg-success-light"
    );
    const [lawyer, setLawyer] = useState(null);
    useEffect(() => {
        if (status === "UPCOMING")
            setStatus("badge badge-pill bg-warning-light");
        else if (status === "CANCELLED")
            setStatus("badge badge-pill bg-danger-light");
        request({ url: `lawyer/${lawyer_id}`, method: "GET" })
            .then((data) => {
                setLawyer(data.lawyer);
                console.log(data.lawyer);
            })
            .catch((e) => {});
    }, []);
    const Cancel = (e) => {
        e.preventDefault();
        request({
            url: `/appointment/${id}/cancel`,
            method: "POST",
        })
            .then((response) => {
                toast.success("Appointment is cancelled");
            })
            .catch((error) => {
                toast.error("Appointment couldn't be cancelled");
            });
    };
    return (
        <tr>
            <td>
                {lawyer && (
                    <h2 className="table-avatar">
                        <Link
                            to={`profile/${lawyer_id}`}
                            className="avatar avatar-sm mr-2"
                        >
                            <Img
                                src={lawyer.account.profile_picture}
                                className="avatar-img rounded-circle"
                                alt="User Image"
                            />
                        </Link>
                        <Link to={`profile/${lawyer_id}`}>
                            {`${lawyer.account.name} ${lawyer.account.surname}`}
                            <span>{lawyer.lawyer_type.type}</span>
                        </Link>
                    </h2>
                )}
            </td>
            <td>
                {moment(appointment_time).format("Do MMMM YYYY")}{" "}
                <span className="d-block text-info">
                    {moment(appointment_time).format("hh:mm a")}
                </span>
            </td>
            <td>{moment(created_at).format("Do MMMM YYYY")}</td>
            <td>{`${duration} minutes`}</td>
            <td>{price}</td>
            <td>
                <span className={appStatus}>{status.toLowerCase()}</span>
            </td>
            <td className="text-right">
                <div className="table-action">
                    {is_cancellable && (
                        <a
                            href="//"
                            className="btn btn-sm bg-danger-light"
                            onClick={Cancel}
                        >
                            <i className="fas fa-times"></i> Cancel
                        </a>
                    )}
                    {status === "DONE" && (
                        <Link
                            to={`${History.location.pathname}/rate-lawyer/${id}/${lawyer_id}`}
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
                                    <th>duration</th>
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
const UpcomingAppointments = () => {
    const [upcoming, setUpcoming] = useState([]);
    useEffect(() => {
        request({
            url: "/client/appointments?upcoming=true",
            method: "GET",
        })
            .then((data) => {
                console.log(data);
                setUpcoming(data.appointments);
            })
            .catch(() => {});
    }, []);
    return (
        <AppointmentsTable>
            {upcoming.map((appointment) => (
                <Appointment key={appointment.id} {...appointment} />
            ))}
        </AppointmentsTable>
    );
};
const AllAppointments = () => {
    const [all, setAll] = useState([]);
    useEffect(() => {
        request({
            url: "/client/appointments?upcoming=false",
            method: "GET",
        })
            .then((data) => {
                console.log(data);
                setAll(data.appointments);
            })
            .catch(() => {});
    }, []);
    return (
        <AppointmentsTable>
            {all.map((appointment) => (
                <Appointment key={appointment.id} {...appointment} />
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
