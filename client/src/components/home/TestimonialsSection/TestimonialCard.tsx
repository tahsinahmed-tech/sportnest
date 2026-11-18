import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  avatarBgClassName: string;
  rating?: number;
}

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const rating = testimonial.rating ?? 5;

  return (
    <Card className="rounded-2xl border-0 ring-0 outline-none bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md py-0 flex flex-col justify-between">
      <CardContent className="p-6 sm:p-7 flex flex-col justify-between h-full">
        <div>
          {/* 5 Yellow Stars */}
          <div
            className="flex items-center gap-1 mb-4"
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: rating }).map((_, index) => (
              <Star
                key={index}
                className="w-4 h-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          {/* Italic Quote */}
          <blockquote className="text-xs sm:text-sm text-zinc-600 italic leading-relaxed mb-6">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3 pt-1">
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className={cn(
                "text-white text-xs font-bold tracking-wide",
                testimonial.avatarBgClassName
              )}
            >
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 leading-tight">
              {testimonial.name}
            </h4>
            <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5">
              {testimonial.role}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;