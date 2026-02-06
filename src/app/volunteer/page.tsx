"use client";

import { useStore } from '@/lib/store';
import { ShieldCheck, MapPin, Navigation, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VolunteerPage() {
    const { incidents, assignVolunteer } = useStore();
    // Simple logic to find an open incident for demo
    const activeMission = incidents.find(i => i.status === 'open');

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans max-w-md mx-auto border-x border-slate-800/50 flex flex-col">
            {/* Radar Header */}
            <div className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <div className="absolute inset-0 border border-emerald-500/30 rounded-full"></div>
                            <div className="absolute inset-0 border-t border-emerald-500 rounded-full animate-spin"></div>
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white uppercase tracking-wider">Scanner Active</div>
                            <div className="text-[10px] text-slate-500">Searching for alerts...</div>
                        </div>
                    </div>
                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Mission Feed */}
            <div className="flex-1 p-4 space-y-4">
                <AnimatePresence>
                    {activeMission ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900 border border-red-500/50 rounded-xl overflow-hidden shadow-2xl shadow-red-900/10"
                        >
                            <div className="bg-red-600 px-4 py-1 text-[10px] font-bold text-white uppercase flex justify-between">
                                <span>High Priority Alert</span>
                                <span>0.8 KM AWAY</span>
                            </div>
                            <div className="p-5">
                                <h2 className="text-2xl font-bold text-white mb-2 uppercase">{activeMission.type} DETECTED</h2>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                                    <MapPin className="w-4 h-4" />
                                    <span>{activeMission.location}</span>
                                </div>

                                {/* Swipe Mechanic (Mocked with simple slider for now) */}
                                <div className="relative h-12 bg-slate-950 rounded-full border border-slate-800 overflow-hidden group cursor-pointer"
                                    onClick={() => assignVolunteer('VOL-001', activeMission.id)}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase tracking-widest z-0">
                                        Swipe to Accept
                                    </div>
                                    <div className="absolute left-1 top-1 bottom-1 w-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg transition-all group-hover:w-[calc(100%-8px)] duration-500 ease-out">
                                        <Check className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center py-20 opacity-50">
                            <Navigation className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-500 text-sm uppercase tracking-wide">No active missions in sector</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
