import React from "react";
import EditEmail from "./EditEmail";
import EditAddress from "./EditAddress";
import EditBasicInfo from "./EditBasicInfo";

const ProfileSettings = () => {
    return (
        <div className="card">
            <div className="card-body">
                <EditBasicInfo />
                <hr></hr>
                <EditEmail />
                <hr></hr>
                <EditAddress />
            </div>
        </div>
    );
};

export default ProfileSettings;
