"use client";

import axios from "axios";
import { Form, Formik, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import CustomizedInput from "../formComponents/CustomizedInput";
import { contactValidation } from "@/schemas/contactFormValidation";
import MainButton from "../buttons/MainButton";
import { twMerge } from "tailwind-merge";
import SectionTitle from "../titles/SectionTitle";

interface ContactFormValues {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
  setIsModalShown?: Dispatch<SetStateAction<boolean>>;
  className?: string;
  titleClassName?: string;
  buttonClassName?: string;
}

export default function ContactForm({
  setIsError,
  setIsNotificationShown,
  setIsModalShown,
  className = "",
  titleClassName = "",
  buttonClassName = "",
}: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = contactValidation();

  const initialValues: ContactFormValues = {
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  };

  const submitForm = async (
    values: ContactFormValues,
    formikHelpers: FormikHelpers<ContactFormValues>,
  ) => {
    const { resetForm } = formikHelpers;

    const text =
      `<b>Заявка "Send us a message"</b>\n` +
      `<b>Ім'я:</b> ${values.name.trim()}\n` +
      `<b>Компанія:</b> ${values.company.trim() || "—"}\n` +
      `<b>Телефон:</b> ${values.phone.trim().replace(/(?!^)\D/g, "")}\n` +
      `<b>Email:</b> ${values.email.trim() || "—"}\n` +
      `<b>Повідомлення:</b> ${values.message.trim() || "—"}\n`;

    try {
      setIsError(false);
      setIsLoading(true);
      await axios({
        method: "post",
        url: "/api/telegram",
        data: text,
        headers: {
          "Content-Type": "application/json",
        },
      });
      resetForm();
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      setIsNotificationShown(true);
    } catch (error) {
      setIsError(true);
      if (setIsModalShown) {
        setIsModalShown(false);
      }
      setIsNotificationShown(true);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={twMerge("", className)}>
      <SectionTitle className={twMerge("mb-8 lg:mb-8", titleClassName)}>
        Send us a message
      </SectionTitle>

      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        {({ dirty, isValid }) => (
          <Form>
            <div className="flex flex-col gap-4 mb-6">
              <CustomizedInput fieldName="name" placeholder="Full name*" />
              <CustomizedInput fieldName="company" placeholder="Company name" />
              <CustomizedInput
                fieldName="phone"
                inputType="tel"
                fieldClassName="px-6 py-0 lg:py-0"
              />
              <CustomizedInput fieldName="email" placeholder="Email address" />
              <CustomizedInput
                fieldName="message"
                placeholder="Message"
                as="textarea"
                fieldClassName="h-30 lg:h-[172px] p-4 rounded-[24px]"
              />
            </div>
            <div>
              <MainButton
                type="submit"
                disabled={!(dirty && isValid) || isLoading}
                isLoading={isLoading}
                loadingText="Sending..."
                className={twMerge("w-full sm:max-w-[288px] ml-auto", buttonClassName)}
              >
                Send Request
              </MainButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
