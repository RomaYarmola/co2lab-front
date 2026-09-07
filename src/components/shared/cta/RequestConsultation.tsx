"use client";

import { useState } from "react";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useTranslations } from "@/i18n/I18nProvider";

export default function RequestDetailsApplication() {
  const t = useTranslations("cta");
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <SecondaryButton onClick={() => setIsModalShown(true)}>
        {t("consultationButton")}
      </SecondaryButton>
      <SendMessageModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        formName="cta_consultation"
        leadType="consultation"
        context="Блок CTA «Консультація»"
      />
      <Backdrop
        isVisible={isModalShown}
        onClick={() => setIsModalShown(false)}
      />
    </>
  );
}
