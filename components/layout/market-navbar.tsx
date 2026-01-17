"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Wallet, Bell, User } from "lucide-react";
import NeoButton from "@/components/ui/neo-button";

import MarketCommandMenu from "@/features/markets/components/market-command-menu";

const MarketNavbar = () => {
    const [walletConnected, setWalletConnected] = useState(false);

    const toggleWallet = () => {
        setWalletConnected(!walletConnected);
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

                {/* Primary Nav Links */}
                {/* <div className="hidden md:flex items-center gap-6 font-bold text-sm">
                    <Link href="/market" className="text-blue-600 hover:text-blue-700 transition-colors">
                        Markets
                    </Link>
                    <Link
                        href="/points"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-2.5 py-0.5 rounded-md transition-colors text-xs uppercase tracking-wide"
                    >
                        Points
                    </Link>
                    <Link href="/invite" className="text-gray-500 hover:text-black transition-colors">
                        Invite
                    </Link>
                </div> */}
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
                        <div className="hidden lg:flex items-center gap-4 text-xs font-bold mr-2 border-r border-gray-200 pr-4 h-6">
                            <span className="text-green-600">$120.50</span>
                            <span className="text-blue-600">$50.00</span>
                        </div>

                        {/* Notifications */}
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 border border-white rounded-full"></div>
                        </button>

                        {/* Profile */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-300 to-red-400 border border-gray-200 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </>
                ) : (
                    // Connect Wallet (Replaces Login/Signup)
                    <NeoButton
                        onClick={toggleWallet}
                        variant="primary"
                        size="sm"
                        className="text-sm shadow-none"
                        contentClassName="!py-2.5 !px-6"
                    >
                        Connect Wallet
                    </NeoButton>
                )}
            </div>
        </nav>
    );
};

export default MarketNavbar;
