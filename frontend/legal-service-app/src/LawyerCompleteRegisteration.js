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
    const options = [
        { value: "solicitor", label: "Solicitor" },
        { value: "barrister", label: "Barrister" },
        { value: "other", label: "Other" },
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
                        options={options}
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
            <Label value={lawyer.bio} label="Bio..">
                <textarea
                    className="form-control"
                    name="bio"
                    form="regForm"
                    value={lawyer.bio}
                    onChange={OnChangeHandler}
                ></textarea>
            </Label>

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
