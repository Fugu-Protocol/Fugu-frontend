"use client";

import React, { useState } from "react";
import { Copy, CheckCircle2, Loader2, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestnetPage() {
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    const handleConnectWallet = () => {
        // Simulate wallet connection
        setIsWalletConnected(true);
        setAddress("0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0"); // Mock Address
    };

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address) return;

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStatus("success");

            // Don't clear address if connected
            if (!isWalletConnected) {
                setAddress("");
            }

            // Reset status after a few seconds
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F0F9FF] relative overflow-hidden flex flex-col items-center justify-center font-sans p-4">

            {/* Dot Pattern Background */}
            <div
                className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#94A3B8 2px, transparent 2px)",
                    backgroundSize: "24px 24px"
                }}
            ></div>

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-xl"
            >
                <div className="bg-white border-4 border-black rounded-[32px] p-8 md:p-12 shadow-[12px_12px_0px_0px_#000000] relative overflow-visible">

                    {/* Decorative Elements */}
                    <div className="absolute -top-8 -right-8 pointer-events-none">
                        <div className="relative w-32 h-32">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-24 h-24 bg-[#FDE047] rounded-full border-4 border-black absolute top-4 right-4 z-0"
                            ></motion.div>
                            <motion.div
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="absolute top-8 right-8 z-10 bg-white border-2 border-black px-4 py-2 rounded-xl font-bold text-lg shadow-[4px_4px_0px_0px_#000000]"
                            >
                                Testnet
                            </motion.div>
                        </div>
                    </div>

                    <div className="mb-8 mt-2">
                        <h1 className="text-4xl md:text-5xl font-black mb-3 text-[#0F172A] tracking-tight">
                            Testnet USDC Request
                        </h1>
                        <p className="text-gray-500 font-bold text-lg">
                            Get dummy USDC to <span className="text-blue-500">test</span> your prediction skills.
                        </p>
                    </div>

                    <div className="w-full h-1 bg-gray-100 mb-8 rounded-full"></div>

                    {/* Connect Wallet Button */}
                    {!isWalletConnected && (
                        <div className="mb-6 flex justify-end">
                            <button
                                type="button"
                                onClick={handleConnectWallet}
                                className="px-4 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Wallet size={16} />
                                Connect Wallet
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleRequest} className="space-y-8">
                        <div className="space-y-3">
                            <label
                                className="flex items-center gap-2 font-black text-xl text-[#0F172A]"
                                htmlFor="wallet-address"
                            >
                                <Wallet className="w-6 h-6" />
                                Your Wallet Address
                            </label>

                            <div className="relative group">
                                <input
                                    id="wallet-address"
                                    type="text"
                                    placeholder="Enter your Sui testnet address..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    disabled={loading || isWalletConnected}
                                    className="w-full px-6 py-5 rounded-2xl border-4 border-black bg-white focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all text-xl font-bold placeholder:text-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                />

                                {/* Paste Button (Optional Enhancement) */}
                                {!isWalletConnected && (
                                    <button
                                        type="button"
                                        onClick={() => navigator.clipboard.readText().then(text => setAddress(text))}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-black transition-colors"
                                        title="Paste from clipboard"
                                    >
                                        <Copy size={20} className="stroke-[3]" />
                                    </button>
                                )}
                            </div>
                            {isWalletConnected && (
                                <p className="text-green-600 font-bold text-sm flex items-center gap-1">
                                    <CheckCircle2 size={16} /> Wallet Connected
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !address}
                            className="group w-full py-5 rounded-2xl bg-[#8BAFF6] text-white font-black text-2xl border-4 border-black relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0px_8px_0px_0px_#000000] active:translate-y-0 active:shadow-none disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-3">
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin w-8 h-8" />
                                        <span>Sending...</span>
                                    </>
                                ) : status === "success" ? (
                                    <>
                                        <CheckCircle2 className="w-8 h-8" />
                                        <span>Sent Successfully!</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Request Testnet Tokens</span>
                                    </>
                                )}
                            </div>

                            {/* Shine Effect */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                        </button>
                    </form>

                </div>

                <div className="mt-10 text-center space-y-2">
                    <p className="text-gray-500 font-bold font-mono text-sm tracking-widest uppercase opacity-70">
                        Powered by Gemini • Secured by TruthSeeker Protocol
                    </p>
                </div>

            </motion.main>

            {/* Toast Notification for success */}
            <AnimatePresence>
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-[8px_8px_0px_0px_#000000] border-4 border-black z-50"
                    >
                        <CheckCircle2 className="w-8 h-8 fill-white text-green-500" />
                        <div className="flex flex-col">
                            <span className="text-lg">Tokens Sent!</span>
                            <span className="text-sm opacity-90 font-normal">Check your wallet in a few seconds.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
