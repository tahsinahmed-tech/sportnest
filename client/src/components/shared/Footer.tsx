import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CurrentYear from "./CurrentYear";

const QUICK_LINKS = [
  { label: "All Facilities", href: "/facilities" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Add Facility", href: "/facilities/add" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#0f172a] text-slate-300 pt-14 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Multi-Column Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          {/* Brand Column (Left) */}
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#16a34a] flex items-center justify-center text-white shadow-xs">
                {/* Soccer Ball SVG Icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="12 7 16.5 10.3 14.8 15.5 9.2 15.5 7.5 10.3 12 7" />
                  <line x1="12" y1="2" x2="12" y2="7" />
                  <line x1="21.5" y1="9" x2="16.5" y2="10.3" />
                  <line x1="18" y1="20" x2="14.8" y2="15.5" />
                  <line x1="6" y1="20" x2="9.2" y2="15.5" />
                  <line x1="2.5" y1="9" x2="7.5" y2="10.3" />
                </svg>
              </div>
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-white">Sport</span>
                <span className="text-[#22c55e]">Nest</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
              Book your perfect sports facility in seconds. From football turfs
              to swimming lanes, we have it all.
            </p>

            {/* Social Media Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              {/* Facebook */}
              <Link
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </Link>

              {/* X (Twitter) */}
              <Link
                href="#"
                aria-label="X"
                className="w-8 h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="#"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold tracking-wider uppercase text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#22c55e] shrink-0" />
                <a
                  href="mailto:support@sportnest.app"
                  className="hover:text-white transition-colors"
                >
                  support@sportnest.app
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#22c55e] shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-white transition-colors"
                >
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <Separator className="bg-slate-800/80" />

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© <CurrentYear /> SportNest. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-rose-500" aria-label="love">
              ❤️
            </span>
            <span>for sports lovers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;