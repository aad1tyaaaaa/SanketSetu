"use client";

import { MoreHorizontal, ExternalLink } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const RESPONSE_DATA = [
    { time: '11:00', value: 2.5 },
    { time: '22:00', value: 4.2 },
    { time: '27:00', value: 3.8 },
    { time: '21:00', value: 5.5 },
    { time: '28:00', value: 3.2 },
];

const DENSITY_DATA = [
    { month: 'Jan', val: 300 },
    { month: 'Feb', val: 450 },
    { month: 'Mar', val: 400 },
    { month: 'Apr', val: 800 },
    { month: 'May', val: 600 },
    { month: 'Jun', val: 400 },
];

export function ResourceAnalytics() {
    return (
        <div className="flex h-full flex-col gap-2 p-1">
            {/* Header */}
            <div className="flex items-center justify-between px-2 pt-2 mb-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Resource & Analytics</h2>
                <MoreHorizontal className="h-4 w-4 text-slate-500 cursor-pointer" />
            </div>

            {/* Response Chart */}
            <div className="flex-1 bg-slate-900/40 rounded border border-slate-800/50 p-2 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="text-[10px] text-slate-400 font-medium">Response Time (Avg: 3.5m)</div>
                    </div>
                    <div className="text-[10px] text-blue-500 font-bold">Real Time</div>
                </div>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={RESPONSE_DATA}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={[0, 8]} />
                            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }} />
                            <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Density Chart */}
            <div className="flex-1 bg-slate-900/40 rounded border border-slate-800/50 p-2 flex flex-col">
                <div className="text-[10px] text-slate-400 font-medium mb-2">Incident Density by Zone</div>
                <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={DENSITY_DATA}>
                            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 8 }} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', fontSize: '10px' }} />
                            <Bar dataKey="val" fill="#f97316" radius={[2, 2, 0, 0]} barSize={12} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Mobile App Preview (Mock) */}
            <div className="h-[200px] relative mt-2 flex justify-center">
                {/* Phone Frame */}
                <div className="absolute w-[200px] h-full rounded-t-[30px] border-x-[8px] border-t-[8px] border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-24 bg-slate-800 rounded-b-xl z-20"></div>

                    {/* App Content */}
                    <div className="pt-8 px-3 pb-3 h-full flex flex-col bg-slate-900">
                        <div className="flex items-center text-slate-100 mb-4">
                            <span className="text-[10px] font-bold">VOLUNTEER APP</span>
                        </div>

                        <div className="bg-slate-800 rounded p-2 border-l-2 border-orange-500 mb-2">
                            <div className="flex items-center gap-1 text-[8px] text-orange-400 font-bold mb-1">
                                <span className="animate-pulse">●</span> NEW TASK: Fire Assist
                            </div>
                            <div className="text-[8px] text-slate-300">Location: Nearby Zone (Masked)</div>
                            <div className="text-[8px] text-slate-300">Distance: 0.8km</div>
                            <div className="flex gap-1 mt-2">
                                <span className="text-[8px] text-blue-400 font-bold cursor-pointer">Accept</span>
                                <span className="text-[8px] text-slate-500 cursor-pointer">Decline</span>
                            </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between text-[8px] bg-slate-800 p-2 rounded-full">
                            <span className="text-emerald-400">Status: Available</span>
                            <div className="w-6 h-3 bg-emerald-500 rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
