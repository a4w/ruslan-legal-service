import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import Img from "./Img";
import useRequests from "./useRequests";

const LawyerAppointments = () => {
    const [appointments, setAppointments] = useState();
    const {request} = useRequests();
    useEffect(() => {
        request({url: "/lawyer/appointments", method: "GET"})
            .then((data) => {
                setAppointments(data.appointments);
            })
            .catch((err) => {});
    }, []);
    return (
        <div className="appointments">
            {appointments && appointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </div>
    );
};
const AppointmentCard = ({appointment}) => {
    // const [viewDetails, setView] = useState(false);
    const {client} = {...appointment};
    const {account} = {...client};
    const appointment_time = new Date(appointment.appointment_time);
    const {request} = useRequests();
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
    const [date, setDate] = useState(null);
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
                    }).catch(error => {
                        toast.error("Appointment couldn't be cancelled");
                    });
                } else {}
            }
        });
    };
    // const show = () => {
    //     setView(true);
    // };
    // const hide = () => {
    //     setView(false);
    // };
    const imgStyle = {
        borderRadius: "4px",
        height: "155px",
        objectFit: "cover",
        width: "155px",
    };
    return (
        <div className="appointment-list">
            <div className="profile-info-widget">
                <a href="//" className="booking-lawyer-img">
                    <Img
                        style={imgStyle}
                        src={account.profile_picture}
                        alt="User"
                    />
                </a>
                <div className="profile-det-info">
                    <h3>
                        <a href="//">{account.name + " " + account.surname}</a>
                    </h3>
                    <div className="appointment-details">
                        <span className="detail">
                            <i className="far fa-calendar-alt"></i>{" "}
                            {day + " at: " + time}
                        </span>
                        <span className="detail">
                            <i className="far fa-clock"></i>{" "}
                            {appointment.duration}
                        </span>
                        {(account.cite || account.country) && <span className="detail">
                            <i className="fas fa-map-marker-alt"></i>{" "}
                            {(account.city !== null ? account.city : '-') + ", " + (account.country !== null ? account.country : '-')}
                        </span>}
                        <span className="detail">
                            <i className="fas fa-envelope"></i> {account.email}
                        </span>
                        <span className="detail">
                            <i className="fas fa-phone"></i> {account.phone}
                        </span>
                    </div>
                </div>
            </div>
            <div className="appointment-action">
                {/* <button className="btn btn-sm bg-info-light m-1" onClick={show}>
                    <i className="far fa-eye"></i> View
                    <AppointmentDetails show={viewDetails} onHide={hide} />
                </button> */}
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
                    <>
                        <button
                            className="btn btn-sm bg-danger-light m-1"
                            onClick={() => {cancelAppointment(appointment.id)}}
                        >
                            <i className="fas fa-times"></i> Cancel
                        </button>
                    </>
                )}
            </div>
        </div >
    );
};

const AppointmentDetails = (props) => {
    return (
        <Modal
            {...props}
            backdrop="true"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Appointment Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="info-details">
                    <li>
                        <div className="details-header">
                            <div className="row">
                                <div className="col-md-6">
                                    <span className="title">
                                        Appointment number
                                    </span>
                                    <span className="text">Date</span>
                                </div>
                                <div className="col-md-6">
                                    <div className="text-right">
                                        <button className="btn bg-success-light btn-sm">
                                            status
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="title">Status:</span>
                        <span className="text">Completed</span>
                    </li>
                    <li>
                        <span className="title">Confirm Date:</span>
                        <span className="text">...</span>
                    </li>
                    <li>
                        <span className="title">Paid Amount</span>
                        <span className="text">$...</span>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
    );
};

export default LawyerAppointments;
