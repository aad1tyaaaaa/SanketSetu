"use client";

import { useStore } from '@/lib/store';
import { AlertTriangle, MapPin, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function CitizenPage() {
    const { addIncident } = useStore();
    const [reporting, setReporting] = useState(false);
    const [reported, setReported] = useState(false);

    const handleSOS = () => {
        setReporting(true);
        setTimeout(() => {
            addIncident({
                type: 'medical',
                location: 'User Location',
                severity: 'high',
                status: 'open',
            });
            setReporting(false);
            setReported(true);
        }, 2000);
    };

    if (reported) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Help is on the way!</h2>
                <p className="text-slate-400 mb-8">Volunteer Priya S. has been assigned (ETA: 4 mins)</p>

                <div className="w-full max-w-xs bg-slate-900 rounded-xl p-4 border border-slate-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
                        <div className="text-left">
                            <div className="text-white font-bold">Priya S.</div>
                            <div className="text-xs text-emerald-400">Medical Responder</div>
                        </div>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-emerald-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-slate-500 uppercase">
                        <span>Dispatched</span>
                        <span>Arriving</span>
                    </div>
                </div>

                <button onClick={() => setReported(false)} className="mt-8 text-slate-500 underline text-sm">Report another issue</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-4 flex flex-col max-w-md mx-auto border-x border-slate-800/50">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <Image src="/sanket-logo.svg" alt="Sanket" width={24} height={24} />
                    <span className="font-bold text-white">Sanket<span className="text-amber-500">Citizen</span></span>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center mb-12">
                <button
                    onClick={handleSOS}
                    disabled={reporting}
                    className="relative group w-64 h-64 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_60px_rgba(220,38,38,0.3)] transition-all active:scale-95 disabled:scale-95 disabled:opacity-80"
                >
                    <div className="absolute inset-0 rounded-full border-4 border-red-500/30 w-full h-full animate-[ping_3s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-red-500/30 w-full h-full animate-[ping_3s_ease-in-out_infinite_1.5s]"></div>

                    <div className="z-10 flex flex-col items-center">
                        {reporting ? (
                            <Loader2 className="w-12 h-12 text-white animate-spin" />
                        ) : (
                            <>
                                <AlertTriangle className="w-16 h-16 text-white mb-2" />
                                <span className="text-2xl font-black text-white tracking-widest">SOS</span>
                                <span className="text-[10px] text-red-200 mt-1 uppercase tracking-wide opacity-80">Press for Help</span>
                            </>
                        )}
                    </div>
                </button>
                <p className="mt-8 text-slate-500 text-sm text-center max-w-[200px]">
                    Location sharing is active. Press SOS for immediate emergency dispatch.
                </p>
            </div>
        </div>
    );
}
