"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MARKETS } from "@/lib/constants";
import { generateSlug } from "../utils";
import { useMarketEvents } from "@/lib/contracts/use-fugu-contract";
import { CATEGORY } from "@/lib/contracts/fugu-contract";
import MarketDetailContent from "./market-detail-content"; // We'll move content to a sub-component to handle hooks cleanly

// Helper function to map category number to string
const getCategoryName = (categoryNum: number): string => {
    if (categoryNum === CATEGORY.CRYPTO) return "Crypto";
    if (categoryNum === CATEGORY.STOCKS) return "Stocks";
    if (categoryNum === CATEGORY.GOLD_SILVER) return "Comm/Assets";
    if (categoryNum === CATEGORY.ECONOMICS) return "Economics";
    if (categoryNum === CATEGORY.INDEXES) return "Indexes";
    return "Crypto"; // Default fallback
};

// Mock chart data for visualization
interface MarketDetailViewProps {
    slug: string;
}

const MarketDetailView: React.FC<MarketDetailViewProps> = ({ slug }) => {
    const { markets: realMarkets, loading } = useMarketEvents();

    // Find market in real markets list
    const foundMarket = realMarkets.find(m => generateSlug(m.market_name) === slug);

    // If loading, show loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center">
                <div className="animate-bounce font-bold text-xl">Loading Market...</div>
            </div>
        );
    }

    // Adapt real market data to UI model if found
    if (foundMarket) {
        const adaptedMarket = {
            id: parseInt(foundMarket.market_id.slice(0, 8), 16),
            category: getCategoryName(foundMarket.category),
            icon: "💰",
            mainIcon: foundMarket.image_url,
            color: "bg-blue-100",
            question: foundMarket.market_name,
            yes: 50,
            no: 50,
            volume: "$0",
            isHot: false,
            status: "active" as const,
            imageUrl: foundMarket.image_url,
            // Store real ID for contract interactions
            realId: foundMarket.market_id,
            deadline: foundMarket.deadline,
            description: foundMarket.description,
        };

        // Pass adapted market to content renderer
        return <MarketDetailContent market={adaptedMarket} />;
    }

    // Fallback to mock data lookup (if you still want to support mocks, or just 404)
    // For now, let's keep mock fallback for existing hardcoded routes to work, 
    // OR show 404 if you want only real markets.
    // User asked "query những thông tin... hiện not found", implying they want real data.
    // If not found in real markets, show 404 or check mocks.

    // Check mocks
    const mockMarket = MARKETS.find((m) => generateSlug(m.question) === slug);
    if (mockMarket) {
        return <MarketDetailContent market={mockMarket} />;
    }

    return (
        <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-black mb-4">Market Not Found</h1>
                <p className="text-slate-600 mb-6">
                    The market you&apos;re looking for doesn&apos;t exist on chain.
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
};

export default MarketDetailView;
