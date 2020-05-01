import React from "react";

const Wrapper = (props) => {
    return (
        <div className='content'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8 offset-md-2'>
                        <div className='account-content'>
                            <div className='row align-items-center justify-content-center'>
                                <div className='col-md-7 col-lg-6 login-left'>
                                    <img
                                        src='./assets/img/login-banner.png'
                                        className='img-fluid'
                                        alt='Doccure Register'
                                    />
                                </div>
                                <div className='col-md-12 col-lg-6 login-right'>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Wrapper;
