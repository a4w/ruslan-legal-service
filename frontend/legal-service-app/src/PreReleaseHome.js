import React from "react";
import {Link} from "react-router-dom";

const PreReleaseHome = (_) => {
    return (
        <div className='content'>
            <div className='container-fluid'>
                <div className='row'>
                    <div class='col-12 col-4'>
                        <Link to='/home'>
                            <h2>
                                <b>Lawbe</b>.co.uk
                            </h2>
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div class='col-12 col-lg-5'>
                        <h1 style={{fontSize: "11vmin"}}>
                            Get legal <br /> advice <br />{" "}
                            <b style={{color: "#09e5ab"}}>anywhere!</b>
                        </h1>
                        <Link
                            className='btn btn-rounded btn-lg btn-outline-primary w-100 p-3 my-4'
                            to='/register'
                        >
                            Register now!
                        </Link>
                    </div>
                    <div class='col-12 col-lg-7'>
                        <div
                            style={{
                                background:
                                    "url('/undraw_business_chat.svg') center no-repeat",
                                backgroundSize: "contain",
                                minHeight: "300px",
                            }}
                            class='w-100 h-100'
                        >
                            <h6
                                className='m-auto text-center'
                                style={{fontSize: "30pt"}}
                            >
                                <b>Coming soon!</b>
                            </h6>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div class='col-12 col-lg-4'>
                        <div
                            style={{
                                background:
                                    "url('/undraw_online_friends.svg') center no-repeat",
                                backgroundSize: "contain",
                                minHeight: "125px",
                            }}
                            class='w-100 h-75 mt-4'
                        >
                            {" "}
                        </div>
                        <span className='d-block text-center mt-2'>
                            Choose the best lawyer
                        </span>
                    </div>
                    <div class='clearfix'></div>
                    <div class='col-12 col-lg-4'>
                        <div
                            style={{
                                background:
                                    "url('/undraw_real_time_collaboration.svg') center no-repeat",
                                backgroundSize: "contain",
                                minHeight: "125px",
                            }}
                            class='w-100 h-75 mt-4'
                        ></div>
                        <span className='d-block text-center'>
                            Contact lawyers seamlessly
                        </span>
                    </div>
                    <div class='col-12 col-lg-4'>
                        <div
                            style={{
                                background:
                                    "url('/undraw_online_calendar.svg') center no-repeat",
                                backgroundSize: "contain",
                                minHeight: "125px",
                            }}
                            class='w-100 h-75 mt-4'
                        ></div>
                        <span className='d-block text-center mt-2'>
                            Flexible scheduling
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreReleaseHome;
