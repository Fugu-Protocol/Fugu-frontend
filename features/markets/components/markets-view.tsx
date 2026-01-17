"use client";

import React from "react";
import MarketFilters from "./market-filters";
import MarketCard from "./market-card";
import { MARKETS } from "@/lib/constants";
import { motion } from "framer-motion";

const MarketsView = () => {
    // duplicating markets to simulate fuller list
    const allMarkets = [...MARKETS, ...MARKETS, ...MARKETS];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-black mb-2">Markets</h1>
                <p className="text-gray-500 font-medium text-lg">
                    Discover, trade, and profit from your insights.
                </p>
            </div>

            <MarketFilters />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {allMarkets.map((market, index) => (
                    <MarketCard key={`${market.id}-${index}`} market={market} />
                ))}
            </motion.div>
        </div>
    );
};

export default MarketsView;
