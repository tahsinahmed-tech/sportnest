"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, PlusSquare, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const MANAGEMENT_LINKS = [
  {
    title: "My Bookings",
    href: "/dashboard/my-bookings",
    icon: Calendar,
  },
  {
    title: "Add Facility",
    href: "/dashboard/add-facility",
    icon: PlusSquare,
  },
  {
    title: "Manage Facilities",
    href: "/dashboard/manage-facilities",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-zinc-200/80 bg-white">
      {/* Top Brand Header */}
      <SidebarHeader className="h-16 px-5 border-b border-zinc-100 justify-center">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#16a34a] flex items-center justify-center text-white shadow-xs shrink-0">
            {/* Soccer Ball Icon */}
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
            <span className="text-zinc-900">Sport</span>
            <span className="text-[#16a34a]">Nest</span>
          </span>
        </Link>
      </SidebarHeader>

      {/* Main Navigation Content */}
      <SidebarContent className="px-3 py-4">
        {/* Back to Home Link */}
        <SidebarGroup className="p-0 mb-3">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" />}
                  isActive={pathname === "/"}
                  className={cn(
                    "h-10 px-3 rounded-xl font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors",
                    pathname === "/" &&
                      "bg-[#16a34a] text-white hover:bg-[#15803d] hover:text-white shadow-sm"
                  )}
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* MANAGEMENT Group */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold tracking-wider uppercase text-zinc-400 mb-1">
            MANAGEMENT
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {MANAGEMENT_LINKS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className={cn(
                        "h-10 px-3 rounded-xl font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-all",
                        isActive &&
                          "bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] hover:text-white shadow-md shadow-emerald-600/20 data-active:bg-[#16a34a] data-active:text-white"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom User Profile Card */}
      <SidebarFooter className="p-3">
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-2.5">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src="/avatar-placeholder.png" alt="Hyacinth Harper" />
            <AvatarFallback className="bg-emerald-600 text-white text-xs font-bold">
              HH
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-zinc-900 truncate">
              Hyacinth Harper
            </p>
            <p className="text-[11px] text-zinc-400 truncate">Facility Owner</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}