"use client";

import { Activity, ShieldCheck, Users } from "lucide-react";

export function StatPanel() {
    return (
        <div className="flex h-full w-full flex-col gap-0.5">
            {/* Top Stat */}
            <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-4 rounded-sm">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    <Activity className="h-4 w-4 text-orange-500" />
                    Response Velocity
                </h3>
                <div className="h-32 w-full bg-slate-800/30 rounded border border-slate-800 flex items-center justify-center text-xs text-slate-500">
                    [Chart Placeholder]
                </div>
            </div>

            {/* Middle Stat */}
            <div className="flex-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-4 rounded-sm">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    <Users className="h-4 w-4 text-blue-500" />
                    Volunteer Deployment
                </h3>
                <div className="h-32 w-full bg-slate-800/30 rounded border border-slate-800 flex items-center justify-center text-xs text-slate-500">
                    [Density Map Placeholder]
                </div>
            </div>

            {/* Bottom Stat */}
            <div className="bg-emerald-900/10 border border-emerald-900/20 p-4 rounded-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-full text-emerald-500">
                        <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-emerald-400 font-bold uppercase tracking-wide">System Integrity</div>
                        <div className="text-xl font-mono text-emerald-300">99.8%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
