import React from "react";
import EditEmail from "./EditEmail";
import EditAddress from "./EditAddress";
import EditBasicInfo from "./EditBasicInfo";

const ProfileSettings = () => {
    return (
        <>
            <EditBasicInfo />
            <hr></hr>
            <EditEmail />
            <hr></hr>
            <EditAddress />
        </>
    );
};

export default ProfileSettings;
