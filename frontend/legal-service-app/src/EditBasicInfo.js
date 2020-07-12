import React, { useState, useEffect } from "react";
import { editBasicInfoValidation } from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import { FaSpinner } from "react-icons/fa";
import { request } from "./Axios";
import { toast } from "react-toastify";
import Img from "./Img";

const EditBasicInfo = () => {
    const initUser = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        profile_picture_url: "",
        profile_picture: null,
    };
    const [user, setUser] = useState(initUser);
    const [isSaving, setSaving] = useState(false);
    const [errors, , runValidation] = useValidation(editBasicInfoValidation);

    useEffect(() => {
        // Load profile data
        request({
            url: 'account/personal-info',
            method: 'GET'
        }).then((response) => {
            setUser({ ...response.profile_data, profile_picture_url:response.profile_data.profile_picture});
        }).catch((error) => { });
    }, []);

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
                setSaving(true);
            }
            request({
                url: 'account/personal-info',
                method: 'POST',
                data: user
            }).then((response) => {
                setSaving(false);
                toast.success("Profile updated successfully!");
            }).catch((error) => {
            });
            if (user.profile_picture !== null) {
                const formData = new FormData();
                const file = user.profile_picture;
                formData.append('profile_picture', file);
                request({
                    url: 'account/upload-profile-picture',
                    method: 'POST',
                    data: formData
                }).then((response) => {
                }).catch((error) => { });
            }
        });
    };

    const showSelectedPicture = (e) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser({ ...user, profile_picture_url: e.target.result, profile_picture: input.files[0] });
            };
            reader.readAsDataURL(input.files[0]);
        }
    };


    return (
        <form onSubmit={OnSubmitHandler}>
            <div className="row form-row">
                <div className="col-12 col-md-12">
                    <div className="form-group">
                        <div className="change-avatar">
                            <div className="profile-img">
                                <Img
                                    src={user.profile_picture_url}
                                    alt="User"
                                />
                            </div>
                            <div className="upload-img">
                                <div className="change-photo-btn">
                                    <span>
                                        <i className="fa fa-upload"></i> Upload
                                        Photo
                                    </span>
                                    <input type="file" accept="image/png,image/jpeg,image/jpg,image/gif" onChange={showSelectedPicture} className="upload" />
                                </div>
                                <small className="form-text text-muted">
                                    Allowed JPG, GIF or PNG. Max size of 2MB
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"First Name"}
                            name={"name"}
                            value={user.name}
                            type={"text"}
                            errors={errors.name}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"Last Name"}
                            name={"surname"}
                            value={user.surname}
                            type={"text"}
                            errors={errors.surname}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-lg-10 col-md-9">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"Telephone Number"}
                            name={"phone"}
                            value={user.phone}
                            type={"text"}
                            errors={errors.phone}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
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

export default EditBasicInfo;
