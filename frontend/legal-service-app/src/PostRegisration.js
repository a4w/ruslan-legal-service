import React from "react";
import {Link} from "react-router-dom";
import Wrapper from "./Wrapper";

const PostRegistration = (_) => {

    return (
        <Wrapper>
            <div class="row">
                <div class="col-md-8 offset-md-2">

                    <div class="account-content">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-md-12 col-lg-6 login-right">
                                <div className='login-header'>
                                    <img src="/undraw_mail_sent.svg" style={{width: "200px", padding: "20px", margin: "auto", display: "block"}} />
                                    <h5 style={{textAlign: "center"}}>
                                        <b>Email verification sent</b><br />
                                        Please check your inbox for further instructions
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </Wrapper>
    );
};
export default PostRegistration;
