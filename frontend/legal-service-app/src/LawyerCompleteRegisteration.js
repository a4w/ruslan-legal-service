import React, {useState, useEffect} from "react";
import ErrorMessageSelect from "./ErrorMessageSelect";
import ErrorMessageInput from "./ErrorMessageInput";
import useValidation from "./useValidation";
import {LawyerInfoValidations} from "./Validations";
import {request} from "./Axios"

const LawyerCompleteRegisteration = ({}) => {
    const init = {
        type: "",
        other: "",
        regulatedBy: "",
        yearLicensed: "",
        education: "",
        graduation: "",
        course: "",
        practiceAreas: [],
        accreditations: [],
        bio: "",
    };

    const [lawyer, setLawyer] = useState(init);
    const [errors, , validate] = useValidation(LawyerInfoValidations);

    useEffect(() => {
        // here fetch lawyer data with current session and setLawyer
        request({
            url: 'lawyer/me',
            method: 'GET'
        }).then((response) => {
            const nextLawyer = {
                type: "",
                other: "",
                regulatedBy: "",
                yearLicensed: "",
                education: "",
                graduation: "",
                course: "",
                practiceAreas: [],
                accreditations: [],
                bio: "",
            };
            const data = response.lawyer;
            nextLawyer.type = data.lawyer_type.type;
            nextLawyer.regulatedBy = data.regulator.regulator;
            nextLawyer.yearLicensed = data.years_licenced;
            nextLawyer.education = data.institution;
            nextLawyer.graduation = data.graduation_year;
            nextLawyer.course = data.course;
            nextLawyer.practiceAreas = data.practiceAreas;
            nextLawyer.accreditations = data.accreditations;
            nextLawyer.bio = data.biography;
            setLawyer(nextLawyer);
        }).catch((error) => {

        });
    }, []);
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        validate(lawyer);
        console.log("submitting");
    };
    const OnChangeHandler = ({target: {value, name}}) => {
        const newData = {...lawyer, [name]: value};
        setLawyer(newData);
        console.log(lawyer);
        console.log("Validating: ", name, " with: ", newData);
        validate(newData, name);
    };
    const OnSelectHandler = ([{value, name}]) => {
        const newData = {...lawyer, [name]: value};
        setLawyer(newData);
        validate(newData, name);
    };
    const MultiselectHandler = (values) => {
        const [{name}] = values;
        const newData = {...lawyer, [name]: values};
        setLawyer(newData);
        validate(newData, name);
    };
    const typeOptions = [
        {value: "Solicitor", label: "Solicitor", name: "type"},
        {value: "Barrister", label: "Barrister", name: "type"},
        {value: "other", label: "Other", name: "type"},
    ];
    const practiceAreasOptions = [
        {value: "1", label: "area1", name: "practiceAreas"},
        {value: "2", label: "area2", name: "practiceAreas"},
        {value: "3", label: "area3", name: "practiceAreas"},
    ];
    const accreditationOptions = [
        {value: "1", label: "Accreditation 1", name: "accreditations"},
        {value: "2", label: "Accreditation 2", name: "accreditations"},
        {value: "3", label: "Accreditation 3", name: "accreditations"},
    ];
    return (
        <form onSubmit={OnSubmitHandler} id="regForm">
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <ErrorMessageSelect
                        name="type"
                        errors={errors.type}
                        value={lawyer.type}
                        placeholder={"Select type.."}
                        options={typeOptions}
                        OnChangeHandler={OnSelectHandler}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <ErrorMessageInput
                        disabled={lawyer.type !== "other"}
                        errors={errors.other}
                        type={"text"}
                        name="other"
                        placeholder={"Other.."}
                        value={lawyer.other}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <ErrorMessageInput
                        type={"text"}
                        name="yearLicensed"
                        value={lawyer.yearLicensed}
                        OnChangeHandler={OnChangeHandler}
                        placeholder={"Year licensed"}
                    />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9">
                    <ErrorMessageInput
                        type={"text"}
                        name="regulatedBy"
                        value={lawyer.regulatedBy}
                        OnChangeHandler={OnChangeHandler}
                        placeholder={"Regulated by"}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-8">
                    <ErrorMessageInput
                        type={"text"}
                        name="education"
                        value={lawyer.education}
                        OnChangeHandler={OnChangeHandler}
                        placeholder={"Institution"}
                    />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-2">
                    <ErrorMessageInput
                        type={"text"}
                        name="graduation"
                        value={lawyer.graduation}
                        OnChangeHandler={OnChangeHandler}
                        placeholder={"Graduation year"}
                    />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-2">
                    <ErrorMessageInput
                        type={"text"}
                        name="course"
                        value={lawyer.course}
                        OnChangeHandler={OnChangeHandler}
                        placeholder={"Course Name"}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <ErrorMessageSelect
                        multi={true}
                        errors={errors.practiceAreas}
                        name="practiceAreas"
                        className="floating"
                        value={lawyer.practiceAreas}
                        placeholder="Select practice areas"
                        options={practiceAreasOptions}
                        OnChangeHandler={MultiselectHandler}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <ErrorMessageSelect
                        multi={true}
                        name="accreditations"
                        className="floating"
                        value={lawyer.accreditations}
                        placeholder="Select accreditations"
                        options={accreditationOptions}
                        OnChangeHandler={MultiselectHandler}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <Label value={lawyer.bio} label="Bio..">
                        <textarea
                            className="form-control"
                            name="bio"
                            style={{minHeight: "100px"}}
                            form="regForm"
                            value={lawyer.bio}
                            onChange={OnChangeHandler}
                        ></textarea>
                    </Label>
                </div>
            </div>
            <button
                className="btn btn-primary btn-block btn-lg login-btn "
                type="submit"
            >
                &nbsp;Save
            </button>
        </form>
    );
};

const Label = (props) => {
    return (
        <div
            className={
                !props.value || props.value === ""
                    ? "form-group form-focus"
                    : "form-group form-focus focused"
            }
        >
            {props.children}
            <label className="focus-label">{props.label}</label>
        </div>
    );
};
export default LawyerCompleteRegisteration;
