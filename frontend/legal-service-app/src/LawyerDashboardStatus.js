import React, {useState, useEffect} from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import {Router, Route, Link, Redirect, Switch} from "react-router-dom";
import history from "./History";
import {NavTab} from "react-router-tabs";
import {request} from "./Axios";

const LawyerDashboardStatus = () => {
    const init = [
        {
            appointment_time: null,
            client_id: null,
            created_at: null,
            duration: null,
            id: 1,
            lawyer_id: null,
            payment_intent_id: null,
            price: null,
            room_sid: null,
            status: null,
            updated_at: null,
            client: {account: {profile_picture: "", name: "", surname: ""}},
        },
    ];
    return (
        <div className="row">
            <div className="col-12">
                <LawyerStatus />
            </div>
            <div className="col-12">
                <h4 className="mb-4">Clients Appoinments</h4>
                <div className="appointment-tab">
                    <AppointmentsListTabs upcoming={init} all={init} />
                </div>
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
                                <p className="text-muted">Till All</p>
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
                                <h6>All Clients</h6>
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
const ListItem = ({appointment}) => {
    const {client} = {...appointment};
    const {account} = {...client};
    const [cancel, setCancel] = useState(appointment.status === "ON HOLD");
    const appointment_time = new Date(appointment.appointment_time);
    const day = appointment_time.toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const time = appointment_time.toLocaleString("en-GB", {
        hour12: true,
        hour: "numeric",
        minute: "numeric",
    });
    const OnReject = (e) => {
        e.preventDefault();
        setCancel(true);
        // The API cancel Rquest will be sent here
    };
    return (
        <tr>
            <td>
                <h2 className="table-avatar">
                    <a href="//" className="avatar avatar-sm mr-2">
                        <img
                            className="avatar-img rounded-circle"
                            src={
                                account.profile_picture
                                    ? account.profile_picture
                                    : "/avatar.svg"
                            }
                            alt="User"
                        />
                    </a>
                    <a href="//">
                        {account.name + " " + account.surname}
                        <span>{appointment.duration} Minutes</span>
                    </a>
                </h2>
            </td>
            <td>
                {day}
                <span className="d-block text-info">{time}</span>
            </td>
            <td>{cancel ? "CANCELLED" : appointment.status}</td>
            <td className="text-center">{appointment.price}</td>
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
                        <table
                            className="table table-hover table-center mb-0"
                            style={{backgroundColor: "white"}}
                        >
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

const UpcomingAppointments = ({appointments}) => {
    const [upcoming, setUpcoming] = useState(appointments);
    useEffect(() => {
        request({
            url: "/lawyer/appointments?upcoming=true",
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
                <ListItem key={appointment.id} appointment={appointment} />
            ))}
        </AppointmentsTable>
    );
};
const AllAppointments = ({appointments}) => {
    const [all, setAll] = useState(appointments);
    useEffect(() => {
        request({
            url: "/lawyer/appointments?upcoming=false",
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
                <ListItem key={appointment.id} appointment={appointment} />
            ))}
        </AppointmentsTable>
    );
};
const AppointmentsListTabs = ({upcoming, all}) => {
    const path = "/dashboard/status";
    // const path = History.location.pathname;
    return (
        <Router history={history}>
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                <li className="nav-item">
                    <NavTab className="nav-link" to={`${path}/upcoming`}>Upcoming</NavTab>
                </li>
                <li className="nav-item">
                    <NavTab className="nav-link" to={`${path}/all`}>All</NavTab>
                </li>
            </ul>

            <Switch>
                <div className="tab-content">
                    <Route path={`${path}/upcoming`}>
                        <UpcomingAppointments appointments={upcoming} />
                    </Route>
                    <Route path={`${path}/all`}>
                        <AllAppointments appointments={all} />
                    </Route>
                    <Route exact path={path}>
                        <Redirect to={`${path}/upcoming`} />
                    </Route>
                </div>
            </Switch>
        </Router>
    );
};
export default LawyerDashboardStatus;
