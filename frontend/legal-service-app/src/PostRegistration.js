import React from "react";

const PostRegistration = (props) => {
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="account-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-12 col-lg-6 login-right">
                                    <div className="login-header">
                                        <img
                                            src="/undraw_mail_sent.svg"
                                            style={{width: "300px", padding: "20px", margin: "auto", display: "block"}}
                                        />
                                        <h5 style={{ textAlign: "center" }}>
                                            <b>Email verification sent</b>
                                            <br />
                                            Please check your inbox for further
                                            instructions
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
};
export default PostRegistration;
