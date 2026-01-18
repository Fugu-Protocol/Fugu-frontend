"use client";

import React, { useState, useEffect } from "react";
import { Info, Loader2 } from "lucide-react";
import type { Outcome } from "../types";
import { useCurrentAccount, ConnectButton } from "@mysten/dapp-kit";
import {
    useBuyShares,
    useSellShares,
    useUserPositions,
    useGlobalConfig,
    TransactionStatus
} from "@/lib/contracts/use-fugu-contract";
import { OUTCOME_YES, OUTCOME_NO } from "@/lib/contracts/fugu-contract";

interface TradePanelProps {
    outcome: Outcome;
    marketId?: string; // Real market ID from blockchain
}

const TradePanel: React.FC<TradePanelProps> = ({ outcome, marketId }) => {
    const account = useCurrentAccount();
    const { fee: feePercentage } = useGlobalConfig(); // Fetch dynamic fee

    const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
    const [outcomeType, setOutcomeType] = useState<"Yes" | "No">("Yes");

    // Changing "amount" to "shares". Input represents number of shares.
    const [sharesAmount, setSharesAmount] = useState<number>(10);

    const { buyShares, status: buyStatus, error: buyError, txDigest: buyDigest } = useBuyShares();
    const { sellShares, status: sellStatus, error: sellError, txDigest: sellDigest } = useSellShares();
    const { positions, fetchPositions } = useUserPositions();

    // Re-fetch positions when account changes or after tx
    useEffect(() => {
        if (account) {
            fetchPositions();
        }
    }, [account, fetchPositions, buyStatus, sellStatus]);

    const isLoading = buyStatus === "pending" || sellStatus === "pending";
    const status = orderType === "buy" ? buyStatus : sellStatus;
    const error = orderType === "buy" ? buyError : sellError;
    const txDigest = orderType === "buy" ? buyDigest : sellDigest;

    // Display Logic for Prices
    // yesPrice is passed as 0-100 int from parent
    const baseYesPrice = outcome.yesPrice ?? 50;

    // Add spread for display if needed, or just use raw price
    // Since we are now using real contract data, we might not need artificial spread unless UI wants it.
    // Let's keep it simple: Use price as is.
    const spreadYesPrice = baseYesPrice;
    const spreadNoPrice = 100 - spreadYesPrice;

    // Current price per share in Cents
    const currentPriceCents = outcomeType === "Yes" ? spreadYesPrice : spreadNoPrice;
    const currentPriceDollars = currentPriceCents / 100;

    // Estimated Cost (USDC)
    // Simple estimation: shares * price. 
    // In real bonding curve, price moves with size. Buffer remains useful.
    // Buffer: 5%
    const estimatedCostDollars = sharesAmount * currentPriceDollars;
    const estimatedCostUSDC = Math.ceil(estimatedCostDollars * 1_000_000 * 1.05); // 6 decimals + 5% slippage/buffer

    const potentialWin = sharesAmount * 1; // 1 USDC per share
    const feeDollars = estimatedCostDollars * (feePercentage / 100);

    const handleQuickAmount = (value: string) => {
        if (value === "Max") {
            // For buy: user's balance? For now just cap at 1000 shares
            setSharesAmount(100);
        } else {
            const numValue = parseInt(value.replace('+', ''));
            setSharesAmount(prev => prev + numValue);
        }
    };

    const handleTrade = async () => {
        if (!marketId) {
            alert("Market ID not found (this might be a mock market)");
            return;
        }

        if (orderType === "buy") {
            const side = outcomeType === "Yes" ? OUTCOME_YES : OUTCOME_NO;
            await buyShares(marketId, sharesAmount, side, estimatedCostUSDC);
        } else {
            // Sell logic
            // Need to find position
            const side = outcomeType === "Yes" ? OUTCOME_YES : OUTCOME_NO;
            // Find position for this market and side
            // Position struct has: market_id, outcome, shares
            // positions data comes from getOwnedObjects, likely parsedJson or similar
            // We need to parse fields.
            // But useUserPositions returns `data` from getOwnedObjects with showContent: true

            const position = positions.find(p => {
                const content = p.data?.content as any;
                return content?.fields?.market_id === marketId &&
                    content?.fields?.outcome === side;
            });

            if (!position) {
                alert("No position found to sell for this outcome.");
                return;
            }

            const positionId = position.data?.objectId;
            await sellShares(marketId, positionId, sharesAmount);
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

                {/* Shares Amount Input */}
                <div className="bg-white rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_#e2e8f0]">
                    <div className="flex items-center justify-between p-4">
                        <label className="text-slate-600 text-base font-bold">
                            Shares
                        </label>
                        <div className="flex items-center">
                            {/* <span className="text-black font-black text-3xl">#</span> */}
                            <input
                                type="number"
                                value={sharesAmount}
                                onChange={(e) => setSharesAmount(Math.max(1, parseInt(e.target.value) || 0))}
                                className="w-24 bg-transparent text-right text-black font-black text-3xl focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-4 gap-0 border-t-2 border-slate-100">
                        {["+1", "+10", "+50", "Max"].map((val, idx) => (
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

                {/* Info Section */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-slate-600 font-bold text-sm">Est. Cost</span>
                                <span className="text-lg">💵</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                <span>~ {currentPriceCents}¢ / share</span>
                                <Info size={12} className="text-slate-400" />
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-emerald-500 font-black text-3xl">
                                ${estimatedCostDollars.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Fee info */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 text-xs">
                        <span className="text-slate-500">Fee ({feePercentage}%)</span>
                        <span className="text-slate-500">Included</span>
                    </div>
                </div>

                {/* Actions */}
                {account ? (
                    <>
                        <button
                            onClick={handleTrade}
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl text-white font-black text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${orderType === "buy"
                                ? "bg-sky-500 hover:bg-sky-400"
                                : "bg-rose-500 hover:bg-rose-400"
                                }`}
                        >
                            {isLoading && <Loader2 className="animate-spin" />}
                            {orderType === "buy" ? "Buy Shares" : "Sell Shares"}
                        </button>

                        {error && (
                            <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
                                Error: {error}
                            </div>
                        )}
                        {status === "success" && (
                            <div className="text-green-600 text-sm p-2 bg-green-50 rounded border border-green-200 break-words">
                                Success! TX: {txDigest?.slice(0, 10)}...
                            </div>
                        )}
                    </>
                ) : (
                    <ConnectButton className="w-full py-4 !bg-black !text-white !font-black !text-xl !rounded-xl !border-2 !border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:!translate-x-[2px] hover:!translate-y-[2px] hover:!shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:!translate-x-[4px] active:!translate-y-[4px] active:!shadow-none transition-all" />
                )}
            </div>
        </div>
    );
};

export default TradePanel;
