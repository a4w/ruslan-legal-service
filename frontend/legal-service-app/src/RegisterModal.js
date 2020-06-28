import React from "react";
import Modal from "./ModalRouted";
import RegisterationForm from "./RegisterationForm";

const RegisterModal = (props) => {
    return (
        <Modal>
            <div style={{ margin: "10px" }}>
                <RegisterationForm />
            </div>
        </Modal>
    );
};

export default RegisterModal;
