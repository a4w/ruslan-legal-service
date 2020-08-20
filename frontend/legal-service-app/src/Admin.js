import React, { useState, useRef, useEffect } from "react";
import "./assets/css/admin.css";

const Admin = () => {
    const [sidebarToggle, setToggle] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setToggle(false);
        }
    };

    const handleToggle = () => setToggle(!sidebarToggle);
    return (
        <div className={`main-wrapper ${sidebarToggle ? "slide-nav" : ""}`}>
            <div className="header">
                <div className="header-left">
                    <a href="index.html" className="logo">
                        <b>Lawbe</b>.co.uk
                    </a>
                    <a href="index.html" className="logo logo-small">
                        <b>Lawbe</b>
                    </a>
                </div>
                <a href="" id="toggle_btn">
                    <i className="fe fe-text-align-left"></i>
                </a>
                <a className="mobile_btn" onClick={handleToggle}>
                    <i className="fa fa-bars"></i>
                </a>
            </div>
            <div className="sidebar" id="sidebar" ref={ref}>
                <AdminSidebar close={() => setToggle(false)} />
            </div>
            <div className="page-wrapper">
                <div className="content container-fluid"></div>
            </div>
        </div>
    );
};

const AdminSidebar = () => {
    return (
        <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                    <li className="active">
                        <a href="index.html">
                            <i className="fe fe-home"></i>{" "}
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="appointment-list.html">
                            <i className="fe fe-layout"></i>{" "}
                            <span>Appointments</span>
                        </a>
                    </li>
                    <li>
                        <a href="specialities.html">
                            <i className="fe fe-users"></i>{" "}
                            <span>Specialities</span>
                        </a>
                    </li>
                    <li>
                        <a href="doctor-list.html">
                            <i className="fe fe-user-plus"></i>{" "}
                            <span>Doctors</span>
                        </a>
                    </li>
                    <li>
                        <a href="patient-list.html">
                            <i className="fe fe-user"></i> <span>Patients</span>
                        </a>
                    </li>
                    <li>
                        <a href="reviews.html">
                            <i className="fe fe-star-o"></i>{" "}
                            <span>Reviews</span>
                        </a>
                    </li>
                    <li>
                        <a href="transactions-list.html">
                            <i className="fe fe-activity"></i>{" "}
                            <span>Transactions</span>
                        </a>
                    </li>
                    <li>
                        <a href="settings.html">
                            <i className="fe fe-vector"></i>{" "}
                            <span>Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="invoice-report.html">Invoice Reports</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Admin;
