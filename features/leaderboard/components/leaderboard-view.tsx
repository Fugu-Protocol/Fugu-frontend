"use client";

import React, { useState } from "react";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";
import NeoButton from "@/components/ui/neo-button";
import { motion } from "framer-motion";

import { LEADERBOARD_DATA } from "@/lib/constants";

const LeaderboardView = () => {
    const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "all-time">("all-time");

    // Re-sort or filter data based on timeframe (mock logic)
    const displayData = React.useMemo(() => {
        // Just shuffling/modifying slightly for demo effect
        if (timeframe === "weekly") {
            return [...LEADERBOARD_DATA].sort((a, b) => b.rank - a.rank); // Reverse for fun
        }
        return LEADERBOARD_DATA;
    }, [timeframe]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
                <div className="inline-block mb-4 px-4 py-1.5 bg-yellow-300 border-2 border-black rounded-full font-bold shadow-[4px_4px_0px_0px_#000] animate-bounce">
                    🏆 Season 1 Live
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
                    Hall of <span className="text-primary relative inline-block">
                        Fame
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                        </svg>
                    </span>
                </h1>
                <p className="text-xl text-gray-600 font-bold max-w-2xl mx-auto">
                    Top traders who saw the future before everyone else.
                </p>
            </div>

            {/* Top 3 Podium (Desktop) */}
            <div className="hidden md:flex justify-center items-end gap-6 mb-20 px-4">
                {/* 2nd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-black mb-[-20px] z-10 flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                        {displayData[1].avatar}
                    </div>
                    <div className="bg-white border-4 border-black w-48 h-48 flex flex-col items-center justify-start pt-10 rounded-t-xl shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
                        <div className="absolute top-0 w-full h-4 bg-gray-300 border-b-2 border-black"></div>
                        <h3 className="font-black text-xl mb-1">{displayData[1].name}</h3>
                        <p className="text-green-600 font-bold mb-2">{displayData[1].pnl}</p>
                        <div className="px-3 py-1 bg-gray-100 rounded-lg border-2 border-black font-bold text-sm">
                            #{displayData[1].rank} Silver
                        </div>
                    </div>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative">
                        <Star className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 fill-yellow-400 w-12 h-12 animate-pulse" />
                        <div className="w-32 h-32 rounded-full bg-yellow-300 border-4 border-black mb-[-25px] z-10 flex items-center justify-center text-6xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                            {displayData[0].avatar}
                        </div>
                    </div>
                    <div className="bg-gradient-to-b from-yellow-100 to-white border-4 border-black w-56 h-64 flex flex-col items-center justify-start pt-12 rounded-t-xl shadow-[8px_8px_0px_0px_#000] relative overflow-hidden z-0">
                        <div className="absolute top-0 w-full h-4 bg-yellow-400 border-b-2 border-black"></div>
                        <h3 className="font-black text-2xl mb-1">{displayData[0].name}</h3>
                        <p className="text-green-600 font-bold text-lg mb-2">{displayData[0].pnl}</p>
                        <div className="px-4 py-1 bg-yellow-300 rounded-lg border-2 border-black font-bold flex items-center gap-2">
                            <Trophy size={16} /> #{displayData[0].rank} Champion
                        </div>
                    </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-24 h-24 rounded-full bg-orange-200 border-4 border-black mb-[-20px] z-10 flex items-center justify-center text-4xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                        {displayData[2].avatar}
                    </div>
                    <div className="bg-white border-4 border-black w-48 h-40 flex flex-col items-center justify-start pt-10 rounded-t-xl shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
                        <div className="absolute top-0 w-full h-4 bg-orange-300 border-b-2 border-black"></div>
                        <h3 className="font-black text-xl mb-1">{displayData[2].name}</h3>
                        <p className="text-green-600 font-bold mb-2">{displayData[2].pnl}</p>
                        <div className="px-3 py-1 bg-orange-100 rounded-lg border-2 border-black font-bold text-sm">
                            #{displayData[2].rank} Bronze
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-4 mb-8">
                {["weekly", "monthly", "all-time"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTimeframe(t as any)}
                        className={`px-6 py-2 rounded-lg font-bold border-2 border-black transition-all uppercase text-sm tracking-wide ${timeframe === t
                            ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] translate-x-[2px] translate-y-[2px]"
                            : "bg-white hover:bg-gray-50 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#000]"
                            }`}
                    >
                        {t.replace("-", " ")}
                    </button>
                ))}
            </div>

            {/* List Table */}
            <div className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_#000]">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b-4 border-black font-black uppercase text-sm tracking-wider">
                    <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                    <div className="col-span-6 md:col-span-5">Trader</div>
                    <div className="col-span-4 md:col-span-2 text-right">PnL</div>
                    <div className="hidden md:block col-span-2 text-right">ROI</div>
                    <div className="hidden md:block col-span-2 text-right">Win Rate</div>
                </div>

                {/* Rows */}
                {displayData.slice(3).map((trader, index) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        key={trader.name}
                        className="grid grid-cols-12 gap-4 p-4 border-b-2 border-gray-100 items-center font-bold hover:bg-blue-50 transition-colors group"
                    >
                        <div className="col-span-2 md:col-span-1 flex justify-center">
                            <span className="w-8 h-8 rounded-full bg-gray-200 border-2 border-transparent group-hover:border-black group-hover:bg-white flex items-center justify-center transition-all">
                                {trader.rank}
                            </span>
                        </div>
                        <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                            <span className="text-2xl">{trader.avatar}</span>
                            <div>
                                <div className="text-base">{trader.name}</div>
                                <div className="text-xs text-gray-400 font-mono font-normal hidden sm:block">{trader.address}</div>
                            </div>
                        </div>
                        <div className="col-span-4 md:col-span-2 text-right text-green-600 font-black">
                            {trader.pnl}
                        </div>
                        <div className="hidden md:block col-span-2 text-right text-gray-600">
                            {trader.roi}
                        </div>
                        <div className="hidden md:block col-span-2 text-right text-gray-600">
                            {trader.winRate}
                        </div>
                    </motion.div>
                ))}
            </div>


        </div>
    );
};

export default LeaderboardView;
