"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Siren,
    Users,
    BarChart3,
    MessageSquare,
    Bell,
    User,
    Activity
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Incidents", href: "/incidents", icon: Siren },
    { name: "Volunteers", href: "/volunteers", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export function TopNav() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
            <div className="flex h-14 items-center px-4">
                {/* Left: Logo */}
                <div className="mr-8 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border-2 border-slate-700/50 overflow-hidden shadow-lg shadow-purple-500/20">
                        <Image src="/sanket-logo.svg" alt="SanketSetu" width={32} height={32} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-wide text-slate-100 uppercase leading-none">
                            SanketSetu
                        </span>
                        <span className="text-[8px] text-slate-500 tracking-wider">Integrated Crisis Response Platform</span>
                    </div>
                </div>

                {/* Center: Navigation */}
                <nav className="flex items-center space-x-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors",
                                    isActive
                                        ? "bg-slate-800 text-slate-100"
                                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right: Actions */}
                <div className="ml-auto flex items-center gap-4">
                    <div className="flex items-center gap-2 border-r border-slate-800 pr-4">
                        <button className="relative rounded-md p-2 text-slate-400 hover:bg-slate-800/50 hover:text-slate-100">
                            <MessageSquare className="h-4 w-4" />
                            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 ring-2 ring-slate-900" />
                        </button>
                        <button className="relative rounded-md p-2 text-slate-400 hover:bg-slate-800/50 hover:text-slate-100">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 ring-2 ring-slate-900" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end text-xs">
                            <span className="font-medium text-slate-200">Admin</span>
                            <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                ONLINE
                            </span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                            <User className="h-4 w-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
