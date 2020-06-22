import React, {useState, useEffect} from "react";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import {editAddressValidations} from "./Validations";
import {FaSpinner} from "react-icons/fa";
import {request} from "./Axios";
import {toast} from 'react-toastify';
const EditAddress = () => {
    const initAddress = {
        address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
    };

    const [address, setAddress] = useState(initAddress);
    const [isSaving, setSaving] = useState(false);
    const [errors, , runValidation] = useValidation(editAddressValidations);

    useEffect(() => {
        // Load profile data
        request({
            url: 'account/personal-info',
            method: 'GET'
        }).then((response) => {
            setAddress({...response.profile_data});
        }).catch((error) => {
        });
    }, []);

    const OnChangeHandler = (event) => {
        const fieldName = event.target.name;
        const nextAddress = {...address, [fieldName]: event.target.value};
        setAddress(nextAddress);
        runValidation(nextAddress, fieldName);
    };

    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(address).then(async (hasErrors, _) => {
            if (!hasErrors) {
                setSaving(true);
                request({
                    url: 'account/update-address',
                    method: 'POST',
                    data: address
                }).then((response) => {
                    toast.success("Address updated successfully");
                }).catch((error) => {
                }).finally(() => {
                    setSaving(false);
                });
            }
        });
    };

    return (
        <form onSubmit={OnSubmitHandler}>
            <div className="row form-row">
                <div className="col-12">
                    <div className="form-group">
                        <ErrorMessageInput
                            placeholder={"Address"}
                            name={"address"}
                            value={address.address}
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
                            value={address.city}
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
                            value={address.state}
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
                            value={address.zip_code}
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
                            value={address.country}
                            type={"text"}
                            errors={errors.country}
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
export default EditAddress;
