import React from "react";
import LoginForm from "./LoginForm";
import {OnTopModal, ModalPortal} from "./ModalRouted";

const LoginModal = (props) => {
    return (
        <ModalPortal>
            <div className="row">
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    <OnTopModal header="Register">
                        <LoginForm back={props.back} />
                    </OnTopModal>
                </div>
            </div>
        </ModalPortal>
    );
};

export default LoginModal;
