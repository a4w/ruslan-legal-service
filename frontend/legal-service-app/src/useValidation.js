import { useState, useEffect } from "react";
import { passingValidation } from "../public/utilities/Validations";

const useValidation = (vest) => {
    const [validation, setValidation] = useState(passingValidation);
    const [resolver, setResolver] = useState({ resolve: null });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        let nextErrors = errors;
        for (let tested of validation.tested) {
            nextErrors = { ...nextErrors, [tested]: validation.getErrors(tested) };
        }

        setErrors(nextErrors);
        if (typeof resolver.resolve === "function") {
            resolver.resolve(validation.hasErrors(), nextErrors);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validation]);

    const run = (subject, field = false, errorObj = false) => {
        if (errorObj) {
            setErrors({ ...errors, ...subject });
        } else if (!field) {
            setValidation(vest(subject));
        } else {
            setValidation(vest(subject, field));
        }
        return new Promise((resolve, _) => {
            setResolver({
                resolve: (hasErrors, errors) => {
                    resolve(hasErrors, errors);
                },
            });
        });
    };
    const addError = (field, error) => {
        const nextErrors = { ...errors, [field]: error };
        setErrors(nextErrors);
    };

    return [errors, addError, run];
};

export default useValidation;
