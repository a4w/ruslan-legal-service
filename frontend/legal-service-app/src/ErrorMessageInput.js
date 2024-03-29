import React from "react";

const ErrorMessageInput = ({
    errors = [],
    placeholder,
    value,
    name,
    OnChangeHandler,
    type,
    disabled = false,
}) => {
    return (
        <div
            className={
                value === ""
                    ? "form-group form-focus"
                    : "form-group form-focus focused"
            }
        >
            <input
                disabled={disabled}
                name={name}
                value={value}
                type={type}
                onChange={OnChangeHandler}
                className="form-control floating"
                disabled={disabled}
            />
            <label className="focus-label">{placeholder}</label>
            {errors.length > 0 && (
                <label className="text-danger ml-2 font-weight-light text-xs">
                    {errors[0]}
                </label>
            )}
        </div>
    );
};

export default ErrorMessageInput;
