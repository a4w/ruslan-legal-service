import React, {useState, useEffect} from "react";
import {editInfoValidation} from "./Validations";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import {FaSpinner} from "react-icons/fa";
import {toast} from "react-toastify";
import useRequests from "./useRequests";
import Img from "./Img";
import RoundImg from "./RoundImg";

const EditInfo = ({Loading}) => {
    const initUser = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        profile_picture_url: "",
        profile_picture: null,
    };
    const [user, setUser] = useState(initUser);
    const [isSaving, setSaving] = useState(false);
    const [errors, , runValidation] = useValidation(editInfoValidation);
    const {request} = useRequests();
    
    useEffect(() => {
        // Load profile data
        Loading(true);
        request({
            url: "account/personal-info",
            method: "GET",
        })
            .then((response) => {
                setUser({
                    ...response.profile_data,
                    profile_picture_url: response.profile_data.profile_picture,
                    profile_picture: null,
                });
            })
            .catch((error) => {})
            .finally(() => {
                Loading(false);
            });
    }, []);

    const OnChangeHandler = (event) => {
        const fieldName = event.target.name;
        const nextUser = {...user, [fieldName]: event.target.value};
        setUser(nextUser);
        runValidation(nextUser, fieldName);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(user).then(async (hasErrors, _) => {
            if (!hasErrors) {
                setSaving(true);
                request({
                    url: 'account/personal-info',
                    method: 'POST',
                    data: user
                }).then((response) => {
                    return request({
                        url: 'account/update-address',
                        method: 'POST',
                        data: user
                    })
                }).then((response) => {
                    setSaving(false);
                    toast.success("Profile updated successfully!");
                }).catch((error) => {
                    toast.error("An error occurred");
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
                    }).catch((error) => {});
                }
            }
        });
    };

    const showSelectedPicture = (e) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            console.log(e.target.files[0].size / (1024 ** 2));
            const reader = new FileReader();
            reader.onload = (e) => {
                const next = {...user, profile_picture_url: e.target.result, profile_picture: input.files[0]};
                setUser(next);
                runValidation(next, e.target.name);
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
                            <div className="mr-3">
                                <RoundImg
                                    src={user.profile_picture_url}
                                    alt="User"
                                    diameter={100}
                                // style={{borderRadius: "100%"}}
                                />
                            </div>
                            <div className="upload-img">
                                <div className="change-photo-btn">
                                    <span>
                                        <i className="fa fa-upload"></i> Upload
                                        Photo
                                    </span>
                                    <input name="profile" type="file" accept="image/png,image/jpeg,image/jpg,image/gif" onChange={showSelectedPicture} className="upload" />
                                </div>
                                <small className="form-text text-muted">
                                    Allowed JPG, GIF or PNG. Max size of 2MB
                                </small>
                            </div>
                        </div>
                    </div>
                    {errors.profile && errors.profile.length > 0 && (
                        <label className="text-danger ml-2 font-weight-light text-xs">
                            {errors.profile[0]}
                        </label>
                    )}
                </div>
                <div className="col-12 col-md-4">
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
                <div className="col-12 col-md-4">
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
                <div className="col-12 col-md-4">
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
                <div className="col-12">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"Address"}
                            name={"address"}
                            value={user.address}
                            type={"text"}
                            errors={errors.address}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"City"}
                            name={"city"}
                            value={user.city}
                            type={"text"}
                            errors={errors.city}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"State"}
                            name={"state"}
                            value={user.state}
                            type={"text"}
                            errors={errors.state}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"Zip Code"}
                            name={"zip_code"}
                            value={user.zip_code}
                            type={"text"}
                            errors={errors.zip_code}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"Country"}
                            name={"country"}
                            value={user.country}
                            type={"text"}
                            errors={errors.country}
                            OnChangeHandler={OnChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="submit-section w-100">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className={
                                "btn btn-primary submit-btn btn-block float-right" +
                                (isSaving ? "cursor-not-allowed" : "")
                            }
                        >
                            {isSaving && <FaSpinner className="icon-spin" />}
                            <span>&nbsp;{isSaving ? "" : "Update profile"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditInfo;
