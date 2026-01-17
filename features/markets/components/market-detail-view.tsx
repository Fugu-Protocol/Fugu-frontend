"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { BarChart, Clock, Share2, Star, ArrowLeft } from "lucide-react";
import { MARKETS } from "@/lib/constants";
import { generateSlug } from "../utils";
import type { Outcome } from "../types";
import OutcomeRow from "./outcome-row";
import TradePanel from "./trade-panel";
import CommentsSection from "./comments-section";
import InteractiveChart from "./interactive-chart";

// Mock chart data for visualization
const CHART_DATA = [
    { time: "10:00", value: 30 },
    { time: "12:00", value: 45 },
    { time: "14:00", value: 42 },
    { time: "16:00", value: 55 },
    { time: "18:00", value: 68 },
    { time: "20:00", value: 75 },
];

interface MarketDetailViewProps {
    slug: string;
}

const MarketDetailView: React.FC<MarketDetailViewProps> = ({ slug }) => {
    // Find the market by slug
    const market = MARKETS.find((m) => generateSlug(m.question) === slug);

    // Generate outcome from market data
    const defaultOutcome: Outcome = market
        ? {
            id: `out_${market.id}`,
            name: market.question,
            imageUrl: market.imageUrl || `https://picsum.photos/id/${1000 + market.id}/100/100`,
            volume: market.volume,
            percentage: market.yes,
            change: ((market.id * 7) % 20) - 5, // Deterministic change based on market id
            yesPrice: market.yes,
            noPrice: market.no,
        }
        : {
            id: "out_default",
            name: "Unknown Market",
            imageUrl: "https://img.icons8.com/color/200/question-mark.png",
            volume: "$0",
            percentage: 50,
            change: 0,
            yesPrice: 50,
            noPrice: 50,
        };

    const [selectedOutcome, setSelectedOutcome] =
        useState<Outcome>(defaultOutcome);

    useEffect(() => {
        setSelectedOutcome(defaultOutcome);
    }, [slug]);

    if (!market) {
        return (
            <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">Market Not Found</h1>
                    <p className="text-slate-600 mb-6">
                        The market you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link
                        href="/market"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                        <ArrowLeft size={20} />
                        Back to Markets
                    </Link>
                </div>
            </div>
        );
    }

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
                                    <span className="text-4xl">{market.mainIcon}</span>
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
                                        <span>Ends Jan 31, 2026</span>
                                    </div>
                                    <div className="flex gap-3 ml-auto">
                                        <button className="p-2 bg-white hover:bg-slate-50 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none">
                                            <Star size={20} strokeWidth={2.5} />
                                        </button>
                                        <button className="p-2 bg-white hover:bg-slate-50 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none">
                                            <Share2 size={20} strokeWidth={2.5} />
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
                            This market will resolve to &quot;Yes&quot; if the condition is
                            met by the resolution date, and &quot;No&quot; otherwise. The
                            resolution will be based on official data sources and verified by
                            our oracle network.
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
                        <TradePanel outcome={selectedOutcome} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MarketDetailView;
