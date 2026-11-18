import React from "react";
import AddFacilityForm from "../_components/AddFacilityForm";

export default function AddFacilityPage() {


  return (
    <section className="w-full max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Page Header */}
      <div className="mb-7">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
          Add New Facility
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500">
          List your sports venue for others to book
        </p>
      </div>

      {/* Separated Form Component */}
      <AddFacilityForm />
    </section>
  );
}