import {useState, useEffect} from "react";
import {passingValidation} from "./Validations";

const useValidation = (vest) => {
    const [validation, setValidation] = useState(passingValidation);
    const [resolver, setResolver] = useState({resolve: null});
    const [errors, setErrors] = useState({});
    useEffect(()=>{
        let nextErrors = {};
        let hasErrors = false;
        for(let tested of validation.tested){
            if(validation.getErrors(tested).length > 0){
                nextErrors = {...nextErrors, [tested]: validation.getErrors(tested)};
                hasErrors = true;
            }else{
                delete nextErrors[tested];
            }
        }
        setErrors(nextErrors);
        if(typeof resolver.resolve === "function"){
            resolver.resolve(hasErrors, nextErrors);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validation]);

    const run = (subject, field = false) => {
        if(!field){
            setValidation(vest(subject));
        }else{
            setValidation(vest(subject, field));
        }
        return new Promise((resolve, _) => {
            setResolver({
                resolve: (errors) => {
                    resolve(errors);
                }
            });
        });
    }
    return [errors, run];
}

export default useValidation;
