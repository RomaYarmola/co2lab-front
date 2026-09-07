"use client";

import { useState } from "react";
import MainButton from "@/components/shared/buttons/MainButton";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useTranslations } from "@/i18n/I18nProvider";

export default function ContactUsApplication() {
  const t = useTranslations("common");
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <MainButton
        className="sm:max-w-[288px] lg:mb-20"
        onClick={() => setIsModalShown(true)}
      >
        {t("contactUs")}
      </MainButton>
      <SendMessageModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        formName="about"
        leadType="consultation"
        context="Сторінка «Про нас»"
      />
      <Backdrop
        isVisible={isModalShown}
        onClick={() => setIsModalShown(false)}
      />
    </>
  );
}
