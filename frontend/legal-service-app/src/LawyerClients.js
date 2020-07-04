import React from "react";
import Img from "./Img";

const LawyerClients = () => {
    const clients = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
    ];
    return (
        <div className="row row-grid">
            <ClientCardList clients={clients} />
        </div>
    );
};
const ClientCardList = ({ clients }) => {
    return clients.map((client) => (
        <ClientCard key={client.id} client={client} />
    ));
};
const ClientCard = ({ client }) => {
    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
            <div className="card widget-profile pat-widget-profile">
                <div className="card-body">
                    <div className="pro-widget-content">
                        <div className="profile-info-widget">
                            <a className="booking-lawyer-img">
                                <Img
                                    src={client.profile_picture}
                                    alt="User Image"
                                />
                            </a>
                            <div className="profile-det-info">
                                <h3>
                                    <a href="client-profile.html">
                                        {`${client.name} ${client.surname}`}
                                    </a>
                                </h3>

                                <div className="client-details">
                                    <h5 className="mb-0">
                                        <i className="fas fa-map-marker-alt"></i>{" "}
                                        {`${client.city} ${client.country}`}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="client-info">
                        <ul>
                            <li>
                                Phone <span>{client.phone}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerClients;
