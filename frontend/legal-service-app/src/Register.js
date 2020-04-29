import React, { useState } from "react";
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/style.css";

const Register = () => {
  const initUser = {
    Name: "",
    Surname: "",
    Email: "",
    Phone: "",
    Password: "",
  };
  const [user, setUser] = useState(initUser);
  const fields = ["Name", "Surname", "Email", "Phone", "Password"];
  const OnChangeHandler = (event) => {
    console.log("changing ", event.target.name);
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log("user", user);
  };
  // <div>
  //     {users.map((element) => (<Card key={element.id} {...element} />
  //     ))}
  //   </div>
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="account-content">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-7 col-lg-6 login-left">
                  {/* <img
                    src="assets/img/login-banner.png"
                    className="img-fluid"
                    alt="Doccure Register"
                  /> */}
                </div>
                <div className="col-md-12 col-lg-6 login-right">
                  <div className="login-header">
                    <h3>
                      Patient Register{" "}
                      {/* <a href="doctor-register.html">Are you a Doctor?</a> */}
                    </h3>
                  </div>

                  <form>
                    {fields.map((element) => (
                      <Input
                        key={element}
                        name={element}
                        value={user[element]}
                        type={element}
                        OnChangeHandler={OnChangeHandler}
                      />
                    ))}
                    <div className="text-right">
                      {/* <a className="forgot-link" href="login.html">
                        Already have an account?
                      </a> */}
                    </div>
                    <button
                      className="btn btn-primary btn-block btn-lg login-btn"
                      type="submit"
                    >
                      Signup
                    </button>
                    <div className="login-or">
                      <span className="or-line"></span>
                      <span className="span-or">or</span>
                    </div>
                    <div className="row form-row social-login">
                      <div className="col-6">
                        {/* <a href="#" className="btn btn-facebook btn-block">
                          <i className="fab fa-facebook-f mr-1"></i> Login
                        </a> */}
                      </div>
                      <div className="col-6">
                        {/* <a href="#" className="btn btn-google btn-block">
                          <i className="fab fa-google mr-1"></i> Login
                        </a> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// submitEvent={submitEvent}
//           placeholder={"password"}
//           value={user.password}
//           type={"password"}
//           name={"password"}
//           OnChangeHandler={OnChangeHandler}
//           required={true}

const Input = ({ value, name, OnChangeHandler, type }) => {
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
      <label className="focus-label">{name}</label>
    </div>
  );
};
export default Register;
