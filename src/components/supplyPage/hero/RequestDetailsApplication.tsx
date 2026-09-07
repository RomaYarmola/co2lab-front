"use client";

import { useState } from "react";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useTranslations } from "@/i18n/I18nProvider";
import MainButton from "@/components/shared/buttons/MainButton";

export default function RequestDetailsApplication() {
  const t = useTranslations("common");
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <MainButton
        variant="white"
        onClick={() => setIsModalShown(true)}
        className="xs:max-w-[288px] mx-auto lg:mx-0"
      >
        {t("requestSupplyDetails")}
      </MainButton>
      <SendMessageModal
        isModalShown={isModalShown}
        setIsModalShown={setIsModalShown}
        formName="supply_details"
        leadType="contact"
        context="Сторінка «Постачання»"
      />
      <Backdrop
        isVisible={isModalShown}
        onClick={() => setIsModalShown(false)}
      />
    </>
  );
}
