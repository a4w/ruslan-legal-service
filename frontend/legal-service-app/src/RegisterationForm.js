import React, { useState } from "react";
import axios from "axios";
import { registrationValidation } from "../public/utilities/Validations.js";
import useValidation from "./useValidation";
import Input from "./Input";
import { Link } from "react-router-dom";
import Config from "./Config.js";

const RegisterationForm = (_) => {
    const initUser = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
        isClient: true,
    };

    const [user, setUser] = useState(initUser);
    const [errors, addError, runValidation] = useValidation(registrationValidation);

    const OnChangeHandler = (event) => {
        const fieldName = event.target.name;
        const nextUser = { ...user, [fieldName]: event.target.value };
        setUser(nextUser);
        runValidation(nextUser, addError, fieldName);
    };

    const UserTypeHandler = () => {
        setUser({ ...user, isClient: !user.isClient });
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                let url = Config.api_url;
                const cfg = Config.headers;

                if (user.isClient) url = url + "/register/client";
                else url = url + "/register/lawyer";

                axios
                    .post(url, user, cfg.headers)
                    .then((response) => {
                        console.log("success");
                    })
                    .catch((error) => {
                        if (error.response) {
                            const data = error.response.data;
                            const _errors = data.errors;
                            for (const field in _errors) {
                                addError(field, _errors[field]);
                            }
                        }
                    });
            }
        });
    };

    return (
        <>
            <div className='login-header'>
                <h3>
                    {user.isClient ? "Client Register" : "Lawyer Register"}
                    <button className='btn btn-link' onClick={UserTypeHandler}>
                        {user.isClient ? "Not a Client?" : "Not a Lawyer?"}
                    </button>
                </h3>
            </div>
            <form onSubmit={OnSubmitHandler}>
                <div className='form-row'>
                    <div className='col'>
                        <Input
                            placeholder={"Name"}
                            name={"name"}
                            value={user.name}
                            type={"text"}
                            errors={errors.name}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                    <div className='col'>
                        <Input
                            placeholder={"surname"}
                            name={"surname"}
                            value={user.surname}
                            type={"text"}
                            errors={errors.surname}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <Input
                    placeholder={"Telephone Number"}
                    name={"phone"}
                    value={user.phone}
                    type={"text"}
                    errors={errors.phone}
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
                <div className='text-right'>
                    <Link to='/login' className='forgot-link'>
                        Already have an account?
                    </Link>
                </div>
                <Button />
                <div className='login-or'>
                    <span className='or-line'></span>
                    <span className='span-or'>or</span>
                </div>
                <div className='row form-row social-login'>
                    <div className='col-6'>
                        <a href='facebook.com' className='btn btn-facebook btn-block'>
                            <i className='fab fa-facebook-f mr-1'></i> Login
                        </a>
                    </div>
                    <div className='col-6'>
                        <a href='google.com' className='btn btn-google btn-block'>
                            <i className='fab fa-google mr-1'></i> Login
                        </a>
                    </div>
                </div>
            </form>
        </>
    );
};

const Button = () => {
    return (
        <button className='btn btn-primary btn-block btn-lg login-btn' type='submit'>
            Signup
        </button>
    );
};
export default RegisterationForm;
