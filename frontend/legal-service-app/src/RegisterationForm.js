import React, {useState} from "react";
import {registrationValidation} from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import {FaSpinner} from "react-icons/fa";
import FacebookButton from "./FacebookButton";
import GoogleButton from "./GoogleButton";
import History from "./History";
import useRequests from "./useRequests";

const RegisterationForm = ({back}) => {
    const initUser = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
        isClient: true,
    };
    const {request} = useRequests();

    const [user, setUser] = useState(initUser);
    const [isRegistering, setIsRegistering] = useState(false);
    const [errors, addError, runValidation] = useValidation(
        registrationValidation
    );

    const OnChangeHandler = (event) => {
        const fieldName = event.target.name;
        const nextUser = {...user, [fieldName]: event.target.value};
        setUser(nextUser);
        runValidation(nextUser, fieldName);
    };

    const UserTypeHandler = () => {
        setUser({...user, isClient: !user.isClient});
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                setIsRegistering(true);
                let url = "";

                if (user.isClient) url = "/register/client";
                else url = "/register/lawyer";
                request({url: url, method: "POST", data: user})
                    .then((response) => {
                        console.log("success", response);
                        History.replace("/post-register");
                    })
                    .catch((errors) => {
                        const _errors = errors.response.data.errors;
                        const fields = [];
                        for (const field in _errors) {
                            fields.push(field);
                        }
                        addError(fields, _errors);
                    })
                    .finally(() => {
                        setIsRegistering(false);
                    });
            }
        });
    };

    return (
        <RegisterationWrapper isClient={user.isClient}>
            <div className="login-header">
                <h5>
                    {user.isClient ? "Client Register" : "Lawyer Register"}
                    <button
                        className="btn btn-link text-right"
                        onClick={UserTypeHandler}
                    >
                        {user.isClient ? "Not a Client?" : "Not a Lawyer?"}
                    </button>
                </h5>
            </div>
            <form onSubmit={OnSubmitHandler}>
                <div className="form-row">
                    <div className="col">
                        <ErrorMessageInput
                            placeholder={"Name"}
                            name={"name"}
                            value={user.name}
                            type={"text"}
                            errors={errors.name}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                    <div className="col">
                        <ErrorMessageInput
                            placeholder={"surname"}
                            name={"surname"}
                            value={user.surname}
                            type={"text"}
                            errors={errors.surname}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <ErrorMessageInput
                    placeholder={"Telephone Number"}
                    name={"phone"}
                    value={user.phone}
                    type={"text"}
                    errors={errors.phone}
                    OnChangeHandler={OnChangeHandler}
                />
                <ErrorMessageInput
                    placeholder={"Email"}
                    name={"email"}
                    value={user.email}
                    type={"text"}
                    errors={errors.email}
                    OnChangeHandler={OnChangeHandler}
                />
                <ErrorMessageInput
                    placeholder={"Password"}
                    name={"password"}
                    value={user.password}
                    type={"password"}
                    errors={errors.password}
                    OnChangeHandler={OnChangeHandler}
                />
                <div className="text-right">
                    <a
                        style={{cursor: "pointer"}}
                        onClick={() =>
                            History.replace(
                                `${back}/login`
                            )
                        }
                        className="forgot-link"
                    >
                        Already have an account?
                    </a>
                </div>
                <button
                    className={
                        "btn btn-primary btn-block btn-lg login-btn " +
                        (isRegistering ? "cursor-not-allowed" : "")
                    }
                    type="submit"
                    disabled={isRegistering}
                >
                    {isRegistering && <FaSpinner className="icon-spin" />}
                    &nbsp;{isRegistering ? "" : "Register"}
                </button>
                <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                </div>
                <div className="row form-row social-login">
                    <div className="col-6">
                        <FacebookButton register />
                    </div>
                    <div className="col-6">
                        {/* <a
                            href="google.com"
                            className="btn btn-google btn-block"
                        >
                            <i className="fab fa-google mr-1"></i> Login
                        </a> */}
                        <GoogleButton register />
                    </div>
                </div>
            </form>
        </RegisterationWrapper>
    );
};

const RegisterationWrapper = (props) => {
    return (
        <div className="account-content">
            <div className="row align-items-center justify-content-center">
                <div className="col-lg-5 login-left">
                    <img
                        src={
                            props.isClient
                                ? "/undraw_personal_info.svg"
                                : "/undraw_businessman.svg"
                        }
                        className="img-fluid"
                        alt="Register"
                    />
                </div>
                <div className="col-md-12 col-lg-7 login-right">
                    {props.children}
                </div>
            </div>
        </div>
    );
};
export default RegisterationForm;
