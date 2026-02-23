import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Modal from "../modals/Modal";

interface NotificationPopUpProps {
  title: string;
  description: string;
  isPopUpShown: boolean;
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationPopUp({
  title,
  description,
  isPopUpShown,
  setIsPopUpShown,
}: NotificationPopUpProps) {
  return (
    <Modal isModalShown={isPopUpShown} setIsModalShown={setIsPopUpShown}>
      <div className="relative px-4 lg:px-[45px] py-12 lg:py-[63px] flex flex-col justify-center items-center w-full overflow-hidden">
        <Image quality={90}
          src="/images/notifications/bgTopMob.svg"
          alt=""
          aria-hidden
          width={91}
          height={128}
          className="absolute left-0 top-0 pointer-events-none lg:hidden"
        />
        <Image quality={90}
          src="/images/notifications/bgTopDesk.svg"
          alt=""
          aria-hidden
          width={143}
          height={162}
          className="absolute left-0 top-0 pointer-events-none hidden lg:block"
        />
        <Image quality={90}
          src="/images/notifications/bgBottomMob.svg"
          alt=""
          aria-hidden
          width={111}
          height={103}
          className="absolute right-0 bottom-0 pointer-events-none lg:hidden"
        />
        <Image quality={90}
          src="/images/notifications/bgBottomDesk.svg"
          alt=""
          aria-hidden
          width={187}
          height={125}
          className="absolute right-0 bottom-0 pointer-events-none hidden lg:block"
        />
        <h3 className="relative z-10 mb-8 text-[24px] lg:text-[32px] font-medium leading-[120%] text-center uppercase">
          {title}
        </h3>
        <p className="relative z-10 text-center">{description}</p>
      </div>
    </Modal>
  );
}
