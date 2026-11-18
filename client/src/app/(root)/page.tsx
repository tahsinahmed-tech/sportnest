import CtaSection from "@/components/home/CtaSection";
import FeaturedFacilitiesSection from "@/components/home/FeaturedFacilitiesSection/FeaturedFacilitiesSection";
import HeroSection from "@/components/home/Hero";
import PopularSportsSection from "@/components/home/PopularSportsSection/PopularSportsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection/TestimonialsSection";
import WhyChooseSection from "@/components/home/WhyChooseSection/WhyChooseSection";


export default function Home() {
  return (
    <div>

      <HeroSection />
      <PopularSportsSection />
      <FeaturedFacilitiesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <CtaSection />

    </div>
  );
}
