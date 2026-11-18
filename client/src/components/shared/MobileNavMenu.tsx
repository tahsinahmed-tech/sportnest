"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth-actions";
import { cn } from "@/lib/utils";

interface MobileNavMenuProps {
  navItems: {
    label: string;
    href: string;
  }[];
  user: {
    name: string;
    email: string;
  } | null;
}

export function MobileNavMenu({
  navItems,
  user,
}: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await signOut();

      setIsOpen(false);
      toast.success("Logged out successfully.");

      router.replace("/sign-in");
      router.refresh();
    } catch {
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Toggle */}
      <Button
        variant="ghost"
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-12 w-12 p-0 text-slate-700 hover:bg-slate-100"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={30} className="text-rose-700" />
        ) : (
          <Menu size={30} />
        )}
      </Button>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-t border-slate-100 bg-white px-6 pb-8 pt-6 shadow-md">

          {/* User Information */}
          {user ? (
            <div className="flex items-center gap-3.5 border-b border-slate-100 pb-6">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-[#16a34a] text-base font-bold text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex min-w-0 flex-col">
                <span className="truncate text-base font-bold text-[#0f172a]">
                  {user.name}
                </span>

                <span className="truncate text-sm text-slate-500">
                  {user.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="border-b border-slate-100 pb-6">
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="font-semibold text-[#16a34a]"
              >
                Sign In
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base transition-colors",
                    isActive
                      ? "font-semibold text-[#16a34a]"
                      : "font-medium text-[#334155] hover:text-[#16a34a]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Logout */}
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="mt-1 flex w-fit items-center gap-2 text-base font-semibold text-red-600 transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                <LogOut size={17} />
                {isLoading ? "Logging out..." : "Log Out"}
              </button>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}