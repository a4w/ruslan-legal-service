import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import RegisterationForm from "./RegisterationForm";
import LoginForm from "./LoginForm";

const ModalPopUp = (props) => {
    const [register, setRegister] = useState(props.register);
    return (
        <Modal
            {...props}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {getTitle(register)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {getBody(register, setRegister, props.onHide)}
            </Modal.Body>
        </Modal>
    );
};
const getBody = (register, setRegister, hide) => {
    if (register)
        return <RegisterationForm setRegister={setRegister} hideModal={hide} />;
    else return <LoginForm setRegister={setRegister} hideModal={hide} />;
};
const getTitle = (register) => {
    if (register) return "Register";
    else return "Log In";
};
export default ModalPopUp;
