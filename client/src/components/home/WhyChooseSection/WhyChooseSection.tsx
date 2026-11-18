import React from "react";
import { Calendar, Shield, Award } from "lucide-react";
import FeatureCard, { FeatureItem } from "./FeatureCard";

const FEATURES: FeatureItem[] = [
  {
    id: "instant-booking",
    title: "Instant Booking",
    description:
      "Reserve your favourite sports facility in under 60 seconds, anytime, anywhere.",
    icon: Calendar,
    iconWrapperClassName: "bg-emerald-50 border border-emerald-100/80",
    iconClassName: "text-emerald-600",
  },
  {
    id: "secure-reliable",
    title: "Secure & Reliable",
    description:
      "JWT-protected accounts and encrypted transactions keep your data safe.",
    icon: Shield,
    iconWrapperClassName: "bg-blue-50 border border-blue-100/80",
    iconClassName: "text-blue-600",
  },
  {
    id: "premium-venues",
    title: "Premium Venues",
    description:
      "Hand-curated, top-quality sports facilities across the city.",
    icon: Award,
    iconWrapperClassName: "bg-amber-50 border border-amber-100/80",
    iconClassName: "text-amber-600",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Why Choose SportNest?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-500">
            Everything you need for a seamless sports booking experience
          </p>
        </div>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;