import React, { useState } from "react";
import Select from "react-dropdown-select";

const LawyerCompleteRegisteration = (_) => {
    const [lawyer, setLawyer] = useState({});
    const OnSubmitHandler = () => {
        console.log("submitting");
    };
    const OnChangeHandler = ({ target: { value, name } }) => {
        setLawyer({ ...lawyer, [name]: value });
        console.log(lawyer);
    };
    const typeOptions = [
        { value: "solicitor", label: "Solicitor" },
        { value: "barrister", label: "Barrister" },
        { value: "other", label: "Other" },
    ];
    const practiceAreasOptions = [
        { value: "1", label: "area1" },
        { value: "2", label: "area2" },
        { value: "3", label: "area3" },
    ];
    return (
        <form onSubmit={OnSubmitHandler} id="regForm">
            <div className="form-row">
                <div className="col-3 form-group">
                    <Select
                        name="select"
                        className="form-control floating"
                        value={lawyer.type}
                        style={{ minHeight: "50px" }}
                        placeholder={
                            lawyer.type ? lawyer.type : "Select type.."
                        }
                        options={typeOptions}
                        onChange={([{ value }]) =>
                            setLawyer({ ...lawyer, type: value })
                        }
                    />
                </div>
                <div
                    className="col-3"
                    style={{
                        display: lawyer.type === "other" ? "block" : "none",
                    }}
                >
                    <Label value={lawyer.other} label="Type">
                        <input
                            name="other"
                            value={lawyer.other}
                            onChange={OnChangeHandler}
                            className="form-control floating"
                        />
                    </Label>
                </div>
            </div>
            <div className="form-row">
                <Label value={lawyer.yearLicensed} label="Year licensed">
                    <input
                        className="form-control"
                        name="yearLicensed"
                        value={lawyer.yearLicensed}
                        onChange={OnChangeHandler}
                    />
                </Label>
                <Label value={lawyer.regulatedBy} label="Regulated by">
                    <input
                        className="form-control"
                        name="regulatedBy"
                        value={lawyer.regulatedBy}
                        onChange={OnChangeHandler}
                    />
                </Label>
            </div>
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
            <div className="form-group">
                <Select
                    multi
                    name="select"
                    style={{ minHeight: "50px" }}
                    className="form-control floating"
                    value={lawyer.practiceAreas}
                    placeholder="Select practice areas"
                    options={practiceAreasOptions}
                    onChange={(values) =>
                        setLawyer({ ...lawyer, practiceAreas: values })
                    }
                />
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
