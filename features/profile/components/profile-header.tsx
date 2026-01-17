
import React from "react";
import Image from "next/image";
import { User, Shield, Award, Sparkles, Copy, Edit2 } from "lucide-react";
import NeoButton from "@/components/ui/neo-button";

interface ProfileHeaderProps {
    address: string;
}

const ProfileHeader = ({ address }: ProfileHeaderProps) => {
    // Determine truncated address for display
    const displayAddress = address.length > 10
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : address;

    return (
        <div className="relative mb-12">
            {/* Banner Container - encompasses everything */}
            <div className="w-full bg-[#1e1b4b] relative overflow-hidden border-b-2 border-black">
                {/* Abstract pattern overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>

                {/* Content Container */}
                <div className="md:px-58 px-6 py-12 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                        {/* User Info Section */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center">
                                {/* In a real app, this would be the user's avatar image or identicon */}
                                <span className="text-4xl">🐡</span>
                            </div>

                            {/* Name & Address */}
                            <div className="text-center md:text-left">
                                <h1 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3 justify-center md:justify-start mb-2">
                                    trananhtuandb1
                                    <button className="text-white/50 hover:text-white transition-colors">
                                        <Edit2 size={20} />
                                    </button>
                                </h1>
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-mono font-bold flex items-center gap-2 border border-white/20">
                                        {displayAddress}
                                        <button className="hover:text-gray-300 text-white/70">
                                            <Copy size={14} />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Badges Card - Glassmorphism style */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-white shadow-lg min-w-[280px]">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">Badges</h3>
                            <div className="flex gap-4">
                                {/* Hexagon Badge */}
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-200/20 rounded-full clip-path-polygon">
                                    <Shield className="w-8 h-8 text-white/80" fill="currentColor" />
                                </div>
                                {/* Pentagon Badge */}
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-200/20 rounded-full">
                                    <Award className="w-8 h-8 text-white/80" fill="currentColor" />
                                </div>
                                {/* Egg/Circle Badge */}
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-200/20 rounded-full">
                                    <Sparkles className="w-8 h-8 text-white/80" fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
