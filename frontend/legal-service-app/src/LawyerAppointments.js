import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const LawyerAppointments = () => {
    const clients = [{ id: 1 }, { id: 2 }, { id: 3 }];
    return (
        <div className="appointments">
            {clients.map((client) => (
                <AppointmentCard key={client.id} client={client} />
            ))}
        </div>
    );
};
const AppointmentCard = ({ client }) => {
    // const [viewDetails, setView] = useState(false);
    const [rejected, setRejected] = useState(null);
    const [date, setDate] = useState(null);
    const OnReject = () => {
        setDate(new Date());
        setRejected(false);
    };
    // const show = () => {
    //     setView(true);
    // };
    // const hide = () => {
    //     setView(false);
    // };
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
                        {rejected !== null && getStatus(rejected, date)}
                    </div>
                </div>
            </div>
            <div className="appointment-action">
                {/* <button className="btn btn-sm bg-info-light m-1" onClick={show}>
                    <i className="far fa-eye"></i> View
                    <AppointmentDetails show={viewDetails} onHide={hide} />
                </button> */}
                {rejected === null && (
                    <>
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

const getStatus = (rejected, date) => {
    const dateString = date.toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        weekday: "long",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
    });
    return (
        <h5 className="mb-0">
            <i className="fas fa-times"></i>
            <span className="text-danger">{"Rejected On " + dateString}</span>
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
