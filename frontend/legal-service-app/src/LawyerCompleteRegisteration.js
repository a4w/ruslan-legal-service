import React, {useState, useEffect} from "react";
import ErrorMessageSelect from "./ErrorMessageSelect";
import ErrorMessageInput from "./ErrorMessageInput";
import useValidation from "./useValidation";
import {LawyerInfoValidations} from "./Validations";
import {request} from "./Axios"

const LawyerCompleteRegisteration = ({}) => {
    const init = {
        type: [],
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
    const [lawyerTypeOptions, setLawyerTypeOptions] = useState([]);
    const [accreditationOptions, setAccreditationOptions] = useState([]);
    const [practiceAreaOptions, setPracticeAreaOptions] = useState([]);

    useEffect(() => {
        request({
            url: 'lawyer/types',
            method: 'GET'
        }).then((response) => {
            let types = response.types.map((type, i) => {
                return {
                    label: type.type,
                    value: type.id,
                    name: "type"
                };
            });
            types.push({
                label: 'Other',
                value: 0,
                name: 'type'
            });
            setLawyerTypeOptions(types);
            return request({
                url: 'lawyer/practice-areas',
                method: 'GET'
            });
        }).then((response) => {
            const areas = response.areas.map((area, i) => {
                return {
                    label: area.area,
                    value: area.id,
                    name: 'practiceAreas'
                };
            });
            setPracticeAreaOptions(areas);

            return request({
                url: 'lawyer/accreditations',
                method: 'GET'
            });
        }).then((response) => {
            const accreditations = response.accreditations.map((accreditation, i) => {
                return {
                    label: accreditation.accreditation,
                    value: accreditation.id,
                    name: 'accreditation'
                };
            });
            setAccreditationOptions(accreditations);
            return request({
                url: 'lawyer/me',
                method: 'GET'
            });
        }).then((response) => {
            const nextLawyer = {
                type: [0],
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
            // Set type
            nextLawyer.type = [{value: data.lawyer_type_id, label: data.lawyer_type.type}];
            nextLawyer.regulatedBy = data.regulator.regulator;
            nextLawyer.yearLicensed = data.years_licenced;
            nextLawyer.education = data.institution;
            nextLawyer.graduation = data.graduation_year;
            nextLawyer.course = data.course;
            nextLawyer.practiceAreas = data.practice_areas.map((area, i) => {
                return {
                    label: area.area,
                    value: area.id
                };
            });
            nextLawyer.accreditations = data.accreditations.map((accreditation, i) => {
                return {
                    label: accreditation.accreditation,
                    value: accreditation.id
                };
            });
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


    return (
        <form onSubmit={OnSubmitHandler} id="regForm">
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <ErrorMessageSelect
                        name="type"
                        errors={errors.type}
                        value={lawyer.type}
                        placeholder={"Select type.."}
                        options={lawyerTypeOptions}
                        OnChangeHandler={OnSelectHandler}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <ErrorMessageInput
                        disabled={lawyer.type !== 0}
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
                        options={practiceAreaOptions}
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
