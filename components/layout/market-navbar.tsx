"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ConnectModal, useCurrentAccount, useDisconnectWallet, useResolveSuiNSName, useSuiClientQuery } from "@mysten/dapp-kit";
import { Wallet, Bell, User, Copy, Settings, Trophy, Zap, LogOut, Check, VolumeX } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import NeoButton from "@/components/ui/neo-button";

import MarketCommandMenu from "@/features/markets/components/market-command-menu";
import DepositDialog from "@/components/shared/deposit-dialog";

const MarketNavbar = () => {
    const router = useRouter();
    const account = useCurrentAccount();
    const { data: suinsName } = useResolveSuiNSName(account?.address);
    const { mutate: disconnect } = useDisconnectWallet();
    const walletConnected = !!account;
    const [isCopied, setIsCopied] = useState(false);
    const [isConnectOpen, setIsConnectOpen] = useState(false);

    // Fetch account balance
    const { data: balanceData } = useSuiClientQuery(
        "getBalance",
        { owner: account?.address || "" },
        { enabled: !!account }
    );

    // Calculate balance in SUI (MIST / 10^9)
    const suiBalance = balanceData ? parseInt(balanceData.totalBalance) / 1_000_000_000 : 0;
    const formattedBalance = suiBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });

    // Helper to format address
    const formatAddress = (addr: string) => {
        if (!addr) return "";
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    // Generate stable username from wallet address
    const generatedUsername = useMemo(() => {
        if (!account?.address) return "User";
        // Create a simple hash from the address to generate a stable random number
        let hash = 0;
        for (let i = 0; i < account.address.length; i++) {
            const char = account.address.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        const randomNum = Math.abs(hash % 10000);
        return `User${randomNum}`;
    }, [account?.address]);

    const handleCopyAddress = () => {
        if (account?.address) {
            navigator.clipboard.writeText(account.address);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <nav className="border-b border-gray-200 bg-white md:px-58 px-6 py-2.5 sticky top-0 z-50 flex items-center justify-between">
            {/* Left Section: Logo + Nav Links */}
            <div className="flex items-center gap-6 md:gap-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src="/assets/images/Fugu.png"
                        alt="Fugu Logo"
                        width={48}
                        height={45}
                        className="object-contain"
                    />
                    <span className="text-2xl md:text-3xl font-black tracking-tighter hidden sm:block">FUGU</span>
                </Link>
            </div>

            {/* Middle Section: Search Bar */}
            <div className="flex-1 max-w-xl mx-4 lg:mx-12 hidden md:block">
                <MarketCommandMenu />
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-3">
                {walletConnected ? (
                    <>
                        {/* Portfolio Summary (Desktop) */}
                        <div className="hidden lg:flex items-center gap-6 text-xs font-bold mr-2 border-r border-gray-200 pr-6 h-8">
                            <div className="flex flex-col items-end group cursor-pointer">
                                <span className="text-gray-400 group-hover:text-green-600 transition-colors uppercase tracking-wider scale-90 origin-right">Portfolio</span>
                                <span className="text-green-600 text-sm group-hover:scale-105 transition-transform origin-right">$120.50</span>
                            </div>
                            <div className="flex flex-col items-end group cursor-pointer">
                                <span className="text-gray-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider scale-90 origin-right">Cash (SUI)</span>
                                <span className="text-blue-600 text-sm group-hover:scale-105 transition-transform origin-right">{formattedBalance} SUI</span>
                            </div>
                        </div>

                        {/* Deposit Button */}
                        <DepositDialog balance={suiBalance}>
                            <NeoButton
                                variant="primary"
                                size="sm"
                                className="mr-2 hidden md:flex shadow-none bg-[#6366f1] hover:bg-[#5558dd] border-none text-white rounded-lg"
                                contentClassName="px-4 py-2"
                            >
                                Deposit
                            </NeoButton>
                        </DepositDialog>

                        {/* Notifications Popover */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative outline-none">
                                    <Bell className="w-5 h-5 text-gray-600" />
                                    <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border border-white rounded-full"></div>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[360px] p-0 rounded-xl shadow-xl bg-white border-gray-200 mt-2 mr-4" align="end">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                    <h4 className="font-black text-[#6366f1] text-lg tracking-tight">Notifications</h4>
                                    <button className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors">
                                        <VolumeX size={14} />
                                        Remove All
                                    </button>
                                </div>
                                <div className="h-[300px] flex flex-col items-center justify-center text-gray-300">
                                    <Bell size={64} strokeWidth={1} />
                                </div>
                            </PopoverContent>
                        </Popover>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-300 to-red-400 border border-gray-200 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-72 p-2 bg-white border-gray-200 text-gray-900 rounded-xl mr-4 mt-2 shadow-xl flex flex-col z-[60]">
                                {/* Wallet Info Header */}
                                <DropdownMenuItem asChild className="p-0 bg-transparent focus:bg-transparent cursor-pointer">
                                    <Link href={`/profile/${account?.address}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2 border border-gray-100 hover:bg-gray-100 transition-colors w-full">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 shadow-inner" />
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="text-sm font-bold text-gray-900 truncate">
                                                {suinsName || generatedUsername}
                                            </p>
                                            <div className="flex items-center gap-2 mt-0.5" onClick={(e) => e.preventDefault()}>
                                                <span className="text-xs text-gray-500 bg-white border border-gray-200 px-1.5 py-0.5 rounded font-mono">
                                                    {account?.address ? formatAddress(account.address) : ""}
                                                </span>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleCopyAddress();
                                                    }}
                                                    className="text-gray-400 hover:text-black transition-colors p-1 hover:bg-gray-200 rounded"
                                                    title="Copy Address"
                                                >
                                                    {isCopied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-gray-100 my-1" />

                                {/* Menu Items */}
                                <DropdownMenuItem asChild>
                                    <Link href="/leaderboard" className="flex items-center gap-2 p-2.5 text-sm font-bold text-gray-700 focus:bg-gray-100 focus:text-black rounded-lg cursor-pointer transition-colors w-full">
                                        <Trophy size={16} className="text-yellow-500" />
                                        Leaderboard
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="flex items-center gap-2 p-2.5 text-sm font-bold text-gray-700 focus:bg-gray-100 focus:text-black rounded-lg cursor-pointer transition-colors">
                                    <Zap size={16} className="text-green-600" />
                                    Rewards
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-gray-100 my-1" />

                                <div className="px-2 py-1 space-y-1">
                                    {['Deposit', 'Positions & Orders', 'Invite', 'Documentation'].map((item) => (
                                        <div key={item} className="text-xs text-gray-500 hover:text-black py-1.5 cursor-pointer font-bold transition-colors">
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <DropdownMenuSeparator className="bg-gray-100 my-1" />

                                <DropdownMenuItem
                                    onClick={() => {
                                        disconnect();
                                        setIsConnectOpen(false);
                                        router.push("/");
                                    }}
                                    className="flex items-center gap-2 p-2.5 text-sm font-bold text-red-500 focus:bg-red-50 focus:text-red-600 rounded-lg cursor-pointer mt-1"
                                >
                                    <LogOut size={16} />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    // Connect Wallet (Replaces Login/Signup)
                    <ConnectModal
                        trigger={
                            <NeoButton
                                variant="primary"
                                size="sm"
                                className="text-sm shadow-none"
                                contentClassName="!py-2.5 !px-6 flex items-center gap-2"
                            >
                                <Wallet size={16} strokeWidth={2.5} />
                                Connect Wallet
                            </NeoButton>
                        }
                        open={isConnectOpen}
                        onOpenChange={setIsConnectOpen}
                    />
                )}
            </div>
        </nav>
    );
};

export default MarketNavbar;
