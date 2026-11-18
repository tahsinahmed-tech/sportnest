import Link from "next/link";
import { headers } from "next/headers";
import { IoFootballOutline } from "react-icons/io5";

import { auth } from "@/lib/auth";
import { navItems } from "./nav-items";
import { DesktopUserMenu } from "./DesktopUserMenu";
import { MobileNavMenu } from "./MobileNavMenu";

export async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-[#fbfcf9]">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16a34a] shadow-sm">
            <IoFootballOutline className="text-2xl text-white" />
          </div>

          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-[#0f172a]">Sport</span>
            <span className="text-[#16a34a]">Nest</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            if (item.requiresAuth && !session) return null;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] font-medium text-[#334155] transition-colors hover:text-[#16a34a]"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop User Menu */}
        <div className="hidden lg:block">
          <DesktopUserMenu
            user={
              user
                ? {
                  name: user.name,
                  email: user.email,
                  image: user.image ?? null,
                }
                : null
            }
          />
        </div>

        {/* Mobile Navigation */}
        <MobileNavMenu
          navItems={navItems}
          user={
            user
              ? {
                name: user.name,
                email: user.email,
              }
              : null
          }
        />

      </div>
    </header>
  );
}