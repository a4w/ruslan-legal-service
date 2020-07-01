import React from "react";
import Modal from "./ModalRouted";
import LawyerBooking from "./LawyerBooking";

const BookLawyerModal = ({match}) => {
    return (
        <Modal back={match.params[0]} header="Book this Lawyer!">
            <LawyerBooking LawyerId={match.params.LawyerId} />
        </Modal>
    );
}

export default BookLawyerModal;
