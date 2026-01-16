"use client";

import React from "react";
import { motion } from "framer-motion";

interface PufferfishProps {
    size?: number;
    className?: string;
    mood?: "happy" | "shocked";
}

const Pufferfish = ({
    size = 40,
    className = "",
    mood = "happy",
}: PufferfishProps) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        whileHover={{ scale: 1.1, rotate: 5 }}
        initial="initial"
        animate="animate"
    >
        {/* Spikes */}
        <motion.g
            variants={{
                initial: { scale: 1 },
                animate: {
                    scale: [1, 1.05, 1],
                    transition: { repeat: Infinity, duration: 2 },
                },
            }}
        >
            <circle
                cx="20"
                cy="20"
                r="5"
                fill="var(--color-primary)"
                stroke="black"
                strokeWidth="2"
            />
            <circle
                cx="80"
                cy="20"
                r="5"
                fill="var(--color-primary)"
                stroke="black"
                strokeWidth="2"
            />
            <circle
                cx="20"
                cy="80"
                r="5"
                fill="var(--color-primary)"
                stroke="black"
                strokeWidth="2"
            />
            <circle
                cx="80"
                cy="80"
                r="5"
                fill="var(--color-primary)"
                stroke="black"
                strokeWidth="2"
            />
            <circle
                cx="50"
                cy="10"
                r="5"
                fill="var(--color-primary)"
                stroke="black"
                strokeWidth="2"
            />
            <circle
                cx="50"
                cy="90"
                r="5"
                fill="var(--color-primary)"
                stroke="black"
                strokeWidth="2"
            />
            <circle
                cx="10"
                cy="50"
                r="5"
                fill="var(--color-primary)"
                stroke="black"
                strokeWidth="2"
            />
            <circle
                cx="90"
                cy="50"
                r="5"
                fill="var(--color-primary)"
                stroke="black"
                strokeWidth="2"
            />
        </motion.g>

        {/* Body */}
        <circle
            cx="50"
            cy="50"
            r="35"
            fill="white"
            stroke="black"
            strokeWidth="3"
        />

        {/* Face */}
        {mood === "happy" && (
            <>
                <circle cx="40" cy="45" r="3" fill="black" />
                <circle cx="60" cy="45" r="3" fill="black" />
                <path
                    d="M 40 55 Q 50 65 60 55"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
                <circle cx="35" cy="52" r="2" fill="#ffb7b2" opacity="0.6" />
                <circle cx="65" cy="52" r="2" fill="#ffb7b2" opacity="0.6" />
            </>
        )}
        {mood === "shocked" && (
            <>
                <circle cx="35" cy="40" r="4" fill="black" />
                <circle cx="65" cy="40" r="4" fill="black" />
                <circle cx="50" cy="60" r="5" fill="black" />
            </>
        )}
    </motion.svg>
);

export default Pufferfish;
