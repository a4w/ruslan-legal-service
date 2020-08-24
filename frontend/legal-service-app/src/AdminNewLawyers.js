import React from "react";
import SpinnerButton from "./SpinnerButton";

const AdminNewLawyers = () => {
    const headers = ["ID", "Name", "Phone", "Email", "Actions"];
    const test = [
        {
            id: "123456789",
            fullname: "123456789",
            phone: "123456789",
            email: "123456789",
        },
        {
            id: "askkkowowo",
            fullname: "askkkowowo",
            phone: "askkkowowo",
            email: "askkkowowo",
        },
        {
            id: "ppppppppp",
            fullname: "ppppppppp",
            phone: "ppppppppp",
            email: "ppppppppp",
        },
    ];
    return (
        <Table header={headers}>
            {test.map((lawyer, i) => (
                <Lawyer {...lawyer} key={i} />
            ))}
        </Table>
    );
};
const Lawyer = ({ id, fullname, phone, email }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{fullname}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>
                <SpinnerButton
                    type="button"
                    className="btn btn-sm btn-rounded btn-success mr-2"
                >
                    Add
                </SpinnerButton>
                <SpinnerButton
                    type="button"
                    className="btn btn-sm btn-rounded btn-danger"
                >
                    Remove
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

export default AdminNewLawyers;
