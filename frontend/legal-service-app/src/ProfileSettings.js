import React from "react";
import EditEmail from "./EditEmail";
import EditAddress from "./EditAddress";
import EditBasicInfo from "./EditBasicInfo";
import PageHead from "./PageHead";
import EditInfo from "./EditInfo";

const ProfileSettings = () => {
    return (
        <div className="card">
            <PageHead
                title={"Dashboard | Lawbe.co.uk"}
                description={"Edit your profile | Lawbe.co.uk"}
            />
            <div className="card-body">
                {/* <EditBasicInfo /> */}
                <EditInfo />
                <hr></hr>
                <EditEmail />
                {/* <hr></hr>
                <EditAddress /> */}
            </div>
        </div>
    );
};

export default ProfileSettings;
