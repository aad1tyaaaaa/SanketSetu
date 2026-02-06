"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '@/lib/store';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, Users, Radio, MapPin } from 'lucide-react';

const LiveMap = dynamic(() => import("@/components/dashboard/LiveMap").then(mod => mod.LiveMap), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-950 flex items-center justify-center text-emerald-500 font-mono text-xs">INITIALIZING SATELLITE LINK...</div>
});

export default function AdminDashboard() {
    const { incidents, volunteers, addIncident, simulateIncident } = useStore();

    return (
        <div className="h-screen w-full bg-slate-950 text-slate-200 overflow-hidden flex flex-col">
            {/* Top Bar */}
            <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
                <div className="font-bold text-lg text-white tracking-widest uppercase">SanketSetu <span className="text-cyan-400 text-xs align-top">CMD</span></div>
                <div className="flex gap-4">
                    <div className="text-xs text-slate-400">System Status: <span className="text-emerald-500 font-bold">ONLINE</span></div>
                    <div className="text-xs text-slate-400">Active Units: <span className="text-white font-bold">{volunteers.filter(v => v.status !== 'offline').length}</span></div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="flex-1 grid grid-cols-12 gap-0.5 p-0.5">

                {/* LEFT: Feed (2 cols) */}
                <div className="col-span-2 bg-slate-900/50 border border-slate-800 flex flex-col">
                    <div className="p-2 border-b border-slate-800 font-bold text-xs uppercase text-slate-400">Incident Feed</div>
                    <div className="flex-1 overflow-auto p-2 space-y-2">
                        {incidents.map(inc => (
                            <div key={inc.id} className="p-2 bg-slate-800/50 border border-slate-700/50 rounded hover:bg-slate-700/50 cursor-pointer transition-colors">
                                <div className="flex justify-between mb-1">
                                    <span className={`text-[10px] uppercase font-bold px-1 rounded ${inc.type === 'fire' ? 'bg-orange-500/20 text-orange-400' :
                                        inc.type === 'flood' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                                        }`}>{inc.type}</span>
                                    <span className="text-[10px] text-slate-500">{new Date(inc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="text-xs font-bold text-slate-200">{inc.location}</div>
                                <div className="text-[10px] text-slate-500 mt-1">Trust Score: 92%</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CENTER: Map (7 cols) */}
                <div className="col-span-7 bg-slate-950 relative border border-slate-800 flex items-center justify-center overflow-hidden">
                    <LiveMap />

                    {/* Dynamic Markers Overlay (Managed by Map internally or overlay here) */}
                    {/* Note: Ideally LiveMap should consume store, but keeping overlay for visual flair if map doesn't show them yet */}
                    <div className="pointer-events-none absolute inset-0 z-[500]">
                        {incidents.map(inc => (
                            <div key={inc.id} className="absolute w-4 h-4 rounded-full border-2 border-red-500 animate-ping opacity-75"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)` // Mock positioning for demo overlay
                                }}>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: VCE & Stats (3 cols) */}
                <div className="col-span-3 bg-slate-900/50 border border-slate-800 flex flex-col">
                    {/* Controls */}
                    <div className="p-4 border-b border-slate-800">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-3">VCE™ Simulation Controls</div>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => simulateIncident()} className="bg-orange-600 hover:bg-orange-500 text-white py-4 rounded font-bold text-xs uppercase shadow-lg shadow-orange-900/20 active:scale-95 transition-all">
                                Simulate Fire
                            </button>
                            <button onClick={() => simulateIncident()} className="bg-blue-600 hover:bg-blue-500 text-white py-4 rounded font-bold text-xs uppercase shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
                                Simulate Flood
                            </button>
                        </div>
                    </div>

                    {/* Resource List */}
                    <div className="flex-1 p-2">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">Field Units</div>
                        <div className="space-y-2">
                            {volunteers.map(vol => (
                                <div key={vol.id} className="flex items-center justify-between p-2 bg-slate-950/50 border border-slate-800 rounded">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${vol.status === 'available' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                                        <span className="text-xs font-mono text-slate-300">{vol.name}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 uppercase">{vol.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
