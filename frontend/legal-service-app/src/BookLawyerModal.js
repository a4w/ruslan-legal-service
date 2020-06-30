import React from "react";
import Modal from "./ModalRouted";
import LawyerBooking from "./LawyerBooking";

const BookLawyerModal = ({match})=>{
    console.log(match);
    return (
        <Modal header="Book this Lawyer!">
            <LawyerBooking />
        </Modal>
    );
}

export default BookLawyerModal;