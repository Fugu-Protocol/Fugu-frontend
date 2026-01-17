"use client";

import React from "react";
import { Search, ArrowDownUp } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { label: "Assets", id: "Gold & Silver" },
    { label: "US Index", id: "Indexes" },
    { label: "Economics", id: "Economics" },
    { label: "Crypto", id: "Crypto" },
    { label: "US Stocks", id: "Stocks" },
];

const FILTERS = ["24h Vol", "Total Vol", "Newest"];
const STATUSES = ["All", "Active", "Resolved"];

interface MarketFiltersProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    activeStatus: string;
    setActiveStatus: (status: string) => void;
    activeSort: string;
    setActiveSort: (sort: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const MarketFilters: React.FC<MarketFiltersProps> = ({
    activeCategory,
    setActiveCategory,
    activeStatus,
    setActiveStatus,
    activeSort,
    setActiveSort,
    searchQuery,
    setSearchQuery,
}) => {
    return (
        <div className="flex flex-col gap-6 w-full mb-8">
            {/* Top Bar: Search & Main Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Visual Category Tabs (Scrollable on mobile) */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setActiveCategory("All")}
                        className={cn(
                            "px-4 py-2 rounded-lg font-bold border-2 transition-all whitespace-nowrap",
                            activeCategory === "All"
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-500 border-transparent hover:bg-gray-100"
                        )}
                    >
                        Top Markets
                    </button>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "px-4 py-2 rounded-lg font-bold border-2 transition-all whitespace-nowrap",
                                activeCategory === cat.id
                                    ? "bg-white border-black text-black shadow-[2px_2px_0px_0px_#000]"
                                    : "bg-transparent border-transparent text-gray-500 hover:text-black hover:bg-white/50"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Right Side: Search */}
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search markets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-black outline-none transition-colors font-medium"
                    />
                </div>
            </div>

            {/* Secondary Controls: Status & Sort */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y-2 border-gray-200/50">
                {/* Status Toggle */}
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                    {STATUSES.map((status) => (
                        <button
                            key={status}
                            onClick={() => setActiveStatus(status)}
                            className={cn(
                                "px-4 py-1.5 rounded-md text-sm font-bold transition-all",
                                activeStatus === status
                                    ? "bg-white text-black shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Sort Filter */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                        <ArrowDownUp size={16} />
                        <span className="hidden sm:inline">Sort by:</span>
                    </div>
                    <div className="flex gap-2">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveSort(filter)}
                                className={cn(
                                    "px-3 py-1.5 rounded-lg border-2 text-sm font-bold transition-all",
                                    activeSort === filter
                                        ? "border-black bg-accent text-black shadow-[2px_2px_0px_0px_#000]"
                                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketFilters;
