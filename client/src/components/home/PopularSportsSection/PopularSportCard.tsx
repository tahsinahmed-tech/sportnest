import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SportItem {
  id: string;
  name: string;
  emoji: string;
  href: string;
  cardClassName: string;
  textClassName: string;
}

interface PopularSportCardProps {
  sport: SportItem;
}

const PopularSportCard = ({ sport }: PopularSportCardProps) => {
  return (
    <Link href={sport.href} className="group block focus:outline-none">
      <Card
        className={cn(
          "rounded-xl border shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-sm cursor-pointer py-0",
          sport.cardClassName
        )}
      >
        <CardContent className="flex flex-col items-center justify-center py-5 px-3">
          <span
            role="img"
            aria-label={sport.name}
            className="text-3xl sm:text-4xl mb-2.5 transition-transform duration-200 group-hover:scale-110 select-none"
          >
            {sport.emoji}
          </span>
          <h3
            className={cn(
              "text-xs sm:text-sm font-semibold tracking-tight",
              sport.textClassName
            )}
          >
            {sport.name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PopularSportCard;