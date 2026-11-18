import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AddFacilityButton } from "../_components/add-facility-button";

export default function ManageFacilitiesPage() {
  return (
    <div className="min-h-screen bg-transparent py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Manage My Facilities
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Edit or remove your listed venues
            </p>
          </div>

          <AddFacilityButton
            label="Add New"
            showIcon
            className="px-4 py-2"
          />
        </div>

        {/* Empty State Card */}
        <Card className="border-slate-100 bg-white shadow-xs rounded-xl">
          <CardContent className="flex min-h-[340px] flex-col items-center justify-center p-8 text-center">
            <div
              className="mb-4 text-4xl select-none"
              role="img"
              aria-label="Stadium"
            >
              🏟️
            </div>

            <h2 className="text-base font-bold text-slate-900">
              No facilities listed yet
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Add your first facility to start receiving bookings
            </p>

            <AddFacilityButton
              label="Add Facility"
              className="mt-6 px-6 py-2.5"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}