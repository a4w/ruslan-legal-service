import React, { useState } from "react";
import SpinnerButton from "./SpinnerButton";
import ErrorMessageInput from "./ErrorMessageInput";
import useAdminRequest from "./useAdminRequest";
import { addAdminValidation } from "./Validations";
import useValidation from "./useValidation";
import { toast } from "react-toastify";

const AdminEdit = () => {
    const [admin, setAdmin] = useState({
        username: "",
        password: "",
        passConfirm: "",
    });
    const [isAdding, setAdding] = useState(false);
    const [errors, addError, runValidation] = useValidation(addAdminValidation);
    const { request } = useAdminRequest();

    const onChange = ({ target: { name, value } }) => {
        const newData = { ...admin, [name]: value };
        setAdmin(newData);
        runValidation(newData, name);
        if (name === "password" && admin.passConfirm !== "")
            runValidation(newData, "passConfirm");
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(admin).then((hasErrors, _) => {
            if (!hasErrors) {
                setAdding(true);
                request({ url: "/admin/add", method: "POST", data: admin })
                    .then((response) => {
                        console.log("success", response);
                        toast.success("updated successfuly");
                    })
                    .catch(() => {})
                    .finally(() => {
                        setAdding(false);
                    });
            }
        });
    };
    return (
        <div className="justify-content-center p-4 w-100">
            <h1 className="text-center">Edit profile</h1>
            <p className="account-subtitle">Edit your username and password</p>
            <form onSubmit={OnSubmitHandler}>
                <div className="form-group">
                    <ErrorMessageInput
                        className="form-control"
                        type="username"
                        placeholder="Username"
                        name="username"
                        value={admin.username}
                        errors={errors.username}
                        OnChangeHandler={onChange}
                    />
                </div>
                <div className="form-group">
                    <ErrorMessageInput
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={admin.password}
                        errors={errors.password}
                        OnChangeHandler={onChange}
                    />
                </div>
                <div className="form-group mb-5">
                    <ErrorMessageInput
                        className="form-control"
                        type="password"
                        placeholder="Confirm Password"
                        name="passConfirm"
                        value={admin.passConfirm}
                        errors={errors.passConfirm}
                        OnChangeHandler={onChange}
                    />
                </div>
                <div className="form-group mb-0">
                    <SpinnerButton
                        className="btn btn-primary btn-block"
                        type="submit"
                        loading={isAdding}
                    >
                        Save Data
                    </SpinnerButton>
                </div>
            </form>
        </div>
    );
};
export default AdminEdit;
