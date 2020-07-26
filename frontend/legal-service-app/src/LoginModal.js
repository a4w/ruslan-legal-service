import React from "react";
import LoginForm from "./LoginForm";
import {OnTopModal, ModalPortal} from "./ModalRouted";

const LoginModal = (props) => {
    return (
        <ModalPortal>
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <OnTopModal header="Register">
                        <LoginForm back={props.back} />
                    </OnTopModal>
                </div>
            </div>
        </ModalPortal>
    );
};

export default LoginModal;
