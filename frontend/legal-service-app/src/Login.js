import React from "react";
import LoginForm from "./LoginForm";
import history from "./History";
import Modal from "./ModalRouted";

const LoginModal = (props) => {
    return (
        <Modal
            onClick={() => {
                history.goBack();
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <LoginForm />
            </div>
        </Modal>
    );
};

export default LoginModal;
