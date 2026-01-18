"use client";

import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
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
    FUGU_TARGETS,
    CLOCK_ID,
    USDC_COIN_TYPE,
    USDC_TREASURY_CAP_ID
} from "./fugu-contract";

export type TransactionStatus = "idle" | "pending" | "success" | "error";

/**
 * Hook for buying shares in a prediction market
 */
export function useBuyShares() {
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
    const client = useSuiClient();
    const account = useCurrentAccount();
    const [status, setStatus] = useState<TransactionStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [txDigest, setTxDigest] = useState<string | null>(null);

    const buyShares = useCallback(async (
        marketId: string,
        amountShares: number, // Number of shares to buy
        outcome: typeof OUTCOME_YES | typeof OUTCOME_NO,
        paymentAmount: number,
        usdcCoinId: string
    ) => {
        setStatus("pending");
        setError(null);

        if (!account?.address) {
            setError("Wallet not connected");
            return;
        }

        try {
            const tx = new Transaction();

            // 1. Fetch user's USDC coins
            const { data: coins } = await client.getCoins({
                owner: account.address,
                coinType: USDC_COIN_TYPE,
            });

            if (!coins || coins.length === 0) {
                // throw new Error("No USDC found in wallet"); 
                // Don't throw here immediately, maybe we are buying with gas? No, specifically USDC.
                // Actually if no coins, we can't pay.
                throw new Error("No USDC found in wallet. Please request tokens from Faucet.");
            }

            // 2. Filter coins with balance > 0
            const validCoins = coins.filter(c => BigInt(c.balance) > 0);
            if (validCoins.length === 0) {
                throw new Error("No available USDC balance");
            }

            // 3. Find primary coin or merge
            let primaryCoinInput;

            // Ensure paymentAmount is an integer for u64
            const costInt = Math.floor(paymentAmount);

            const totalBalance = validCoins.reduce((sum, c) => sum + BigInt(c.balance), BigInt(0));
            if (totalBalance < BigInt(costInt)) {
                throw new Error(`Insufficient USDC balance. Need ${costInt / 1000000} USDC, have ${Number(totalBalance) / 1000000} USDC`);
            }

            if (validCoins.length > 1) {
                // Merge all other coins into the first one
                const primaryCoin = validCoins[0];
                const coinsToMerge = validCoins.slice(1).map(c => c.coinObjectId);
                const MAX_MERGE = 500; // Limit merge to avoid gas limit?
                // For now, naive merge
                if (coinsToMerge.length > 0) {
                    tx.mergeCoins(tx.object(primaryCoin.coinObjectId), coinsToMerge.map(id => tx.object(id)));
                }
                primaryCoinInput = tx.object(primaryCoin.coinObjectId);
            } else {
                primaryCoinInput = tx.object(validCoins[0].coinObjectId);
            }

            // 4. Split exact amount for payment
            // Use the integer cost
            const [paymentCoin] = tx.splitCoins(primaryCoinInput, [tx.pure.u64(costInt)]);

            // 5. Build Move Call
            tx.moveCall({
                target: FUGU_TARGETS.BUY_SHARES,
                arguments: [
                    tx.object(marketId),
                    tx.object(GLOBAL_CONFIG_ID),
                    tx.pure.u64(amountShares),
                    tx.pure.u8(outcome),
                    paymentCoin,
                    tx.object(CLOCK_ID),
                ],
            });

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
    }, [signAndExecute, account?.address, client]);

    return { buyShares, status, error, txDigest };
}

/**
 * Hook for adding shares to an existing position
 */
export function useAddToPosition() {
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
    const [status, setStatus] = useState<TransactionStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [txDigest, setTxDigest] = useState<string | null>(null);

    const addToPosition = useCallback(async (
        marketId: string,
        positionId: string,
        amount: number,
        paymentAmount: number,
        usdcCoinId: string
    ) => {
        setStatus("pending");
        setError(null);

        try {
            const tx = createAddToPositionTransaction(
                marketId,
                positionId,
                amount,
                paymentAmount,
                usdcCoinId
            );

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

    return { addToPosition, status, error, txDigest };
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

import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook to fetch user's positions across all markets
 */
export function useUserPositions() {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const queryClient = useQueryClient();

    const fetchPositions = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["user-positions", account?.address] });
    }, [queryClient, account?.address]);

    const { data: positions = [], isLoading: loading, error } = useQuery({
        queryKey: ["user-positions", account?.address],
        queryFn: async () => {
            if (!account?.address) return [];

            const positionType = `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::Position`;
            // console.log("Fetching positions for:", account.address);

            const result = await client.getOwnedObjects({
                owner: account.address,
                filter: {
                    StructType: positionType,
                },
                options: {
                    showContent: true,
                    showType: true,
                },
            });

            // console.log("Fetched positions:", result.data.length);
            return result.data;
        },
        enabled: !!account?.address,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 5, // 5 seconds
    });

    return {
        positions,
        loading,
        error: error ? (error as Error).message : null,
        fetchPositions
    };
}

/**
 * Hook to fetch user's USDC coins for payment
 */
export function useUserUSDCCoins() {
    const client = useSuiClient();
    const account = useCurrentAccount();
    const queryClient = useQueryClient();

    const fetchCoins = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ["user-usdc", account?.address] });
    }, [queryClient, account?.address]);

    const { data, isLoading: loading, error } = useQuery({
        queryKey: ["user-usdc", account?.address],
        queryFn: async () => {
            if (!account?.address) return { coins: [], totalBalance: 0n };

            const usdcType = `${FUGU_PACKAGE_ID}::USDC::USDC`;

            const result = await client.getCoins({
                owner: account.address,
                coinType: usdcType,
            });

            // Calculate total balance
            const total = result.data.reduce((sum, coin) => {
                return sum + BigInt(coin.balance);
            }, 0n);

            return { coins: result.data, totalBalance: total };
        },
        enabled: !!account?.address,
        refetchOnWindowFocus: true,
    });

    const coins = data?.coins || [];
    const totalBalance = data?.totalBalance || 0n;

    // Get the largest coin (best for splitting)
    const getLargestCoin = useCallback(() => {
        if (coins.length === 0) return null;
        return coins.reduce((largest, coin) => {
            return BigInt(coin.balance) > BigInt(largest.balance) ? coin : largest;
        });
    }, [coins]);

    return {
        coins,
        totalBalance,
        loading,
        error: error ? (error as Error).message : null,
        fetchCoins,
        getLargestCoin
    };
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

        let retries = 3;
        while (retries > 0) {
            try {
                const events = await client.queryEvents({
                    query: {
                        MoveEventType: MARKET_CREATED_EVENT,
                    },
                    order: "descending", // Newest first
                });

                const parsedMarkets = events.data.map(event => event.parsedJson as MarketCreatedEvent);
                setMarkets(parsedMarkets);
                break; // Success
            } catch (err) {
                console.error(`Fetch markets failed (attempt ${4 - retries}):`, err);
                retries--;
                if (retries === 0) {
                    const errorMessage = err instanceof Error ? err.message : "Failed to fetch market events";
                    setError(errorMessage);
                } else {
                    await new Promise(r => setTimeout(r, 1000));
                }
            }
        }
        setLoading(false);
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

        let retries = 3;
        while (retries > 0) {
            try {
                // console.log(`[use-fugu-contract] Fetching market ${marketId}, attempt ${4 - retries}`);
                const result = await client.getObject({
                    id: marketId,
                    options: {
                        showContent: true,
                        showType: true,
                    },
                });

                if (result.error) {
                    throw new Error(`Object Error: ${result.error.code}`);
                }

                const content = result.data?.content as any;
                const fields = content?.fields || {};

                // Parse price from reserves
                let yesPrice = 0.5;
                let noPrice = 0.5;

                // Debug fields
                // console.log("Market Fields:", fields);

                const yesSupply = Number(fields.yes_supply || 0);
                const noSupply = Number(fields.no_supply || 0);

                if (yesSupply > 0 && noSupply > 0) {
                    const total = yesSupply + noSupply;
                    yesPrice = noSupply / total;
                    noPrice = yesSupply / total;
                }

                setMarket({ ...result.data, fields, yesPrice, noPrice, yesSupply, noSupply });
                break; // Success
            } catch (err) {
                console.error(`Fetch market failed (attempt ${4 - retries}):`, err);
                retries--;
                if (retries === 0) {
                    const errorMessage = err instanceof Error ? err.message : "Failed to fetch market";
                    setError(errorMessage);
                } else {
                    await new Promise(r => setTimeout(r, 1000)); // Wait 1s
                }
            }
        }
        setLoading(false);
    }, [client, marketId]);

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

/**
 * Hook for minting USDC for testing (Faucet)
 */
export function useMintUSDC() {
    const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
    const [status, setStatus] = useState<TransactionStatus>("idle");
    const [error, setError] = useState<string | null>(null);
    const [txDigest, setTxDigest] = useState<string | null>(null);

    const mint = useCallback(async (
        recipient: string,
        amount: number // Amount in dollars, e.g. 1000
    ) => {
        setStatus("pending");
        setError(null);

        try {
            const tx = new Transaction();

            // Amount to mint (multiply by 10^6 for 6 decimals)
            const mintAmount = Math.floor(amount * 1_000_000);

            tx.moveCall({
                target: FUGU_TARGETS.MINT_USDC,
                arguments: [
                    tx.object(USDC_TREASURY_CAP_ID),
                    tx.pure.u64(mintAmount),
                    tx.pure.address(recipient)
                ],
            });

            const result = await signAndExecute({
                transaction: tx,
            });

            setTxDigest(result.digest);
            setStatus("success");
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Minting failed";
            setError(errorMessage);
            setStatus("error");
            throw err;
        }
    }, [signAndExecute]);

    return { mint, status, error, txDigest };
}
