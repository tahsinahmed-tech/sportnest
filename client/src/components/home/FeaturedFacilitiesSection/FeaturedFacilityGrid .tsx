"use client";

import { useFacility } from "@/context/FacilityContext";
import FacilityCard from "./FacilityCard";

const FeaturedFacilityGrid = () => {
    const { facilities } = useFacility();

    // console.log(facilities.length)



    // Show only first 6 facilities
    const featuredFacilities = facilities.slice(0, 6);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredFacilities.map((facility) => (
                <FacilityCard key={facility._id} facility={facility} />
            ))}
        </div>
    );
};

export default FeaturedFacilityGrid;