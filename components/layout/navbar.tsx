"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet } from "lucide-react";
import Image from "next/image";
import NeoButton from "@/components/ui/neo-button";
import Link from "next/link";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);

    const toggleWallet = () => {
        setWalletConnected(!walletConnected);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#f0fdfa]/90 backdrop-blur-md border-b-2 border-black transition-all">
            <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 cursor-pointer mr-4 md:mr-8 group">
                    <Image
                        src="/assets/images/Fugu.png"
                        alt="Fugu Logo"
                        width={48}
                        height={45}
                        className="object-contain"
                    />
                    <span className="text-2xl md:text-3xl font-black tracking-tighter hidden sm:block">FUGU</span>
                </Link>

                {/* Landing Page Links */}
                <div className="hidden md:flex items-center gap-8 font-bold mx-auto">
                    {["Markets", "Stats", "How it Works", "Leaderboard"].map((text) => (
                        <a
                            key={text}
                            href={`#${text.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const targetId = text.toLowerCase().replace(/\s+/g, "-");
                                const element = document.getElementById(targetId);
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                                }
                            }}
                            className="hover:text-primary hover:underline hover:decoration-gold hover:decoration-wavy hover:decoration-4 hover:underline-offset-8 transition-all cursor-pointer whitespace-nowrap"
                        >
                            {text}
                        </a>
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 md:gap-6">
                    {/* Desktop Wallet/Connect */}
                    <div className="hidden md:flex items-center gap-3">
                        <NeoButton
                            onClick={toggleWallet}
                            variant={walletConnected ? "green" : "primary"}
                            size="sm"
                            className=""
                        >
                            <Wallet size={18} className="mr-2" />
                            {walletConnected ? "0x...FUGU" : "Connect Wallet"}
                        </NeoButton>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white border-b-2 border-black overflow-hidden shadow-xl"
                    >
                        {/* <div className="flex flex-col p-4 gap-4 font-bold text-lg">
                            <a
                                href="#markets"
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:bg-gray-50 rounded-lg"
                            >
                                Markets
                            </a>
                            <a
                                href="#stats"
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:bg-gray-50 rounded-lg"
                            >
                                Stats
                            </a>
                            <a
                                href="#how-it-works"
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 hover:bg-gray-50 rounded-lg"
                            >
                                How it Works
                            </a>
                            <NeoButton onClick={toggleWallet} className="w-full justify-center">
                                {walletConnected ? "Wait for Transaction..." : "Connect Wallet"}
                            </NeoButton>
                        </div> */}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
