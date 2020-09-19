import React, {useState} from "react";
import EditEmail from "./EditEmail";
import EditAddress from "./EditAddress";
import EditBasicInfo from "./EditBasicInfo";
import PageHead from "./PageHead";
import EditInfo from "./EditInfo";
import LoadingOverlay from "react-loading-overlay";

const ProfileSettings = () => {
    const [loading, setLoading] = useState(true);

    
    return (
        <div className="card">
            <PageHead
                title={"Dashboard | Lawbe.co.uk"}
                description={"Edit your profile | Lawbe.co.uk"}
            />
            <LoadingOverlay active={loading} spinner text={"Loading"}>
                <div className="card-body">
                    {/* <EditBasicInfo /> */}
                    <EditInfo Loading={setLoading} />
                    <hr></hr>
                    <EditEmail Loading={setLoading} />
                    {/* <hr></hr>
                <EditAddress /> */}
                </div>
            </LoadingOverlay>
        </div>
    );
};

export default ProfileSettings;
