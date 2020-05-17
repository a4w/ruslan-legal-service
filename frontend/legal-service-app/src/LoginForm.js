/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ErrorMessageInput from "./ErrorMessageInput";
import { Link } from "react-router-dom";
import { loginValidation } from "../public/utilities/Validations";
import useValidation from "./useValidation";

const LoginForm = () => {
    const initUser = {
        email: "",
        password: "",
    };
    const [user, setUser] = useState(initUser);
    const [errors, runValidation] = useValidation(loginValidation);
    const OnChangeHandler = ({ target: { name, value } }) => {
        const nextUser = { ...user, [name]: value };
        setUser(nextUser);
        runValidation(nextUser, name);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then((hasErrors, _) => {
            if (!hasErrors) {
                console.log("Continue");
            }
        });
    };
    return (
        <>
            <div className='login-header'>
                <h3>
                    Login <span>Lawbe</span>
                </h3>
            </div>
            <form onSubmit={OnSubmitHandler}>
                <ErrorMessageInput
                    placeholder={"Email"}
                    name={"email"}
                    value={user.email}
                    type={"text"}
                    OnChangeHandler={OnChangeHandler}
                    errors={errors.email}
                />
                <ErrorMessageInput
                    placeholder={"Password"}
                    name={"password"}
                    value={user.password}
                    type={"password"}
                    OnChangeHandler={OnChangeHandler}
                    errors={errors.password}
                />
                <div className='text-right'>
                    <a className='forgot-link' href='forgot-password.html'>
                        Forgot Password ?
                    </a>
                </div>
                <button
                    className='btn btn-primary btn-block btn-lg login-btn'
                    type='submit'
                >
                    Login
                </button>
                <div className='login-or'>
                    <span className='or-line'></span>
                    <span className='span-or'>or</span>
                </div>
                <div className='row form-row social-login'>
                    <div className='col-6'>
                        <a href='#' className='btn btn-facebook btn-block'>
                            <i className='fab fa-facebook-f mr-1'></i> Login
                        </a>
                    </div>
                    <div className='col-6'>
                        <a href='#' className='btn btn-google btn-block'>
                            <i className='fab fa-google mr-1'></i> Login
                        </a>
                    </div>
                </div>
                <div className='text-center dont-have'>
                    Don’t have an account? <Link to='/Register'>Register</Link>
                </div>
            </form>
        </>
    );
};
export default LoginForm;
