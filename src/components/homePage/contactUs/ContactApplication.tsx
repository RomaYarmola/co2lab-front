"use client";

import { useState } from "react";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useTranslations } from "@/i18n/I18nProvider";

export default function ContactApplication() {
  const t = useTranslations("common");
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <SecondaryButton variant="white" onClick={() => setIsModalShown(true)}>
        {t("contactUs")}
      </SecondaryButton>
      <SendMessageModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
      />
      <Backdrop
        isVisible={isModalShown}
        onClick={() => setIsModalShown(false)}
      />
    </>
  );
}
