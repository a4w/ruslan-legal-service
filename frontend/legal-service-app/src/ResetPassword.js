import React, { useState } from "react";
import ErrorMessageInput from "./ErrorMessageInput";
const ResetPassword = () => {
    const initUser = {
        newPassword: "",
        passwordConfirm: "",
    };

    const [user, setUser] = useState(initUser);

    const OnChangeHandler = ({ target: { name, value } }) => {
        const nextUser = { ...user, [name]: value };
        setUser(nextUser);
    };

    const OnSubmitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <div className="align-items-center justify-content-center m-1">
            <div>
                <form onSubmit={OnSubmitHandler}>
                    <div className="form-row">
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <ErrorMessageInput
                                placeholder={"New Password"}
                                name={"newPassword"}
                                value={user.newPassword}
                                type={"password"}
                                OnChangeHandler={OnChangeHandler}
                            />
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-12">
                            <ErrorMessageInput
                                placeholder={"Re-Enter Password"}
                                name={"passwordConfirm"}
                                value={user.passwordConfirm}
                                type={"password"}
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
