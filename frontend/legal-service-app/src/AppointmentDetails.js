import React from "react";
import Modal from './ModalRouted';

const AppointmentDetails = ()=>{
    return <Modal header={"Appointment Details"}> hi </Modal>;
}
const Details = ({appointment}) =>{
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
    const id = appointment.id.toLocaleString("en", {
        minimumIntegerDigits: 4,
        useGrouping: false,
    });
    return (
        <div className="modal-content">
            <div className="modal-body">
                <ul className="info-details">
                    <li>
                        <div className="details-header">
                            <div className="row">
                                <span className="title">{`#${id}`}</span>
                                <span className="text">
                                    {`${day} at ${time}`}
                                </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="title">Status:</span>
                        <button
                            type="button"
                            className={`btn bg-${
                                appointment.status === "DONE"
                                    ? "success"
                                    : "warning"
                            }-light btn-sm`}
                        >
                            {appointment.status}
                        </button>
                    </li>
                    <li>
                        <span className="title">Duration:</span>
                        <span className="text">{appointment.duration}</span>
                    </li>
                    <li>
                        <span className="title">Paid Amount</span>
                        <span className="text">{appointment.price}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}