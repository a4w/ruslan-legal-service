import React, { useState } from "react";
import Img from "./Img";
import ErrorMessageInput from "./ErrorMessageInput";

const AdminLogin = () => {
    const [admin, setAdmin] = useState({ username: "", password: "" });
    const onChange = ({ target: { name, value } }) => {
        const newAdmin = { ...admin, [name]: value };
        setAdmin(newAdmin);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(admin);
    };
    return (
        <div className="main-wrapper login-body">
            <div className="login-wrapper">
                <div className="container">
                    <div className="loginbox">
                        <div className="login-right-wrap justify-content-center p-4 w-100">
                            <h1 className="text-center">Login</h1>
                            <p className="account-subtitle">
                                Access to our dashboard
                            </p>
                            <form onSubmit={onSubmit} className="w-100">
                                <div className="form-group">
                                    <ErrorMessageInput
                                        className="form-control"
                                        type="email"
                                        placeholder="Username"
                                        value={admin.username}
                                        OnChangeHandler={onChange}
                                        name="username"
                                    />
                                </div>
                                <div className="form-group">
                                    <ErrorMessageInput
                                        className="form-control"
                                        type="password"
                                        placeholder="Password"
                                        value={admin.password}
                                        OnChangeHandler={onChange}
                                        name="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                    >
                                        Login
                                    </button>
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
