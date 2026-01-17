"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Zap, TrendingUp } from "lucide-react";
import NeoButton from "@/components/ui/neo-button";

const HeroSection = () => {
    const { scrollYProgress } = useScroll();

    // Parallax effects with different speeds
    const activityY = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const trendingY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Scale effect for hero text on scroll
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

    return (
        <section className="pt-32 pb-20 px-4 container mx-auto text-center relative">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 animated-grid pointer-events-none z-0"></div>

            {/* Background Decorative Elements with Enhanced Parallax & Float */}
            <motion.div
                style={{ y: activityY }}
                className="absolute top-40 right-[5%] opacity-10 hidden lg:block z-0"
            >
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <Activity size={200} />
                </motion.div>
            </motion.div>

            {/* Additional parallax element - left side */}
            <motion.div
                style={{ y: trendingY }}
                className="absolute top-60 left-[5%] opacity-10 hidden lg:block z-0"
            >
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.05, 1],
                        rotate: [0, -5, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                >
                    <TrendingUp size={150} />
                </motion.div>
            </motion.div>

            <motion.div
                className="max-w-4xl mx-auto relative z-10"
                style={{ scale: heroScale, opacity: heroOpacity }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block mb-4 px-4 py-2 bg-gold border-2 border-black rounded-full font-bold shadow-[4px_4px_0px_0px_#000]"
                >
                    🐡 The #1 Prediction Market on Sui
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black leading-none mb-6 tracking-tight"
                >
                    Predict the Future. <br />
                    <span className="text-primary relative inline-block">
                        Profit from Truth.
                        <svg
                            className="absolute w-full h-4 -bottom-2 left-0 text-accent -z-10"
                            viewBox="0 0 100 10"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 5 Q 50 10 100 5"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                            />
                        </svg>
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-xl md:text-2xl font-medium text-gray-600 mb-10 max-w-2xl mx-auto"
                >
                    Trade on crypto, gold, stocks, and real-world assets with instant
                    settlement. Don't just watch the charts—bet on them.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    <NeoButton
                        href="/market"
                        size="lg"
                        variant="primary"
                        isThunder={true}
                        layerColor="bg-accent"
                    >
                        Launch App{" "}
                        <Zap className="ml-2 zap-icon transition-all duration-300" />
                    </NeoButton>
                    <NeoButton size="lg" variant="outline">
                        View Leaderboard
                    </NeoButton>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
