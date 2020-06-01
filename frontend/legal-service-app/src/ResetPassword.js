import React, { useState } from "react";
import ErrorMessageInput from "./ErrorMessageInput";
import useValidation from "./useValidation";
import { resetPasswordValidation } from "./Validations";

const ResetPassword = () => {
    const initUser = {
        newPassword: "",
        passwordConfirm: "",
    };

    const [user, setUser] = useState(initUser);
    const [errors, , runValidation] = useValidation(resetPasswordValidation);

    const OnChangeHandler = ({ target: { name, value } }) => {
        const nextUser = { ...user, [name]: value };
        setUser(nextUser);
        runValidation(nextUser, name);
        if (name === "newPassword" && nextUser.passwordConfirm !== "") {
            runValidation(nextUser, "passwordConfirm");
            runValidation(nextUser, "newPassword");
        }
    };

    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                console.log("safe");
            }
        });
    };

    const style = {
        backgroundColor: "#fff",
        border: "1px solid #f0f0f0",
        borderRadius: "5px",
        padding: "25px",
    };
    return (
        <div className="align-items-center justify-content-center m-1">
            <div style={style} className="m-3">
                <form onSubmit={OnSubmitHandler}>
                    <div className="form-row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <ErrorMessageInput
                                placeholder={"New Password"}
                                name={"newPassword"}
                                value={user.newPassword}
                                type={"password"}
                                errors={errors.newPassword}
                                OnChangeHandler={OnChangeHandler}
                            />
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <ErrorMessageInput
                                placeholder={"Re-Enter Password"}
                                name={"passwordConfirm"}
                                value={user.passwordConfirm}
                                type={"password"}
                                errors={errors.passwordConfirm}
                                OnChangeHandler={OnChangeHandler}
                            />
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-12 float-right">
                            <button
                                className="btn btn-primary btn-block btn-lg login-btn "
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
