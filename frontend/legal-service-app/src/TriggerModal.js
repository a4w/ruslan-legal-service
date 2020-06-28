import React, { useState } from "react";
import ModalPopUp from "./Modal";
import History from "./History";

const TriggerModal = (props) => {
    const [modalShow, setModalShow] = useState(true);
    const register = props.register;
    // const register = History.location.state.register;
    console.log("Please show modal");
    return (
        <ModalPopUp
            show={modalShow}
            onHide={() => setModalShow(false)}
            register={register}
        />
    );
};
export default TriggerModal;