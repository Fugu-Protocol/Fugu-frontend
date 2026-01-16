"use client";

import React from "react";
import NeoButton from "@/components/ui/neo-button";
import ScrollReveal from "@/components/shared/scroll-reveal";

const LeaderboardTeaser = () => {
    return (
        <section
            id="leaderboard"
            className="py-20 bg-green border-y-2 border-black"
        >
            <div className="container mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
                <ScrollReveal variant="slideRight" className="md:w-1/2">
                    <div className="md:w-full">
                        <h2
                            className="text-5xl font-black mb-6 text-white"
                            style={{ textShadow: "4px 4px 0 #000" }}
                        >
                            Top Puffers
                        </h2>
                        <p className="text-xl font-bold mb-8 border-l-4 border-black pl-4 py-2 bg-white/20">
                            Compete with other traders. Climb the leaderboard. <br /> Win
                            exclusive FUGU NFTs and Airdrops.
                        </p>
                        <NeoButton variant="outline" size="lg">
                            Join the Competition
                        </NeoButton>
                    </div>
                </ScrollReveal>

                {/* Mock Leaderboard Table */}
                <div className="md:w-1/2 w-full">
                    <ScrollReveal delay={0.2} variant="slideLeft">
                        <div className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_#000]">
                            <div className="bg-black text-white p-4 flex justify-between font-bold">
                                <span>Trader</span>
                                <span>Pnl (All Time)</span>
                            </div>
                            {[
                                { name: "SuiWhale.sui", score: "+$452,000", avatar: "🐋" },
                                { name: "CryptoNinja", score: "+$320,500", avatar: "🥷" },
                                { name: "PufferKing", score: "+$120,000", avatar: "🐡" },
                                { name: "MoonBoi99", score: "+$98,400", avatar: "🚀" },
                            ].map((user, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-4 border-b-2 border-gray-100 font-bold hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400 w-4">#{i + 1}</span>
                                        <span className="text-2xl">{user.avatar}</span>
                                        <span>{user.name}</span>
                                    </div>
                                    <span className="text-green-600">{user.score}</span>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default LeaderboardTeaser;
