import React from "react";
import Select from "react-dropdown-select";

const ErrorMessageSelect = ({
    errors = [],
    placeholder,
    value,
    name,
    OnChangeHandler,
    options,
    multi = false,
}) => {
    const selectStyle = {
        borderColor: "#dcdcdc",
        backgroundColor: "#ffffff",
        color: "#333",
        minHeight: "50px",
    };
    return (
        <div className="form-group">
            <Select
                multi={multi}
                name={name}
                className="floating"
                values={multi ? value : [value]}
                style={selectStyle}
                placeholder={placeholder}
                options={options}
                onChange={(values) => {OnChangeHandler({name, values})}}
            />
            {errors.length > 0 && (
                <label className="text-danger ml-2 font-weight-light text-xs">
                    {errors[0]}
                </label>
            )}
        </div>
    );
};

export default ErrorMessageSelect;
