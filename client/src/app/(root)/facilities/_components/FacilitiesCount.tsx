"use client";

import { useFacility } from '@/context/FacilityContext';

const FacilitiesCount = () => {
    const { facilities } = useFacility();

    return (
        <p className="text-sm text-slate-500 mt-1.5">
            Browse {facilities.length} sports venues available for booking
        </p>
    );
};

export default FacilitiesCount;