import React from "react";
import TestimonialCard, { TestimonialItem } from "./TestimonialCard";

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "SportNest made booking our weekly matches incredibly easy. The slots are always available and the UI is super clean!",
    name: "Rafiq Ahmed",
    role: "Football Player",
    initials: "RA",
    avatarBgClassName: "bg-emerald-600",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "I love how I can filter by sport type and find exactly the court I need. No more calling venues manually!",
    name: "Priya Sharma",
    role: "Badminton Enthusiast",
    initials: "PS",
    avatarBgClassName: "bg-orange-600",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "As a facility owner, managing bookings through SportNest has saved me hours every week. Highly recommended.",
    name: "Karim Hassan",
    role: "Swimming Coach",
    initials: "KH",
    avatarBgClassName: "bg-cyan-600",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-emerald-50/55">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            What Athletes Say
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-zinc-500">
            Trusted by thousands of sports enthusiasts across the country
          </p>
        </div>

        {/* 3-Column Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;