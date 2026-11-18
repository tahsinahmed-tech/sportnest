import React from "react";
import FacilityCard from "@/components/home/FeaturedFacilitiesSection/FacilityCard";
import { getFacilities } from "@/lib/api/facility.api";
import { Facility } from "@/types/facility.type";
import FeaturedFacilityGrid from "@/components/home/FeaturedFacilitiesSection/FeaturedFacilityGrid ";
import FacilitiesCount from "./_components/FacilitiesCount";
import AllFacilitiesGrid from "./_components/AllFacilitiesGrid";

const Page = async () => {
 

  return (
    <section className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            All Facilities
          </h1>
          
          <FacilitiesCount />
        </div>

        <AllFacilitiesGrid />
      </div>
    </section>
  );
};

export default Page;