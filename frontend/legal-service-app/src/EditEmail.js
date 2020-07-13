import React, {useState, useEffect} from "react";
import {editEmailValidations} from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import {FaSpinner} from "react-icons/fa";
import {toast} from 'react-toastify';
import useRequests from "./useRequests";

const EditEmail = ({email}) => {
    const [user, setUser] = useState({email: email ? email : ""});
    const [isSaving, setSaving] = useState(false);
    const [errors, addError, runValidation] = useValidation(editEmailValidations);
    const {request} = useRequests();

    useEffect(() => {
        // Load profile data
        request({
            url: 'account/personal-info',
            method: 'GET'
        }).then((response) => {
            // This will set the email field
            setUser({...response.profile_data, profile_picture_url: response.profile_data.profile_picture});
        }).catch((error) => {

        });
    }, []);

    const OnChangeHandler = (event) => {
        const nextUser = {email: event.target.value};
        setUser(nextUser);
        runValidation(nextUser, "email");
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                setSaving(true);
                request({
                    url: 'account/update-email',
                    method: 'POST',
                    data: user
                }).then((response) => {
                    // Notify of success and requirement of verifying the email
                    toast.info("Email updated successfully, please verify the email in order to complete the update");
                }).catch((error) => {
                    if (error.response.status === 422) {
                        // Email is already taken
                        addError(['email'], {'email': ['Email is taken']});
                    }
                }).finally(() => {
                    setSaving(false);
                });
            }
        });
    };

    return (
        <form onSubmit={OnSubmitHandler}>
            <div className="row form-row">
                <div className="col-sm-12 col-lg-10 col-md-9">
                    <ErrorMessageInput
                        placeholder={"Email"}
                        name={"email"}
                        value={user.email}
                        type={"text"}
                        errors={errors.email}
                        OnChangeHandler={OnChangeHandler}
                    />
                </div>
                <div className="submit-section">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={
                            "btn btn-primary submit-btn" +
                            (isSaving ? "cursor-not-allowed" : "")
                        }
                    >
                        {isSaving && <FaSpinner className="icon-spin" />}
                        <span>&nbsp;{isSaving ? "" : "Save Changes"}</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditEmail;
