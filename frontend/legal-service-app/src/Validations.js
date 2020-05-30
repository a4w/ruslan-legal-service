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

export const LawyerInfoValidations = (data, field) => {
    return validate("LawyerCompleteRegisteration", () => {
        vest.only(field);
        test("type", "Please select a type", () => {
            enforce(data.type.toString()).isNotEmpty();
        });
        test("other", "Please enter a type", () => {
            const addOther = data.type.toString() === "other";
            if (addOther) {
                enforce(data.other.toString()).isNotEmpty();
            }
        });
        test(
            "practiceAreas",
            "Please select at least one practice area",
            () => {
                enforce(data.practiceAreas).isNotEmpty();
            }
        );
    });
};
