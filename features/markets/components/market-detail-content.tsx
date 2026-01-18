"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BarChart, Clock, Share2, Star, ArrowLeft, Check, Copy } from "lucide-react";
import type { Outcome } from "../types";
import OutcomeRow from "./outcome-row";
import TradePanel from "@/features/markets/components/trade-panel";
import CommentsSection from "./comments-section";
import InteractiveChart from "./interactive-chart";

// Mock chart data (since we don't have historical data on chain yet)
const CHART_DATA = [
    { time: "10:00", value: 30 },
    { time: "12:00", value: 45 },
    { time: "14:00", value: 42 },
    { time: "16:00", value: 55 },
    { time: "18:00", value: 68 },
    { time: "20:00", value: 75 },
];

interface MarketDetailContentProps {
    market: any; // We can improve typing later
}

const MarketDetailContent: React.FC<MarketDetailContentProps> = ({ market }) => {
    // Generate outcome logic
    const defaultOutcome: Outcome = {
        id: `out_${market.id}`,
        name: market.question,
        imageUrl: market.imageUrl || market.mainIcon,
        volume: market.volume || "$0",
        percentage: market.yesPrice ? Math.round(market.yesPrice * 100) : (market.yes || 50),
        change: 0,
        yesPrice: market.yesPrice ? Math.round(market.yesPrice * 100) : (market.yes || 50),
        noPrice: market.noPrice ? Math.round(market.noPrice * 100) : (market.no || 50),
        // Pass real ID if needed for trading
    };

    const [selectedOutcome, setSelectedOutcome] = useState<Outcome>(defaultOutcome);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        setSelectedOutcome(defaultOutcome);
    }, [market]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const outcomes: Outcome[] = [defaultOutcome];

    return (
        <div className="min-h-screen bg-[#F0FDF4] pb-20 pt-24">
            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 mb-6">
                <Link
                    href="/market"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-black font-bold transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Markets
                </Link>
            </div>

            <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Market Details & List */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden shrink-0 flex items-center justify-center">
                                {market.imageUrl ? (
                                    <img
                                        src={market.imageUrl}
                                        alt={market.question}
                                        className="w-12 h-12 object-contain"
                                    />
                                ) : (
                                    <span className="text-4xl">{market.mainIcon || "💰"}</span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-black leading-tight tracking-tight">
                                    {market.question}
                                </h1>
                                <div className="flex flex-wrap gap-4 text-slate-500 text-sm mt-3 font-bold">
                                    <div className="flex items-center gap-1.5 hover:text-black cursor-pointer bg-white px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_0px_#000]">
                                        <BarChart size={16} />
                                        <span>Vol. {market.volume}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 hover:text-black cursor-pointer bg-white px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_0px_#000]">
                                        <Clock size={16} />
                                        <span>
                                            {market.deadline
                                                ? `Ends ${new Date(Number(market.deadline)).toLocaleDateString()}`
                                                : "Ends Jan 31, 2026"}
                                        </span>
                                    </div>
                                    <div className="flex gap-3 ml-auto">
                                        <button
                                            onClick={() => setIsFavorite(!isFavorite)}
                                            className="p-2 bg-white hover:bg-slate-50 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none"
                                        >
                                            <Star
                                                size={20}
                                                strokeWidth={2.5}
                                                className={isFavorite ? "fill-yellow-400 text-black" : "text-black"}
                                            />
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="p-2 bg-white hover:bg-slate-50 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none"
                                        >
                                            {isCopied ? <Check size={20} strokeWidth={2.5} className="text-green-600" /> : <Copy size={20} strokeWidth={2.5} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <InteractiveChart
                        data={CHART_DATA}
                        currentPercentage={selectedOutcome.percentage}
                        change={selectedOutcome.change}
                    />

                    {/* Outcomes List */}
                    <div className="pt-2">
                        <div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            {/* Table Header */}
                            <div className="bg-slate-50 border-b-2 border-black p-3 text-xs font-black text-slate-500 uppercase tracking-wider flex justify-between">
                                <span className="pl-2">Outcome</span>
                                <span className="pr-16 hidden md:inline">Price / Action</span>
                            </div>

                            {outcomes.map((outcome) => (
                                <OutcomeRow
                                    key={outcome.id}
                                    outcome={outcome}
                                    isSelected={selectedOutcome.id === outcome.id}
                                    onSelect={setSelectedOutcome}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Description / Rules */}
                    <div className="bg-white rounded-xl p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-black font-black mb-4 text-xl flex items-center gap-2">
                            <span className="bg-yellow-300 px-2 border border-black shadow-sm text-sm">
                                RULES
                            </span>
                            Market Rules
                        </h3>
                        <p className="text-slate-600 font-medium text-base leading-relaxed">
                            {market.description ||
                                `This market will resolve to "Yes" if the condition is
                            met by the resolution date, and "No" otherwise. The
                            resolution will be based on official data sources and verified by
                            our oracle network.`}
                            <br />
                            <br />
                            Trading ends 1 hour before the resolution time. All positions will
                            be automatically settled after resolution.
                        </p>
                    </div>

                    {/* Comments Section */}
                    <CommentsSection />
                </div>

                {/* Right Column: Trade Panel - Sticky */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-24">
                        <TradePanel outcome={selectedOutcome} marketId={market.realId} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MarketDetailContent;
