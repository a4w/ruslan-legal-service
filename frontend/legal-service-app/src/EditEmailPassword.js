import React, { useState } from "react";
import { editEmailPasswordValidation } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";

const EditPersonal = () => {
    const initUser = {
        email: "",
        password: "",
        passwordConfirm: "",
    };

    const [user, setUser] = useState(initUser);
    const [errors, addError, runValidation] = useValidation(
        editEmailPasswordValidation
    );

    const OnChangeHandler = ({ target: { name, value } }) => {
        const nextUser = { ...user, [name]: value };
        setUser(nextUser);
        runValidation(nextUser, name);
        if (name === "password") runValidation(nextUser, "passwordConfirm");
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
                <div className="col-6">
                    <ErrorMessageInput
                        placeholder={"Email"}
                        name={"email"}
                        value={user.email}
                        type={"text"}
                        errors={errors.email}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="col-6">
                    <ErrorMessageInput
                        placeholder={"Password"}
                        name={"password"}
                        value={user.password}
                        type={"password"}
                        errors={errors.password}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6"></div>
                <div className="col-6">
                    <ErrorMessageInput
                        disabled={user.password === ""}
                        placeholder={"Re-Enter Password"}
                        name={"passwordConfirm"}
                        value={user.passwordConfirm}
                        type={"password"}
                        errors={errors.passwordConfirm}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>
            <button
                className="btn btn-primary btn-block btn-lg login-btn "
                type="submit"
            >
                Save
            </button>
        </form>
    );
};

export default EditPersonal;
