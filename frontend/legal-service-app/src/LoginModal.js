import React from "react";
import LoginForm from "./LoginForm";
import Modal from "./ModalRouted";

const LoginModal = (props) => {
    return (
        <Modal back={props.back} header={"Login"}>
            <div style={{margin: "10px"}}>
                <LoginForm back={props.back} />
            </div>
        </Modal>
    );
};

export default LoginModal;
