import React from "react";
import {ModalPortal, OnTopModal} from "./ModalRouted";
import RegisterationForm from "./RegisterationForm";

const RegisterModal = (props) => {
    return (
        <ModalPortal>
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <OnTopModal header="Register">
                        <RegisterationForm back={props.back} />
                    </OnTopModal>
                </div>
            </div>
        </ModalPortal>
    );
};

export default RegisterModal;
