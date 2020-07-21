import React, {useState, useEffect} from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import {Router, Route, Link, Redirect, Switch} from "react-router-dom";
import history from "./History";
import {NavTab} from "react-router-tabs";
import {toast} from "react-toastify";
import {FaUser, FaCalendar, FaRegCalendarPlus, FaCalendarCheck} from "react-icons/fa";
import Img from "./Img";
import History from "./History";
import useRequests from "./useRequests";
import bootbox from "bootbox"
import Status from "./Status";

const LawyerDashboardStatus = () => {
    return (
        <div className="row">
            <div className="col-12">
                <LawyerStatus />
            </div>
            <div className="col-12">
                <h4 className="mb-4">Clients Appoinments</h4>
                <div className="appointment-tab">
                    <AppointmentsListTabs />
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
    const [numberOfClients, setNumberOfClients] = useState(0);
    const [numberOfDoneAppointments, setNumberOfDoneAppointments] = useState(0);
    const [numberOfUpcomingAppointments, setNumberOfUpcomingAppointments] = useState(0);
    const [nextAppointmentDate, setNextAppointmentDate] = useState(null);
    const {request} = useRequests();

    useEffect(() => {
        request({
            url: 'account/summary',
            method: 'GET'
        }).then(response => {
            console.log(response);
            setNumberOfClients(response.clients_count);
            setNumberOfDoneAppointments(response.done_appointments_count);
            setNumberOfUpcomingAppointments(response.upcoming_appointments_count);
            setNextAppointmentDate(response.next_appointment_date);
        }).catch(error => {
            console.log(error);
        });
    }, []);

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
                                    <div className="img-fluid"><FaUser /></div>
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Total Clients</h6>
                                <h3>{numberOfClients}</h3>
                                <p className="text-muted">Till today</p>
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
                                    <div className="img-fluid"><FaCalendarCheck /></div>
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Total appointments</h6>
                                <h3>{numberOfDoneAppointments}</h3>
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
                                    <div className="img-fluid"><FaRegCalendarPlus /></div>
                                </div>
                            </div>
                            <div className="dash-widget-info">
                                <h6>Upcoming appointments</h6>
                                <h3>{numberOfUpcomingAppointments}</h3>
                                {nextAppointmentDate !== null && <p className="text-muted">
                                    First on:&nbsp;
                                    <b>{new Date(nextAppointmentDate).toLocaleString()}</b>
                                </p>}
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
    const {request} = useRequests();
    const cancelAppointment = (id) => {
        bootbox.confirm({
            title: 'This will cancel the appointment',
            message: 'Are you sure you would like to cancel ?',
            callback: (result) => {
                if (result) {
                    request({
                        url: `/appointment/${id}/cancel`,
                        method: 'POST'
                    }).then(response => {
                        toast.success("Appointment is cancelled");
                        window.location.reload();
                    }).catch(error => {
                        toast.error("Appointment couldn't be cancelled");
                    });
                } else {}
            }
        });
    };
    return (
        <tr>
            <td>
                <h2 className="table-avatar">
                    <a href="//" className="avatar avatar-sm mr-2">
                        <Img
                            className="avatar-img rounded-circle"
                            src={account.profile_picture}
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
            <td className="text-center">
                <Status appStatus={appointment.status} />
            </td>
            <td className="text-center">{appointment.price}</td>
            <td className="text-right">
                <div className="table-action">
                    {appointment.can_be_started &&
                        <>
                            <Link
                                className="btn btn-sm bg-success-light m-1"
                                to={`/video/${appointment.id}`}
                            >
                                <i className="fas fa-user"></i> Join
                        </Link>
                        </>
                    }
                    {appointment.is_cancellable && (
                        <button
                            className="btn btn-sm bg-danger-light"
                            onClick={() => {cancelAppointment(appointment.id)}}
                        >
                            <i className="fas fa-times"></i> Cancel
                        </button>
                    )}
                    <Link to={`${History.location.pathname}/details/${appointment.id}`} className="btn btn-sm bg-info-light">
                        <i className="far fa-eye"></i> View
                    </Link>
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
                            style={{backgroundColor: "white", display: "block"}}
                        >
                            <tbody style={{width: "100%", display: "table"}}>
                                <tr>
                                    <th>Client Name</th>
                                    <th>Appt Date</th>
                                    <th>Status</th>
                                    <th className="text-center">Paid Amount</th>
                                    <th></th>
                                </tr>
                                {props.children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpcomingAppointments = () => {
    const [upcoming, setUpcoming] = useState([]);
    const {request} = useRequests();
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
            {upcoming && upcoming.length ? (
                upcoming.map((appointment) => (
                    <ListItem key={appointment.id} appointment={appointment} />
                ))
            ) : (
                <NoContentRow>no upcoming appointments</NoContentRow>
            )}
        </AppointmentsTable>
    );
};

const NoContentRow = (props)=>{
    return (
        <tr>
            <td
                colSpan="100%"
                style={{ textAlign: "center", fontSize: "larger" }}
            >
                {props.children}
            </td>
        </tr>
    );
}

const AllAppointments = () => {
    const [all, setAll] = useState(null);
    const {request} = useRequests();
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
            {all && all.length ? (
                all.map((appointment) => (
                    <ListItem key={appointment.id} appointment={appointment} />
                ))
            ) : (
                <NoContentRow>You don't have any appointments yet</NoContentRow>
            )}
        </AppointmentsTable>
    );
};
const AppointmentsListTabs = () => {
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

            <div className="tab-content">
                <Switch>
                    <Route path={`${path}/upcoming`}>
                        <UpcomingAppointments />
                    </Route>
                    <Route path={`${path}/all`}>
                        <AllAppointments />
                    </Route>
                    <Route exact path={path}>
                        <Redirect to={`${path}/upcoming`} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};
export default LawyerDashboardStatus;
export {NoContentRow};