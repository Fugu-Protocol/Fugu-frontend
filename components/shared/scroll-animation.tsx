"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface ScrollAnimationProps {
    children: React.ReactNode;
    variant?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "zoomIn" | "rotateIn";
    delay?: number;
    duration?: number;
    stagger?: number; // For staggering child elements
    className?: string;
    threshold?: number; // Viewport intersection threshold (0-1)
}

const ScrollAnimation = ({
    children,
    variant = "fadeIn",
    delay = 0,
    duration = 0.6,
    stagger = 0,
    className = "",
    threshold = 0.2,
}: ScrollAnimationProps) => {
    // Animation variants
    const variants: Record<string, Variants> = {
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
        },
        slideUp: {
            hidden: { opacity: 0, y: 60 },
            visible: { opacity: 1, y: 0 },
        },
        slideLeft: {
            hidden: { opacity: 0, x: 60 },
            visible: { opacity: 1, x: 0 },
        },
        slideRight: {
            hidden: { opacity: 0, x: -60 },
            visible: { opacity: 1, x: 0 },
        },
        zoomIn: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
        },
        rotateIn: {
            hidden: { opacity: 0, rotate: -10, scale: 0.9 },
            visible: { opacity: 1, rotate: 0, scale: 1 },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: threshold }}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1], // Custom easing
                staggerChildren: stagger,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;
