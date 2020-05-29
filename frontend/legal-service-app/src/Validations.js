import vest, { validate, test, enforce } from "vest";

export const registrationValidation = (data, field) => {
    return validate("RegistrationForm", () => {
        vest.only(field);

        ["name", "surname", "phone", "email", "password"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });

        const trimmedEmail = truncate(data.email.toString(), 15);
        test("email", `${trimmedEmail} is not valid email address`, () => {
            enforce(data.email.toString())
                .isNotEmpty()
                .matches(/[^@]+@[^.]+\..+/g);
        });

        test("password", "Password should be atleast 8 characters long", () => {
            enforce(data.password.toString()).longerThanOrEquals(8);
        });
    });
};

export const loginValidation = (data, field) => {
    return validate("LoginForm", () => {
        vest.only(field);
        ["email", "password"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });
        const trimmedEmail = truncate(data.email.toString(), 15);
        test("email", `${trimmedEmail} is not valid email address`, () => {
            enforce(data.email.toString())
                .isNotEmpty()
                .matches(/[^@]+@[^.]+\..+/g);
        });
    });
};

export const passingValidation = (_) => {
    return validate("I always pass", () => {});
};

// TODO Move this to a helper utility or smth
const truncate = (string, len) => {
    if (string.length > len) return string.substring(0, len) + "...";
    else return string;
};

export const editPasswordValidation = (data, field) => {
    return validate("EditPassword", () => {
        vest.only(field);
        test("password", "This field is required", () => {
            enforce(data.password.toString()).isNotEmpty();
        });
        test("password", "Password should be atleast 8 characters long", () => {
            enforce(data.password.toString()).longerThanOrEquals(8);
        });
        test("passwordConfirm", "Passwords should be matching", () => {
            enforce(
                data.password.toString() === data.passwordConfirm.toString()
            ).isTruthy();
        });
    });
};
export const editBasicInfoValidation = (data, field) => {
    return validate("editBasicInfo", () => {
        vest.only(field);
        ["name", "surname", "email", "phone"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });
        const trimmedEmail = truncate(data.email.toString(), 15);
        test("email", `${trimmedEmail} is not valid email address`, () => {
            enforce(data.email.toString())
            .isNotEmpty()
            .matches(/[^@]+@[^.]+\..+/g);
        });
        const phone = data.phone.toString();
        test("phone", `${phone} is not a valid phone number`, () => {
            enforce(parseInt(phone)).isNumeric();
        });

    });
};
