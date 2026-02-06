"use client";

import { AlertTriangle, Clock, MapPin } from "lucide-react";

export function IncidentQueue() {
    // Mock Data
    const incidents = [
        { id: 1, type: "Fire", location: "Sector 4, Noida", time: "2m ago", status: "critical" },
        { id: 2, type: "Medical", location: "MG Road, Gurgaon", time: "5m ago", status: "warning" },
        { id: 3, type: "Accident", location: "Ring Road, Delhi", time: "12m ago", status: "resolved" },
        { id: 4, type: "Theft", location: "Lajpat Nagar", time: "15m ago", status: "investigating" },
        { id: 5, type: "Fire", location: "Sector 62, Noida", time: "22m ago", status: "critical" },
    ];

    return (
        <div className="flex h-full w-full flex-col bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-sm">
            <div className="flex items-center justify-between border-b border-slate-800 p-3 bg-slate-900/80">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Incident Stream
                </h2>
                <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2 scroller">
                {incidents.map((inc) => (
                    <div
                        key={inc.id}
                        className="group flex flex-col gap-1 rounded bg-slate-800/40 p-3 hover:bg-slate-800/80 hover:border-l-2 hover:border-orange-500 transition-all cursor-pointer border-l-2 border-transparent"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className={`h-3 w-3 ${inc.status === 'critical' ? 'text-orange-500' : 'text-slate-400'}`} />
                                <span className="text-sm font-semibold text-slate-200">{inc.type}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">{inc.id.toString().padStart(4, '0')}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{inc.location}</span>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>{inc.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
