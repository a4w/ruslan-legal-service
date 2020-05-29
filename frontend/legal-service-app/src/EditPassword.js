import React, { useState } from "react";
import { editPasswordValidation } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";

const EditPassword = () => {
    const initUser = {
        oldPassword: "",
        newPassword: "",
        passwordConfirm: "",
    };

    const [user, setUser] = useState(initUser);
    const [errors, , runValidation] = useValidation(editPasswordValidation);

    const OnChangeHandler = ({ target: { name, value } }) => {
        const nextUser = { ...user, [name]: value };
        setUser(nextUser);
        runValidation(nextUser, name);
        if (name === "newPassword" && nextUser.passwordConfirm !== "")
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
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <ErrorMessageInput
                        placeholder={"Old Password"}
                        name={"oldPassword"}
                        value={user.oldPassword}
                        type={"password"}
                        errors={errors.oldPassword}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <ErrorMessageInput
                        placeholder={"New Password"}
                        name={"newPassword"}
                        value={user.newPassword}
                        type={"password"}
                        errors={errors.newPassword}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-6 col-md-6 col-sm-0"></div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <ErrorMessageInput
                        disabled={user.newPassword === ""}
                        placeholder={"Re-Enter Password"}
                        name={"passwordConfirm"}
                        value={user.passwordConfirm}
                        type={"password"}
                        errors={errors.passwordConfirm}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-lg-10 col-md-8 col-sm-0 float-right"></div>
                <div className="col-lg-2 col-md-4 col-sm-12 float-right">
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
