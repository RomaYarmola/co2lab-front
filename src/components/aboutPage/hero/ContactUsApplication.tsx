"use client";

import { useState } from "react";
import MainButton from "@/components/shared/buttons/MainButton";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";

export default function ContactUsApplication() {
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <MainButton
        className="sm:max-w-[288px] lg:mb-20"
        onClick={() => setIsModalShown(true)}
      >
        Contact Us
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
