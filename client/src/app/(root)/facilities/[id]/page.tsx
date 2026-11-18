import React, { cache } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import {
    ArrowLeft,
    MapPin,
    Users,
    DollarSign,
    Clock,
    Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Facility } from "@/types/facility.type";
import Image from "next/image";
import { headers } from "next/headers";
import FacilityBookingForm from "../_components/FacilityBookingForm";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/actions/auth-actions";

interface FacilityResponse {
    success: boolean;
    message: string;
    data: Facility;
}

const getFacility = cache(async (id: string): Promise<Facility | null> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities/${id}`, {
            cache: "no-store",
        });

        if (res.status === 404) {
            throw new Error("Facility not found (404)");
        }

        if (!res.ok) {
            throw new Error("Failed to fetch facility");
        }

        const result: FacilityResponse = await res.json();
        const facility = result.data;
        return facility;
    }

    catch (err) {
        console.error("Unable to fetch facility data . ", err);
        return null;
    }
})


export async function generateMetadata({ params }: PageProps<"/facilities/[id]">): Promise<Metadata> {

    const { id } = await params;

    const facility = await getFacility(id);

    return {
        title: `${facility?.name ?? "Facility Not Found"} | SportNest`,
        description: facility?.description ?? "Explore sports facilities on SportNest.",

        openGraph: {
            title: `${facility?.name ?? "Facility Not Found"} | SportNest`,
            description: facility?.description ?? "Explore sports facilities on SportNest.",
            images: facility?.imageUrl ? [facility.imageUrl] : [],
        },
    };
}


const page = async ({ params }: PageProps<"/facilities/[id]">) => {

    const { id } = await params;

    const facility = await getFacility(id);

    if (!facility) {
        notFound()
    }

    const slots = facility.availableTimeSlots ?? [];


    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <section className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/facilities"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Facilities</span>
                </Link>

                {/* Two-Column Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Facility Details (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Hero Image with Sport Badge */}
                        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
                            <Image
                                src={facility.imageUrl}
                                alt={facility.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
                                className="object-cover"
                            />
                            <Badge className="absolute top-4 left-4 rounded-full bg-[#16a34a] hover:bg-[#16a34a] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                {facility.sportType}
                            </Badge>
                        </div>

                        {/* Facility Title */}
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                            {facility.name}
                        </h1>

                        {/* 2x2 Info Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                    <span>Location</span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {facility.location}
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <Users className="h-3.5 w-3.5 text-slate-400" />
                                    <span>Capacity</span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    Up to {facility.capacity} players
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                                    <span>Price</span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    ${facility.pricePerHour}/hour
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                    <span>Slots</span>
                                </div>
                                <p className="mt-1 text-sm font-semibold text-slate-900">
                                    {slots.length} available
                                </p>
                            </div>
                        </div>

                        {/* About This Facility Card */}
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                            <h2 className="text-sm font-bold text-slate-900">
                                About this facility
                            </h2>
                            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">
                                {facility.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Booking Form UI Card (5 cols) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-8">
                        <Card className="rounded-2xl border border-slate-200/80 bg-white shadow-sm p-6 sm:p-7 gap-0">
                            <CardHeader className="p-0 pb-6">
                                <CardTitle className="text-xl font-bold text-slate-900">
                                    Book This Facility
                                </CardTitle>
                                <CardDescription className="text-xs text-slate-500 mt-1">
                                    Fill in your details to reserve this spot
                                </CardDescription>
                            </CardHeader>

                            <FacilityBookingForm facility={facility} user={user} />
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;