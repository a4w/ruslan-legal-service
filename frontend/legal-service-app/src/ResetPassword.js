import React, { useState } from "react";
import ErrorMessageInput from "./ErrorMessageInput";
import useValidation from "./useValidation";
import { resetPasswordValidation } from "./Validations";

const ResetPasswordForm = () => {
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

    // const style = {
    //     backgroundColor: "#fff",
    //     border: "1px solid #f0f0f0",
    //     borderRadius: "5px",
    //     padding: "25px",
    // };
    return (
        <div className="align-items-center justify-content-center m-1">
            <div className="m-3">
                <form onSubmit={OnSubmitHandler}>
                    <div className="from-row">
                        <ErrorMessageInput
                            placeholder={"New Password"}
                            name={"newPassword"}
                            value={user.newPassword}
                            type={"password"}
                            errors={errors.newPassword}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                    <div className="from-row">
                        <ErrorMessageInput
                            placeholder={"Re-Enter Password"}
                            name={"passwordConfirm"}
                            value={user.passwordConfirm}
                            type={"password"}
                            errors={errors.passwordConfirm}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                    <div className="form-row">
                        <button
                            className="btn btn-primary btn-block btn-lg login-btn "
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const ResetPassword = ()=>{
    return (
        <div className="content" style={{ backgroundColor: "#ffffff" }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="account-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-7 col-lg-6 login-left">
                                    <img
                                        src="./undraw_dev_productivity_umsq.svg"
                                        className="img-fluid"
                                        alt="Fogot Password"
                                    />
                                </div>
                                <div className="col-md-12 col-lg-6 login-right">
                                    <ResetPasswordForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ResetPassword;
