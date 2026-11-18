"use client";

import FacilityCard from "@/components/home/FeaturedFacilitiesSection/FacilityCard";
import { useFacility } from "@/context/FacilityContext";


const AllFacilitiesGrid = () => {
    const { facilities } = useFacility();


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => (
                <FacilityCard key={facility._id} facility={facility} />
            ))}
        </div>
    );
};

export default AllFacilitiesGrid;