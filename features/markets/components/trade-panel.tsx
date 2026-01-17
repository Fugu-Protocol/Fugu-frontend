"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { Outcome } from "../types";

interface TradePanelProps {
    outcome: Outcome;
}

const FEE_PERCENTAGE = 0.1; // 0.1% fee

const TradePanel: React.FC<TradePanelProps> = ({ outcome }) => {
    const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
    const [outcomeType, setOutcomeType] = useState<"Yes" | "No">("Yes");
    const [shares, setShares] = useState<number>(1);
    const [limitPrice, setLimitPrice] = useState<number>(outcome.yesPrice);

    // Prices sum to 101% (market spread/margin)
    // Add 0.5% to each side to create the spread
    const baseYesPrice = outcome.yesPrice;
    const baseNoPrice = outcome.noPrice;
    const spreadYesPrice = Math.round(baseYesPrice * 1.005); // Add 0.5% spread
    const spreadNoPrice = 101 - spreadYesPrice; // Ensures sum = 101%

    // Update limit price when outcome or order type changes
    useEffect(() => {
        if (orderType === "buy") {
            setLimitPrice(outcomeType === "Yes" ? spreadYesPrice : spreadNoPrice);
        } else {
            // For selling, price is typically higher (what you're willing to sell at)
            setLimitPrice(outcomeType === "Yes" ? spreadYesPrice : spreadNoPrice);
        }
    }, [outcome, outcomeType, orderType, spreadYesPrice, spreadNoPrice]);

    const totalCost = (limitPrice / 100) * shares;
    const fee = totalCost * (FEE_PERCENTAGE / 100);
    const potentialReturn = shares * 1;
    const profit = orderType === "buy"
        ? potentialReturn - totalCost - fee
        : totalCost - fee; // When selling, you receive totalCost minus fee

    return (
        <div className="w-full bg-white border-2 border-black rounded-xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            {/* Header: Outcome Info */}
            <div className="p-4 border-b-2 border-black flex items-center gap-3 bg-slate-50">
                <img
                    src={outcome.imageUrl}
                    alt={outcome.name}
                    className="w-10 h-10 rounded-md object-cover border border-black"
                />
                <div className="flex-1 min-w-0">
                    <h3 className="text-black font-black truncate">{outcome.name}</h3>
                    <div className="flex gap-4 text-xs font-bold mt-1">
                        <span
                            onClick={() => setOrderType("buy")}
                            className={`cursor-pointer pb-0.5 transition-all ${orderType === "buy"
                                ? "text-black border-b-2 border-black"
                                : "text-slate-500 hover:text-black"
                                }`}
                        >
                            Buy
                        </span>
                        <span
                            onClick={() => setOrderType("sell")}
                            className={`cursor-pointer pb-0.5 transition-all ${orderType === "sell"
                                ? "text-black border-b-2 border-black"
                                : "text-slate-500 hover:text-black"
                                }`}
                        >
                            Sell
                        </span>
                    </div>
                </div>
                <div className="text-black flex items-center gap-2 cursor-pointer font-bold bg-white px-2 py-1 rounded border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-none transition-all">
                    <span className="text-xs">Limit</span>
                    <ChevronDown size={12} strokeWidth={3} />
                </div>
            </div>

            {/* Main Form Area */}
            <div className="p-5 space-y-5">
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

                {/* Inputs */}
                <div className="space-y-4">
                    {/* Price Input */}
                    <div className="bg-white rounded-lg p-1 border-2 border-black shadow-[3px_3px_0px_0px_#e2e8f0] flex items-center justify-between">
                        <div className="px-3">
                            <label className="block text-slate-500 text-xs font-black uppercase tracking-wider">
                                Limit Price
                            </label>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() =>
                                    setLimitPrice((prev) =>
                                        Math.max(1, Number((prev - 1).toFixed(0)))
                                    )
                                }
                                className="p-2 text-slate-400 hover:text-black font-black"
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={limitPrice}
                                onChange={(e) => setLimitPrice(Number(e.target.value))}
                                className="w-20 bg-transparent text-center text-black font-mono font-bold text-xl focus:outline-none"
                            />
                            <span className="text-slate-900 mr-2 font-bold">¢</span>
                            <button
                                onClick={() =>
                                    setLimitPrice((prev) =>
                                        Math.min(99, Number((prev + 1).toFixed(0)))
                                    )
                                }
                                className="p-2 text-slate-400 hover:text-black font-black"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Shares Input */}
                    <div className="bg-white rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#e2e8f0]">
                        <div className="flex items-center justify-between p-3">
                            <div className="px-1">
                                <label className="block text-slate-500 text-xs font-black uppercase tracking-wider">
                                    Shares
                                </label>
                            </div>
                            <input
                                type="number"
                                value={shares}
                                onChange={(e) =>
                                    setShares(Math.max(0, parseInt(e.target.value) || 0))
                                }
                                className="w-24 bg-transparent text-right text-black font-mono font-bold text-xl focus:outline-none px-2"
                            />
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="grid grid-cols-4 gap-0 border-t-2 border-slate-100">
                            {["-100", "-10", "+10", "+100"].map((val, idx) => (
                                <button
                                    key={val}
                                    onClick={() =>
                                        setShares((prev) => Math.max(0, prev + parseInt(val)))
                                    }
                                    className={`
                                        bg-slate-50 hover:bg-white text-slate-500 hover:text-black text-xs font-bold py-2
                                        ${idx !== 3 ? "border-r-2 border-slate-100" : ""}
                                    `}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Summary */}
                <div className="space-y-4 pt-2">
                    <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 font-bold text-sm">
                                {orderType === "buy" ? "Total Cost" : "Total Proceeds"}
                            </span>
                            <span className="text-black font-mono font-bold">
                                ${totalCost.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-600 font-bold text-sm">
                                Fee ({FEE_PERCENTAGE}%)
                            </span>
                            <span className="text-slate-500 font-mono font-bold">
                                -${fee.toFixed(4)}
                            </span>
                        </div>
                        {orderType === "buy" && (
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600 font-bold text-sm">
                                    Potential Return
                                </span>
                                <span className="text-emerald-600 font-mono font-bold">
                                    ${potentialReturn.toFixed(2)}
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between items-center border-t border-slate-200 pt-2 mt-1">
                            <span className="text-slate-600 font-bold text-sm">
                                {orderType === "buy" ? "Profit" : "Net Proceeds"}
                            </span>
                            <span className={`font-mono font-black text-lg ${profit >= 0 ? "text-emerald-600" : "text-rose-600"
                                }`}>
                                ${profit.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button className={`w-full py-4 rounded-xl text-white font-black text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase tracking-wide ${orderType === "buy"
                        ? "bg-blue-600 hover:bg-blue-500"
                        : "bg-rose-600 hover:bg-rose-500"
                        }`}>
                        {orderType === "buy" ? "Buy" : "Sell"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TradePanel;
