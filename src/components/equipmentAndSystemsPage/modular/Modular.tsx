import Container from "@/components/shared/container/Container";
import ImageCarousel from "@/components/shared/carousel/ImageCarousel";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import imageOne from "../../../../public/images/equipmentAndSystemsPage/modular/imageOne.webp";
import imageTwo from "../../../../public/images/equipmentAndSystemsPage/modular/imageTwo.webp";
import imageThree from "../../../../public/images/equipmentAndSystemsPage/modular/imageThree.webp";
import imageFour from "../../../../public/images/equipmentAndSystemsPage/modular/imageFour.webp";
import imageFive from "../../../../public/images/equipmentAndSystemsPage/modular/imageFive.webp";

const modularImages = [
  { src: imageOne, alt: "Modular CO₂ plant skid and equipment" },
  { src: imageTwo, alt: "Pre-assembled modular CO₂ processing unit" },
  { src: imageThree, alt: "Modular CO₂ system piping and controls" },
  { src: imageFour, alt: "Containerized CO₂ module installation" },
  { src: imageFive, alt: "Modular CO₂ plant control and integration" },
];

export default function Modular() {
  return (
    <section className="py-12 lg:pt-[134px] lg:pb-0">
      <Container className="relative flex flex-col sm:flex-row sm:items-center gap-8">
        <Image quality={100}
          src="/images/supplyPage/biogenic/bgMob.svg"
          alt="bg mobile"
          width={158}
          height={188}
          className="absolute -top-23 -left-12 -z-10 object-cover object-right pointer-events-none lg:hidden"
          aria-hidden
        />
        <Image quality={100}
          src="/images/supplyPage/biogenic/bgDesk.svg"
          alt="bg desktop"
          width={279}
          height={333}
          className="absolute -top-31 -left-21 -z-10 object-cover object-right pointer-events-none hidden lg:block"
          aria-hidden
        />
        <div className="sm:w-[calc(50%-16px)] xl:w-[46%]">
          <SectionTitle className="mb-3 lg:mb-4.5">
            <span className="block">Modular</span>
            <span className="block pl-[119px] xl:pl-[216px]">Plants</span>
          </SectionTitle>
          <p className="lg:max-w-[413px]">
            Modular solutions allow you to quickly integrate CO₂ technologies
            into your infrastructure. All modules are fully assembled, tested,
            and ready to run within a few days.
          </p>
        </div>
        <ImageCarousel images={modularImages} />
      </Container>
    </section>
  );
}
