
import React from "react";
import { Wallet, DollarSign, TrendingUp, Zap } from "lucide-react";
import { PROFILE_MOCK_DATA } from "@/lib/constants";

const ProfileStats = () => {
    const { stats } = PROFILE_MOCK_DATA;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Card 1: Positions */}
            <div className="bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all">
                <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg border border-gray-200">
                        <Wallet size={20} className="text-black" />
                    </div>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase">Positions</p>
                <h3 className="text-2xl font-black text-black">{stats.positions}</h3>
            </div>

            {/* Card 2: PNL */}
            <div className="bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all">
                <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg border border-gray-200">
                        <DollarSign size={20} className="text-black" />
                    </div>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase">PNL</p>
                <h3 className="text-2xl font-black text-green-600">{stats.pnl}</h3>
            </div>

            {/* Card 3: Total Vol */}
            <div className="bg-white rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all">
                <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-gray-100 rounded-lg border border-gray-200">
                        <TrendingUp size={20} className="text-black" />
                    </div>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase">Total Volume</p>
                <h3 className="text-2xl font-black text-black">{stats.volume}</h3>
            </div>

            {/* Card 4: Markets (Distinctive Style) */}
            <div className="bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-xl border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] text-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] transition-all">
                <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-white/20 rounded-lg border border-white/30 backdrop-blur-sm">
                        <Zap size={20} className="text-white" />
                    </div>
                </div>
                <p className="text-xs font-bold text-blue-100 uppercase">Markets</p>
                <h3 className="text-2xl font-black text-white">{stats.markets}</h3>
            </div>
        </div>
    );
};

export default ProfileStats;
