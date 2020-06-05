import React, { useState } from "react";

const LawyerDashboardStatus = () => {
    return <div>test 1</div>;
};

const ListItem = () => {
    const [cancel, setCancel] = useState(false);
    const [date, setDate] = useState(null);
    const OnReject = () => {
        setDate(new Date());
        setCancel(false);
        // The API cancel Rquest will be sent here
    };
    return (
        <tr>
            <td>
                <h2 className="table-avatar">
                    <a
                        href="client-profile.html"
                        className="avatar avatar-sm mr-2"
                    >
                        Img
                    </a>
                    <a href="//">Name </a>
                </h2>
            </td>
            <td>
                Session date{" "}
                <span className="d-block text-info">Session time</span>
            </td>
            <td>{cancel ? "Rejected" : "Upcoming or Done"}</td>
            <td className="text-center">paid amount</td>
            <td className="text-right">
                <div className="table-action">
                    <a
                        href="//"
                        className="btn btn-sm bg-danger-light"
                        onClick={OnReject}
                    >
                        <i className="fas fa-times"></i> Cancel
                    </a>
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
                        <table className="table table-hover table-center mb-0">
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

export default LawyerDashboardStatus;
