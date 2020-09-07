import React, {useState} from "react";
import SpinnerButton from "./SpinnerButton";
import ErrorMessageInput from "./ErrorMessageInput";
import useRequests from "./useRequests";
import { addAdminValidation } from "./Validations";
import useValidation from "./useValidation";
import { toast } from "react-toastify";

const AddAdmin = () => {
    const [admin, setAdmin] = useState({ name:"", username: "", password: "", passConfirm:"" });
    const [isAdding, setAdding] = useState(false);
    const [errors, addError, runValidation] = useValidation(addAdminValidation);
    const {request} = useRequests();

    const onChange = ({ target: { name, value } }) => {
        const newAdmin = { ...admin, [name]: value };
        setAdmin(newAdmin);
        runValidation(newAdmin, name);
        if (name === "password" && admin.passConfirm !== "")
            runValidation(newAdmin, "passConfirm");

    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(admin).then((hasErrors, _) => {
            if (!hasErrors) {
                setAdding(true);
                request({ url: "/admin/add", method: "POST", data: admin })
                    .then((response) => {
                        console.log("success", response);
                        toast.success("Added Admin")
                    })
                    .catch((errors) => {
                        const _errors = errors.response.data.errors;
                        const fields = [];
                        for (const field in _errors) {
                            fields.push(field);
                        }
                        addError(fields, _errors);
                    })
                    .finally(() => {
                        setAdding(false);
                    });
            }
        });
    };
    return (
        <div className="justify-content-center p-4 w-100">
            <h1 className="text-center">Add Admin</h1>
            <p className="account-subtitle">Access to our dashboard</p>
            <form onSubmit={OnSubmitHandler}>
                <div>
                    <ErrorMessageInput
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={admin.name}
                        errors={errors.name}
                        OnChangeHandler={onChange}
                    />
                </div>
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
                        Add Admin
                    </SpinnerButton>
                </div>
            </form>
        </div>
    );
};
export default AddAdmin;