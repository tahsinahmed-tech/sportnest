"use client";

import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function AddFacilityForm() {

    const [formData, setFormData] = useState({
        name: "",
        sportType: "",
        imageUrl: "",
        location: "",
        pricePerHour: "",
        capacity: "",
        slotInput: "",
        description: "",
    });

    const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleAddSlot = () => {
        const trimmed = formData.slotInput.trim();

        if (trimmed && !availableTimeSlots.includes(trimmed)) {
            setAvailableTimeSlots((prev) => [...prev, trimmed]);

            setFormData((prev) => ({
                ...prev,
                slotInput: ""
            }))
        }
    }

    const handleRemoveSlot = (slotToRemove: string) => {
        setAvailableTimeSlots((prev) =>
            prev.filter((slot) => slot !== slotToRemove)
        );
    };

    const router = useRouter();

    const handleSuccess = () => {
        router.refresh();
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        console.log(form, "form");

        const { pricePerHour, capacity, slotInput, ...safeInputs } = formData;
        const convertedPricePerHour = Number(pricePerHour);
        const convertedCapacity = Number(capacity);

        const facilityData = {
            ...safeInputs,
            pricePerHour: convertedPricePerHour,
            capacity: convertedCapacity,
            availableTimeSlots,
        };

        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(facilityData)
        })

        const data = await result.json();

        if(data.success) {
            toast.success("Facility added successfully!")
        }

        console.log(data);

        console.log(facilityData)


    };

    return (
        <div className="w-full p-6 lg:p-8">
            <div className="w-full max-w-5xl">
                {/* Form Card */}
                <form
                    onSubmit={onSubmit}
                    className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5"
                >
                    {/* Row 1: Facility Name & Sport Type */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="facilityName"
                                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                            >
                                FACILITY NAME *
                            </Label>
                            <Input
                                id="facilityName"
                                required
                                placeholder="e.g. Green Turf Football Ground"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full h-10 rounded-lg border-slate-200 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="sportType"
                                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                            >
                                SPORT TYPE *
                            </Label>
                            <Select
                                value={formData.sportType}
                                onValueChange={(value) => handleChange("sportType", value ?? "")}
                            >
                                <SelectTrigger
                                    id="sportType"
                                    className="w-full h-10 rounded-lg border-slate-200 text-slate-800"
                                >
                                    <SelectValue placeholder="Select Sport Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Football">Football</SelectItem>
                                    <SelectItem value="Cricket">Cricket</SelectItem>
                                    <SelectItem value="Badminton">Badminton</SelectItem>
                                    <SelectItem value="Basketball">Basketball</SelectItem>
                                    <SelectItem value="Tennis">Tennis</SelectItem>
                                    <SelectItem value="Swimming">Swimming</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 2: Image URL & Location */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="imageUrl"
                                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                            >
                                IMAGE URL *
                            </Label>
                            <Input
                                id="imageUrl"
                                type="url"
                                required
                                placeholder="https://example.com/image.jpg"
                                value={formData.imageUrl}
                                onChange={(e) => handleChange("imageUrl", e.target.value)}
                                className="w-full h-10 rounded-lg border-slate-200 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="location"
                                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                            >
                                LOCATION *
                            </Label>
                            <Input
                                id="location"
                                required
                                placeholder="e.g. Gulshan, Dhaka"
                                value={formData.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                                className="w-full h-10 rounded-lg border-slate-200 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Row 3: Price Per Hour & Capacity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="pricePerHour"
                                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                            >
                                PRICE PER HOUR ($) *
                            </Label>
                            <Input
                                id="pricePerHour"
                                type="number"
                                min="0"
                                step="any"
                                required
                                placeholder="50"
                                value={formData.pricePerHour}
                                onChange={(e) => handleChange("pricePerHour", e.target.value)}
                                className="w-full h-10 rounded-lg border-slate-200 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label
                                htmlFor="capacity"
                                className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                            >
                                CAPACITY (PLAYERS) *
                            </Label>
                            <Input
                                id="capacity"
                                type="number"
                                min="1"
                                required
                                placeholder="22"
                                value={formData.capacity}
                                onChange={(e) => handleChange("capacity", e.target.value)}
                                className="w-full h-10 rounded-lg border-slate-200 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Row 4: Available Time Slots */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="timeSlots"
                            className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                        >
                            AVAILABLE TIME SLOTS *
                        </Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="timeSlots"
                                placeholder="e.g. 08:00 AM - 09:00 AM"
                                value={formData.slotInput}
                                onChange={(e) => handleChange("slotInput", e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddSlot();
                                    }
                                }}
                                className="w-full h-10 rounded-lg border-slate-200 placeholder:text-slate-400"
                            />
                            <Button
                                type="button"
                                onClick={handleAddSlot}
                                className="h-10 w-11 shrink-0 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white p-0"
                                aria-label="Add time slot"
                            >
                                <PlusCircle className="h-5 w-5" />
                            </Button>
                        </div>

                        {availableTimeSlots.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1.5">
                                {availableTimeSlots.map((slot) => (
                                    <Badge
                                        key={slot}
                                        variant="secondary"
                                        className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-200"
                                    >
                                        <span>{slot}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSlot(slot)}
                                            className="hover:text-red-600 focus:outline-none"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Row 5: Description */}
                    <div className="space-y-1.5">
                        <Label
                            htmlFor="description"
                            className="text-xs font-semibold uppercase tracking-wider text-slate-600"
                        >
                            DESCRIPTION *
                        </Label>
                        <Textarea
                            id="description"
                            required
                            rows={3}
                            placeholder="Describe your facility..."
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="w-full rounded-lg border-slate-200 placeholder:text-slate-400 resize-y"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-1">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="h-11 px-7 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white font-medium text-sm shadow-sm transition-colors"
                        >
                            {isLoading ? "Adding Facility..." : "Add Facility"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}