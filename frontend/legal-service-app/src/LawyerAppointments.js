import React, { useState } from "react";

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
    const OnAccept = () => {
        setAccepted(true);
    };
    const OnReject = () => {
        setAccepted(true);
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
                        <h5 className="mb-0">
                            <i className="fas fa-phone"></i> Number
                        </h5>
                    </div>
                </div>
            </div>
            <div className="appointment-action">
                <button className="btn btn-sm bg-info-light m-1">
                    <i className="far fa-eye"></i> View
                </button>
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
            </div>
        </div>
    );
};

export default LawyerAppointments;
