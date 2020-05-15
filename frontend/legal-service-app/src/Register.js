import React, {useState} from "react";
import axios from "axios"
import {registrationValidation} from "./Validations.js";
import useValidation from "./useValidation";
import Input from "./Input";
import history from "./history";

const Register = (props) => {
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
        const nextUser = {...user, [fieldName]: event.target.value};
        setUser(nextUser);
        runValidation(nextUser, fieldName);
    };

    const UserTypeHandler = () => {
        setUser({...user, isClient: !user.isClient});
    };

    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then((hasErrors, _) => {
            if (!hasErrors) {
                if (!hasErrors) {
                    let url = "http://localhost:8000";
                    if (user.isClient) {
                        url = url + "/api/register/client";
                    } else {
                        url = url + "/api/register/lawyer";
                    }

                    axios.post(url, user, [{'Content-Type': 'application/json'}])
                        .then((_) => {
                            history.push("/post-registration");
                        })
                        .catch((error) => {
                            if (error.response && error.response.status === 422) {
                                const data = error.response.data;
                                const _errors = data.errors;
                                for (const field in data.errors) {
                                    addError(field, data.errors[field]);
                                }
                            }
                        });
                }
            }
        });
    };

    return (
        <div className="account-content">
            <div className="row align-items-center justify-content-center">
                <div className="col-md-7 col-lg-6 login-left">
                    <img src={user.isClient ? "/undraw_personal_info.svg" : "/undraw_businessman.svg"} className="img-fluid" alt="Register" />
                </div>
                <div className="col-md-12 col-lg-6 login-right">
                    <div className='login-header'>
                        <h5>
                            {user.isClient ? "Client Registration" : "Lawyer Registration"}
                            <button className='btn btn-link' onClick={UserTypeHandler}>
                                {user.isClient ? "Are you a lawyer?" : "Not a Lawyer?"}
                            </button>
                        </h5>
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
                                    placeholder={"Surname"}
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
                        <Button />
                    </form>
                </div>
            </div>
        </div>
    );
};

const Button = () => {
    return (
        <button className='btn btn-primary btn-block btn-lg login-btn' type='submit'>
            Signup
        </button>
    );
};
export default Register;
