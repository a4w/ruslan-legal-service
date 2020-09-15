import React, { useState, useEffect } from "react";
import SpinnerButton from "./SpinnerButton";
import useAdminRequest from "./useAdminRequest";

const AdminsLawyersController = () => {
    const headers = ["ID", "Name", "Phone", "Email", "Actions"];
    const test = [
        {
            id: "123456789",
            fullname: "123456789",
            phone: "123456789",
            email: "123456789",
            account: {is_active: true},
        },
        {
            id: "askkkowowo",
            fullname: "askkkowowo",
            phone: "askkkowowo",
            email: "askkkowowo",
            account: {is_active: false},
        },
        {
            id: "ppppppppp",
            fullname: "ppppppppp",
            phone: "ppppppppp",
            email: "ppppppppp",
            account: {is_active: true},
        },
    ];
    const [newLawyers, setNew] = useState(test);
    const [allLawyers, setAll] = useState(test);
    const {request} = useAdminRequest();

    useEffect(()=>{
        request({ url: "/admin/lawyers?is_active=false", method: "GET" })
            .then((data) => {
                setNew(data.lawyers);
                return request({
                    url: "/admin/lawyers?is_active=true",
                    method: "GET",
                });
            })
            .then((data) => {
                setAll(data.lawyers);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {});
    }, []);
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs nav-tabs-solid nav-justified">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                href="#solid-rounded-justified-tab1"
                                data-toggle="tab"
                            >
                                New Lawyers
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#solid-rounded-justified-tab2"
                                data-toggle="tab"
                            >
                                All Lawyers
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div
                            className="tab-pane show active"
                            id="solid-rounded-justified-tab1"
                        >
                            <Table header={headers}>
                                {newLawyers.map((lawyer, i) => (
                                    <Lawyer lawyer={lawyer} key={i} />
                                ))}
                            </Table>
                        </div>
                        <div
                            className="tab-pane"
                            id="solid-rounded-justified-tab2"
                        >
                            <Table header={headers}>
                                {allLawyers.map((lawyer, i) => (
                                    <Lawyer lawyer={lawyer} key={i} />
                                ))}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const Lawyer = ({ lawyer }) => {
    const { id, fullname, phone, email, account} = { ...lawyer };
    const { is_active } = { ...account };
    const [loading, setLoading] = useState(false);
    const { request } = useAdminRequest();
    const OnClick = () => {
        setLoading(true);
        request({
            url: `/admin/lawyer/${id}`,
            method: "POST",
            data: { is_active: !is_active },
        })
            .then((data) => {
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <tr>
            <td>{id}</td>
            <td>{fullname}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>
                <SpinnerButton
                    type="button"
                    className={`btn btn-sm btn-rounded btn-${is_active ? "success" : "danger"} mr-2`}
                    loading={loading}
                    onClick={OnClick}
                >
                    {is_active ? "Deactivate" : "Activate"}
                </SpinnerButton>
            </td>
        </tr>
    );
};
const Table = (props) => {
    return (
        <div className="tab-pane show active" id="upcoming-appointments">
            <div className="card card-table mb-0">
                <div className="card-body">
                    <div className="table-responsive">
                        <table
                            className="table table-hover table-center mb-0"
                            style={{
                                backgroundColor: "white",
                                display: "block",
                            }}
                        >
                            <tbody style={{ width: "100%", display: "table" }}>
                                <thead>
                                    <tr>
                                        {props.header.map((h, i) => (
                                            <th key={i}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                {props.children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminsLawyersController;
