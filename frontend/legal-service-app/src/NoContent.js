import React from "react";

const NoContent = (props) => {
    return (
        <div className="error-page" style={{width:"100%"}}>
            <div className="main-wrapper">
                <div className="error-box">
                    <img className="img-fluid" src="/undraw_Notify_re_65on.svg" />
                    <h3 className="h2 mb-3">
                        <i className="fa fa-warning"></i> {props.children}
                    </h3>
                    <p className="h4 font-weight-normal">
                        Please re-try another time
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NoContent;