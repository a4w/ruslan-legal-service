import React, {useState, useEffect} from "react";
import ErrorMessageSelect from "./ErrorMessageSelect";
import ErrorMessageInput from "./ErrorMessageInput";
import useValidation from "./useValidation";
import {LawyerInfoValidations} from "./Validations";
import {toast} from "react-toastify"
import useRequests from "./useRequests";
import { Alert } from "react-bootstrap";
import History from "./History";

const LawyerCompleteRegisteration = ({}) => {
    const init = {
        type: 0,
        other: "",
        regulatedBy: "",
        yearLicensed: "",
        education: "",
        graduation_year: "",
        course: "",
        practiceAreas: [],
        accreditations: [],
        bio: "",
    };
    const {request} = useRequests();

    const [lawyer, setLawyer] = useState(init);
    const [errors, addError, validate] = useValidation(LawyerInfoValidations);
    const [lawyerTypeOptions, setLawyerTypeOptions] = useState([]);
    const [accreditationOptions, setAccreditationOptions] = useState([]);
    const [practiceAreaOptions, setPracticeAreaOptions] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (History.location.state && History.location.state.showAlert)
            setShow(true);
        request({
            url: 'lawyer/types',
            method: 'GET'
        }).then((response) => {
            let types = response.types.map((type, _) => {
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
                    name: 'accreditations'
                };
            });
            setAccreditationOptions(accreditations);
            return request({
                url: 'lawyer/me',
                method: 'GET'
            });
        }).then((response) => {
            const nextLawyer = {
                type: 0,
                other: "",
                regulatedBy: "",
                yearLicensed: "",
                education: "",
                graduation_year: "",
                course: "",
                practiceAreas: [],
                accreditations: [],
                bio: "",
            };
            const data = response.lawyer;
            // Set type
            nextLawyer.type = data.lawyer_type_id? data.lawyer_type_id:0;
            // hotty code from a hot person
            if (data.lawyer_type_id > 2) {
                nextLawyer.type = 0;
                nextLawyer.other = data.lawyer_type.type;
            }
            nextLawyer.regulatedBy = data.regulator.regulator;
            nextLawyer.yearLicensed = data.years_licenced;
            nextLawyer.education = data.institution;
            nextLawyer.graduation_year = data.graduation_year;
            nextLawyer.course = data.course;
            nextLawyer.practiceAreas = data.practice_areas.map((area, i) => {
                return area.id;
            });
            nextLawyer.accreditations = data.accreditations.map((accreditation, i) => {
                return accreditation.id;
            });
            nextLawyer.bio = data.biography;
            setLawyer(nextLawyer);
            validate(nextLawyer);
        }).catch((error) => {
        });
    }, []);
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        validate(lawyer).then(async (hasErrors) => {
            if (hasErrors) {
                return;
            }
            // Assuming validation works otherwise another check is needed here
            const data = {
                lawyer_type_id: lawyer.type,
                lawyer_type: lawyer.other,
                regulator: lawyer.regulatedBy,
                years_licenced: lawyer.yearLicensed,
                institution: lawyer.education,
                graduation_year: lawyer.graduation_year,
                course: lawyer.course,
                practice_areas: lawyer.practiceAreas,
                accreditations: lawyer.accreditations,
                biography: lawyer.bio,
            };
            request({
                url: 'lawyer/me',
                method: 'POST',
                data: data
            }).then((response) => {
                toast.success("Profile updated successfully");
            }).catch((error) => {
                const _errors = error.response.data.errors;
                console.log({...error});
                const fields = [];
                for (const field in _errors) {
                    fields.push(field);
                }
                console.log(_errors);
                addError(fields, _errors);
            });
        });
    };
    const OnChangeHandler = ({target: {value, name}}) => {
        console.log(name, value[0]);
        const newData = {...lawyer, [name]: value};
        setLawyer(newData);
        console.log(lawyer);
        console.log("Validating: ", name, " with: ", newData);
        validate(newData, name);
    };
    const OnSelectHandler = ({name, value}) => {
        const newData = {...lawyer, [name]: value};
        setLawyer(newData);
        validate(newData, name);
        validate(newData, "other");
    };
    const MultiselectHandler = ({name, values}) => {
        console.log(name, values);
        const newData = {...lawyer, [name]: values};
        setLawyer(newData);
        validate(newData, name);
    };


    return (
        <form onSubmit={OnSubmitHandler} id="regForm">
            {show && 
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Warning!</Alert.Heading>
                    <p>
                        Please fill all your lawyer info and provide a schedule to
                        be listed
                    </p>
                </Alert>
            }
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <ErrorMessageSelect
                        name="type"
                        errors={errors.type ? errors.type : errors.lawyer_type}
                        value={lawyer.type}
                        placeholder={"Select type.."}
                        options={lawyerTypeOptions}
                        OnChangeHandler={OnSelectHandler}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <ErrorMessageInput
                        disabled={lawyer.type !== 0}
                        errors={errors.other ? errors.other : errors.lawyer_type}
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
                        errors={errors.years_licenced}
                        value={lawyer.yearLicensed}
                        OnChangeHandler={OnChangeHandler}
                        placeholder={"Year licensed"}
                    />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9">
                    <ErrorMessageInput
                        type={"text"}
                        errors={errors.regulator}
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
                        errors={errors.institution}
                        name="education"
                        value={lawyer.education}
                        OnChangeHandler={OnChangeHandler}
                        placeholder={"Institution"}
                    />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-2">
                    <ErrorMessageInput
                        type={"text"}
                        errors={errors.graduation_year}
                        name="graduation_year"
                        value={lawyer.graduation_year}
                        OnChangeHandler={OnChangeHandler}
                        placeholder={"Graduation year"}
                    />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-2">
                    <ErrorMessageInput
                        type={"text"}
                        name="course"
                        errors={errors.course}
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
                        errors={errors.accreditations}
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
                            style={{ minHeight: "100px" }}
                            form="regForm"
                            value={lawyer.bio}
                            onChange={OnChangeHandler}
                        ></textarea>
                    </Label>
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <button
                        className="btn btn-primary btn-block btn-lg login-btn "
                        type="submit"
                    >
                        &nbsp;Save
                    </button>
                </div>
            </div>
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
            style={{
                height: 'unset'
            }}
        >
            {props.children}
            <label className="focus-label">{props.label}</label>
        </div>
    );
};
export default LawyerCompleteRegisteration;
