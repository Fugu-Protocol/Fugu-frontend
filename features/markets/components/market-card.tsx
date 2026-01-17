"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { generateSlug } from "../utils";

interface Market {
    id: number;
    category: string;
    icon: string;
    mainIcon: string;
    imageUrl?: string;
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
    const [imageError, setImageError] = useState(false);
    const marketSlug = generateSlug(market.question);

    return (
        <ScrollReveal>
            <Link href={`/market/${marketSlug}`}>
                <motion.div
                    className="bg-white border-2 border-black rounded-2xl p-4 flex flex-col justify-between h-[320px] w-full relative overflow-hidden cursor-pointer"
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
                            className="z-10 flex items-center justify-center"
                        >
                            {market.imageUrl && !imageError ? (
                                <img
                                    src={market.imageUrl}
                                    alt={market.question}
                                    className="w-20 h-20 object-contain"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <span className="text-6xl">{market.mainIcon}</span>
                            )}
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="mt-4 z-10">
                        <h3 className="text-xl font-black leading-tight mb-3 line-clamp-2">
                            {market.question}
                        </h3>

                        {/* Progress Bars */}
                        {/* Bottom: Buy Buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                            <button className="flex items-center justify-between px-3 py-2 rounded-lg bg-green-50 border-2 border-transparent hover:border-green-500 hover:bg-green-100 transition-colors group/yes">
                                <span className="text-sm font-bold text-green-700">Yes</span>
                                <span className="text-sm font-black text-green-800">{market.yes}%</span>
                            </button>
                            <button className="flex items-center justify-between px-3 py-2 rounded-lg bg-red-50 border-2 border-transparent hover:border-red-500 hover:bg-red-100 transition-colors group/no">
                                <span className="text-sm font-bold text-red-700">No</span>
                                <span className="text-sm font-black text-red-800">{market.no}%</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </ScrollReveal>
    );
};

export default MarketCard;
