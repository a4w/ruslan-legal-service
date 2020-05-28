import React, { useState } from "react";
import ErrorMessageInput from "./ErrorMessageInput";

const EditPersonal = () => {
    const initUser = {
        email: "",
        password: "",
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
        <form onSubmit={OnSubmitHandler}>
            <div className="form-row">
                <div className="col-6">
                    <ErrorMessageInput
                        placeholder={"Email"}
                        name={"email"}
                        value={user.email}
                        type={"text"}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="col-6">
                    <ErrorMessageInput
                        placeholder={"Password"}
                        name={"password"}
                        value={user.password}
                        type={"password"}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-6"></div>
                <div className="col-6">
                    <ErrorMessageInput
                        disabled={user.password === ""}
                        placeholder={"Re-Enter Password"}
                        name={"password"}
                        value={user.passwordConfirm}
                        type={"password"}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>
            <button
                className="btn btn-primary btn-block btn-lg login-btn "
                type="submit"
            >
                Save
            </button>
        </form>
    );
};

export default EditPersonal;
