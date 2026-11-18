
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Facility } from "@/types/facility.type";

interface FacilityCardProps {
  facility: Facility;
}

const getSportBadgeStyle = (sport: string) => {
  switch (sport.toUpperCase()) {
    case "TENNIS":
      return "bg-amber-50/95 text-amber-700 border-amber-200/80";
    case "SWIMMING":
      return "bg-cyan-50/95 text-cyan-700 border-cyan-200/80";
    case "BADMINTON":
      return "bg-yellow-50/95 text-yellow-700 border-yellow-200/80";
    case "GYM":
      return "bg-purple-50/95 text-purple-700 border-purple-200/80";
    case "FOOTBALL":
      return "bg-emerald-50/95 text-emerald-700 border-emerald-200/80";
    default:
      return "bg-zinc-50/95 text-zinc-700 border-zinc-200/80";
  }
};

const FacilityCard = ({ facility }: FacilityCardProps) => {
  return (
    <Card className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-md py-0 gap-0">

      {/* Top Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-100">

        <Image
          src={facility.imageUrl}
          alt={facility.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <Badge
          variant="outline"
          className={cn(
            "absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm shadow-xs",
            getSportBadgeStyle(facility.sportType)
          )}
        >
          {facility.sportType}
        </Badge>

        {/* Price */}
        <div className="absolute top-3 right-3 rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-emerald-600 shadow-xs">
          ${facility.pricePerHour}
          <span className="text-[10px] font-medium text-zinc-500">/hr</span>
        </div>
      </div>

      {/* Facility Details */}
      <CardContent className="p-5 pb-4 flex-1">

        <h3 className="text-base sm:text-lg font-bold text-zinc-900 line-clamp-1 mb-3">
          {facility.name}
        </h3>

        <div className="space-y-2 text-xs sm:text-sm text-zinc-500">

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="line-clamp-1">{facility.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>Up to {facility.capacity} players</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              {facility.availableTimeSlots.length} slots available
            </span>
          </div>

        </div>
      </CardContent>

      {/* Booking Link */}
      <div className="p-5 pt-0">
        <Link
          href={`/facilities/${facility._id}`}
          className="flex w-full h-10 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-colors"
        >
          <span>Book Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </Card>
  );
};

export default FacilityCard;
