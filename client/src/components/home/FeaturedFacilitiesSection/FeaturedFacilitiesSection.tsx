

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FacilityCard from "./FacilityCard";
import { useFacility } from "@/context/FacilityContext";
import FeaturedFacilityGrid from "./FeaturedFacilityGrid ";

const FeaturedFacilitiesSection = () => {

  

  return (
    <section className="w-full py-16 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Featured Facilities
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-zinc-500">
              Top-rated venues available for your next game
            </p>
          </div>

          <Link
            href="/facilities"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors self-start sm:self-auto"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <FeaturedFacilityGrid />

      </div>
    </section>
  );
};

export default FeaturedFacilitiesSection;
