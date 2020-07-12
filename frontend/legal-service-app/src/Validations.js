import vest, {validate, test, enforce} from "vest";
import moment from "moment"

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
            test(elem, "Password should be atleast 8 characters long", () => {
                enforce(data.newPassword.toString()).longerThanOrEquals(8);
            });
        });
    });
};
export const editPasswordValidation = (data, field) => {
    return validate("EditPassword", () => {
        vest.only(field);
        ["newPassword", "passwordConfirm", "oldPassword"].forEach((elem) => {
            test(elem, "This field is required", () => {
                enforce(data[elem].toString()).isNotEmpty();
            });
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
        test("profile", `Image size exceeds 2MB`, () => {
            enforce(data.profile_picture.size/(1024**2) <= 2).isTruthy();
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
        // test("type", "Please select a type", () => {
        //     enforce(data.type).isTruthy();
        // });
        test("other", "Please enter a type", () => {
            const addOther = data.type === 0;
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

export const scheduleSettingValidation = (data, field) => {
    return validate("Slot properties", () => {
        vest.only(field);
        test("price", "Price must be a non-negative number", () => {
            enforce(data.price).isNumeric().greaterThanOrEquals(0);
        });
        test("discount_amount", "Discount must be a positive value", () => {
            if (data.discount_type !== 0) {
                enforce(data.discount_amount).isNumeric().greaterThan(0);
            }
        });
        test("discount_end", "Discount end date must be after at least 6 hours", () => {
            if (data.discount_type !== 0) {
                // Convert to moment
                const end = moment(data.discount_end);
                return end.isAfter(moment().add(6, "hours"));
            }
        });
    });
};

export const blogTitleValidations = (data, field) => {
    return validate("WriteBlog", () => {
        vest.only(field);
        test("title", "Please provide a blog title", () => {
            enforce(data.title.toString()).isNotEmpty();
        });
        test("tags", "Please select a tag", () => {
            enforce(data.tags !== null).isTruthy();
        });
    });
};