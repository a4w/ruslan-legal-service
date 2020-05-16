import React from "react";
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
                                    <img src="/undraw_reminders.svg" style={{width: "400px", padding: "20px", margin: "auto", display: "block"}} />
                                    <h5 style={{textAlign: "center"}}>
                                        <b>Thank you for registering!</b><br />
                                        You will be notified by email as soon as we launch
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

