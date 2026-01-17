import {
    DollarSign,
    Activity,
    ShieldCheck,
    Wallet,
    TrendingUp,
    Globe,
} from "lucide-react";

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

// ==========================================
// PROFILE MOCK DATA
// ==========================================

export const PROFILE_MOCK_DATA = {
    stats: {
        positions: "$1,205.50",
        pnl: "+$340.20",
        volume: "$15,400",
        markets: 12
    },
    positions: [
        {
            id: 1,
            market: "Will Bitcoin hit $100k before Feb 2026?",
            side: "YES",
            avgPrice: 0.65,
            shares: 1000,
            value: "$650.00",
            pnl: "+$120.50",
            outcome: "YES"
        },
        {
            id: 2,
            market: "Will TSLA close above $450 this week?",
            side: "NO",
            avgPrice: 0.42,
            shares: 500,
            value: "$210.00",
            pnl: "-$15.00",
            outcome: "NO"
        },
        {
            id: 3,
            market: "S&P 500 to hit new ATH in Jan?",
            side: "YES",
            avgPrice: 0.78,
            shares: 200,
            value: "$156.00",
            pnl: "+$32.00",
            outcome: "YES"
        }
    ],
    openOrders: [
        {
            id: 1,
            market: "Will Gold reach $5,000/oz in Q1 2026?",
            side: "YES",
            price: 0.55,
            shares: 200,
            value: "$110.00",
            total: "$110.00",
        },
        {
            id: 2,
            market: "Will Bitcoin hit $100k before Feb 2026?",
            side: "NO",
            price: 0.35,
            shares: 500,
            value: "$175.00",
            total: "$175.00",
        }
    ],
    pnlHistory: {
        '1D': [
            { name: '00:00', value: 310, fullDate: '00:00 Jan 17 2026' },
            { name: '04:00', value: 290, fullDate: '04:00 Jan 17 2026' },
            { name: '08:00', value: 350, fullDate: '08:00 Jan 17 2026' },
            { name: '12:00', value: 305, fullDate: '12:00 Jan 17 2026' },
            { name: '16:00', value: 380, fullDate: '16:00 Jan 17 2026' },
            { name: '20:00', value: 340.20, fullDate: '20:00 Jan 17 2026' }
        ],
        '7D': [
            { name: 'Day 1', value: 250, fullDate: 'Jan 10 2026' },
            { name: 'Day 2', value: 180, fullDate: 'Jan 11 2026' },
            { name: 'Day 3', value: 290, fullDate: 'Jan 12 2026' },
            { name: 'Day 4', value: 260, fullDate: 'Jan 13 2026' },
            { name: 'Day 5', value: 350, fullDate: 'Jan 14 2026' },
            { name: 'Day 6', value: 310, fullDate: 'Jan 15 2026' },
            { name: 'Day 7', value: 340.20, fullDate: 'Jan 16 2026' }
        ],
        '30D': [
            { name: 'Week 1', value: 150, fullDate: 'Dec 17 - Dec 24' },
            { name: 'Week 2', value: 280, fullDate: 'Dec 25 - Dec 31' },
            { name: 'Week 3', value: 210, fullDate: 'Jan 01 - Jan 07' },
            { name: 'Week 4', value: 340.20, fullDate: 'Jan 08 - Jan 15' }
        ],
        'ALL': [
            { name: 'Jan', value: 100, fullDate: 'Jan 2025' },
            { name: 'Feb', value: 240, fullDate: 'Feb 2025' },
            { name: 'Mar', value: 180, fullDate: 'Mar 2025' },
            { name: 'Apr', value: 340.20, fullDate: 'Apr 2025' }
        ]
    },
    activity: [
        { id: 1, action: "Bought", target: "YES", market: "Bitcoin $100k", amount: "$500.00", time: "2h ago" },
        { id: 2, action: "Sold", target: "NO", market: "ETH $5k", amount: "$320.00", time: "1d ago" },
        { id: 3, action: "Redeemed", target: "WIN", market: "Solana $200", amount: "$1,200.00", time: "3d ago" }
    ]
};
