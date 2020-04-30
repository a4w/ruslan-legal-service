import { validate, test, enforce } from "vest";

export const registrationValidation = (data, touched = false) => {
    return validate("RegistrationForm", () => {
        if(!touched || touched.email){
            const trimmedEmail = truncate(data.email.toString(), 15);
            test("email", `${trimmedEmail} is not valid email address`, () => {
                enforce(data.email.toString()).isNotEmpty().matches(/[^@]+@[^.]+\..+/g);
            });
        }
        if(!touched || touched.password){
            test("password", "Password should be atleast 8 characters long", () => {
                enforce(data.password.toString()).longerThanOrEquals(8);
            });
        }
        ["name", "surName", "number"].forEach((elem) => {
            if(!touched || touched[elem]){
                test(elem, "This field is required", () => {
                    enforce(data[elem].toString()).isNotEmpty();
                });
            }
        });
    });
};

export const defaultValidation = (_) => {
    return validate("I do nothing", () => { });
};

const truncate = (string, len) => {
    if(string.length > len)
        return string.substring(0, len) + "...";
    else
        return string;
};
