import React from "react";
import EditEmail from "./EditEmail";
import EditAddress from "./EditAddress";
import EditBasicInfo from "./EditBasicInfo";

const ProfileSettings = () => {
    return (
        <div className="card">
            <PageHead
                title={"Dashboard | Lawbe.co.uk"}
                description={"Edit your profile | Lawbe.co.uk"}
            />
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
