import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-[#15803d] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Ready to Book Your Next Game?
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-emerald-100/90 max-w-xl">
          Join thousands of sports enthusiasts who trust SportNest for their
          bookings.
        </p>

        {/* White CTA Button */}
        <Button
          size="lg"
          className="mt-8 bg-white hover:bg-emerald-50 text-[#15803d] font-bold px-7 py-6 rounded-xl text-xs sm:text-sm shadow-md shadow-black/15 transition-all duration-200 hover:-translate-y-0.5"
        >
          <Link href="/facilities" className="inline-flex items-center gap-2">
            <span>Browse Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;