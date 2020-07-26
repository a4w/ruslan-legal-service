import React from "react";
import Modal from "./ModalRouted";
import LawyerBooking from "./LawyerBooking";
import LawyerBookingSeparate from "./LawyerBookingSeparate";

const BookLawyerModal = ({match}) => {
    /*
    return (
        <Modal back={match.params[0]} header="Book this Lawyer!">
            <div className="row no-gutters">
                <div className="col-12">
                </div>
            </div>
        </Modal>
    );
*/
    return (<LawyerBookingSeparate lawyer_id={match.params.LawyerId} />);
}

export default BookLawyerModal;
