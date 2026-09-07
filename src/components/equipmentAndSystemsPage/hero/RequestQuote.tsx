"use client";

import { useState } from "react";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useTranslations } from "@/i18n/I18nProvider";
import MainButton from "@/components/shared/buttons/MainButton";

export default function RequestQuoteApplication() {
  const t = useTranslations("common");
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <MainButton
        variant="white"
        className="w-full xs:max-w-[304px] mx-auto md:mx-0"
        onClick={() => setIsModalShown(true)}
      >
        {t("requestQuote")}
      </MainButton>
      <SendMessageModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        formName="equipment_quote"
        leadType="quote"
        context="Сторінка «Обладнання та системи»"
      />
      <Backdrop
        isVisible={isModalShown}
        onClick={() => setIsModalShown(false)}
      />
    </>
  );
}
