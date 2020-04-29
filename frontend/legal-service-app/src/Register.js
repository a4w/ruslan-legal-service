/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";

const Register = (props) => {
  const initUser = {
    name: "",
    surName: "",
    email: "",
    number: "",
    password: "",
    isClient: true,
  };
  const [user, setUser] = useState(initUser);
  const OnChangeHandler = (event) => {
    console.log("changing ", event.target.name);
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log("user", user);
  };
  const UserTypeHandler = () => {
    setUser({ ...user, isClient: !user.isClient });
  };
  const OnSubmitHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
  };
  return (
    <Wrapper>
      <div className="login-header">
        <h3>
          {user.isClient ? "Client Register" : "Lawyer Register?"}
          <a href="#" onClick={UserTypeHandler}>
            {user.isClient ? "Not a Client?" : "Not a Lawyer?"}
          </a>
        </h3>
      </div>
      <form onSubmit={OnSubmitHandler}>
        <Input
          placeholder={"Name"}
          name={"name"}
          value={user.name}
          type={"text"}
          OnChangeHandler={OnChangeHandler}
        />
        <Input
          placeholder={"Surname"}
          name={"surName"}
          value={user.surName}
          type={"text"}
          OnChangeHandler={OnChangeHandler}
        />
        <Input
          placeholder={"Telephone Number"}
          name={"number"}
          value={user.number}
          type={"number"}
          OnChangeHandler={OnChangeHandler}
        />
        <Input
          placeholder={"Email"}
          name={"email"}
          value={user.email}
          type={"email"}
          OnChangeHandler={OnChangeHandler}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          value={user.password}
          type={"password"}
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
            <a href="#" className="btn btn-facebook btn-block">
              <i className="fab fa-facebook-f mr-1"></i> Login
            </a>
          </div>
          <div className="col-6">
            <a href="#" className="btn btn-google btn-block">
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

const Input = ({ placeholder, value, name, OnChangeHandler, type }) => {
  return (
    <div className="form-group form-focus">
      <input
        name={name}
        value={value}
        type={type}
        onChange={OnChangeHandler}
        required
        className="form-control floating"
      />
      <label className="focus-label">{placeholder}</label>
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
