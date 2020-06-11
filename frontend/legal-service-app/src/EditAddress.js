import React, { useState } from "react";
import useValidation from "./useValidation";
import ErrorMessageInput from "./ErrorMessageInput";
import { editAddressValidations } from "./Validations";
import { FaSpinner } from "react-icons/fa";
const EditAddress = () => {
    const initAddress = {
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    };

    const [address, setAddress] = useState(initAddress);
    const [isSaving, setSaving] = useState(false);
    const [errors, , runValidation] = useValidation(editAddressValidations);

    const OnChangeHandler = (event) => {
        const fieldName = event.target.name;
        const nextUser = { ...address, [fieldName]: event.target.value };
        setAddress(nextUser);
        runValidation(nextUser, fieldName);
    };
    const OnSubmitHandler = (event) => {
        event.preventDefault();
        runValidation(address).then(async (hasErrors, _) => {
            if (!hasErrors) {
                console.log("safe");
                setSaving(true);
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
                            name={"zip"}
                            value={address.zip}
                            type={"text"}
                            errors={errors.zip}
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
