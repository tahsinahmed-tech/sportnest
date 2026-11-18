"use client";

import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { auth } from '@/lib/auth';
import { Facility } from '@/types/facility.type';
import { Calendar, Clock } from 'lucide-react';
// import { headers } from 'next/headers';
import { useState } from 'react';
import toast  from 'react-hot-toast';


interface CurrentUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}


const FacilityBookingForm = ({ facility, user }: { facility: Facility, user: CurrentUser  }) => {

    const { availableTimeSlots } = facility;
    

    const [formData, setFormData] = useState({
        
        userID: user.id,
        userName: user.name,
        userEmail: user.email,

        facility: facility._id,
        bookingDate: "",
        timeSlot: "",
        duration: "1",
    
    })

    const totalPrice = facility.pricePerHour * Number(formData.duration);

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const { bookingDate, timeSlot, duration } = formData;

        // Required field validation
        if (!bookingDate || !timeSlot || !duration) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Duration validation
        if (Number(duration) < 1 || !Number.isFinite(Number(duration))) {
            toast.error("Duration must be at least 1 hour.");
            return;
        }

        // Time slot validation
        if (!availableTimeSlots.includes(timeSlot)) {
            toast.error("Please select a valid time slot.");
            return;
        }


        try {

            const { duration, ...restFormData } = formData;
            const convertedDuration = Number(duration);

            const facilityBookingData = {
                ...restFormData,
                duration: convertedDuration,
                totalPrice
            }

            const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/facilities/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(facilityBookingData)
            });


            const data = await result.json();

            if (!result.ok) {
                throw new Error(data.message || "Booking failed");
            }

            if (data.success) {
                toast.success("Facility booked successfully!")
            }

            console.log(data);

            console.log(facilityBookingData)

        }

        catch (err) {
            console.error("Booking error", err);
            toast.error("Failed to book facility!");
        }

    }

    return (
        <CardContent className="p-0">
            <form className="space-y-4" onSubmit={onSubmit}>
                {/* Facility Name */}
                <div className="space-y-1.5">
                    <Label
                        htmlFor="facility"
                        className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                        FACILITY
                    </Label>
                    <Input
                        id="facility"
                        defaultValue={facility.name}
                        readOnly
                        className="w-full h-10 rounded-lg border-slate-200 bg-slate-50/70 text-slate-700 font-medium focus-visible:ring-0 cursor-default"
                    />
                </div>

                {/* Booking Date */}
                <div className="space-y-1.5">
                    <Label
                        htmlFor="bookingDate"
                        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>BOOKING DATE</span>
                    </Label>
                    <Input
                        id="bookingDate"
                        type="date"
                        onChange={(e) => handleChange("bookingDate", e.target.value)}
                        className="w-full h-10 rounded-lg border-slate-200 text-slate-800"
                    />
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5">
                    <Label
                        htmlFor="timeSlot"
                        className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>TIME SLOT</span>
                    </Label>
                    <Select
                        value={formData.timeSlot}
                        onValueChange={(value) => handleChange("timeSlot", value ?? "")}
                    >
                        <SelectTrigger
                            id="timeSlot"
                            className="w-full h-10 rounded-lg border-slate-200 text-slate-800"
                        >
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableTimeSlots.length === 0 ? (
                                <SelectItem value="unavailable" disabled>
                                    No time slots available
                                </SelectItem>
                            ) : (
                                availableTimeSlots.map((slot) => (
                                    <SelectItem key={slot} value={slot}>
                                        {slot}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                </div>

                {/* Duration (Hours) */}
                <div className="space-y-1.5">
                    <Label
                        htmlFor="duration"
                        className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                    >
                        DURATION (HOURS)
                    </Label>
                    <Input
                        id="duration"
                        type="number"
                        min={1}
                        defaultValue={formData.duration}
                        onChange={(e) => handleChange("duration", e.target.value)}
                        className="w-full h-10 rounded-lg border-slate-200 text-slate-800"
                    />
                </div>

                {/* Price Summary Box */}
                <div className="rounded-xl bg-[#eefbf3] border border-[#d6f5e3] p-4 mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>৳{facility.pricePerHour}/hr &times; {formData.duration} hr</span>
                        <span>৳{totalPrice}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">
                            Total Price
                        </span>
                        <span className="text-base font-bold text-[#16a34a]">
                            ৳{totalPrice}
                        </span>
                    </div>
                </div>

                {/* Confirm Booking Button */}
                <Button
                    type="submit"
                    className="w-full h-11 mt-2 rounded-lg bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold shadow-sm transition-colors"
                >
                    Confirm Booking
                </Button>
            </form>
        </CardContent>
    );
};

export default FacilityBookingForm;