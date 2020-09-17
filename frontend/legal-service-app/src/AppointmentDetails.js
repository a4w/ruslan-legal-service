import React, {useState, useEffect, useContext} from "react";
import Modal, {ModalPortal, OnTopModal} from './ModalRouted';
import useRequests from "./useRequests";
import {AuthContext} from "./App";
import Img from "./Img";
import {Link} from "react-router-dom";
import RoundImg from "./RoundImg";

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
        <ModalPortal>
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <OnTopModal header={"Appointment Details"}>
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

                    </OnTopModal>
                </div>
            </div>
        </ModalPortal>
    );
}

const Details = ({appointment}) => {
    const lawyer = appointment.lawyer;
    const client = appointment.client;
    const appointment_time = new Date(appointment.appointment_time);
    const [auth,] = useContext(AuthContext);
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
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6" style={{borderRight: '1px solid #ddd'}}>
                    <h6>Lawyer</h6>
                    <div className="d-flex justify-content-center">
                        <RoundImg
                            src={lawyer.account.profile_picture}
                            alt="User"
                            diameter={100}
                        />
                    </div>
                    <Link to={`/profile/${lawyer.id}/${lawyer.account.full_name.replace(/ +/g, "-")}`}><span className="d-block text-center text-lg font-weight-bold">{lawyer.account.full_name}</span></Link>
                    <span class="d-block text-center text-muted">{lawyer.account.email}</span>
                </div>
                <div className="col-12 col-md-6">
                    <h6>Client</h6>
                    <div className="d-flex justify-content-center">
                        <RoundImg
                            src={client.account.profile_picture}
                            alt="User"
                            diameter={100}
                        />
                    </div>
                    <span className="d-block text-center text-lg font-weight-bold">{client.account.full_name}</span>
                    <span class="d-block text-center text-muted">{client.account.email}</span>
                </div>
            </div >
            <hr />
            <div className="row">
                <div className="col-12">
                    <span className="d-block text-center text-xl mt-2">{day} at {time}</span>
                    <span className="d-block text-center text-md mb-3">For <b>{appointment.duration}</b> minutes</span>
                    <span
                        className={`text-uppercase btn bg-${
                            appointment.status === "DONE"
                                ? "success"
                                : "danger"
                            }-light btn-sm` + " d-block"}
                    >
                        {appointment.status}
                    </span>
                </div>
            </div>
            <hr />

            <div className="row text-sm">
                <div className="col-6 col-md-4 text-center">
                    <b>Price:</b>&nbsp;{appointment.currency_symbol}{appointment.price}
                </div>
                <div className="col-6 col-md-4 text-center">
                    <b>Created at:</b>&nbsp; {new Date(appointment.created_at).toLocaleString()}
                </div>
                {auth.accountType === "CLIENT" && <>
                    <div className="col-6 col-md-4 text-center">
                        <b>Payment status:</b>&nbsp;<span className={"badge " + "badge-" + ((appointment.status === "DONE" || appointment.status === "UPCOMING") ? "success" : appointment.status === "ON_HOLD" ? "warning" : "danger")}>{(appointment.status === "DONE" || appointment.status === "UPCOMING") ? "PAYED" : appointment.status === "ON_HOLD" ? "PENDING" : "REFUNDED"}</span>
                    </div>
                </>}
                {auth.accountType === "LAWYER" && <>
                    <div className="col-6 col-md-4 text-center">
                        <b>Payment status:</b>&nbsp;<span className={"badge " + "badge-" + (appointment.status === "DONE" ? "success" : (appointment.status === "ON_HOLD" || appointment.status === "UPCOMING") ? "warning" : "danger")}>{appointment.status === "DONE" ? "PAYED" : (appointment.status === "ON_HOLD" || appointment.status === "UPCOMING") ? "PENDING" : "REFUNDED"}</span>
                    </div>
                </>}
            </div>
        </>
    );
}


const Details2 = ({appointment, account}) => {
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
        <div className="modal-body">
            <ul className="info-details">
                <li style={{display: "flex"}}>
                    <a href="#" className="avatar avatar-sm mr-2">
                        <Img
                            className="avatar-img rounded-circle"
                            src={account.profile_picture}
                            alt="User"
                        />
                    </a>
                    <h4
                        className="table-avatar"
                        style={{marginTop: "auto"}}
                    >
                        {account.name + " " + account.surname}
                    </h4>
                </li>
                <li>
                    <div className="details-header">
                        <span className="title d-block">{`#APT${id}`}</span>
                        <span className="text" style={{display: "inline-block"}}>
                            {`${day} at ${time}`}
                        </span>
                    </div>
                </li>
                <li>
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
    );
}

export default AppointmentDetails;
