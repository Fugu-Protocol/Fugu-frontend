import {
    ArrowRight,
    DollarSign,
    Activity,
    ShieldCheck,
    Wallet,
    Bitcoin,
    Coins,
    Zap,
    TrendingUp,
    Globe,
    Vote,
    Car,
    BarChart3,
    Crown,
} from "lucide-react";
import React from "react";

// ==========================================
// LANDING PAGE DATA
// ==========================================

export const CATEGORIES = [
    "All",
    "Gold & Silver",
    "Stocks",
    "Indexes",
    "Crypto",
    "RWA",
];

export const MARKETS = [
    {
        id: 1,
        category: "Crypto",
        icon: "₿",
        mainIcon: "🪙",
        color: "#d8d174",
        question: "Will Bitcoin hit $100k before Feb 2026?",
        yes: 65,
        no: 35,
        volume: "$4.2M",
        isHot: true,
    },
    {
        id: 2,
        category: "Gold & Silver",
        icon: "👑",
        mainIcon: "🧈",
        color: "#3e90f0", // Primary
        question: "Will Gold reach $5,000/oz in Q1 2026?",
        yes: 55,
        no: 45,
        volume: "$3.1M",
        isHot: true,
    },
    {
        id: 3,
        category: "Stocks",
        icon: "📈",
        mainIcon: "🚗",
        color: "#b6c454",
        question: "Will TSLA close above $450 this week?",
        yes: 45,
        no: 55,
        volume: "$890k",
        isHot: false,
    },
    {
        id: 4,
        category: "Indexes",
        icon: "📊",
        mainIcon: "📈",
        color: "#a5f3fc",
        question: "S&P 500 to hit new ATH in Jan?",
        yes: 72,
        no: 28,
        volume: "$1.5M",
        isHot: true,
    },
];

export const BENTO_STATS = [
    {
        title: "Total Volume",
        value: "$124.5M",
        sub: "+12% this week",
        icon: DollarSign,
        color: "#3e90f0",
        size: "lg" as const, // Explicitly typed for literal
    },
    {
        title: "Active Traders",
        value: "8,432",
        sub: "+54 today",
        icon: Activity,
        color: "#d8d174",
    },
    {
        title: "Markets Resolved",
        value: "1,205",
        sub: "99.9% accuracy",
        icon: ShieldCheck,
        color: "#b6c454",
    },
    {
        title: "Total Payouts",
        value: "$98.2M",
        sub: "Instant withdrawals",
        icon: Wallet,
        color: "#3e90f0",
    },
];

// ==========================================
// HOW IT WORKS SECTION
// ==========================================

export const HOW_IT_WORKS_STEPS = [
    {
        step: 1,
        title: "Pick a Market",
        desc: "Browse topics from crypto to commodities. Find a question you know the answer to.",
        icon: <Globe size={40} />,
    },
    {
        step: 2,
        title: "Take a Position",
        desc: "Buy 'YES' or 'NO' shares. The price reflects the probability. Trade anytime.",
        icon: <TrendingUp size={40} />,
    },
    {
        step: 3,
        title: "Win & Profit",
        desc: "When the market resolves, redeem your winning shares for $1.00 each.",
        icon: <DollarSign size={40} />,
    },
];

// ==========================================
// FAQ SECTION
// ==========================================

export const FAQ_ITEMS = [
    {
        q: "How are markets resolved?",
        a: "We use a combination of decentralized oracles (like Pyth & Chainlink) and our decentralized dispute resolution council (FUGU DAO) to ensure 100% accuracy.",
    },
    {
        q: "What are the fees?",
        a: "FUGU charges a flat 0.1% fee on winning shares only. There are no fees to place orders, only network gas fees (which are tiny on Sui).",
    },
    {
        q: "Is my money safe?",
        a: "Yes. FUGU is non-custodial. Your funds remain in a smart contract until you withdraw them. The code is audited by top firms.",
    },
    {
        q: "Can I sell before the market ends?",
        a: "Absolutely. You can trade your shares instantly at any time. Lock in profits or cut losses before the event resolves.",
    },
];
