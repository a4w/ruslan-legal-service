import React from 'react';
import Modal from './ModalRouted';
import LawyerRating from './LawyerRating';

const RatingModal = ()=>{
    return <Modal header="Rate This Lawyer!">
        <LawyerRating />
    </Modal>
}

export default RatingModal;