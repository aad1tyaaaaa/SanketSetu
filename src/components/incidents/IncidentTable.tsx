"use client";

import { useMemo, useState } from "react";
import {
    Search,
    Filter,
    MoreHorizontal,
    AlertTriangle,
    CheckCircle2,
    Clock,
    ArrowUpDown,
    Download
} from "lucide-react";

type Incident = {
    id: string;
    type: string;
    location: string;
    severity: "High" | "Medium" | "Low";
    trustScore: number;
    status: "OPEN" | "ASSIGNED" | "RESOLVED";
    reportedAt: string;
    volunteer: string;
};

const MOCK_INCIDENTS: Incident[] = [
    { id: "INC-001", type: "Fire", location: "District A", severity: "High", trustScore: 92, status: "OPEN", reportedAt: "10:45 AM", volunteer: "-" },
    { id: "INC-002", type: "Flood Warning", location: "District B", severity: "Medium", trustScore: 85, status: "OPEN", reportedAt: "10:50 AM", volunteer: "-" },
    { id: "INC-003", type: "Medical Emergency", location: "District C", severity: "High", trustScore: 95, status: "ASSIGNED", reportedAt: "10:55 AM", volunteer: "Priya S." },
    { id: "INC-004", type: "Fire", location: "District D", severity: "Medium", trustScore: 88, status: "ASSIGNED", reportedAt: "11:00 AM", volunteer: "Rahul K." },
    { id: "INC-005", type: "Medical Emergency", location: "District E", severity: "High", trustScore: 91, status: "OPEN", reportedAt: "11:05 AM", volunteer: "-" },
    { id: "INC-006", type: "Flood Warning", location: "District B", severity: "Medium", trustScore: 85, status: "OPEN", reportedAt: "11:50 AM", volunteer: "-" },
    { id: "INC-007", type: "Flood Warning", location: "District B", severity: "High", trustScore: 82, status: "OPEN", reportedAt: "10:50 AM", volunteer: "-" },
];

export function IncidentTable() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filteredIncidents = useMemo(() => {
        return MOCK_INCIDENTS.filter(inc => {
            const matchesFilter = filter === "All" || inc.status === filter;
            const matchesSearch = inc.type.toLowerCase().includes(search.toLowerCase()) ||
                inc.location.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [filter, search]);

    return (
        <div className="flex h-full flex-col gap-4 p-6 bg-slate-950 text-slate-200">

            {/* Header Stats */}
            <div className="flex gap-4 mb-4">
                <div className="bg-slate-900/50 p-4 rounded border border-slate-800 w-48">
                    <div className="text-sm text-slate-400">Total Incidents</div>
                    <div className="text-2xl font-bold text-slate-100">15</div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded border border-slate-800 w-48">
                    <div className="text-sm text-slate-400">Open</div>
                    <div className="text-2xl font-bold text-orange-500">5</div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded border border-slate-800 w-48">
                    <div className="text-sm text-slate-400">Assigned</div>
                    <div className="text-2xl font-bold text-yellow-500">7</div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded border border-slate-800 w-48">
                    <div className="text-sm text-slate-400">Resolved</div>
                    <div className="text-2xl font-bold text-emerald-500">3</div>
                </div>
            </div>

            {/* Main Table Panel */}
            <div className="flex-1 rounded-lg border border-slate-800 bg-slate-900/50 flex flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Incident Management Log</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">Filter by Status:</span>
                            <select
                                className="bg-slate-800 border border-slate-700 text-xs rounded px-2 py-1 text-slate-200 outline-none"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="OPEN">Open</option>
                                <option value="ASSIGNED">Assigned</option>
                                <option value="RESOLVED">Resolved</option>
                            </select>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-48 bg-slate-800 border border-slate-700 rounded pl-8 pr-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button className="p-1.5 hover:bg-slate-800 rounded text-slate-400">
                            <Download className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900/90 text-[10px] font-bold uppercase text-slate-500 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 border-b border-slate-800 w-10">
                                    <input type="checkbox" className="rounded border-slate-700 bg-slate-800" />
                                </th>
                                <th className="px-4 py-3 border-b border-slate-800">Incident ID</th>
                                <th className="px-4 py-3 border-b border-slate-800">Type</th>
                                <th className="px-4 py-3 border-b border-slate-800">Location</th>
                                <th className="px-4 py-3 border-b border-slate-800">Severity</th>
                                <th className="px-4 py-3 border-b border-slate-800">Trust Score</th>
                                <th className="px-4 py-3 border-b border-slate-800">Status</th>
                                <th className="px-4 py-3 border-b border-slate-800">Reported Time</th>
                                <th className="px-4 py-3 border-b border-slate-800">Assigned Volunteer</th>
                                <th className="px-4 py-3 border-b border-slate-800 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {filteredIncidents.map((inc) => (
                                <tr key={inc.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 text-slate-600">
                                        <input type="checkbox" className="rounded border-slate-700 bg-slate-800" />
                                    </td>
                                    <td className="px-4 py-3 font-mono text-blue-400 font-medium cursor-pointer hover:underline">{inc.id}</td>
                                    <td className="px-4 py-3 text-slate-200">{inc.type}</td>
                                    <td className="px-4 py-3 text-slate-400">{inc.location}</td>
                                    <td className="px-4 py-3">
                                        <span className={`font-bold ${inc.severity === 'High' ? 'text-red-500' :
                                                inc.severity === 'Medium' ? 'text-orange-500' : 'text-blue-500'
                                            }`}>
                                            {inc.severity}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-300 font-mono">{inc.trustScore}%</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${inc.status === 'OPEN' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/10' :
                                                inc.status === 'ASSIGNED' ? 'border-orange-500/20 text-orange-500 bg-orange-500/10' :
                                                    'border-slate-500/20 text-slate-500 bg-slate-500/10'
                                            }`}>
                                            {inc.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-400 font-mono">{inc.reportedAt}</td>
                                    <td className="px-4 py-3 text-slate-300">{inc.volunteer}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-800 rounded text-slate-500">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
