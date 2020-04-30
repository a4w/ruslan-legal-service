import React, {useState} from "react";
import {registrationValidation} from "./Validations.js"
import useValidation from "./useValidation"
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";


const Register = (_) => {
    const initUser = {
        name: "",
        surName: "",
        email: "",
        number: "",
        password: "",
        isClient: true,
    };

    const [user, setUser] = useState(initUser);
    const [errors, runValidation] = useValidation(registrationValidation);


    const OnChangeHandler = (event) =>{
        const fieldName = event.target.name;
        const nextUser = {...user, [fieldName]: event.target.value};
        setUser(nextUser);
        runValidation(nextUser, fieldName);
    }

    const UserTypeHandler = () => {
        setUser({...user, isClient: !user.isClient});
    };


    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then((hasErrors, _) => {
            if(!hasErrors){
                console.log("Continue");
            }
        });
    };

    return (
        <Wrapper>
            <div className="login-header">
                <h3>
                    {user.isClient ? "Client Register" : "Lawyer Register"}
                    <button className="btn btn-link" onClick={UserTypeHandler}>
                        {user.isClient ? "Not a Client?" : "Not a Lawyer?"}
                    </button>
                </h3>
            </div>
            <form onSubmit={OnSubmitHandler}>
                <div className="form-row">
                    <div className="col">
                <Input
                    placeholder={"Name"}
                    name={"name"}
                    value={user.name}
                    type={"text"}
                    errors={errors.name}
                    OnChangeHandler={OnChangeHandler}
                />
                    </div>
                    <div className="col">
                <Input
                    placeholder={"Surname"}
                    name={"surName"}
                    value={user.surName}
                    type={"text"}
                    errors={errors.surName}
                    OnChangeHandler={OnChangeHandler}
                />
                    </div>
                </div>
                <Input
                    placeholder={"Telephone Number"}
                    name={"number"}
                    value={user.number}
                    type={"text"}
                    errors={errors.number}
                    OnChangeHandler={OnChangeHandler}
                />
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    value={user.email}
                    type={"text"}
                    errors={errors.email}
                    OnChangeHandler={OnChangeHandler}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    value={user.password}
                    type={"password"}
                    errors={errors.password}
                    OnChangeHandler={OnChangeHandler}
                />
                <div className="text-right">
                    <a className="forgot-link" href="login.html">
                        Already have an account?
          </a>
                </div>
                <Button />
                <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                </div>
                <div className="row form-row social-login">
                    <div className="col-6">
                        <a href="facebook.com" className="btn btn-facebook btn-block">
                            <i className="fab fa-facebook-f mr-1"></i> Login
            </a>
                    </div>
                    <div className="col-6">
                        <a href="google.com" className="btn btn-google btn-block">
                            <i className="fab fa-google mr-1"></i> Login
            </a>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};
const Wrapper = (props) => {
    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="account-content">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-7 col-lg-6 login-left">
                                    <img
                                        src="./assets/img/login-banner.png"
                                        className="img-fluid"
                                        alt="Doccure Register"
                                    />
                                </div>
                                <div className="col-md-12 col-lg-6 login-right">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Input = ({errors = [], placeholder, value, name, OnChangeHandler, type}) => {
    return (
        <div
            className={ value === "" ? "form-group form-focus" : "form-group form-focus focused" } >
            <input
                name={name}
                value={value}
                type={type}
                onChange={OnChangeHandler}
                className="form-control floating"
            />
            <label className="focus-label">{placeholder}</label>
            {errors.length > 0 && <label className="text-danger ml-2 font-weight-light text-xs">{errors[0]}</label>}
        </div>
    );
};
const Button = () => {
    return (
        <button
            className="btn btn-primary btn-block btn-lg login-btn"
            type="submit"
        >
            Signup
        </button>
    );
};
export default Register;
