import Container from "@/components/shared/container/Container";
import ImageCarousel from "@/components/shared/carousel/ImageCarousel";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import imageOne from "../../../../public/images/supplyPage/biogenic/imageOne.webp";
import imageTwo from "../../../../public/images/supplyPage/biogenic/imageTwo.webp";
import imageThree from "../../../../public/images/supplyPage/biogenic/imageThree.webp";
import imageFour from "../../../../public/images/supplyPage/biogenic/ImageFour.webp";
import imageFive from "../../../../public/images/supplyPage/biogenic/imageFive.webp";

const biogenicImages = [
  { src: imageOne, alt: "Biogenic CO₂ capture at biogas plant" },
  { src: imageTwo, alt: "CO₂ liquefaction and processing equipment" },
  { src: imageThree, alt: "Biomethane plant CO₂ capture system" },
  { src: imageFour, alt: "Industrial biogenic CO₂ production" },
  { src: imageFive, alt: "Biogas-to-CO₂ conversion infrastructure" },
];

export default function Biogenic() {
  return (
    <section className="py-12 lg:pt-[132px] lg:pb-0">
      <Container className="relative flex flex-col sm:flex-row sm:items-center gap-8">
        <Image
          src="/images/supplyPage/biogenic/bgMob.svg"
          alt="bg mobile"
          width={158}
          height={188}
          className="absolute -top-23.5 left-0 -z-10 object-cover object-right pointer-events-none lg:hidden"
          aria-hidden
        />
        <Image
          src="/images/supplyPage/biogenic/bgDesk.svg"
          alt="bg desktop"
          width={279}
          height={333}
          className="absolute -top-31 -left-21 -z-10 object-cover object-right pointer-events-none hidden lg:block"
          aria-hidden
        />
        <div className="sm:w-[calc(50%-16px)] xl:w-[46%]">
          <SectionTitle className="mb-3 lg:mb-4.5">
            <span className="block">Biogenic CO₂</span>
            <span className="block pl-[127px] sm:pl-[80px] xl:pl-[166px]">
              Production
            </span>
          </SectionTitle>
          <p className="lg:max-w-[513px]">
            We capture and liquefy biogenic CO₂ directly at biogas and
            biomethane plants, transforming emissions into a valuable industrial
            resource.
          </p>
        </div>
        <ImageCarousel images={biogenicImages} />
      </Container>
    </section>
  );
}
