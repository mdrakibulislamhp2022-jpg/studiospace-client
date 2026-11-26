import HeroSlider from "@/components/HeroSlider";
import FeaturedStudios from "@/components/FeaturedStudios";
import CategorySection from "@/components/CategorySection";
import BookingSteps from "@/components/BookingSteps";
import HostGuarantee from "@/components/HostGuarantee";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedStudios />
      <CategorySection />
      <BookingSteps />
      <HostGuarantee />
    </>
  );
}