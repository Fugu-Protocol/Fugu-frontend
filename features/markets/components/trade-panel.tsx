"use client";

import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import type { Outcome } from "../types";

interface TradePanelProps {
    outcome: Outcome;
}

const FEE_PERCENTAGE = 0.1; // 0.1% fee

const TradePanel: React.FC<TradePanelProps> = ({ outcome }) => {
    const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
    const [outcomeType, setOutcomeType] = useState<"Yes" | "No">("Yes");
    const [amount, setAmount] = useState<number>(10); // Amount in dollars

    // Prices sum to 101% (market spread/margin)
    const baseYesPrice = outcome.yesPrice;
    const baseNoPrice = outcome.noPrice;
    const spreadYesPrice = Math.round(baseYesPrice * 1.005); // Add 0.5% spread
    const spreadNoPrice = 101 - spreadYesPrice; // Ensures sum = 101%

    // Calculate current price based on selection
    const currentPrice = outcomeType === "Yes" ? spreadYesPrice : spreadNoPrice;
    const avgPrice = currentPrice / 100; // Convert cents to dollars

    // Calculate potential winnings
    const sharesFromAmount = amount / avgPrice; // How many shares you can buy
    const potentialWin = sharesFromAmount * 1; // Each share pays $1 if correct
    const fee = amount * (FEE_PERCENTAGE / 100);
    const profit = potentialWin - amount - fee;

    // Quick amount buttons
    const handleQuickAmount = (value: string) => {
        if (value === "Max") {
            setAmount(1000); // Or could be connected to wallet balance
        } else {
            const numValue = parseInt(value.replace('+$', ''));
            setAmount(prev => prev + numValue);
        }
    };

    return (
        <div className="w-full bg-white border-2 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            {/* Header: Outcome Info */}
            <div className="p-4 border-b-2 border-black flex items-center gap-3 bg-slate-50">
                <div className="w-10 h-10 rounded-md border border-black bg-white p-1 flex items-center justify-center shrink-0">
                    <img
                        src={outcome.imageUrl}
                        alt={outcome.name}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-black font-black truncate text-sm">{outcome.name}</h3>
                </div>
            </div>

            {/* Main Form Area */}
            <div className="p-5 space-y-5">
                {/* Buy/Sell Toggle */}
                <div className="flex gap-4 text-sm font-bold">
                    <span
                        onClick={() => setOrderType("buy")}
                        className={`cursor-pointer pb-1 transition-all ${orderType === "buy"
                            ? "text-black border-b-2 border-black"
                            : "text-slate-400 hover:text-black"
                            }`}
                    >
                        Buy
                    </span>
                    <span
                        onClick={() => setOrderType("sell")}
                        className={`cursor-pointer pb-1 transition-all ${orderType === "sell"
                            ? "text-black border-b-2 border-black"
                            : "text-slate-400 hover:text-black"
                            }`}
                    >
                        Sell
                    </span>
                </div>

                {/* Yes/No Toggle */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setOutcomeType("Yes")}
                        className={`flex-1 py-3 rounded-lg font-black text-lg transition-all border-2 border-black ${outcomeType === "Yes"
                            ? "bg-emerald-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white text-slate-500 hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(200,200,200,1)]"
                            }`}
                    >
                        Yes {spreadYesPrice}¢
                    </button>
                    <button
                        onClick={() => setOutcomeType("No")}
                        className={`flex-1 py-3 rounded-lg font-black text-lg transition-all border-2 border-black ${outcomeType === "No"
                            ? "bg-rose-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                            : "bg-white text-slate-500 hover:bg-slate-50 shadow-[3px_3px_0px_0px_rgba(200,200,200,1)]"
                            }`}
                    >
                        No {spreadNoPrice}¢
                    </button>
                </div>

                {/* Amount Input */}
                <div className="bg-white rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#e2e8f0]">
                    <div className="flex items-center justify-between p-4">
                        <label className="text-slate-600 text-base font-bold">
                            Amount
                        </label>
                        <div className="flex items-center">
                            <span className="text-black font-black text-3xl">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                                className="w-24 bg-transparent text-right text-black font-black text-3xl focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-0 border-t-2 border-slate-100">
                        {["+$1", "+$20", "+$100", "Max"].map((val, idx) => (
                            <button
                                key={val}
                                onClick={() => handleQuickAmount(val)}
                                className={`
                                    bg-slate-50 hover:bg-white text-slate-600 hover:text-black text-sm font-bold py-2.5
                                    ${idx !== 3 ? "border-r-2 border-slate-100" : ""}
                                    transition-colors
                                `}
                            >
                                {val}
                            </button>
                        ))}
                    </div>
                </div>

                {/* To Win Section */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-slate-600 font-bold text-sm">To win</span>
                                <span className="text-lg">💵</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <span>Avg. Price {currentPrice}¢</span>
                                <Info size={12} className="text-slate-400" />
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-emerald-500 font-black text-3xl">
                                ${potentialWin.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Fee info */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 text-xs">
                        <span className="text-slate-500">Fee ({FEE_PERCENTAGE}%)</span>
                        <span className="text-slate-500">-${fee.toFixed(4)}</span>
                    </div>
                </div>

                {/* Trade Button */}
                <button
                    className={`w-full py-4 rounded-xl text-white font-black text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${orderType === "buy"
                        ? "bg-sky-500 hover:bg-sky-400"
                        : "bg-rose-500 hover:bg-rose-400"
                        }`}
                >
                    Trade
                </button>
            </div>
        </div>
    );
};

export default TradePanel;
