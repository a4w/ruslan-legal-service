import React from 'react';
import Modal from './ModalRouted';
import LawyerRating from './LawyerRating';

const RatingModal = ({match})=>{
    console.log({...match.params});
    
    return (
        <Modal header="Rate This Lawyer!" width={"50%"}>
            <LawyerRating
                appId={match.params.appId}
                lawyerId={match.params.lawyerId}
            />
        </Modal>
    );
}

export default RatingModal;