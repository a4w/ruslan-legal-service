import React from "react";
import {ModalPortal, OnTopModal} from "./ModalRouted";
import RegisterationForm from "./RegisterationForm";

const RegisterModal = (props) => {
    return (
        <ModalPortal>
            <div className="row">
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    <OnTopModal header="Register">
                        <RegisterationForm back={props.back} />
                    </OnTopModal>
                </div>
            </div>
        </ModalPortal>
    );
};

export default RegisterModal;
