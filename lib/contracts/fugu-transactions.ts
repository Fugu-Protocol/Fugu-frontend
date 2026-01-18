"use client";

import { Transaction } from "@mysten/sui/transactions";
import {
    FUGU_TARGETS,
    CLOCK_ID,
    GLOBAL_CONFIG_ID,
    OUTCOME_YES,
    OUTCOME_NO
} from "./fugu-contract";

/**
 * Create a transaction to buy shares in a prediction market
 * @param marketId - The Market object ID
 * @param amount - Number of shares to buy
 * @param outcome - OUTCOME_YES (1) or OUTCOME_NO (0)
 * @param paymentAmount - The USDC amount to pay (in smallest units, 6 decimals)
 * @param usdcCoinId - Optional USDC coin object ID. If not provided, will split from gas
 * @returns Transaction object ready to be signed and executed
 */
export function createBuySharesTransaction(
    marketId: string,
    amount: number,
    outcome: typeof OUTCOME_YES | typeof OUTCOME_NO,
    paymentAmount: number,
    usdcCoinId?: string
): Transaction {
    const tx = new Transaction();

    // If a specific USDC coin is provided, use it; otherwise we need to provide one
    // For now, let's use the provided coin ID and split the exact amount
    let paymentCoin;

    if (usdcCoinId) {
        // Split the exact payment amount from the provided USDC coin
        [paymentCoin] = tx.splitCoins(tx.object(usdcCoinId), [tx.pure.u64(paymentAmount)]);
    } else {
        // If no coin provided, this will fail - user needs USDC coins
        // We could merge all USDC coins first, but let's require a coin ID for now
        throw new Error("USDC coin ID is required for payment");
    }

    tx.moveCall({
        target: FUGU_TARGETS.BUY_SHARES,
        arguments: [
            tx.object(marketId),           // market: &mut Market
            tx.object(GLOBAL_CONFIG_ID),   // config: &GlobalConfig
            tx.pure.u64(amount),           // amount: u64
            tx.pure.u8(outcome),           // outcome: u8
            paymentCoin,                   // payment: Coin<USDC>
            tx.object(CLOCK_ID),           // clock: &Clock
        ],
    });

    return tx;
}

/**
 * Create a transaction to add more shares to an existing position
 * @param marketId - The Market object ID
 * @param positionId - The Position object ID
 * @param amount - Number of additional shares to buy
 * @param paymentAmount - The USDC amount to pay (in smallest units, 6 decimals)
 * @param usdcCoinId - USDC coin object ID to split payment from
 * @returns Transaction object ready to be signed and executed
 */
export function createAddToPositionTransaction(
    marketId: string,
    positionId: string,
    amount: number,
    paymentAmount: number,
    usdcCoinId: string
): Transaction {
    const tx = new Transaction();

    // Split the exact payment amount from the provided USDC coin
    const [paymentCoin] = tx.splitCoins(tx.object(usdcCoinId), [tx.pure.u64(paymentAmount)]);

    tx.moveCall({
        target: FUGU_TARGETS.ADD_TO_POSITION,
        arguments: [
            tx.object(marketId),           // market: &mut Market
            tx.object(GLOBAL_CONFIG_ID),   // config: &GlobalConfig
            tx.object(positionId),         // position: &mut Position
            tx.pure.u64(amount),           // amount: u64
            paymentCoin,                   // payment: Coin<USDC>
            tx.object(CLOCK_ID),           // clock: &Clock
        ],
    });

    return tx;
}

/**
 * Create a transaction to sell shares back to the market
 * @param marketId - The Market object ID
 * @param positionId - The Position object ID
 * @param amount - Number of shares to sell
 * @returns Transaction object ready to be signed and executed
 */
export function createSellSharesTransaction(
    marketId: string,
    positionId: string,
    amount: number
): Transaction {
    const tx = new Transaction();

    tx.moveCall({
        target: FUGU_TARGETS.SELL_SHARES,
        arguments: [
            tx.object(marketId),           // market: &mut Market
            tx.object(GLOBAL_CONFIG_ID),   // config: &mut GlobalConfig
            tx.object(positionId),         // position: &mut Position
            tx.pure.u64(amount),           // amount: u64
            tx.object(CLOCK_ID),           // clock: &Clock
        ],
    });

    return tx;
}

/**
 * Create a transaction to redeem winning shares after market resolution
 * @param marketId - The Market object ID
 * @param positionId - The Position object ID (will be consumed)
 * @returns Transaction object ready to be signed and executed
 */
export function createRedeemTransaction(
    marketId: string,
    positionId: string
): Transaction {
    const tx = new Transaction();

    tx.moveCall({
        target: FUGU_TARGETS.REDEEM,
        arguments: [
            tx.object(marketId),           // market: &mut Market
            tx.object(positionId),         // position: Position (consumed)
            tx.object(CLOCK_ID),           // clock: &Clock
        ],
    });

    return tx;
}

/**
 * Create a transaction to create a new prediction market
 * @param name - Market name
 * @param imageUrl - Market image URL
 * @param description - Market description
 * @param category - Market category (0-4)
 * @param deadline - Deadline timestamp in milliseconds
 * @param priceIdentifier - Pyth price feed identifier
 * @param targetPrice - Target price for resolution
 * @returns Transaction object ready to be signed and executed
 */
export function createMarketTransaction(
    name: string,
    imageUrl: string,
    description: string,
    category: number,
    deadline: number,
    priceIdentifier: number[],
    targetPrice: number
): Transaction {
    const tx = new Transaction();

    tx.moveCall({
        target: FUGU_TARGETS.CREATE_MARKET,
        arguments: [
            tx.pure.string(name),                      // name: String
            tx.pure.string(imageUrl),                  // image_url: String
            tx.pure.string(description),               // description: String
            tx.pure.u8(category),                      // category: u8
            tx.pure.u64(deadline),                     // deadline: u64
            tx.pure.vector("u8", priceIdentifier),     // price_identifier: vector<u8>
            tx.pure.u64(targetPrice),                  // target_price: u64
            tx.object(GLOBAL_CONFIG_ID),               // config: &mut GlobalConfig
            tx.object(CLOCK_ID),                       // clock: &Clock
        ],
    });

    return tx;
}

