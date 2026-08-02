"use client";

import { useState } from "react";
import MainButton from "@/components/shared/buttons/MainButton";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useTranslations } from "@/i18n/I18nProvider";

export default function ExploreTechnologiesApplication() {
  const t = useTranslations("common");
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <MainButton
        variant="white"
        className="xs:max-w-[288px] mx-auto lg:mx-0"
        onClick={() => setIsModalShown(true)}
      >
        {t("exploreTechnologies")}
      </MainButton>
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
