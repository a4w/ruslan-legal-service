import React, { useState } from "react";
import { editPasswordValidation } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";

const EditPassword = () => {
    const initUser = {
        password: "",
        passwordConfirm: "",
    };

    const [user, setUser] = useState(initUser);
    const [errors, , runValidation] = useValidation(editPasswordValidation);

    const OnChangeHandler = ({ target: { name, value } }) => {
        const nextUser = { ...user, [name]: value };
        setUser(nextUser);
        runValidation(nextUser, name);
        if (name === "password" && nextUser.passwordConfirm !== "")
            runValidation(nextUser, "passwordConfirm");
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
                <div className="col-lg-5 col-md-4 col-sm-12">
                    <ErrorMessageInput
                        placeholder={"Password"}
                        name={"password"}
                        value={user.password}
                        type={"password"}
                        errors={errors.password}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="col-lg-5 col-md-4 col-sm-12">
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
                <div className="col-lg-2 col-md-4 col-sm-12">
                    <button
                        className="btn btn-primary btn-block btn-lg login-btn "
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditPassword;
