import React, { useState } from "react";
import { editPasswordValidation } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";

const EditPassword = () => {
    const initUser = {
        oldPassword: "",
        newPassword: "",
        passwordConfirm: "",
    };

    const [user, setUser] = useState(initUser);
    const [errors, , runValidation] = useValidation(editPasswordValidation);

    const OnChangeHandler = ({ target: { name, value } }) => {
        const nextUser = { ...user, [name]: value };
        setUser(nextUser);
        runValidation(nextUser, name);
        if (name === "newPassword" && nextUser.passwordConfirm !== "")
            runValidation(nextUser, "passwordConfirm");
    };

    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                console.log("safe");
            }
        });
    };

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={OnSubmitHandler}>
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"Old Password"}
                            name={"oldPassword"}
                            value={user.oldPassword}
                            type={"password"}
                            errors={errors.oldPassword}
                            OnChangeHandler={OnChangeHandler}
                            disabled={true}
                        />
                    </div>
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"New Password"}
                            name={"newPassword"}
                            value={user.newPassword}
                            type={"password"}
                            errors={errors.newPassword}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"Confirm New Password"}
                            name={"passwordConfirm"}
                            value={user.passwordConfirm}
                            type={"password"}
                            errors={errors.passwordConfirm}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                    <div className="submit-section">
                        <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPassword;
