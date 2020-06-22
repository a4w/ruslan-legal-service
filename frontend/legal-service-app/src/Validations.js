import vest, {validate, test, enforce} from "vest";

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

export const resetPasswordValidation = (data, field) => {
    return validate("ResetPassword", () => {
        vest.only(field);
        ["newPassword", "passwordConfirm"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });
    });
};
export const editPasswordValidation = (data, field) => {
    return validate("EditPassword", () => {
        vest.only(field);
        test("newPassword", "This field is required", () => {
            enforce(data.newPassword.toString()).isNotEmpty();
        });

        test(
            "newPassword",
            "Password should be atleast 8 characters long",
            () => {
                enforce(data.newPassword.toString()).longerThanOrEquals(8);
            }
        );
        test("passwordConfirm", "Passwords should be matching", () => {
            enforce(
                data.newPassword.toString() === data.passwordConfirm.toString()
            ).isTruthy();
        });
        test("newPassword", "New password can't match old password", () => {
            enforce(
                data.newPassword.toString() !== data.oldPassword.toString()
            ).isTruthy();
        });
    });
};
export const editBasicInfoValidation = (data, field) => {
    return validate("editBasicInfo", () => {
        vest.only(field);
        ["name", "surname", "phone"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
        });
        const phone = data.phone.toString();
        test("phone", `${phone} is not a valid phone number`, () => {
            enforce(parseInt(phone)).isNumeric();
        });
    });
};
export const editEmailValidations = (data, field) => {
    return validate("EditEmail", () => {
        vest.only(field);
        test("email", "This field is required", () => {
            enforce(data.email.toString()).isNotEmpty();
        });
        const trimmedEmail = truncate(data.email.toString(), 15);
        test("email", `${trimmedEmail} is not valid email address`, () => {
            enforce(data.email.toString())
                .isNotEmpty()
                .matches(/[^@]+@[^.]+\..+/g);
        });
    });
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

export const editAddressValidations = (data, field) => {
    return validate("EditAddress", () => {
        vest.only(field);
    });
};
