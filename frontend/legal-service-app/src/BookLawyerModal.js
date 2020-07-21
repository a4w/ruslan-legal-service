import React from "react";
import Modal from "./ModalRouted";
import LawyerBooking from "./LawyerBooking";

const BookLawyerModal = ({match}) => {
    return (
        <Modal back={match.params[0]} header="Book this Lawyer!">
            <div className="row">
                <div className="col-12">
                    <LawyerBooking LawyerId={match.params.LawyerId} />
                </div>
            </div>
        </Modal>
    );
}

export default BookLawyerModal;
