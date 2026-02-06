"use client";

import { User } from "lucide-react";

const VOLUNTEERS = [
    { id: 1, name: "Priya S.", status: "Busy", location: "District C", task: "INC-003 (Medical Emergency)", color: "orange" },
    { id: 2, name: "Rahul K.", status: "Busy", location: "District D", task: "INC-004 (Fire)", color: "orange" },
    { id: 3, name: "Rahul K.", status: "Available", location: "District D", task: "Task: None", color: "olive" }, // Note: Duplicate name in mockup, keeping as is
    { id: 4, name: "Sneha R.", status: "Available", location: "Central Hub", task: "Task: None", color: "emerald" },
    { id: 5, name: "Amit B.", status: "Available", location: "North Zone", task: "Task: None", color: "emerald" },
    { id: 6, name: "Sneha R.", status: "Available", location: "Central Hub", task: "Task: None", color: "emerald" },
    { id: 7, name: "Sneha R.", status: "Available", location: "Central Hub", task: "Task: None", color: "emerald" },
    { id: 8, name: "Vikram Singh", status: "Offline", location: "Unknown", task: "Task: None", color: "slate" },
];

export function VolunteerList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
            {VOLUNTEERS.map((vol, idx) => (
                <div
                    key={idx}
                    className={`group flex items-center p-3 rounded bg-slate-900/40 border transition-all hover:bg-slate-800/60 ${vol.color === 'orange' ? 'border-l-4 border-l-orange-500 border-y-slate-800 border-r-slate-800' :
                            vol.color === 'olive' ? 'border-l-4 border-l-yellow-600 border-y-slate-800 border-r-slate-800' : // Using olive/dark yellow for 'Busy/En Route' look
                                vol.color === 'emerald' ? 'border-l-4 border-l-emerald-500 border-y-slate-800 border-r-slate-800' :
                                    'border-l-4 border-l-slate-600 border-y-slate-800 border-r-slate-800'
                        }`}
                >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400">
                        <User className="h-6 w-6" />
                    </div>

                    <div className="ml-3 flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-bold text-slate-200 truncate">{vol.name}</h3>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase border ${vol.color === 'orange' ? 'text-orange-500 border-orange-500/20 bg-orange-500/10' :
                                    vol.color === 'olive' ? 'text-yellow-500 border-yellow-500/20 bg-yellow-500/10' :
                                        vol.color === 'emerald' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' :
                                            'text-slate-500 border-slate-500/20 bg-slate-500/10'
                                }`}>
                                ● {vol.status}
                            </span>
                        </div>

                        <div className="text-[10px] text-slate-400 flex flex-col gap-0.5">
                            <div>Status: <span className={vol.status === 'Busy' ? 'text-orange-400' : 'text-emerald-400'}>{vol.status}</span></div>
                            <div>Location: {vol.location}</div>
                            <div className="text-slate-500 font-mono truncate">{vol.task}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
