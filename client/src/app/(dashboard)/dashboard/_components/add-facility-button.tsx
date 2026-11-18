"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AddFacilityButtonProps {
    label?: string;
    showIcon?: boolean;
    className?: string;
}

export function AddFacilityButton({
    label = "Add Facility",
    showIcon = false,
    className,
}: AddFacilityButtonProps) {
    const handleAddFacility = () => {
        // Open your add-facility modal or trigger client navigation
        console.log("Add facility clicked");
    };

    return (
        <Link
            href="/dashboard/add-facility"
            onClick={handleAddFacility}
            className={cn(
                "bg-[#16a34a] hover:bg-[#15803d] text-white font-medium rounded-lg shadow-xs transition-colors cursor-pointer",
                className
            )}
        >

            <div className="flex gap-2 items-center">
                {showIcon && <Plus className="mr-1.5 h-4 w-4 stroke-[2.5]" />}
                {label}
            </div>

        </Link>
    );
}