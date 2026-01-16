"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { cn } from "@/lib/utils";

interface BentoItemProps {
    title: string;
    value: string;
    sub: string;
    icon: LucideIcon;
    color: string;
    size?: "sm" | "lg";
    delay?: number;
}

const BentoItem = ({
    title,
    value,
    sub,
    icon: Icon,
    color,
    size = "sm",
    delay = 0,
}: BentoItemProps) => (
    <ScrollReveal delay={delay}>
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "bg-white border-2 border-black rounded-2xl p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_#000] relative overflow-hidden h-full min-h-[240px]",
                size === "lg" ? "md:col-span-2" : ""
            )}
        >
            <div
                className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20`}
                style={{ backgroundColor: color }}
            ></div>

            <div className="flex justify-between items-start z-10">
                <div className="p-2 rounded-lg border-2 border-black bg-white">
                    <Icon size={24} color={color} />
                </div>
                {size === "lg" && (
                    <span className="text-xs font-bold bg-black text-white px-2 py-1 rounded flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        LIVE
                    </span>
                )}
            </div>

            <div className="z-10 mt-4">
                <p className="text-gray-500 font-bold text-sm uppercase">{title}</p>
                <h2 className="text-3xl font-black mt-1">{value}</h2>
                <p className="text-sm font-medium mt-2 flex items-center gap-1">
                    {sub.includes("+") ? (
                        <TrendingUp size={14} className="text-green-600" />
                    ) : null}
                    <span
                        className={sub.includes("+") ? "text-green-600" : "text-gray-400"}
                    >
                        {sub}
                    </span>
                </p>
            </div>
        </motion.div>
    </ScrollReveal>
);

export default BentoItem;
