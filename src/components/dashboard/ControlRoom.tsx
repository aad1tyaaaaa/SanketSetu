"use client";

import { useMemo } from "react";
import {
    AlertTriangle,
    MapPin,
    MoreHorizontal,
    Flame,
    Droplets,
    Radio,
    UserCheck
} from "lucide-react";

// Mock Incident Data for Queue
const INCIDENTS = [
    { id: 1, type: "Fire at Market", district: "Dist A", status: "open", severity: "high", details: "Auto-Dispatch Pending" },
    { id: 2, type: "Medical Emergency", district: "Dist C", status: "assigned", severity: "high", details: "Volunteer: Priya S." },
    { id: 3, type: "Medical Emergency", district: "Dist C", status: "assigned", severity: "med", details: "Volunteer: Rahul K." },
    { id: 4, type: "Fire at Emergency", district: "Dist D", status: "open", severity: "high", details: "Volunteer: Priya S." },
    { id: 5, type: "Flood Warning", district: "Dist E", status: "open", severity: "low", details: "Zone Monitor: Active" },
];

export function DispatcherControl() {
    return (
        <div className="flex h-full flex-col gap-2 p-1">
            {/* Header */}
            <div className="flex items-center justify-between px-2 pt-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Dispatcher Control Room</h2>
                <MoreHorizontal className="h-4 w-4 text-slate-500 cursor-pointer" />
            </div>

            {/* Queue */}
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto p-1 text-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1">
                    <span>Incident Queue</span>
                    <span className="flex items-center gap-1 cursor-pointer hover:text-slate-200">
                        All Incidents <MoreHorizontal className="h-3 w-3" />
                    </span>
                </div>

                <div className="space-y-2">
                    {INCIDENTS.map((inc) => (
                        <div
                            key={inc.id}
                            className={`relative flex flex-col gap-1 rounded-sm border-l-4 p-2 bg-slate-900/60 transition-all hover:bg-slate-800/80 group ${inc.type.includes("Fire") ? "border-l-orange-500" :
                                    inc.type.includes("Flood") ? "border-l-blue-500" :
                                        "border-l-emerald-500"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 font-bold text-slate-200">
                                    {inc.type.includes("Fire") ? <Flame className="h-3 w-3 text-orange-500" /> :
                                        inc.type.includes("Flood") ? <Droplets className="h-3 w-3 text-blue-500" /> :
                                            <AlertTriangle className="h-3 w-3 text-emerald-500" />
                                    }
                                    <span>{inc.type}</span>
                                    <span className="text-slate-500 text-[10px] font-normal">, {inc.district}</span>
                                </div>
                                <MoreHorizontal className="h-3 w-3 text-slate-600 group-hover:text-slate-400" />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-bold uppercase ${inc.status === 'open' ? 'text-orange-400' : 'text-yellow-400'
                                    }`}>
                                    {inc.status} <span className="text-slate-500 font-normal normal-case">- {inc.details}</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* VCE Panel */}
            <div className="mt-auto border-t border-slate-800 pt-2 pb-1 px-1">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1">
                        Virtual Crisis Engine (VCE™)
                    </h3>
                    <MoreHorizontal className="h-3 w-3 text-slate-500" />
                </div>

                <div className="space-y-3 bg-slate-900/80 p-2 rounded border border-slate-800/50">
                    {/* Sliders */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Severity</span>
                            <span>100%</span>
                        </div>
                        <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                            <span>Radius</span>
                            <span>--</span>
                        </div>
                        <input type="range" className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                    </div>

                    {/* Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button className="bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-bold py-1.5 rounded shadow-lg shadow-orange-900/20 transition-all">
                            SIMULATE FIRE
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-1.5 rounded shadow-lg shadow-blue-900/20 transition-all">
                            SIMULATE FLOOD
                        </button>
                    </div>

                    <div className="text-center">
                        <span className="inline-block px-3 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-wider">
                            SIMULATION ACTIVE
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
