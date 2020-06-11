import React, { useState } from "react";
import { editEmailValidations } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import { FaSpinner } from "react-icons/fa";

const EditEmail = ({ email }) => {
    const [user, setUser] = useState({ email: email ? email : "" });
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
            <div className="row form-row">
                <div className="col-sm-12 col-lg-10 col-md-9">
                    <ErrorMessageInput
                        placeholder={"Email"}
                        name={"email"}
                        value={user.email}
                        type={"text"}
                        errors={errors.email}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="submit-section">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={
                            "btn btn-primary submit-btn" +
                            (isSaving ? "cursor-not-allowed" : "")
                        }
                    >
                        {isSaving && <FaSpinner className="icon-spin" />}
                        <span>&nbsp;{isSaving ? "" : "Save Changes"}</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditEmail;
