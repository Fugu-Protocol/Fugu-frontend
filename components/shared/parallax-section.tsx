"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
    children: React.ReactNode;
    speed?: number; // Parallax speed: 0.5 = slow, 1 = normal, 1.5 = fast
    direction?: "up" | "down" | "left" | "right";
    className?: string;
}

const ParallaxSection = ({
    children,
    speed = 0.5,
    direction = "up",
    className = "",
}: ParallaxSectionProps) => {
    const { scrollYProgress } = useScroll();

    // Calculate movement range based on speed
    const range = 200 * speed;

    // Determine transform based on direction
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "up" ? [0, -range] : direction === "down" ? [0, range] : [0, 0]
    );

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        direction === "left" ? [0, -range] : direction === "right" ? [0, range] : [0, 0]
    );

    return (
        <motion.div
            style={{
                y: direction === "up" || direction === "down" ? y : 0,
                x: direction === "left" || direction === "right" ? x : 0,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ParallaxSection;
