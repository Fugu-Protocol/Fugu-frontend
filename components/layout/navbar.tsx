"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Wallet } from "lucide-react";
import Image from "next/image";
import NeoButton from "@/components/ui/neo-button";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);

    const toggleWallet = () => {
        setWalletConnected(!walletConnected);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#f0fdfa]/90 backdrop-blur-md border-b-2 border-black transition-all">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                        src="/Fugu.png"
                        alt="Fugu Logo"
                        width={48}
                        height={45}
                        className="object-contain"
                    />
                    <span className="text-3xl font-black tracking-tighter">FUGU</span>
                </div>

                {/* Desktop Links - Updated with Golden Sand Wavy Underline */}
                <div className="hidden md:flex items-center gap-8 font-bold">
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
                            className="hover:text-primary hover:underline hover:decoration-gold hover:decoration-wavy hover:decoration-4 hover:underline-offset-8 transition-all cursor-pointer"
                        >
                            {text}
                        </a>
                    ))}
                </div>

                {/* Wallet Button */}
                <div className="hidden md:block">
                    <NeoButton
                        onClick={toggleWallet}
                        variant={walletConnected ? "green" : "primary"}
                        size="sm"
                    >
                        <Wallet size={18} />
                        {walletConnected ? "0x...FUGU" : "Connect Wallet"}
                    </NeoButton>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white border-b-2 border-black overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4 font-bold text-lg">
                            <a
                                href="#markets"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("markets")?.scrollIntoView({ behavior: "smooth" });
                                    setIsMenuOpen(false);
                                }}
                            >
                                Markets
                            </a>
                            <a
                                href="#stats"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
                                    setIsMenuOpen(false);
                                }}
                            >
                                Stats
                            </a>
                            <a
                                href="#how-it-works"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                                    setIsMenuOpen(false);
                                }}
                            >
                                How it Works
                            </a>
                            <NeoButton onClick={toggleWallet} className="w-full">
                                {walletConnected ? "Connected" : "Connect Wallet"}
                            </NeoButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
