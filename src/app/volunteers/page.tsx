"use client";

import dynamic from 'next/dynamic';
import { VolunteerList } from "@/components/volunteers/VolunteerList";

// Dynamically import map to avoid SSR issues
const LiveMap = dynamic(() => import("@/components/dashboard/LiveMap").then(mod => mod.LiveMap), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-slate-900 animate-pulse" />
});

export default function VolunteersPage() {
    return (
        <div className="flex h-full w-full bg-slate-950 p-2 gap-2 overflow-hidden">
            {/* Left: Volunteer Grid (55%) */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded border border-slate-800">
                    <div className="flex flex-col">
                        <h1 className="text-sm font-bold uppercase tracking-widest text-slate-300">Volunteers</h1>
                        <div className="flex gap-4 mt-2">
                            {/* Quick Filters */}
                            <select className="bg-slate-800 text-[10px] text-slate-300 border border-slate-700 rounded px-2 py-1 outline-none">
                                <option>Status: All</option>
                                <option>Available</option>
                                <option>Busy</option>
                            </select>
                            <select className="bg-slate-800 text-[10px] text-slate-300 border border-slate-700 rounded px-2 py-1 outline-none">
                                <option>Location: All</option>
                            </select>
                            <select className="bg-slate-800 text-[10px] text-slate-300 border border-slate-700 rounded px-2 py-1 outline-none">
                                <option>Skills: All</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded border border-slate-700">Filter</button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <VolunteerList />
                </div>
            </div>

            {/* Right: Map View (45%) */}
            <div className="w-[45%] hidden lg:flex flex-col rounded border border-slate-800 overflow-hidden relative">
                <div className="absolute top-2 left-2 z-[400] bg-slate-900/80 px-2 py-1 rounded text-xs font-bold text-slate-300 border border-slate-700 backdrop-blur">
                    MAP VIEW
                </div>
                <LiveMap />
            </div>
        </div>
    );
}
