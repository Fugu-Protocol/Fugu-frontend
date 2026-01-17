"use client";

import React, { useState, useMemo } from "react";
import MarketFilters from "./market-filters";
import MarketCard from "./market-card";
import { MARKETS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

// Extended market type with additional fields for filtering
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
    status?: "active" | "resolved";
    createdAt?: Date;
}

// Helper function to parse volume string to number
const parseVolume = (volumeStr: string): number => {
    const cleaned = volumeStr.replace(/[$,]/g, '').toLowerCase();
    if (cleaned.endsWith('m')) {
        return parseFloat(cleaned) * 1000000;
    } else if (cleaned.endsWith('k')) {
        return parseFloat(cleaned) * 1000;
    }
    return parseFloat(cleaned) || 0;
};

const MarketsView = () => {
    // Filter states
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeStatus, setActiveStatus] = useState("Active");
    const [activeSort, setActiveSort] = useState("Total Vol");
    const [searchQuery, setSearchQuery] = useState("");

    // Add mock data for status and createdAt
    const marketsWithMetadata: Market[] = useMemo(() => {
        return MARKETS.map((market, index) => ({
            ...market,
            status: index % 5 === 0 ? "resolved" as const : "active" as const,
            createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)), // Each market 1 day older
        }));
    }, []);

    // Use markets directly without duplication
    const allMarketsBase = marketsWithMetadata;

    // Filtered and sorted markets
    const filteredMarkets = useMemo(() => {
        let filtered = [...allMarketsBase];

        // Filter by category
        if (activeCategory !== "All") {
            filtered = filtered.filter(market => {
                // Map category labels to actual category values
                const categoryMap: Record<string, string> = {
                    "Gold & Silver": "Gold & Silver",
                    "Indexes": "Indexes",
                    "Economics": "Economics",
                    "Crypto": "Crypto",
                    "Stocks": "Stocks",
                };
                return market.category === categoryMap[activeCategory] || market.category === activeCategory;
            });
        }

        // Filter by status
        if (activeStatus !== "All") {
            filtered = filtered.filter(market => {
                if (activeStatus === "Active") return market.status === "active";
                if (activeStatus === "Resolved") return market.status === "resolved";
                return true;
            });
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(market =>
                market.question.toLowerCase().includes(query) ||
                market.category.toLowerCase().includes(query)
            );
        }

        // Sort markets
        switch (activeSort) {
            case "24h Vol":
                // Mock 24h vol as a percentage of total vol
                filtered.sort((a, b) => parseVolume(b.volume) * 0.1 - parseVolume(a.volume) * 0.1);
                break;
            case "Total Vol":
                filtered.sort((a, b) => parseVolume(b.volume) - parseVolume(a.volume));
                break;
            case "Newest":
                filtered.sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
                break;
        }

        return filtered;
    }, [allMarketsBase, activeCategory, activeStatus, activeSort, searchQuery]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-black mb-2">Markets</h1>
                <p className="text-gray-500 font-medium text-lg">
                    Discover, trade, and profit from your insights.
                </p>
            </div>

            <MarketFilters
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
                activeSort={activeSort}
                setActiveSort={setActiveSort}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Results count */}
            <div className="mb-4 text-sm font-bold text-gray-500">
                {filteredMarkets.length} markets found
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${activeCategory}-${activeStatus}-${activeSort}-${searchQuery}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredMarkets.length > 0 ? (
                        filteredMarkets.map((market, index) => (
                            <MarketCard key={`${market.id}-${index}`} market={market} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 font-medium text-lg">
                                No markets found matching your criteria.
                            </p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MarketsView;
