"use client";

import { useState } from "react";
import SecondaryButton from "@/components/shared/buttons/SecondaryButton";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { useTranslations } from "@/i18n/I18nProvider";

export default function ProductQuoteApplication({
  productTitle,
}: {
  productTitle: string;
}) {
  const t = useTranslations("product");
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <SecondaryButton
        variant="white"
        className="w-full justify-center"
        onClick={() => setIsModalShown(true)}
      >
        {t("requestPrice")}
      </SecondaryButton>
      <span className="sr-only">
        {t("requestQuoteFor", { product: productTitle })}
      </span>
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
