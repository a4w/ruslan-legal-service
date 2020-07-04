import React from "react";
import "./assets/css/admin.css";

const Admin = () => {
    return (
        <>
            <AdminHeader />
            <AdminSidebar />
            <div class="page-wrapper">
                <div class="content container-fluid"></div>
            </div>
        </>
    );
};
const AdminHeader = () => {
    return (
        <div class="header">
            <div class="header-left">
                <a href="index.html" class="logo">
                    <b>Lawbe</b>.co.uk
                </a>
                <a href="index.html" class="logo logo-small">
                    <b>Lawbe</b>
                </a>
            </div>
            <a href="javascript:void(0);" id="toggle_btn">
                <i class="fe fe-text-align-left"></i>
            </a>
            <a class="mobile_btn" id="mobile_btn">
                <i class="fa fa-bars"></i>
            </a>
        </div>
    );
};
const AdminSidebar = () => {
    return (
        <div className="sidebar" id="sidebar">
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
                                <i className="fe fe-user"></i>{" "}
                                <span>Patients</span>
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
        </div>
    );
};
export default Admin;
