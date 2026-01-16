"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();

    // Smooth spring animation for progress bar
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Color transitions based on scroll depth
    // 0-33%: primary, 33-66%: gold, 66-100%: green
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.33, 0.66, 1],
        ["#3e90f0", "#d8d174", "#b6c454", "#b6c454"]
    );

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-transparent z-100 origin-left"
            style={{
                scaleX,
                backgroundColor,
            }}
        />
    );
};

export default ScrollProgress;
