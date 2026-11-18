"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    CalendarDays,
    PlusCircle,
    Building2,
    LogOut,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "@/lib/actions/auth-actions";
import Image from "next/image";

interface DesktopUserMenuProps {
    user: {
        name: string;
        email: string;
        image: string | null;
    } | null;
}

export function DesktopUserMenu({ user }: DesktopUserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            const res = await signOut();

            if (!res.success) {
                throw new Error(res.message || "Logout failed");
            }

            toast.success("Logged out successfully.");

            router.replace("/sign-in");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to log out. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <Button className="bg-[#16a34a] hover:bg-[#15803d]">
                <Link href="/sign-in">Sign In</Link>
            </Button>
        );
    }

    const { image, name } = user;
    const getInitials = (name: string) => {
        const parts = name.trim().split(/\s+/);

        return (
            parts[0][0] +
            (parts.length > 1 ? parts.at(-1)![0] : "")
        ).toUpperCase();
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
                className="py-5 pl-6 pr-8"
                render={
                    <Button variant="outline" disabled={isLoading}>
                        <span className="flex items-center gap-2">
                            {image ? <span className="bg-green-600 p-0.5 rounded-4xl"> <Image src={image} width={23} height={23} alt="" className="rounded-2xl" /> </span> : <span className="bg-green-600 p-1.5 text-white  text-xs rounded-4xl">{getInitials(name)}</span>}
                            <span className="max-w-28 truncate">{user.name}</span>
                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </span>
                    </Button>
                }
            />

            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex min-w-0 flex-col gap-1">
                            <span>Signed in as</span>
                            <span className="truncate text-sm font-semibold text-black">
                                {user.email}
                            </span>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="py-3">
                        <Link href="/bookings">
                            <CalendarDays className="size-4" />
                            My Bookings
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="py-3">
                        <Link href="/facilities/new">
                            <PlusCircle className="size-4" />
                            Add Facility
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="py-3">
                        <Link href="/facilities/manage">
                            <Building2 className="size-4" />
                            Manage Facilities
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="py-3 text-red-500 focus:text-red-500"
                >
                    <LogOut className="size-4" />
                    {isLoading ? "Logging out..." : "Log Out"}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}