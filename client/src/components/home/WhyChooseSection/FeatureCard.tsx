import React from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconWrapperClassName: string;
  iconClassName: string;
}

interface FeatureCardProps {
  feature: FeatureItem;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <Card className="rounded-2xl border-0 ring-0 outline-none bg-gray-100/90 shadow-none transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-zinc-200/50 py-0">
      <CardContent className="flex flex-col items-center text-center px-6 py-9 sm:px-8 sm:py-10">
        {/* Soft Colored Icon Box */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-5",
            feature.iconWrapperClassName
          )}
        >
          <Icon className={cn("w-5 h-5", feature.iconClassName)} />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-zinc-900 mb-2.5">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-xs">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;