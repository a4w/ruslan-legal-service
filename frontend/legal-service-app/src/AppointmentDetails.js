import React, {useState, useEffect} from "react";
import Modal from './ModalRouted';
import useRequests from "./useRequests";

const AppointmentDetails = ({match}) => {
    const [appointment, setAppointment] = useState({id: 0});
    const {request} = useRequests();
    useEffect(() => {
        request({url: `/appointment/${match.params.appId}`, method: "GET"})
            .then((res) => {
                setAppointment(res.appointment);
            })
            .catch((err) => {});
    }, []);
    return (
        <Modal header={"Appointment Details"} width={"40%"}>
            {appointment && <Details appointment={appointment} />}
        </Modal>
    );
}
const Details = ({appointment}) => {
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
export default AppointmentDetails;
