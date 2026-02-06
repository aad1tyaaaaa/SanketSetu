"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { MoreHorizontal, Calendar } from "lucide-react";

// Mock Data
const RESPONSE_TIME_DATA = [
    { time: '07:00', value: 3.2 },
    { time: '12:00', value: 2.5 },
    { time: '15:00', value: 3.0 },
    { time: '18:00', value: 2.2 },
    { time: '20:00', value: 2.8 },
    { time: '24:00', value: 2.1 },
    { time: '07:00 (+1)', value: 1.8 },
];

const FALSE_ALERT_DATA = [
    { type: 'Fire', val: 85, color: '#f97316' },
    { type: 'Flood', val: 55, color: '#eab308' },
    { type: 'Medical', val: 35, color: '#22c55e' },
    { type: 'Other', val: 25, color: '#64748b' },
];

const TYPE_DATA = [
    { type: 'Fire', val: 85, color: '#f97316' },
    { type: 'Flood', val: 50, color: '#3b82f6' },
    { type: 'Medical', val: 38, color: '#eab308' },
    { type: 'Other', val: 15, color: '#64748b' },
];

const PIE_DATA = [
    { name: 'Open', value: 40, color: '#f97316' },
    { name: 'Assigned', value: 35, color: '#eab308' },
    { name: 'Resolved', value: 25, color: '#22c55e' },
];

// Custom Zone Map Component (SVG)
function ZoneMapWidget() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                <path d="M100 100 L100 20 L160 60 L100 100" fill="#fef08a" stroke="#000" strokeWidth="0.5" /> {/* North East */}
                <path d="M100 100 L160 60 L180 120 L100 100" fill="#fde047" stroke="#000" strokeWidth="0.5" /> {/* East */}
                <path d="M100 100 L180 120 L140 180 L100 100" fill="#bfdbfe" stroke="#000" strokeWidth="0.5" /> {/* South East */}
                <path d="M100 100 L140 180 L60 180 L100 100" fill="#86efac" stroke="#000" strokeWidth="0.5" /> {/* South */}
                <path d="M100 100 L60 180 L20 120 L100 100" fill="#3b82f6" stroke="#000" strokeWidth="0.5" /> {/* South West */}
                <path d="M100 100 L20 120 L40 60 L100 100" fill="#93c5fd" stroke="#000" strokeWidth="0.5" /> {/* West */}
                <path d="M100 100 L40 60 L100 20" fill="#d1fae5" stroke="#000" strokeWidth="0.5" /> {/* North West */}
                <circle cx="100" cy="100" r="15" fill="#f97316" stroke="#fff" strokeWidth="1" />
                <text x="100" y="103" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">Central</text>
            </svg>

            {/* Labels overlay */}
            <div className="absolute top-4 right-8 text-[8px] text-slate-800 font-bold bg-yellow-200/80 px-1 rounded">North Zone</div>
            <div className="absolute bottom-8 left-12 text-[8px] text-slate-100 font-bold bg-blue-600/80 px-1 rounded">Distict Zone</div>
            <div className="absolute bottom-16 right-1/4 text-[8px] text-slate-800 font-bold bg-green-300/80 px-1 rounded text-center leading-tight">Privacy<br />Masked<br />Zone</div>
        </div>
    )
}

function ChartCard({ title, children, wide = false }: { title: string, children: React.ReactNode, wide?: boolean }) {
    return (
        <div className={`bg-slate-900/50 border border-slate-800 rounded p-3 flex flex-col ${wide ? 'col-span-1 lg:col-span-2' : 'col-span-1'}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-300">{title}</h3>
                <MoreHorizontal className="h-4 w-4 text-slate-500 cursor-pointer" />
            </div>
            <div className="flex-1 min-h-[200px]">
                {children}
            </div>
        </div>
    )
}

export default function AnalyticsPage() {
    return (
        <div className="h-full w-full bg-slate-950 p-4 overflow-auto">
            {/* Top Filter Bar */}
            <div className="flex justify-end mb-4 gap-2">
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300">
                    <Calendar className="h-3 w-3" />
                    <span>Last 24 Hours</span>
                </div>
                {['Last 7 Days', 'Last 30 Days'].map(d => (
                    <button key={d} className="bg-slate-900/50 border border-slate-800/50 px-3 py-1.5 rounded text-xs text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-colors">
                        {d}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Row 1: Area Chart (Wide) & False Alert (Bar) */}
                <ChartCard title="Average Response Time Trend (Last 24h)" wide>
                    <div className="absolute right-4 top-12 text-right">
                        <div className="text-xs text-slate-400">Current Average:</div>
                        <div className="text-2xl font-bold text-slate-100">3.2 mins</div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={RESPONSE_TIME_DATA}>
                            <defs>
                                <linearGradient id="gradResponse" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} domain={[0, 4]} />
                            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#gradResponse)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="False Alert Ratio">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={FALSE_ALERT_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="type" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', fontSize: '12px' }} />
                            <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                                {FALSE_ALERT_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Row 2: Incidents Type, Status Pie, Zone Map */}
                <ChartCard title="Incidents by Type">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={TYPE_DATA} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="type" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', fontSize: '12px' }} />
                            <Bar dataKey="val" radius={[4, 4, 0, 0]}>
                                {TYPE_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Incident Status Distribution">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={PIE_DATA}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {PIE_DATA.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-2">
                        {PIE_DATA.map(d => (
                            <div key={d.name} className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                                <span className="text-[10px] text-slate-400">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </ChartCard>

                <ChartCard title="Volunteer Utilization by Zone">
                    <ZoneMapWidget />
                </ChartCard>

            </div>
        </div>
    );
}
