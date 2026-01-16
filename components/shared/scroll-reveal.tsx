"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    variant?: "slideUp" | "slideLeft" | "slideRight" | "zoomIn" | "scaleUp" | "fadeIn";
    staggerChildren?: number; // Delay between child animations
}

const ScrollReveal = ({
    children,
    delay = 0,
    className = "",
    variant = "slideUp",
    staggerChildren = 0,
}: ScrollRevealProps) => {
    // Animation variants
    const variants: Record<string, Variants> = {
        slideUp: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
        },
        slideLeft: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
        },
        slideRight: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
        },
        zoomIn: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
        },
        scaleUp: {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants[variant]}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut",
                staggerChildren,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
