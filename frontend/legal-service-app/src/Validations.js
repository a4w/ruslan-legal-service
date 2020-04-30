import { validate, test, enforce } from "vest";

export const registrationValidation = (data) => {
    return validate("RegistrationForm", () => {
        const trimmedEmail = truncate(data.email, 15);
        test("email", `${trimmedEmail} is not valid email address`, () => {
            enforce(data.email).isNotEmpty().matches(/[^@]+@[^.]+\..+/g);
        });
        test("password", "Password should be atleast 8 characters long", () => {
            enforce(data.password).longerThanOrEquals(8);
        });

    });
};

const truncate = (string, len) => {
    if(string.length > len)
        return string.substring(0, len) + "...";
    else
        return string;
};
