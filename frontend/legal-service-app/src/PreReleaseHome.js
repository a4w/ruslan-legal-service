import React from "react";
import {Link} from "react-router-dom";
import Wrapper from "./Wrapper";
import {Row, Col} from "reactstrap";

const PreReleaseHome = (_) => {

    return (
        <Wrapper>
            <Row>
                <Col xs="12">
                    <section class="section section-search">
                        <div class="container-fluid">
                            <div class="banner-wrapper">
                                <div class="banner-header text-center">
                                    <h1>Search Lawyers, Make an Appointment</h1>
                                    <p>Consult the best lawyers from all accross the country<br /><b>From the comfort of your home</b></p>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <Link to="/register" class="btn btn-rounded btn-outline-primary btn-lg">
                                        Pre-Register now!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default PreReleaseHome;
