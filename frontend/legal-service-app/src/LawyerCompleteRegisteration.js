import React, { useState } from "react";
import ErrorMessageSelect from "./ErrorMessageSelect";

const LawyerCompleteRegisteration = (_) => {
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
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        console.log("submitting");
    };
    const OnChangeHandler = ({ target: { value, name } }) => {
        setLawyer({ ...lawyer, [name]: value });
        console.log(lawyer);
    };
    const OnSelectHandler = ([{ value, name }]) => {
        setLawyer({ ...lawyer, [name]: value });
    };
    const MultiselectHandler = (values) => {
        const [{ name }] = values;
        setLawyer({ ...lawyer, [name]: values });
    };
    const typeOptions = [
        { value: "solicitor", label: "Solicitor", name: "type" },
        { value: "barrister", label: "Barrister", name: "type" },
        { value: "other", label: "Other", name: "type" },
    ];
    const practiceAreasOptions = [
        { value: "1", label: "area1", name: "practiceAreas" },
        { value: "2", label: "area2", name: "practiceAreas" },
        { value: "3", label: "area3", name: "practiceAreas" },
    ];
    const accreditationOptions = [
        { value: "1", label: "Accreditation 1", name: "accreditations" },
        { value: "2", label: "Accreditation 2", name: "accreditations" },
        { value: "3", label: "Accreditation 3", name: "accreditations" },
    ];
    return (
        <form onSubmit={OnSubmitHandler} id="regForm">
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <ErrorMessageSelect
                        name="type"
                        value={lawyer.type}
                        placeholder={"Select type.."}
                        options={typeOptions}
                        onChange={OnSelectHandler}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                    <Label value={lawyer.other} label="Other..">
                        <input
                            name="other"
                            value={lawyer.other}
                            onChange={OnChangeHandler}
                            className="form-control floating"
                            disabled={lawyer.type !== "other"}
                        />
                    </Label>
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                    <Label value={lawyer.yearLicensed} label="Year licensed">
                        <input
                            className="form-control"
                            name="yearLicensed"
                            value={lawyer.yearLicensed}
                            onChange={OnChangeHandler}
                        />
                    </Label>
                </div>
                <div className="col-lg-9 col-md-9 col-sm-9">
                    <Label value={lawyer.regulatedBy} label="Regulated by">
                        <input
                            className="form-control"
                            name="regulatedBy"
                            value={lawyer.regulatedBy}
                            onChange={OnChangeHandler}
                        />
                    </Label>
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-8">
                    <Label value={lawyer.education} label="Institution">
                        <input
                            className="form-control"
                            name="education"
                            value={lawyer.education}
                            onChange={OnChangeHandler}
                        />
                    </Label>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-2">
                    <Label value={lawyer.graduation} label="Graduation year">
                        <input
                            className="form-control"
                            name="graduation"
                            value={lawyer.graduation}
                            onChange={OnChangeHandler}
                        />
                    </Label>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-2">
                    <Label value={lawyer.course} label="Course Name">
                        <input
                            className="form-control"
                            name="course"
                            value={lawyer.course}
                            onChange={OnChangeHandler}
                        />
                    </Label>
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <ErrorMessageSelect
                        multi={true}
                        name="practiceAreas"
                        className="floating"
                        value={lawyer.practiceAreas}
                        placeholder="Select practice areas"
                        options={practiceAreasOptions}
                        onChange={MultiselectHandler}
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
                        onChange={MultiselectHandler}
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
            <button
                className="btn btn-primary btn-block btn-lg login-btn "
                type="submit"
            >
                &nbsp;Register
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
