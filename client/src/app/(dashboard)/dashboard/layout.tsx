import React from 'react';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/Sidebar"
import Link from 'next/link';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset className="bg-zinc-50/40">
                {/* Mobile Header Trigger (শুধুমাত্র মোবাইল ভিউতে দেখাবে) */}
                <header className="flex h-14 items-center gap-2 border-b border-zinc-200/80 bg-white px-4 md:hidden">
                    <SidebarTrigger />
                    <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16a34a] shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="12 7 16.5 10.5 14.8 16 9.2 16 7.5 10.5 12 7" />
              <line x1="12" y1="2" x2="12" y2="7" />
              <line x1="21.5" y1="9" x2="16.5" y2="10.5" />
              <line x1="18" y1="20" x2="14.8" y2="16" />
              <line x1="6" y1="20" x2="9.2" y2="16" />
              <line x1="2.5" y1="9" x2="7.5" y2="10.5" />
            </svg>
          </div>

          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-[#0f172a]">Sport</span>
            <span className="text-[#16a34a]">Nest</span>
          </span>
        </Link>
                </header>

                {/* Main Page Content */}
                <div className="flex-1 p-6 md:p-10">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default layout;