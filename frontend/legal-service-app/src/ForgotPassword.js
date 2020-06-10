import React, { useState } from "react";
import { editEmailValidations } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errors, , runValidation] = useValidation(editEmailValidations);

    const OnChangeHandler = (event) => {
        setEmail(event.target.value);
        runValidation({ email: email }, "email");
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation({ email: email }).then(async (hasErrors, _) => {
            if (!hasErrors) {
                console.log("safe");
            }
        });
    };

    return (
        <div class="content" style={{ backgroundColor: "#ffffff" }}>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <div className="account-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-7 col-lg-6 login-left">
                                    <img
                                        src="/undraw_my_password_d6kg.svg"
                                        className="img-fluid"
                                        alt="Fogot Password"
                                    />
                                </div>
                                <div className="col-md-12 col-lg-6 login-right">
                                    <div className="login-header">
                                        <h3>Forgot Password?</h3>
                                        <p className="small text-muted">
                                            Enter your email to get a password
                                            reset link
                                        </p>
                                    </div>

                                    <form onSubmit={OnSubmitHandler}>
                                        <div className="form-group form-focus">
                                            <ErrorMessageInput
                                                placeholder={"Email"}
                                                name={"email"}
                                                value={email}
                                                type={"text"}
                                                errors={errors.email}
                                                OnChangeHandler={
                                                    OnChangeHandler
                                                }
                                            />
                                        </div>
                                        <button
                                            className="btn btn-primary btn-block btn-lg login-btn"
                                            type="submit"
                                        >
                                            Reset Password
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;