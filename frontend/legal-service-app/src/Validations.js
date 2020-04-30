import vest, { validate, test, enforce } from "vest";

export const registrationValidation = (data, field) => {
    return validate("RegistrationForm", () => {
        vest.only(field);

        ["name", "surName", "number", "email", "password"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });

        const trimmedEmail = truncate(data.email.toString(), 15);
        test("email", `${trimmedEmail} is not valid email address`, () => {
            enforce(data.email.toString()).isNotEmpty().matches(/[^@]+@[^.]+\..+/g);
        });

        test("password", "Password should be atleast 8 characters long", () => {
            enforce(data.password.toString()).longerThanOrEquals(8);
        });

    });
};

export const passingValidation = (_) => {
    return validate("I always pass", () => { });
};

// TODO Move this to a helper utility or smth
const truncate = (string, len) => {
    if(string.length > len)
        return string.substring(0, len) + "...";
    else
        return string;
};
