import React, {useState} from "react";
import {registrationValidation} from "./Validations.js";
import useValidation from "./useValidation";
import Input from "./Input";

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
                console.log("Continue");
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
