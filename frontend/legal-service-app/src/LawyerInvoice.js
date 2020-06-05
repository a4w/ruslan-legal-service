import React from "react";

const LawyerInvoice = () => {
    return <InvoiceTable></InvoiceTable>;
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
