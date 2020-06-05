import React from "react";

const LawyerClients = () => {
    return <ClientCard />;
};

const ClientCard = ({ client }) => {
    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card widget-profile pat-widget-profile">
                <div className="card-body">
                    <div className="pro-widget-content">
                        <div className="profile-info-widget">
                            <a
                                href="client-profile.html"
                                className="booking-lawyer-img"
                            >
                                Profile Pic
                            </a>
                            <div className="profile-det-info">
                                <h3>
                                    <a href="client-profile.html">
                                        Client's name
                                    </a>
                                </h3>

                                <div className="client-details">
                                    <h5 className="mb-0">
                                        <i className="fas fa-map-marker-alt"></i>{" "}
                                        City, Country
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="client-info">
                        <ul>
                            <li>
                                Phone <span>+x xxx xxx xxxx</span>
                            </li>
                            <li>
                                data <span>etc..</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerClients;
