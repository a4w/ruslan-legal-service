import React, {useState, useEffect, useContext} from "react";
import Modal from './ModalRouted';
import useRequests from "./useRequests";
import { AuthContext } from "./App";
import Img from "./Img";

const AppointmentDetails = ({match}) => {
    const [appointment, setAppointment] = useState(null);
    const [auth,] = useContext(AuthContext);
    const [isClient, setIsClient] = useState(auth.accountType);
    const {request} = useRequests();
    console.log(isClient);
    useEffect(() => {
        request({url: `/appointment/${match.params.appId}`, method: "GET"})
            .then((res) => {
                setAppointment(res.appointment);
            })
            .catch((err) => {});
    }, []);
    return (
        <Modal header={"Appointment Details"} width={"40%"}>
            {appointment && (
                <Details
                    appointment={appointment}
                    account={
                        isClient === "CLIENT"
                            ? appointment.lawyer.account
                            : appointment.client.account
                    }
                />
            )}
        </Modal>
    );
}
const Details = ({appointment, account}) => {
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
                    <li style={{ display: "flex" }}>
                        <a href="#" className="avatar avatar-sm mr-2">
                            <Img
                                className="avatar-img rounded-circle"
                                src={account.profile_picture}
                                alt="User"
                            />
                        </a>
                        <h4
                            className="table-avatar"
                            style={{ marginTop: "auto" }}
                        >
                            {account.name + " " + account.surname}
                        </h4>
                    </li>
                    <li>
                        <div className="details-header">
                            <div className="row">
                                <div className="col-md-6 pl-0">
                                    <span className="title">{`#APT${id}`}</span>
                                    <span className="text">
                                        {`${day} at ${time}`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <span className="title">Status:</span>
                        <br />
                        <button
                            type="button"
                            className={`btn bg-${
                                appointment.status === "DONE"
                                    ? "success"
                                    : "danger"
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

export default AppointmentDetails;
