import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const LawyerAppointments = () => {
    return (
        <div className="appointments">
            <AppointmentCard />
        </div>
    );
};
const AppointmentCard = () => {
    const [viewDetails, setView] = useState(false);
    const [accepted, setAccepted] = useState(null);
    const [date, setDate] = useState(null);
    const OnAccept = () => {
        setDate(new Date());
        setAccepted(true);
    };
    const OnReject = () => {
        setDate(new Date());
        setAccepted(false);
    };
    const show = () => {
        setView(true);
    };
    const hide = () => {
        setView(false);
    };
    return (
        <div className="appointment-list">
            <div className="profile-info-widget">
                <a href="//" className="booking-lawyer-img">
                    Client Photo
                </a>
                <div className="profile-det-info">
                    <h3>
                        <a href="//">Client Name</a>
                    </h3>
                    <div className="client-details">
                        <h5>
                            <i className="far fa-clock"></i> Session Time & Date
                        </h5>
                        <h5>
                            <i className="fas fa-map-marker-alt"></i> City,
                            Country
                        </h5>
                        <h5>
                            <i className="fas fa-envelope"></i> Email
                        </h5>
                        <h5>
                            <i className="fas fa-phone"></i> Number
                        </h5>
                        {accepted !== null && getStatus(accepted)}
                    </div>
                </div>
            </div>
            <div className="appointment-action">
                {/* <button className="btn btn-sm bg-info-light m-1" onClick={show}>
                    <i className="far fa-eye"></i> View
                    <AppointmentDetails show={viewDetails} onHide={hide} />
                </button> */}
                {accepted === null && (
                    <>
                        <button
                            className="btn btn-sm bg-success-light m-1"
                            onClick={OnAccept}
                        >
                            <i className="fas fa-check"></i> Accept
                        </button>
                        <button
                            className="btn btn-sm bg-danger-light m-1"
                            onClick={OnReject}
                        >
                            <i className="fas fa-times"></i> Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const getStatus = (accepted) => {
    return (
        <h5 className="mb-0">
            <i className={accepted ? "fas fa-check" : "fas fa-times"}></i>{" "}
            <span className={accepted ? "text-primary" : "text-danger"}>
                {accepted ? "Accepted" : "Rejected"}
            </span>
        </h5>
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
