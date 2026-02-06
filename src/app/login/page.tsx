"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Heart, Building2, ShieldAlert, ArrowRight, Lock, Mail, Eye, EyeOff, Users, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../lib/store';

const LoginPage = () => {
    const router = useRouter();
    const setUserRole = useStore((state) => state.setUserRole);
    const [selectedRole, setSelectedRole] = useState('citizen');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // SanketSetu Roles
    const roles = [
        {
            id: 'citizen',
            title: 'Citizen',
            email: 'citizen@sanket.in',
            password: 'password123',
            path: '/citizen',
            icon: User,
            color: 'bg-amber-500',
            gradient: 'from-amber-500 to-orange-400',
            ringColor: '#f59e0b'
        },
        {
            id: 'volunteer',
            title: 'Volunteer',
            email: 'volunteer@sanket.in',
            password: 'volunteerpass',
            path: '/volunteer',
            icon: Heart,
            color: 'bg-emerald-500',
            gradient: 'from-emerald-500 to-teal-400',
            ringColor: '#10b981'
        },
        {
            id: 'agency',
            title: 'Agency / NGO',
            email: 'agency@sanket.in',
            password: 'agencypass',
            path: '/dashboard', // Fallback to dashboard for now
            icon: Building2,
            color: 'bg-blue-500',
            gradient: 'from-blue-500 to-cyan-400',
            ringColor: '#3b82f6'
        },
        {
            id: 'admin',
            title: 'Administrator',
            email: 'admin@sanket.in',
            password: 'admincontrol',
            path: '/dashboard', // Admin goes to main dashboard
            icon: ShieldAlert,
            color: 'bg-purple-500',
            gradient: 'from-purple-500 to-indigo-400',
            ringColor: '#a855f7'
        }
    ];

    const currentRole = roles.find(r => r.id === selectedRole) || roles[0];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Update Global Store
        const role = selectedRole === 'admin' ? 'admin' :
            selectedRole === 'volunteer' ? 'volunteer' : 'citizen';
        setUserRole(role);

        setTimeout(() => {
            router.push(currentRole.path);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden transition-colors duration-500 font-sans">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className={`absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-10 blur-[120px] bg-gradient-to-br ${currentRole.gradient} transition-all duration-1000`}></div>
                <div className={`absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px] bg-gradient-to-tl ${currentRole.gradient} transition-all duration-1000`}></div>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 z-10">
                {/* Left Side: Branding & Info */}
                <div className="flex flex-col justify-center lg:p-12 text-center lg:text-left">
                    <div className="mb-8 inline-flex items-center justify-center lg:justify-start gap-3">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 shadow-xl overflow-hidden">
                            <Image src="/sanket-logo.svg" alt="SanketSetu" width={40} height={40} className="object-cover" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-wide uppercase">SanketSetu</span>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Resilience for <br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentRole.gradient} transition-all duration-500`}>
                            Every Crisis
                        </span>
                    </h1>

                    <p className="text-lg text-slate-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Access your synchronized command center to manage incidents, coordinate volunteers, and ensure community safety.
                    </p>

                    <div className="hidden lg:grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 transition-all hover:bg-slate-800/60">
                            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 mb-3 flex items-center justify-center border border-amber-500/20">
                                <Users size={20} />
                            </div>
                            <h3 className="font-semibold text-slate-200">Community First</h3>
                            <p className="text-sm text-slate-500 mt-1">Rapid reporting and real-time status updates for citizens.</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 transition-all hover:bg-slate-800/60">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 mb-3 flex items-center justify-center border border-emerald-500/20">
                                <Activity size={20} />
                            </div>
                            <h3 className="font-semibold text-slate-200">Real-time Ops</h3>
                            <p className="text-sm text-slate-500 mt-1">Live tactical maps and instant volunteer deployment.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Card */}
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 p-8 relative overflow-hidden ring-1 ring-white/5">
                        {/* Loading Overlay */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                                <div className={`w-12 h-12 border-4 border-slate-800 border-t-transparent rounded-full animate-spin`} style={{ borderTopColor: currentRole.ringColor }}></div>
                                <span className="mt-4 font-semibold text-slate-300">Authenticating...</span>
                            </div>
                        )}

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-slate-400 text-sm">Please select your role to sign in</p>
                        </div>

                        {/* Role Selector */}
                        <div className="grid grid-cols-4 gap-2 mb-8 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                            {roles.map((role) => {
                                const Icon = role.icon;
                                const isSelected = selectedRole === role.id;
                                return (
                                    <button
                                        key={role.id}
                                        onClick={() => setSelectedRole(role.id)}
                                        className={cn(
                                            "flex flex-col items-center justify-center py-2 rounded-lg transition-all duration-300 relative group",
                                            isSelected ? "bg-slate-800 shadow-md ring-1 ring-white/10" : "hover:bg-slate-900"
                                        )}
                                        title={role.title}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors mb-1",
                                            isSelected ? `${role.color} text-white` : "text-slate-500 group-hover:text-slate-300 bg-slate-900 group-hover:bg-slate-800"
                                        )}>
                                            <Icon size={16} />
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-medium leading-tight text-center px-1 hidden sm:block uppercase tracking-wider",
                                            isSelected ? "text-slate-200" : "text-slate-600 group-hover:text-slate-400"
                                        )}>
                                            {role.id}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email / ID</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-300 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={currentRole.email}
                                        readOnly
                                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900 transition-all font-medium"
                                        style={{ '--tw-ring-color': currentRole.ringColor } as React.CSSProperties}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                                    <button type="button" className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase">Forgot?</button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-300 transition-colors" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={currentRole.password}
                                        readOnly
                                        className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl py-3 pl-10 pr-10 text-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-900 transition-all font-medium"
                                        style={{ '--tw-ring-color': currentRole.ringColor } as React.CSSProperties}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 bg-gradient-to-r ${currentRole.gradient}`}
                                >
                                    <span>Sign in as {currentRole.title}</span>
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                            <p className="text-sm text-slate-500">
                                Don't have an account? <button className="font-bold text-slate-300 hover:text-white hover:underline transition-colors">Get Verified Access</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
