"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import NotificationPopUp from "@/components/shared/notifications/NotificationPopUp";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "./Modal";

// Форма тягне react-phone-number-input з метаданими libphonenumber (~80 КБ
// brotli). Модалка стоїть на кожній сторінці, тож статичний імпорт вантажив
// бібліотеку всім, хто форму так і не відкрив. Тепер чанк приходить при
// першому відкритті модалки.
const ContactForm = dynamic(() => import("../forms/ContactForm"), {
  ssr: false,
  loading: () => <div className="min-h-[480px]" aria-busy="true" />,
});
import { useTranslations } from "@/i18n/I18nProvider";
import type { LeadType } from "@/lib/leads/sendLead";

interface SendMessageModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  formName?: string;
  leadType?: LeadType;
  context?: string;
  product?: { title: string; model?: string; sku?: string };
}

export default function SendMessageModal({
  isModalShown,
  setIsModalShown,
  formName = "modal",
  leadType = "contact",
  context,
  product,
}: SendMessageModalProps) {
  const t = useTranslations("forms");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [isError, setIsError] = useState(false);
  // Після першого відкриття форма лишається змонтованою: введене не губиться
  const [wasOpened, setWasOpened] = useState(false);
  if (isModalShown && !wasOpened) setWasOpened(true);

  return (
    <Modal
      isModalShown={isModalShown}
      setIsModalShown={setIsModalShown}
      className="px-7 py-8 lg:px-30 lg:py-12"
    >
      {/* Фонові картинки */}
      <Image quality={100}
        src="/images/modals/bgTopMob.svg"
        alt=""
        width={29}
        height={182}
        aria-hidden
        className="absolute left-0 top-0 z-0 pointer-events-none lg:hidden"
      />
      <Image quality={100}
        src="/images/modals/bgTopDesk.svg"
        alt=""
        width={143}
        height={182}
        aria-hidden
        className="absolute left-0 top-0 z-0 pointer-events-none hidden lg:block"
      />
      <Image quality={100}
        src="/images/modals/bgBottomDesk.svg"
        alt=""
        width={187}
        height={159}
        aria-hidden
        className="absolute right-3 top-[200px] z-0 pointer-events-none hidden lg:block"
      />
      {wasOpened && (
        <ContactForm
          setIsError={setIsError}
          setIsNotificationShown={setIsNotificationShown}
          setIsModalShown={setIsModalShown}
          formName={formName}
          leadType={leadType}
          context={context}
          product={product}
          titleClassName="lg:text-[28px]"
          buttonClassName="sm:max-w-full sm:ml-0"
        />
      )}
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
    </Modal>
  );
}
