import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { nameRegex, emailRegex } from "../regex/regex";

export const contactValidation = () => {
  const contactFormValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "The field must contain between 2 and 30 characters")
      .max(30, "The field must contain between 2 and 30 characters")
      .matches(nameRegex, "Allowed letters and hyphens, apostrophes, quotes")
      .required("This field is required"),
    company: yup
      .string()
      .max(100, "Company name must be at most 100 characters")
      .default(""),
    phone: yup
      .string()
      .required("This field is required")
      .test(
        "is-valid-phone",
        "Invalid phone number",
        (value) => !value || isValidPhoneNumber(value),
      ),
    email: yup
      .string()
      .matches(emailRegex, {
        message: "Invalid email address",
        excludeEmptyString: true,
      })
      .default(""),
    message: yup
      .string()
      .max(1000, "Message must be at most 1000 characters")
      .default(""),
  });

  return contactFormValidationSchema;
};
