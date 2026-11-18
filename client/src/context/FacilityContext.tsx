
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

import { Facility } from "@/types/facility.type";

interface FacilityProviderProps {
  children: ReactNode;
  initialFacilities: Facility[];
}

interface FacilityContextType {
  facilities: Facility[];
  setFacilities: Dispatch<SetStateAction<Facility[]>>;
}

export const FacilityContext = createContext<FacilityContextType | null>(null);

export const FacilityProvider = ({ children, initialFacilities }: FacilityProviderProps) => {

  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);

  const contextValue: FacilityContextType = {
    facilities,
    setFacilities,
  };

  return (
    <FacilityContext.Provider value={contextValue}>
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacility = () => {
  const context = useContext(FacilityContext);

  if (!context) {
    throw new Error("useFacility must be used within FacilityProvider");
  }

  return context;
};
