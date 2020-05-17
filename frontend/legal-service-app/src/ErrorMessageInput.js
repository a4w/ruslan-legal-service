import React from "react";

const ErrorMessageInput = ({
    errors = [],
    placeholder,
    value,
    name,
    OnChangeHandler,
    type,
}) => {
    return (
        <div
            className={
                value === "" ? "form-group form-focus" : "form-group form-focus focused"
            }
        >
            <input
                name={name}
                value={value}
                type={type}
                onChange={OnChangeHandler}
                className='form-control floating'
            />
            <label className='focus-label'>{placeholder}</label>
            {errors.length > 0 && (
                <label className='text-danger ml-2 font-weight-light text-xs'>
                    {errors[0]}
                </label>
            )}
        </div>
    );
};

export default ErrorMessageInput;
