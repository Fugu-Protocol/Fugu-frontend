/**
 * Fugu Prediction Market Smart Contract Integration
 * Package ID: 0x48092661b1945d135a01b29449a16f05933e8bc3e603c5634610c408c39e5353
 * Network: Sui Testnet
 */

// Contract Constants
export const FUGU_PACKAGE_ID = "0x2d5a4531454503ef41c953da0e6f7a5bf5ab0ec15522f426b916363fd2303b16";
export const FUGU_MODULE = "fugu_core";
export const USDC_MODULE = "USDC";
export const CLOCK_ID = "0x6";

// You need to replace these with actual object IDs from your deployment
export const GLOBAL_CONFIG_ID = "0x3cea8c8192f43dd56598432930c6c9a712b4b14cb1fad79a6917fa84eb886965"; // GlobalConfig object ID - needs to be set after deployment lookup
export const USDC_TREASURY_CAP_ID = ""; // USDC TreasuryCap object ID - needs to be set

// Event types
export const MARKET_CREATED_EVENT = `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::MarketCreatedEvent`;

// Outcome constants
export const OUTCOME_NO = 0;
export const OUTCOME_YES = 1;

// Category constants (based on your market categories)
// Category constants (aligned with contract: 0: crypto, 1: stocks, 2: assets, 3: economics)
export const CATEGORY = {
    CRYPTO: 0,
    STOCKS: 1,
    GOLD_SILVER: 2, // Assets
    ECONOMICS: 3,
    INDEXES: 4,
} as const;

// Type definitions
export interface MarketInfo {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    category: number;
    deadline: number;
    yesShares: number;
    noShares: number;
    virtualShares: number;
    targetPrice: number;
    outcome: number | null;
    balance: number;
    resolved: boolean;
}

export interface MarketCreatedEvent {
    market_id: string;
    market_name: string;
    image_url: string;
    description: string;
    creator_address: string;
    category: number;
    deadline: string; // u64 comes as string from API
    timestamp: string; // u64 comes as string from API
}

export interface PositionInfo {
    marketId: string;
    owner: string;
    shares: number;
    outcome: number;
}

// Function targets for moveCall
export const FUGU_TARGETS = {
    // Market Management
    CREATE_MARKET: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::create_market`,
    RESOLVE_MARKET: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::resolve`,

    // Trading
    BUY_SHARES: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::buy_shares`,
    ADD_TO_POSITION: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::add_to_position`,
    SELL_SHARES: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::sell_shares`,
    REDEEM: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::redeem`,

    // View Functions
    GET_MARKET_BALANCE: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::get_market_balance`,
    IS_MARKET_RESOLVED: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::is_market_resolved`,
    GET_POSITION_INFO: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::get_position_info`,
    IS_TRADING_PAUSED: `${FUGU_PACKAGE_ID}::${FUGU_MODULE}::is_trading_paused`,

    // USDC
    MINT_USDC: `${FUGU_PACKAGE_ID}::${USDC_MODULE}::mint`,
} as const;
