import React, {useState} from "react";
import {editPasswordValidation} from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import {toast} from "react-toastify";
import useRequests from "./useRequests";
import SpinnerButton from "./SpinnerButton";

const EditPassword = () => {
    const initUser = {
        oldPassword: "",
        newPassword: "",
        passwordConfirm: "",
    };
    const {request} = useRequests();

    const [user, setUser] = useState(initUser);
    const [errors, , runValidation] = useValidation(editPasswordValidation);
    const [loading, setLoading] = useState(false);

    const OnChangeHandler = ({target: {name, value}}) => {
        const nextUser = {...user, [name]: value};
        setUser(nextUser);
        runValidation(nextUser, name);
    };

    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                setLoading(true);
                const passwords = {
                    new_password: user.newPassword,
                    old_password: user.oldPassword,
                };
                console.log("safe");
                request({
                    url: "/account/update-password",
                    method: "POST",
                    data: passwords,
                })
                    .then((data) => {
                        toast.success("Password changed successfuly");
                    })
                    .catch((error) => {})
                    .finally(()=>{
                        setLoading(false);
                    });
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
                        <SpinnerButton
                            type="submit"
                            className="btn btn-primary submit-btn"
                            loading={loading}
                        >
                            Save Changes
                        </SpinnerButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPassword;
