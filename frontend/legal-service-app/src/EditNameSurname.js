import React, { useState } from "react";
import { editNameSurnameValidation } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import { FaSpinner } from "react-icons/fa";

const EditNameSurname = () => {
    const initUser = {
        name: "",
        surname: "",
    };

    const [user, setUser] = useState(initUser);
    const [isSaving, setSaving] = useState(false);
    const [errors, addError, runValidation] = useValidation(
        editNameSurnameValidation
    );

    const OnChangeHandler = (event) => {
        const fieldName = event.target.name;
        const nextUser = { ...user, [fieldName]: event.target.value };
        setUser(nextUser);
        runValidation(nextUser, fieldName);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                console.log("safe");
            }
        });
    };

    return (
        <form onSubmit={OnSubmitHandler}>
            <div className="form-row">
                <div className="col">
                    <ErrorMessageInput
                        placeholder={"name"}
                        name={"name"}
                        value={user.name}
                        type={"text"}
                        errors={errors.name}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="col">
                    <ErrorMessageInput
                        placeholder={"surname"}
                        name={"surname"}
                        value={user.surname}
                        type={"text"}
                        errors={errors.surname}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>

            <button
                className={
                    "btn btn-primary btn-block btn-lg login-btn " +
                    (isSaving ? "cursor-not-allowed" : "")
                }
                type="submit"
                disabled={isSaving}
            >
                {isSaving && <FaSpinner className="icon-spin" />}
                &nbsp;{isSaving ? "" : "Save"}
            </button>
        </form>
    );
};

export default EditNameSurname;
