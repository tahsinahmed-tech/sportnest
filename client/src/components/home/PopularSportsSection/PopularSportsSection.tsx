import React from "react";
import PopularSportCard, { SportItem } from "./PopularSportCard";

const POPULAR_SPORTS: SportItem[] = [
  {
    id: "football",
    name: "Football",
    emoji: "⚽",
    href: "/facilities?sport=football",
    cardClassName: "bg-emerald-50/70 border-emerald-200/80 hover:border-emerald-300",
    textClassName: "text-emerald-700",
  },
  {
    id: "badminton",
    name: "Badminton",
    emoji: "🏸",
    href: "/facilities?sport=badminton",
    cardClassName: "bg-amber-50/70 border-amber-200/80 hover:border-amber-300",
    textClassName: "text-amber-700",
  },
  {
    id: "tennis",
    name: "Tennis",
    emoji: "🎾",
    href: "/facilities?sport=tennis",
    cardClassName: "bg-orange-50/70 border-orange-200/80 hover:border-orange-300",
    textClassName: "text-orange-700",
  },
  {
    id: "swimming",
    name: "Swimming",
    emoji: "🏊",
    href: "/facilities?sport=swimming",
    cardClassName: "bg-cyan-50/70 border-cyan-200/80 hover:border-cyan-300",
    textClassName: "text-cyan-700",
  },
  {
    id: "basketball",
    name: "Basketball",
    emoji: "🏀",
    href: "/facilities?sport=basketball",
    cardClassName: "bg-rose-50/70 border-rose-200/80 hover:border-rose-300",
    textClassName: "text-rose-700",
  },
  {
    id: "cricket",
    name: "Cricket",
    emoji: "🏏",
    href: "/facilities?sport=cricket",
    cardClassName: "bg-blue-50/70 border-blue-200/80 hover:border-blue-300",
    textClassName: "text-blue-600",
  },
];

const PopularSportsSection = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Popular Sports
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            Find facilities for every sport you love
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {POPULAR_SPORTS.map((sport) => (
            <PopularSportCard key={sport.id} sport={sport} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSportsSection;