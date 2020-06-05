import React from "react";

const LawyerInvoice = () => {
    return (
        <InvoiceTable>
            <InvoiceTableRow />
        </InvoiceTable>
    );
};
const InvoiceTableRow = () => {
    return (
        <tr>
            <td>
                <a href="invoice-view.html">ID</a>
            </td>
            <td>
                <h2 className="table-avatar">
                    <a
                        href="patient-profile.html"
                        className="avatar avatar-sm mr-2"
                    >
                        {/* <img
                            className="avatar-img rounded-circle"
                            src="assets/img/patients/patient.jpg"
                            alt="User"
                        /> */}
                        IMG
                    </a>
                    <a href="patient-profile.html">
                        Client's name <span> ID </span>
                    </a>
                </h2>
            </td>
            <td>Amount</td>
            <td>Date Payed?</td>
            <td className="text-right">
                <div className="table-action">
                    <button className="btn btn-sm bg-info-light m-1">
                        <i className="far fa-eye"></i> View
                    </button>
                    <button className="btn btn-sm bg-primary-light m-1">
                        <i className="fas fa-print"></i> Print
                    </button>
                </div>
            </td>
        </tr>
    );
};
const InvoiceTable = (props) => {
    return (
        <div className="card card-table">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-hover table-center mb-0">
                        <thead>
                            <tr>
                                <th>Invoice No</th>
                                <th>Client</th>
                                <th>Amount</th>
                                <th>Paid On</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{props.children}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default LawyerInvoice;
