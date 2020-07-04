import React from "react";
import Img from "./Img";

const LawyerInvoice = () => {
    const clients = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
    ];
    return (
        <InvoiceTable>
            <InvoiceTableRows clients={clients} />
        </InvoiceTable>
    );
};
const InvoiceTableRows = ({ clients }) => {
    return clients.map((client) => (
        <InvoiceTableRow key={client.id} client={client} />
    ));
};
const InvoiceTableRow = ({ client }) => {
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
                        <Img
                            className="avatar-img rounded-circle"
                            alt="User"
                        />
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
                    <table
                        className="table table-hover table-center mb-0"
                        style={{ backgroundColor: "white" }}
                    >
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
