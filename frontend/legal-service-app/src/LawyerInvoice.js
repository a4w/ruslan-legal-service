import React from "react";

const LawyerInvoice = () => {
    return <InvoiceTable />;
};

const InvoiceTable = () => {
    return (
        <table className="table table-hover table-center mb-0">
            <thead>
                <tr>
                    <th>Invoice No</th>
                    <th>Patient</th>
                    <th>Amount</th>
                    <th>Paid On</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    );
};
export default LawyerInvoice;
