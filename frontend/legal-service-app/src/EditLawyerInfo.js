import React, { useState, useEffect } from "react";
import LawyerCompleteRegisteration from './LawyerCompleteRegisteration';

const EditLawyerInfo = () => {
    const [lawyer, setLawyer] = useState(null);
    //Component did mount
    useEffect(()=>{
        // here fetch lawyer data with current session and setLawyer
    }, []);
    return <LawyerCompleteRegisteration lawyerData={lawyer}/>;
};

export default EditLawyerInfo;
