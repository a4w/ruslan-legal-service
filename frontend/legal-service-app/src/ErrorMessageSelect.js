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
    if (typeof value === "undefined") {
        value = [];
    } else if (!multi) {
        value = [value];
    }
    // Handle values
    let selectedObjects = [];

    for (const option of options) {
        for (const i of value) {
            if (option.value === i) {
                selectedObjects.push(option);
                break;
            }
        }
    }
    return (
        <div className="form-group">
            <Select
                multi={multi}
                name={name}
                className="floating"
                values={selectedObjects}
                style={selectStyle}
                placeholder={placeholder}
                options={options}
                onChange={(values) => {
                    if (multi) {
                        const realValues = values.map((value) => {
                            return value.value;
                        });
                        return OnChangeHandler({name, values: realValues});
                    } else {
                        if (values.length === 1) {
                            return OnChangeHandler({name, value: values[0].value});
                        } else {
                            return OnChangeHandler({name, value: null});
                        }
                    }
                }}
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
