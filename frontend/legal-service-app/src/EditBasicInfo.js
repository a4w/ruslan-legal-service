import React, { useState } from "react";
import { editBasicInfoValidation } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import { FaSpinner } from "react-icons/fa";
import EditEmail from "./EditEmail.js";

const EditBasicInfo = () => {
    const initUser = {
        name: "",
        surname: "",
        email: "",
        phone: "",
    };

    const [user, setUser] = useState(initUser);
    const [isSaving, setSaving] = useState(false);
    const [errors, , runValidation] = useValidation(editBasicInfoValidation);

    const OnChangeHandler = (event) => {
        const fieldName = event.target.name;
        const nextUser = { ...user, [fieldName]: event.target.value };
        setUser(nextUser);
        runValidation(nextUser, fieldName);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                console.log("safe");
                setSaving(true);
            }
        });
    };

    return (
        <>
            <form onSubmit={OnSubmitHandler}>
                <div className="form-row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ErrorMessageInput
                            placeholder={"name"}
                            name={"name"}
                            value={user.name}
                            type={"text"}
                            errors={errors.name}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ErrorMessageInput
                            placeholder={"surname"}
                            name={"surname"}
                            value={user.surname}
                            type={"text"}
                            errors={errors.surname}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <ErrorMessageInput
                            placeholder={"Telegpone Number"}
                            name={"phone"}
                            value={user.phone}
                            type={"text"}
                            errors={errors.phone}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-12">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={
                                "btn btn-primary search-btn btn-block btn-lg" +
                                (isSaving ? "cursor-not-allowed" : "")
                            }
                        >
                            {isSaving && <FaSpinner className="icon-spin" />}
                            <i
                                className="fas fa-check"
                                style={{
                                    display: isSaving ? "none" : "inline-block",
                                }}
                            ></i>{" "}
                            <span>&nbsp;{isSaving ? "" : "Save"}</span>
                        </button>
                    </div>
                </div>
            </form>
            <hr></hr>
            <EditEmail email={"test"} />
        </>
    );
};

export default EditBasicInfo;
