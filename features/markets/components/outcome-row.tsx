"use client";

import React from "react";
import { Info, TrendingUp, TrendingDown } from "lucide-react";
import type { Outcome } from "../types";

interface OutcomeRowProps {
    outcome: Outcome;
    isSelected: boolean;
    onSelect: (outcome: Outcome) => void;
}

const OutcomeRow: React.FC<OutcomeRowProps> = ({
    outcome,
    isSelected,
    onSelect,
}) => {
    const isPositive = outcome.change >= 0;

    return (
        <div
            onClick={() => onSelect(outcome)}
            className={`
        group relative flex flex-col md:flex-row items-center justify-between 
        p-4 border-b-2 border-slate-100 last:border-0 cursor-pointer transition-colors duration-200
        ${isSelected ? "bg-emerald-50/50" : "bg-white hover:bg-slate-50"}
      `}
        >
            {/* Left Section: Image & Name */}
            <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                <div className="relative w-14 h-14 flex-shrink-0 mr-4">
                    <img
                        src={outcome.imageUrl}
                        alt={outcome.name}
                        className="w-full h-full object-cover rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                    {/* Tiny info icon */}
                    <div className="absolute -bottom-1 -right-1 bg-white border border-black rounded-full p-0.5 text-black z-10">
                        <Info size={12} strokeWidth={3} />
                    </div>
                </div>
                <div>
                    <h3 className="text-black font-extrabold text-xl flex items-center gap-2">
                        {outcome.name}
                        <span className="text-slate-500 text-base font-semibold">
                            {outcome.party}
                        </span>
                    </h3>
                    <p className="text-slate-500 text-sm font-bold mt-0.5">
                        {outcome.volume}
                    </p>
                </div>
            </div>

            {/* Right Section: Price Data & Buttons */}
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                {/* Percentage & Change */}
                <div className="flex flex-col items-end min-w-[80px]">
                    <span className="text-3xl font-black text-black tracking-tight">
                        {outcome.percentage}%
                    </span>
                    <div
                        className={`flex items-center text-sm font-black ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
                    >
                        {isPositive ? (
                            <TrendingUp size={16} className="mr-1" strokeWidth={3} />
                        ) : (
                            <TrendingDown size={16} className="mr-1" strokeWidth={3} />
                        )}
                        {Math.abs(outcome.change)}%
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        className="flex flex-col items-center justify-center w-32 h-12 bg-emerald-500 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:shadow-none transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(outcome);
                        }}
                    >
                        <span className="text-base font-black text-white">Buy Yes</span>
                        <span className="text-xs font-bold text-emerald-100">
                            {outcome.yesPrice}¢
                        </span>
                    </button>

                    <button
                        className="flex flex-col items-center justify-center w-32 h-12 bg-rose-500 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[3px] active:shadow-none transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(outcome);
                        }}
                    >
                        <span className="text-base font-black text-white">Buy No</span>
                        <span className="text-xs font-bold text-rose-100">
                            {outcome.noPrice}¢
                        </span>
                    </button>
                </div>
            </div>

            {/* Selection Indicator Bar */}
            {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black" />
            )}
        </div>
    );
};

export default OutcomeRow;
