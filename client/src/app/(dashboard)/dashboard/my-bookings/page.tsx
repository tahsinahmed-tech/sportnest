"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import BookingCard, { BookingItem } from "../_components/BookingCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // API থেকে বুকিং ডেটা ফেচ করা
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        // আপনার ব্যাকএন্ড API এন্ডপয়েন্ট দিন
        const res = await fetch("/api/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        // API রেসপন্স স্ট্রাকচার অনুযায়ী (যেমন data.data বা সরাসরি data) সেট করুন
        setBookings(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // বুকিং ক্যানসেল হ্যান্ডলার
  const handleCancelBooking = async (bookingId: string) => {
    try {
      setCancellingId(bookingId);
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE", // অথবা PATCH (আপনার API অনুযায়ী)
      });

      if (!res.ok) throw new Error("Failed to cancel booking");

      // UI থেকে ক্যানসেল হওয়া বুকিংটি রিমুভ করা
      setBookings((prev) => prev.filter((item) => item.id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
          My Bookings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500">
          View and manage all your facility bookings
        </p>
      </div>

      {/* 1. Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2].map((item) => (
            <Card
              key={item}
              className="rounded-2xl border border-zinc-200/80 bg-white py-0"
            >
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full">
                  <Skeleton className="h-20 w-20 rounded-xl shrink-0" />
                  <div className="space-y-2.5 flex-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-full max-w-md" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 2. Empty State (2nd Image UI) */}
      {!isLoading && bookings.length === 0 && (
        <Card className="rounded-2xl border border-zinc-200/70 bg-white shadow-none py-0">
          <CardContent className="flex flex-col items-center justify-center text-center py-20 px-4">
            <span
              role="img"
              aria-label="Calendar"
              className="text-4xl sm:text-5xl mb-4 select-none"
            >
              📅
            </span>

            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              No bookings yet
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Start by exploring our facilities
            </p>

            <Button
              className="mt-6 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 h-10 rounded-lg text-xs sm:text-sm shadow-xs"
            >
              <Link href="/facilities">Browse Facilities</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 3. Bookings List State (1st Image UI) */}
      {!isLoading && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancelBooking}
              isCancelling={cancellingId === booking.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}