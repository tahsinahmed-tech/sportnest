"use client";

import React from "react";
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Trash2,
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface BookingItem {
  id: string;
  facilityName: string;
  facilityImage: string;
  location: string;
  date: string;
  timeSlot: string;
  duration: string;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | string;
}

interface BookingCardProps {
  booking: BookingItem;
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
}

const getStatusBadgeStyle = (status: string) => {
  switch (status.toUpperCase()) {
    case "PENDING":
      return "bg-amber-100/90 text-amber-800 border-amber-200/80";
    case "CONFIRMED":
      return "bg-emerald-100/90 text-emerald-800 border-emerald-200/80";
    case "CANCELLED":
      return "bg-rose-100/90 text-rose-700 border-rose-200/80";
    default:
      return "bg-zinc-100 text-zinc-700 border-zinc-200";
  }
};

const BookingCard = ({
  booking,
  onCancel,
  isCancelling = false,
}: BookingCardProps) => {
  const isCancelled = booking.status.toUpperCase() === "CANCELLED";

  return (
    <Card className="rounded-2xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-200 hover:shadow-md py-0">
      <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left & Middle: Facility Image + Details */}
        <div className="flex items-start sm:items-center gap-4">
          {/* Thumbnail */}
          <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
            <img
              src={booking.facilityImage}
              alt={booking.facilityName}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-2">
            {/* Title & Status Badge */}
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                {booking.facilityName}
              </h3>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase",
                  getStatusBadgeStyle(booking.status)
                )}
              >
                {booking.status}
              </Badge>
            </div>

            {/* Meta Row: Location, Date, Time, Price */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{booking.location}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{booking.date}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>
                  {booking.timeSlot} ({booking.duration})
                </span>
              </div>

              <div className="flex items-center gap-0.5 font-bold text-zinc-900">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{booking.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Cancel Action */}
        {!isCancelled && (
          <div className="self-end sm:self-center shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isCancelling}
              onClick={() => onCancel?.(booking.id)}
              className="text-rose-500 hover:text-rose-600 hover:bg-rose-50/80 font-medium text-xs gap-1.5 px-3"
            >
              {isCancelling ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              <span>Cancel</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;