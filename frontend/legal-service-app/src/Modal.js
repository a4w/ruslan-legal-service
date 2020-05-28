import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import RegisterationForm from "./RegisterationForm";
import LoginForm from "./LoginForm";

const ModalPopUp = (props) => {
    const headerTitle = props.headerTitle;
    const [register, setRegister] = useState(true);
    return (
        <Modal
            {...props}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {headerTitle}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{getBody(register, setRegister, props.onHide)}</Modal.Body>
        </Modal>
    );
};
const getBody = (register, setRegister, hide) => {
    if (register) return <RegisterationForm setRegister={setRegister} hideModal={hide} />;
    else return <LoginForm setRegister={setRegister} hideModal={hide} />;
};
export default ModalPopUp;
