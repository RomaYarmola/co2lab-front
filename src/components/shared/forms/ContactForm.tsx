"use client";

import { Form, Formik, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import CustomizedInput from "../formComponents/CustomizedInput";
import { contactValidation } from "@/schemas/contactFormValidation";
import MainButton from "../buttons/MainButton";
import { twMerge } from "tailwind-merge";
import SectionTitle from "../titles/SectionTitle";
import { useTranslations, useLocale } from "@/i18n/I18nProvider";
import { trackEvent } from "@/lib/analytics/track";
import { sendLead, type LeadType } from "@/lib/leads/sendLead";
import { localizePath } from "@/i18n/config";
import { ROUTES } from "@/constants/routes";

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
  /** Назва форми для аналітики: contact / quote / … */
  formName?: string;
  /** Тип заявки — визначає заголовок повідомлення менеджеру. */
  leadType?: LeadType;
  /** Сторінка або товар, з якого відкрили форму. */
  context?: string;
  /** Картка товару: потрапляє в Telegram разом із моделлю та артикулом. */
  product?: { title: string; model?: string; sku?: string };
  /**
   * Після успішної відправки вести на сторінку подяки. Це єдина URL-адреса
   * конверсії для GA4 і реклами, тому за замовчуванням увімкнено для всіх форм.
   */
  redirectToThanks?: boolean;
}

export default function ContactForm({
  setIsError,
  setIsNotificationShown,
  setIsModalShown,
  className = "",
  titleClassName = "",
  buttonClassName = "",
  formName = "contact",
  leadType = "contact",
  context,
  product,
  redirectToThanks = true,
}: ContactFormProps) {
  const t = useTranslations("forms");
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = contactValidation(t);

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

    setIsError(false);
    setIsLoading(true);

    const result = await sendLead({
      type: leadType,
      name: values.name.trim(),
      company: values.company.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      context,
      product,
      locale,
    });

    setIsLoading(false);

    if (!result.success) {
      trackEvent({ event: "form_error", form_name: formName });
      setIsError(true);
      if (setIsModalShown) setIsModalShown(false);
      setIsNotificationShown(true);
      return;
    }

    resetForm();
    trackEvent({ event: "form_submit", form_name: formName });

    if (redirectToThanks) {
      // Модалку закриваємо до переходу, інакше бекдроп лишається поверх
      // нової сторінки. Перехід клієнтським роутером: подія вже в dataLayer,
      // GTM встигає її обробити, бо сторінка не перезавантажується.
      if (setIsModalShown) setIsModalShown(false);
      router.push(localizePath(locale, ROUTES.thanks));
      return;
    }

    if (setIsModalShown) setIsModalShown(false);
    setIsNotificationShown(true);
  };

  return (
    <div className={twMerge("", className)}>
      <SectionTitle className={twMerge("mb-8 lg:mb-8", titleClassName)}>
        {t("sendUsAMessage")}
      </SectionTitle>

      <Formik
        initialValues={initialValues}
        onSubmit={submitForm}
        validationSchema={validationSchema}
      >
        {({ dirty, isValid }) => (
          <Form>
            <div className="flex flex-col gap-4 mb-6">
              <CustomizedInput fieldName="name" placeholder={t("fullNamePlaceholder")} />
              <CustomizedInput fieldName="company" placeholder={t("companyPlaceholder")} />
              <CustomizedInput
                fieldName="phone"
                inputType="tel"
                fieldClassName="px-6 py-0 lg:py-0"
              />
              <CustomizedInput fieldName="email" placeholder={t("emailAddressPlaceholder")} />
              <CustomizedInput
                fieldName="message"
                placeholder={t("message")}
                as="textarea"
                fieldClassName="h-30 lg:h-[172px] p-4 rounded-[24px]"
              />
            </div>
            <div>
              <MainButton
                type="submit"
                disabled={!(dirty && isValid) || isLoading}
                isLoading={isLoading}
                loadingText={t("submitting")}
                className={twMerge("w-full sm:max-w-[288px] ml-auto", buttonClassName)}
              >
                {t("sendRequest")}
              </MainButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
