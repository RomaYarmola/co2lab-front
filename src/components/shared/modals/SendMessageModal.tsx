"use client";

import Image from "next/image";
import NotificationPopUp from "@/components/shared/notifications/NotificationPopUp";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import { Dispatch, SetStateAction, useState } from "react";
import ContactForm from "../forms/ContactForm";
import Modal from "./Modal";

interface SendMessageModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
}

export default function SendMessageModal({
  isModalShown,
  setIsModalShown,
}: SendMessageModalProps) {
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <Modal
      isModalShown={isModalShown}
      setIsModalShown={setIsModalShown}
      className="px-7 py-8 lg:px-30 lg:py-12"
    >
      {/* Фонові картинки */}
      <Image
        src="/images/modals/bgTopMob.svg"
        alt=""
        width={29}
        height={182}
        aria-hidden
        className="absolute left-0 top-0 z-0 pointer-events-none lg:hidden"
      />
      <Image
        src="/images/modals/bgTopDesk.svg"
        alt=""
        width={143}
        height={182}
        aria-hidden
        className="absolute left-0 top-0 z-0 pointer-events-none hidden lg:block"
      />
      <Image
        src="/images/modals/bgBottomDesk.svg"
        alt=""
        width={187}
        height={159}
        aria-hidden
        className="absolute right-3 top-[200px] z-0 pointer-events-none hidden lg:block"
      />
      <ContactForm
        setIsError={setIsError}
        setIsNotificationShown={setIsNotificationShown}
        setIsModalShown={setIsModalShown}
        titleClassName="lg:text-[28px]"
        buttonClassName="sm:max-w-full sm:ml-0"
      />
      <NotificationPopUp
        title={isError ? "Something went wrong" : "Your message has been sent"}
        description={
          isError
            ? "Try submitting the form later."
            : "We have received your message and will get back to you shortly."
        }
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
