"use client";

import ContactForm from "@/components/shared/forms/ContactForm";
import NotificationPopUp from "@/components/shared/notifications/NotificationPopUp";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useState } from "react";
import { useTranslations } from "@/i18n/I18nProvider";

export default function ContactFormWithNotifications() {
  const t = useTranslations("forms");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <>
      <ContactForm
        setIsError={setIsError}
        setIsNotificationShown={setIsNotificationShown}
      />
      <NotificationPopUp
        title={isError ? t("failedTitle") : t("sentTitle")}
        description={isError ? t("failedText") : t("sentText")}
        isPopUpShown={isNotificationShown}
        setIsPopUpShown={setIsNotificationShown}
      />
      <Backdrop
        isVisible={isNotificationShown}
        onClick={() => {
          setIsNotificationShown(false);
        }}
      />
    </>
  );
}
