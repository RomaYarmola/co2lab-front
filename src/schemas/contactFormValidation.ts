import * as yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { nameRegex, emailRegex } from "../regex/regex";
import type { Translator } from "@/i18n/translate";

/**
 * Схема приймає перекладач, щоб помилки валідації показувались
 * мовою сторінки. `t` очікується з namespace "forms".
 */
export const contactValidation = (t: Translator) => {
  const contactFormValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, t("nameLength"))
      .max(30, t("nameLength"))
      .matches(nameRegex, t("nameChars"))
      .required(t("required")),
    company: yup.string().max(100, t("companyMax")).default(""),
    phone: yup
      .string()
      .required(t("required"))
      .test(
        "is-valid-phone",
        t("invalidPhone"),
        (value) => !value || isValidPhoneNumber(value),
      ),
    email: yup
      .string()
      .matches(emailRegex, {
        message: t("invalidEmail"),
        excludeEmptyString: true,
      })
      .default(""),
    message: yup.string().max(1000, t("messageMax")).default(""),
  });

  return contactFormValidationSchema;
};
