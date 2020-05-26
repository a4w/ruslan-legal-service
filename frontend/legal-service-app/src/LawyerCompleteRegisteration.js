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
        <form onSubmit={OnSubmitHandler}>
            <div className="form-row">
                <div className="col-3 m-1">
                    <Select
                        name="select"
                        className="form-control floating"
                        value={lawyer.type}
                        style={{ minHeight: "48px" }}
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
                    className="col-3 m-1"
                    style={{
                        display: lawyer.type === "other" ? "block" : "none",
                    }}
                >
                    <div
                        className={
                            !lawyer.other || lawyer.other === ""
                                ? "form-group form-focus"
                                : "form-group form-focus focused"
                        }
                    >
                        <input
                            name="other"
                            value={lawyer.other}
                            onChange={OnChangeHandler}
                            className="form-control floating"
                        />
                        <label className="focus-label">Type</label>
                    </div>
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

export default LawyerCompleteRegisteration;
