/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Input from "./Input";
import Wrapper from "./Wrapper";

const Login = () => {
    const initUser = {
        email: "",
        password: "",
    };
    const [user, setUser] = useState(initUser);
    // const [{ errors, warnings }, setValidations] = useValidate();
    const OnChangeHandler = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        // setValidations(user, null);
        // eslint-disable-next-line no-unused-vars
        const data = new FormData(event.target);
    };
    return (
        <Wrapper>
            <div className='login-header'>
                <h3>
                    Login <span>Doccure</span>
                </h3>
            </div>
            <form onSubmit={OnSubmitHandler}>
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    value={user.email}
                    type={"text"}
                    OnChangeHandler={OnChangeHandler}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    value={user.password}
                    type={"password"}
                    OnChangeHandler={OnChangeHandler}
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
                    Don’t have an account? <a href='register.html'>Register</a>
                </div>
            </form>
        </Wrapper>
    );
};
export default Login;
