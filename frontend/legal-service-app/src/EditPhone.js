import React, { useState } from "react";
import ErrorMessageInput from "./ErrorMessageInput";
import { FaSpinner } from "react-icons/fa";

const EditPersonal = () => {
    const initUser = {
        phone: "",
        course: "",
    };
    const [user, setUser] = useState(initUser);
    const [isSaving, setSaving] = useState(false);
    const OnChangeHandler = (event) => {
        const fieldName = event.target.name;
        const nextUser = { ...user, [fieldName]: event.target.value };
        setUser(nextUser);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={OnSubmitHandler}>
            <div className="form-row">
                <div className="col">
                    <ErrorMessageInput
                        placeholder={"Telephone Number"}
                        name={"phone"}
                        value={user.phone}
                        type={"text"}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="col">
                    <ErrorMessageInput
                        placeholder={"Course"}
                        name={"course"}
                        value={user.course}
                        type={"text"}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
            </div>
            <button
                className={
                    "btn btn-primary btn-block btn-lg login-btn " +
                    (isSaving ? "cursor-not-allowed" : "")
                }
                type="submit"
                disabled={isSaving}
            >
                {isSaving && <FaSpinner className="icon-spin" />}
                &nbsp;{isSaving ? "" : "Save"}
            </button>
        </form>
    );
};

export default EditPersonal;
