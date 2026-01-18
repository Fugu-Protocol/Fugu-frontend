"use client";

import React, { useState, useMemo, useEffect } from "react";
import MarketFilters from "./market-filters";
import MarketCard from "./market-card";
import { MARKETS } from "@/lib/constants";
import { useMarketEvents } from "@/lib/contracts/use-fugu-contract";
import { CATEGORY } from "@/lib/contracts/fugu-contract";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const ITEMS_PER_PAGE = 8; // Showing 8 items per page

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
    const { markets: realMarkets, loading } = useMarketEvents();

    // Filter states
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeStatus, setActiveStatus] = useState("Active");
    const [activeSort, setActiveSort] = useState("Total Vol");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, activeStatus, activeSort, searchQuery]);

    // Combine mock data with real blockchain data
    const marketsWithMetadata: Market[] = useMemo(() => {
        // Map real markets to UI format
        const mappedRealMarkets: Market[] = realMarkets.map(m => {
            // Determine category string and default image
            let categoryName = "Crypto";
            let defaultImage = "https://cryptologos.cc/logos/bitcoin-btc-logo.png";
            let color = "bg-blue-100";

            // Simple mapping based on category ID
            if (m.category === CATEGORY.CRYPTO) { categoryName = "Crypto"; color = "bg-blue-100"; }
            else if (m.category === CATEGORY.STOCKS) { categoryName = "Stocks"; color = "bg-green-100"; }
            else if (m.category === CATEGORY.ASSETS) { categoryName = "Assets"; color = "bg-orange-100"; }
            else if (m.category === CATEGORY.ECONOMICS_INDICATORS) { categoryName = "Economics"; color = "bg-yellow-100"; }

            return {
                id: parseInt(m.market_id.slice(0, 8), 16),
                marketId: m.market_id,
                category: categoryName,
                icon: "💰", // Generic icon
                mainIcon: "💰", // Fallback text icon if regular image fails
                imageUrl: m.image_url || defaultImage, // Use contract image or category default
                color: color,
                question: m.market_name,
                yes: 50, // Default start value
                no: 50, // Default start value
                volume: "$0",
                isHot: true,
                status: "active",
                createdAt: new Date(Number(m.timestamp)),
            } as Market;
        });

        // const mockMarkets = MARKETS.map((market, index) => ({
        //     ...market,
        //     status: index % 5 === 0 ? "resolved" as const : "active" as const,
        //     createdAt: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)), // Each market 1 day older
        // }));

        return [...mappedRealMarkets]; // , ...mockMarkets];
    }, [realMarkets]);

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
                    "Assets": "Assets",
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
                market.question.toLowerCase().includes(query)
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

    // Pagination logic
    const totalPages = Math.ceil(filteredMarkets.length / ITEMS_PER_PAGE);
    const paginatedMarkets = filteredMarkets.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

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
                Showing {paginatedMarkets.length} of {filteredMarkets.length} markets
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${activeCategory}-${activeStatus}-${activeSort}-${searchQuery}-${currentPage}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
                >
                    {paginatedMarkets.length > 0 ? (
                        paginatedMarkets.map((market, index) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border-2 border-black bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-lg font-bold border-2 border-black transition-all ${currentPage === page
                                    ? "bg-primary text-white shadow-[2px_2px_0px_0px_#000]"
                                    : "bg-white hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border-2 border-black bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MarketsView;
