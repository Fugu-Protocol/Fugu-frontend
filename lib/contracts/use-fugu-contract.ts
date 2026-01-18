"use client";

import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useState, useCallback } from "react";
import {
    createBuySharesTransaction,
    createSellSharesTransaction,
    createRedeemTransaction,
    createAddToPositionTransaction
} from "./fugu-transactions";
import {
    OUTCOME_YES,
    OUTCOME_NO,
    FUGU_PACKAGE_ID,
    FUGU_MODULE,
    MARKET_CREATED_EVENT,
    MarketCreatedEvent,
    GLOBAL_CONFIG_ID,
    FUGU_TARGETS
} from "./fugu-contract";

export type TransactionStatus = "idle" | "pending" | "success" | "error";

/**
 * Hook for buying shares in a prediction market
 */
export function useBuyShares() {
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
    const [status, setStatus] = useState<TransactionStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [txDigest, setTxDigest] = useState<string | null>(null);

    const buyShares = useCallback(async (
        marketId: string,
        amount: number,
        outcome: typeof OUTCOME_YES | typeof OUTCOME_NO,
        paymentCoinId: string
    ) => {
        setStatus("pending");
        setError(null);

        try {
            const tx = createBuySharesTransaction(marketId, amount, outcome, paymentCoinId);

            const result = await signAndExecute({
                transaction: tx,
            });

            setTxDigest(result.digest);
            setStatus("success");
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Transaction failed";
            setError(errorMessage);
            setStatus("error");
            throw err;
        }
    }, [signAndExecute]);

    return { buyShares, status, error, txDigest };
}

/**
 * Hook for selling shares back to the market
 */
export function useSellShares() {
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
    const [status, setStatus] = useState<TransactionStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [txDigest, setTxDigest] = useState<string | null>(null);

    const sellShares = useCallback(async (
        marketId: string,
        positionId: string,
        amount: number
    ) => {
        setStatus("pending");
        setError(null);

        try {
            const tx = createSellSharesTransaction(marketId, positionId, amount);

            const result = await signAndExecute({
                transaction: tx,
            });

            setTxDigest(result.digest);
            setStatus("success");
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Transaction failed";
            setError(errorMessage);
            setStatus("error");
            throw err;
        }
    }, [signAndExecute]);

    return { sellShares, status, error, txDigest };
}

/**
 * Hook for redeeming winning shares
 */
export function useRedeemShares() {
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
    const [status, setStatus] = useState<TransactionStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [txDigest, setTxDigest] = useState<string | null>(null);

    const redeemShares = useCallback(async (
        marketId: string,
        positionId: string
    ) => {
        setStatus("pending");
        setError(null);

        try {
            const tx = createRedeemTransaction(marketId, positionId);

            const result = await signAndExecute({
                transaction: tx,
            });

            setTxDigest(result.digest);
            setStatus("success");
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Transaction failed";
            setError(errorMessage);
            setStatus("error");
            throw err;
        }
    }, [signAndExecute]);

    return { redeemShares, status, error, txDigest };
}

/**
 * Hook to fetch user's positions across all markets
 */
export function useUserPositions() {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const [positions, setPositions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPositions = useCallback(async () => {
        if (!account?.address) return;

        setLoading(true);
        setError(null);

        try {
            const result = await client.getOwnedObjects({
                owner: account.address,
                filter: {
                    StructType: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::Position`,
                },
                options: {
                    showContent: true,
                    showType: true,
                },
            });

            setPositions(result.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch positions";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [client, account?.address]);

    return { positions, loading, error, fetchPositions };
}

/**
 * Hook to fetch all market created events
 */
export function useMarketEvents() {
    const client = useSuiClient();
    const [markets, setMarkets] = useState<MarketCreatedEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMarkets = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const events = await client.queryEvents({
                query: {
                    MoveEventType: MARKET_CREATED_EVENT,
                },
                order: "descending", // Newest first
            });

            const parsedMarkets = events.data.map(event => event.parsedJson as MarketCreatedEvent);
            setMarkets(parsedMarkets);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch market events";
            setError(errorMessage);
            console.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [client]);

    // Auto load on mount
    useState(() => {
        fetchMarkets();
    });

    return { markets, loading, error, refetch: fetchMarkets };
}

/**
 * Hook to fetch market details
 */
export function useMarketDetails(marketId: string | null) {
    const client = useSuiClient();
    const [market, setMarket] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMarket = useCallback(async () => {
        if (!marketId) return;

        setLoading(true);
        setError(null);

        try {
            const result = await client.getObject({
                id: marketId,
                options: {
                    showContent: true,
                    showType: true,
                },
            });

            setMarket(result.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to fetch market";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [client, marketId]);

    return { market, loading, error, fetchMarket };
    return { market, loading, error, fetchMarket };
}

/**
 * Hook to fetch Global Config (Fee, etc.)
 */
export function useGlobalConfig() {
    const client = useSuiClient();
    const [config, setConfig] = useState<any>(null);
    const [fee, setFee] = useState<number>(0.1); // Default fallback
    const [loading, setLoading] = useState(false);

    const fetchConfig = useCallback(async () => {
        if (!GLOBAL_CONFIG_ID) return;

        setLoading(true);
        try {
            const result = await client.getObject({
                id: GLOBAL_CONFIG_ID,
                options: {
                    showContent: true,
                },
            });

            if (result.data?.content && 'fields' in result.data.content) {
                const fields = result.data.content.fields as any;
                setConfig(fields);

                // fee_percentage is in basis points (e.g. 10 = 0.1%)
                // Denominator is 10000
                if (fields.fee_percentage) {
                    setFee(parseFloat(fields.fee_percentage) / 100);
                }
            }
        } catch (err) {
            console.error("Failed to fetch global config:", err);
        } finally {
            setLoading(false);
        }
    }, [client]);

    // Auto load
    useState(() => {
        fetchConfig();
    });

    return { config, fee, loading };
}
