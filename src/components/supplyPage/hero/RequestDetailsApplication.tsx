"use client";

import { useState } from "react";
import SendMessageModal from "@/components/shared/modals/SendMessageModal";
import Backdrop from "@/components/shared/backdrop/Backdrop";
import MainButton from "@/components/shared/buttons/MainButton";

export default function RequestDetailsApplication() {
  const [isModalShown, setIsModalShown] = useState(false);
  return (
    <>
      <MainButton
        variant="white"
        onClick={() => setIsModalShown(true)}
        className="xs:max-w-[288px] mx-auto lg:mx-0"
      >
        Request Supply Details
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
