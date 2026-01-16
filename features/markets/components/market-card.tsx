"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/shared/scroll-reveal";

interface Market {
    id: number;
    category: string;
    icon: string;
    mainIcon: string;
    color: string;
    question: string;
    yes: number;
    no: number;
    volume: string;
    isHot: boolean;
}

interface MarketCardProps {
    market: Market;
}

const MarketCard = ({ market }: MarketCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ScrollReveal>
            <motion.div
                className="bg-white border-2 border-black rounded-2xl p-4 flex flex-col justify-between h-[320px] w-full relative overflow-hidden"
                style={{ boxShadow: "6px 6px 0px 0px #000" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -5 }}
            >
                {/* Category Tag */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-yellow-200 border-2 border-black rounded-md text-xs font-bold uppercase flex items-center gap-1">
                            {market.icon} {market.category}
                        </span>
                        {market.isHot && (
                            <span className="px-2 py-1 bg-red-400 border-2 border-black rounded-md text-xs font-bold uppercase text-white animate-pulse">
                                HOT
                            </span>
                        )}
                    </div>
                    <div className="text-xs font-bold text-gray-500">
                        Vol: {market.volume}
                    </div>
                </div>

                {/* Image/Icon Area */}
                <div className="flex-grow flex items-center justify-center relative">
                    {/* Background decorative blob */}
                    <div
                        className={`absolute w-32 h-32 rounded-full opacity-20 transition-all duration-500 ${isHovered ? "scale-125" : "scale-100"
                            }`}
                        style={{ backgroundColor: market.color }}
                    ></div>
                    <motion.div
                        animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl z-10"
                    >
                        {market.mainIcon}
                    </motion.div>
                </div>

                {/* Content */}
                <div className="mt-4 z-10">
                    <h3 className="text-xl font-black leading-tight mb-3 line-clamp-2">
                        {market.question}
                    </h3>

                    {/* Progress Bars */}
                    <div className="space-y-2">
                        <div className="relative h-10 w-full flex rounded-xl overflow-hidden border-2 border-black">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${market.yes}%` }}
                                className="bg-[#b6c454] h-full flex items-center pl-3 font-bold text-sm"
                            >
                                YES {market.yes}%
                            </motion.div>
                            <div className="bg-red-300 h-full flex-grow flex items-center justify-end pr-3 font-bold text-sm">
                                NO {market.no}%
                            </div>
                            {/* Center divider */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/20 transform -translate-x-1/2 border-dashed border-l-2 border-black"></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </ScrollReveal>
    );
};

export default MarketCard;
