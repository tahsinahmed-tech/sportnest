
import { Facility } from "@/types/facility.type";

interface FacilityResponse {
    success: boolean;
    message: string;
    data: Facility[];
}



export const getFacilities = async () : Promise<Facility[]>  => {
    try {
        const res = await fetch("http://localhost:5000/facilities", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch facilities\nHTTP Status: ${res.status}`);
        }

        const result: FacilityResponse = await res.json();

        return result.data;
    }

    catch (err) {
        console.error("Unable to fetch data. ", err);
        return [];
    }
};
