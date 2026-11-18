import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroBg from "@/assets/hero_image.png";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-187.5 lg:min-h-212.5 flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* Background Image */}
      <Image
        src={heroBg}
        alt="Football turf and player"
        fill
        priority
        placeholder="blur"
        className="object-cover object-center scale-105"
      />

      {/* Dark & Green Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-emerald-950/85" />
      <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply" />

      {/* Top-Left Floating Glass Pill */}
      <div className="hidden md:flex items-center gap-2.5 absolute top-14 left-10 lg:left-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 shadow-lg">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>500+ Active Facilities</span>
      </div>

      {/* Bottom-Right Floating Glass Pill */}
      <div className="hidden md:flex items-center gap-2 absolute bottom-14 right-10 lg:right-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-white/90 shadow-lg">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>10,000+ Bookings Made</span>
      </div>

      {/* Center Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Top Platform Badge */}
        <Badge
          variant="outline"
          className="mb-6 px-4 py-1.5 rounded-full bg-emerald-950/70 border-emerald-500/30 text-emerald-300 backdrop-blur-md text-xs sm:text-sm font-medium gap-1.5"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>#1 Sports Booking Platform</span>
        </Badge>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          <span className="block text-white">Book Your</span>
          <span className="block text-emerald-400 mt-1">Perfect Court</span>
        </h1>

        {/* Subtitle / Description */}
        <p className="max-w-xl text-sm sm:text-base lg:text-lg text-zinc-200/90 leading-relaxed mb-8">
          Discover and reserve premium sports facilities — football turfs,
          badminton courts, swimming lanes, and more. Instant booking, zero
          hassle.
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-6 rounded-xl text-base shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02]"
        >
          <Link href="/facilities" className="flex items-center gap-2">
            <span>Explore Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>

        {/* Bottom Stats Row */}
        <div className="mt-12 grid grid-cols-4 gap-6 sm:gap-10 pt-4">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-white">500+</span>
            <span className="text-[11px] sm:text-xs text-zinc-300/80 mt-0.5">
              Facilities
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-white">10K+</span>
            <span className="text-[11px] sm:text-xs text-zinc-300/80 mt-0.5">
              Bookings
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-white">6</span>
            <span className="text-[11px] sm:text-xs text-zinc-300/80 mt-0.5">
              Sports
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-white">
              <span>4.9</span>
              <Star className="w-4 h-4 fill-white text-white" />
            </div>
            <span className="text-[11px] sm:text-xs text-zinc-300/80 mt-0.5">
              Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}