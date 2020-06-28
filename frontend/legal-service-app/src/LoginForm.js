/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import ErrorMessageInput from "./ErrorMessageInput";
import {loginValidation} from "./Validations";
import useValidation from "./useValidation";
import {request, setAccessToken, setRefreshToken} from "./Axios";
import {FaSpinner} from "react-icons/fa";
import {Link} from "react-router-dom";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import History from "./History";

function getParent(url){
    const reversed = url.split("").reverse().join("")
    const n = reversed.indexOf("/");
    const parent = reversed.substr(n+1);
    return parent.split("").reverse().join("");
}

const LoginForm = () => {
    const initUser = {
        email: "",
        password: "",
        refresh_token: false,
    };
    const [user, setUser] = useState(initUser);
    const [isLoggingIn, setLoggingIn] = useState(false);
    const [errors, addError, runValidation] = useValidation(loginValidation);
    
    const OnChangeHandler = ({target: {name, value}}) => {
        const nextUser = {...user, [name]: value};
        setUser(nextUser);
        runValidation(nextUser, name);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then((hasErrors, _) => {
            if (!hasErrors) {
                setLoggingIn(true);
                const url = "/auth/login";
                request({url: url, method: "POST", data: user})
                    .then((data) => {
                        console.log("success", data);
                        if (data.access_token) {
                            console.log("Setting shit");
                            setAccessToken(data.access_token);
                        }
                        if (data.refresh_token)
                            setRefreshToken(data.refresh_token);
                    })
                    .catch((_errors) => {
                        console.log("failed", _errors);
                        addError(["password", "email"], {
                            email: ["Invalid User"],
                            password: ["Invalid User"],
                        });
                    })
                    .finally(() => {
                        setLoggingIn(false);
                    });
            }
        });
    };
    return (
        <LoginWrapper>
            <div className="login-header">
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
                <div className="form-row">
                    <div className="col">
                        <div>
                            <label className="custom_check">
                                <input
                                    type="checkbox"
                                    name="refresh_token"
                                    value={user.refresh_token}
                                    onChange={() =>
                                        setUser({
                                            ...user,
                                            refresh_token: !user.refresh_token,
                                        })
                                    }
                                />
                                <span className="checkmark"></span> remember me
                            </label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="text-right">
                            <Link
                                className="forgot-link"
                                to="/forgot-password"
                            >
                                Forgot Password ?
                            </Link>
                        </div>
                    </div>
                </div>
                <button
                    className={
                        "btn btn-primary btn-block btn-lg login-btn " +
                        (isLoggingIn ? "cursor-not-allowed" : "")
                    }
                    type="submit"
                    disabled={isLoggingIn}
                >
                    {isLoggingIn && <FaSpinner className="icon-spin" />}
                    &nbsp;{isLoggingIn ? "" : "Login"}
                </button>
                <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                </div>
                <div className="row form-row social-login">
                    <div className="col-6">
                        <FacebookButton />
                    </div>
                    <div className="col-6">
                        {/* <a href="#" className="btn btn-google btn-block">
                            <i className="fab fa-google mr-1"></i> Login
                        </a> */}
                        <GoogleButton />
                    </div>
                </div>
                <div className="text-center dont-have">
                    Don’t have an account?
                    <Link
                        // to={`${getParent(History.location.pathname)}/register`}
                        onClick={() =>
                            History.replace(
                                `${getParent(History.location.pathname)}/register`
                            )
                        }
                    >
                        {" "}
                        Register
                    </Link>
                </div>
            </form>
        </LoginWrapper>
    );
};
const LoginWrapper = (props) => {
    return (
        <div className="account-content">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-7 col-lg-6 login-left">
                    <img
                        src="/undraw_welcoming_xvuq.svg"
                        className="img-fluid"
                        alt="Register"
                    />
                </div>
                <div className="col-md-12 col-lg-5 login-right">
                    {props.children}
                </div>
            </div>
        </div>
    );
};
export default LoginForm;
export {getParent};
