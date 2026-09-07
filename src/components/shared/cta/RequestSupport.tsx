"use client";

import { useState } from "react";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useTranslations } from "@/i18n/I18nProvider";

export default function RequestSupportApplication() {
  const t = useTranslations("cta");
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <SecondaryButton onClick={() => setIsModalShown(true)}>
        {t("supportButton")}
      </SecondaryButton>
      <SendMessageModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        formName="cta_support"
        leadType="consultation"
        context="Блок CTA «Підтримка»"
      />
      <Backdrop
        isVisible={isModalShown}
        onClick={() => setIsModalShown(false)}
      />
    </>
  );
}
