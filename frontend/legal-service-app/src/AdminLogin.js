import React, { useState, useContext } from "react";
import Img from "./Img";
import ErrorMessageInput from "./ErrorMessageInput";
import {adminLoginValidation} from "./Validations";
import useValidation from "./useValidation";
import useAdminRequest from "./useAdminRequest";
import {AuthContext} from "./App";
import SpinnerButton from "./SpinnerButton";

const AdminLogin = () => {
    const [admin, setAdmin] = useState({ username: "", password: "" });
    const [isLoggingIn, setLoggingIn] = useState(false);
    const [errors, addError, runValidation] = useValidation(adminLoginValidation);
    const {request} = useAdminRequest();
    const [auth, setAuth] = useContext(AuthContext);
    const onChange = ({ target: { name, value } }) => {
        const newAdmin = { ...admin, [name]: value };
        setAdmin(newAdmin);
        runValidation(newAdmin, name);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        runValidation(admin).then((hasErrors, _) => {
            if (!hasErrors) {
                setLoggingIn(true);
                const url = "/admin/login";
                request({url: url, method: "POST", data: admin})
                    .then((data) => {
                        console.log(data);
                        setAuth({
                            accessToken: data.access_token,
                            accountType: data.account_type,
                            refreshToken: data.refresh_token || null,
                            isLoggedIn: true,
                            accountId: data.user_id
                        });
                    })
                    .catch((_errors) => {
                        console.log("failed", _errors);
                        addError(["password", "username"], {
                            password: ["Invalid password supplied"],
                        });
                    })
                    .finally(() => {
                        setLoggingIn(false);
                    });
            }
        });
    };
    return (
        <div className="main-wrapper login-body">
            <div className="login-wrapper">
                <div className="container">
                    <div className="loginbox" style={{minHeight: "auto"}}>
                        <div className="login-right-wrap justify-content-center p-4 w-100">
                            <h1 className="text-center">Login</h1>
                            <p className="account-subtitle">
                                Access to our dashboard
                            </p>
                            <form onSubmit={onSubmit} className="w-100">
                                <div className="form-group">
                                    <ErrorMessageInput
                                        className="form-control"
                                        type="username"
                                        placeholder="Username"
                                        value={admin.username}
                                        OnChangeHandler={onChange}
                                        name="username"
                                        errors={errors.username}
                                    />
                                </div>
                                <div className="form-group mb-4">
                                    <ErrorMessageInput
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        value={admin.password}
                                        OnChangeHandler={onChange}
                                        name="password"
                                        errors={errors.password}
                                    />
                                </div>
                                <div className="form-group">
                                    <SpinnerButton
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                        loading={isLoggingIn}
                                    >
                                        Login
                                    </SpinnerButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
