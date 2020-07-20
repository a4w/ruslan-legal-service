import React from "react"

const Status = ({appStatus})=>{
    const status = appStatus.toLowerCase();
    switch (appStatus) {
        case "UPCOMING":
            return <span className="badge badge-pill bg-info-light">{status}</span>
        case "DONE":
            return <span className="badge badge-pill bg-success-light">{status}</span>
        case "CANCELLED":
            return <span className="badge badge-pill bg-danger-light">{status}</span>
        case "ON_HOLD":
            return <span className="badge badge-pill bg-warning-light">{status}</span>
        default:
            return <span className="badge badge-pill bg-light-light">{status}</span>
    }
}

export default Status;