import React, { useState } from "react";
import { editEmailValidations } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import { FaSpinner } from "react-icons/fa";

const EditBasicInfo = () => {
    const [user, setUser] = useState({ email: "" });
    const [isSaving, setSaving] = useState(false);
    const [errors, , runValidation] = useValidation(editEmailValidations);

    const OnChangeHandler = (event) => {
        const nextUser = { email: event.target.value };
        setUser(nextUser);
        runValidation(nextUser, "email");
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                console.log("safe");
                setSaving(true);
            }
        });
    };

    return (
        <form onSubmit={OnSubmitHandler}>
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <ErrorMessageInput
                        placeholder={"Email"}
                        name={"email"}
                        value={user.email}
                        type={"text"}
                        errors={errors.email}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="col-lg-4 col-md-5 col-sm-12">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={
                            "btn btn-primary search-btn btn-block btn-lg" +
                            (isSaving ? "cursor-not-allowed" : "")
                        }
                    >
                        {isSaving && <FaSpinner className="icon-spin" />}
                        <i
                            className="fas fa-check"
                            style={{
                                display: isSaving ? "none" : "inline-block",
                            }}
                        ></i>{" "}
                        <span>&nbsp;{isSaving ? "" : "Save"}</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditBasicInfo;
