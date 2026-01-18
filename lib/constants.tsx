import {
    DollarSign,
    Activity,
    ShieldCheck,
    Wallet,
    TrendingUp,
    Globe,
} from "lucide-react";

// ==========================================
// CONTRACT CONSTANTS
// ==========================================
export const FUGU_PACKAGE_ID = "0x2d5a4531454503ef41c953da0e6f7a5bf5ab0ec15522f426b916363fd2303b16";
export const GLOBAL_CONFIG_ID = "0x3cea8c8192f43dd56598432930c6c9a712b4b14cb1fad79a6917fa84eb886965";

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
    // CRYPTO
    {
        id: 1,
        category: "Crypto",
        icon: "₿",
        mainIcon: "🪙",
        imageUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        color: "#f7931a",
        question: "Will Bitcoin hit $100k before Feb 2026?",
        yes: 65,
        no: 35,
        volume: "$4.2M",
        isHot: true,
    },
    {
        id: 2,
        category: "Crypto",
        icon: "Ξ",
        mainIcon: "💎",
        imageUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        color: "#627eea",
        question: "Will Ethereum reach $5,000 by March 2026?",
        yes: 48,
        no: 52,
        volume: "$2.8M",
        isHot: true,
    },
    {
        id: 3,
        category: "Crypto",
        icon: "◎",
        mainIcon: "🌟",
        imageUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
        color: "#9945ff",
        question: "Will Solana flip Ethereum in market cap?",
        yes: 22,
        no: 78,
        volume: "$1.5M",
        isHot: false,
    },
    // GOLD & SILVER
    {
        id: 4,
        category: "Gold & Silver",
        icon: "👑",
        mainIcon: "🥇",
        imageUrl: "https://img.icons8.com/color/200/gold-bars.png",
        color: "#ffd700",
        question: "Will Gold reach $5,000/oz in Q1 2026?",
        yes: 55,
        no: 45,
        volume: "$3.1M",
        isHot: true,
    },
    {
        id: 5,
        category: "Gold & Silver",
        icon: "🥈",
        mainIcon: "⚪",
        imageUrl: "https://img.icons8.com/color/200/silver-bars.png",
        color: "#c0c0c0",
        question: "Will Silver break $40/oz this quarter?",
        yes: 62,
        no: 38,
        volume: "$890k",
        isHot: false,
    },
    {
        id: 6,
        category: "Gold & Silver",
        icon: "💰",
        mainIcon: "🪙",
        imageUrl: "https://img.icons8.com/color/200/commodity.png",
        color: "#e6be8a",
        question: "Gold/Silver ratio below 70 by Feb?",
        yes: 38,
        no: 62,
        volume: "$450k",
        isHot: false,
    },
    // STOCKS
    {
        id: 7,
        category: "Stocks",
        icon: "📈",
        mainIcon: "🚗",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/200px-Tesla_Motors.svg.png",
        color: "#cc0000",
        question: "Will TSLA close above $450 this week?",
        yes: 45,
        no: 55,
        volume: "$1.2M",
        isHot: false,
    },
    {
        id: 8,
        category: "Stocks",
        icon: "🍎",
        mainIcon: "📱",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png",
        color: "#a2aaad",
        question: "Apple to announce new product in Q1?",
        yes: 78,
        no: 22,
        volume: "$2.1M",
        isHot: true,
    },
    {
        id: 9,
        category: "Stocks",
        icon: "🤖",
        mainIcon: "💚",
        imageUrl: "https://upload.wikimedia.org/wikipedia/sco/thumb/2/21/Nvidia_logo.svg/200px-Nvidia_logo.svg.png",
        color: "#76b900",
        question: "NVIDIA to beat Q4 earnings estimates?",
        yes: 71,
        no: 29,
        volume: "$3.5M",
        isHot: true,
    },
    {
        id: 10,
        category: "Stocks",
        icon: "📦",
        mainIcon: "🛒",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png",
        color: "#ff9900",
        question: "Amazon stock above $200 by Feb 2026?",
        yes: 58,
        no: 42,
        volume: "$1.8M",
        isHot: false,
    },
    // INDEXES
    {
        id: 11,
        category: "Indexes",
        icon: "📊",
        mainIcon: "📈",
        imageUrl: "https://img.icons8.com/color/200/sp-500.png",
        color: "#0066cc",
        question: "S&P 500 to hit new ATH in Jan?",
        yes: 72,
        no: 28,
        volume: "$2.5M",
        isHot: true,
    },
    {
        id: 12,
        category: "Indexes",
        icon: "📉",
        mainIcon: "🏛️",
        imageUrl: "https://img.icons8.com/color/200/stocks.png",
        color: "#003087",
        question: "Dow Jones above 45,000 this month?",
        yes: 55,
        no: 45,
        volume: "$1.3M",
        isHot: false,
    },
    {
        id: 13,
        category: "Indexes",
        icon: "💻",
        mainIcon: "🔬",
        imageUrl: "https://img.icons8.com/color/200/nasdaq.png",
        color: "#00a86b",
        question: "NASDAQ to outperform S&P in Q1?",
        yes: 62,
        no: 38,
        volume: "$980k",
        isHot: false,
    },
    // ECONOMICS
    {
        id: 14,
        category: "Economics",
        icon: "🏦",
        mainIcon: "🇺🇸",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Seal_of_the_United_States_Federal_Reserve_System.svg/250px-Seal_of_the_United_States_Federal_Reserve_System.svg.png",
        color: "#118743",
        question: "Will Fed cut rates in January FOMC?",
        yes: 15,
        no: 85,
        volume: "$5.2M",
        isHot: true,
    },
    {
        id: 15,
        category: "Economics",
        icon: "📊",
        mainIcon: "📉",
        imageUrl: "https://img.icons8.com/color/200/inflation.png",
        color: "#dc3545",
        question: "US inflation below 2.5% by March?",
        yes: 42,
        no: 58,
        volume: "$1.9M",
        isHot: false,
    },
    {
        id: 16,
        category: "Economics",
        icon: "💵",
        mainIcon: "💱",
        imageUrl: "https://img.icons8.com/color/200/currency-exchange.png",
        color: "#17a2b8",
        question: "EUR/USD parity by Q2 2026?",
        yes: 28,
        no: 72,
        volume: "$750k",
        isHot: false,
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

// ==========================================
// LEADERBOARD MOCK DATA
// ==========================================

export const LEADERBOARD_DATA = [
    { rank: 1, name: "SuiWhale.sui", pnl: "+$452,000", roi: "320%", winRate: "78%", avatar: "🐋", address: "0x12...34df" },
    { rank: 2, name: "CryptoNinja", pnl: "+$320,500", roi: "210%", winRate: "65%", avatar: "🥷", address: "0xab...8812" },
    { rank: 3, name: "PufferKing", pnl: "+$120,000", roi: "180%", winRate: "71%", avatar: "🐡", address: "0x89...11aa" },
    { rank: 4, name: "MoonBoi99", pnl: "+$98,400", roi: "145%", winRate: "55%", avatar: "🚀", address: "0xcc...99bb" },
    { rank: 5, name: "AlphaSeeker", pnl: "+$85,200", roi: "120%", winRate: "60%", avatar: "🦁", address: "0xdd...44ee" },
    { rank: 6, name: "DegenTrader", pnl: "+$72,100", roi: "95%", winRate: "48%", avatar: "🎲", address: "0xee...22ff" },
    { rank: 7, name: "SuiPanda", pnl: "+$64,000", roi: "88%", winRate: "62%", avatar: "🐼", address: "0xff...11cc" },
    { rank: 8, name: "DiamondHands", pnl: "+$51,300", roi: "75%", winRate: "59%", avatar: "💎", address: "0x11...22dd" },
    { rank: 9, name: "BearMarketSuits", pnl: "+$42,800", roi: "60%", winRate: "45%", avatar: "🐻", address: "0x22...33ee" },
    { rank: 10, name: "ToTheMoon", pnl: "+$31,500", roi: "40%", winRate: "52%", avatar: "🌕", address: "0x33...44ff" },
];
