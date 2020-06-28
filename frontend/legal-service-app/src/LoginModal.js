import React from "react";
import LoginForm from "./LoginForm";
import Modal from "./ModalRouted";

const LoginModal = (props) => {
    return (
        <Modal>
            <div style={{ margin: "10px" }}>
                <LoginForm />
            </div>
        </Modal>
    );
};

export default LoginModal;
