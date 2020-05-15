import React, {useState} from "react";
import {Link} from "react-router-dom";
import Wrapper from "./Wrapper";
import {Row, Col} from "reactstrap";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Register from "./Register";
import {FaTimes} from "react-icons/fa"

const PreReleaseHome = (_) => {
    const [modalOpen, setModalState] = useState(false);
    return (
        <Wrapper>
            <Row>
                <Col xs="12">
                    <section className="section section-search">
                        <div className="container-fluid">
                            <div className="banner-wrapper">
                                <div className="banner-header text-center">
                                    <h1>Search Lawyers, Make an Appointment</h1>
                                    <p>Consult the best lawyers from all accross the country<br /><b>From the comfort of your home</b></p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button onClick={() => {setModalState(true)}} className="btn btn-rounded btn-outline-primary btn-lg">
                                        Pre-Register now!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </Col>
            </Row>
            <RegistrationModal isOpen={modalOpen} handleClose={() => setModalState(false)} />
        </Wrapper>
    );
};


const RegistrationModal = (props) => {
    const {isOpen, handleClose} = props;

    return (
        <>
            <Modal isOpen={isOpen} size="lg">
                <ModalHeader toggle={handleClose}>
                    <h3>Register</h3>
                </ModalHeader>
                <ModalBody className="">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <Register />
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default PreReleaseHome;
