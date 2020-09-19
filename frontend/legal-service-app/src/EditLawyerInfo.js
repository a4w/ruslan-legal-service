import React, {useState, useEffect} from "react";
import LawyerCompleteRegisteration from './LawyerCompleteRegisteration';

const EditLawyerInfo = ({Loading}) => {
    //Component did mount
    return <LawyerCompleteRegisteration Loading={Loading} />;
};

export default EditLawyerInfo;
