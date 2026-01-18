"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NeoButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "gold" | "green" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isThunder?: boolean;
    layerColor?: string; // e.g. "bg-purple-400"
    href?: string; // New prop for Link support
    contentClassName?: string; // Custom class for the inner button element
    children: React.ReactNode;
}

const MotionLink = motion.create(Link);

const NeoButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, NeoButtonProps>(({
    children,
    onClick,
    variant = "primary",
    className = "",
    size = "md",
    isThunder = false,
    layerColor,
    href,
    contentClassName,
    ...props
}, ref) => {
    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-xl",
    };

    const getBgColor = () => {
        if (variant === "primary") return "bg-primary";
        if (variant === "secondary") return "bg-accent";
        if (variant === "gold") return "bg-gold";
        if (variant === "green") return "bg-green";
        if (variant === "outline") return "bg-white";
        return "bg-white";
    };

    const isGhost = variant === "ghost";
    const bgColorClass = isGhost ? "bg-transparent" : getBgColor();
    const textColorClass = variant === "primary" ? "text-white" : "text-black";

    // Variants for the Thunder shake effect
    const thunderVariants = {
        rest: { x: 0, y: 0 },
        hover: {
            x: [0, -2, 2, -2, 2, 0],
            y: [0, 1, -1, 1, 0],
            transition: { duration: 0.2, repeat: Infinity },
        },
        press: { scale: 0.95 },
    };

    const content = (
        <>
            {/* Deepest Shadow Layer (Black) */}
            {!isGhost && layerColor && (
                <span className="absolute inset-0 bg-black rounded-xl translate-x-[8px] translate-y-[8px] transition-transform duration-200 ease-out group-hover:translate-x-[10px] group-hover:translate-y-[10px] group-active:translate-x-0 group-active:translate-y-0" />
            )}

            {/* Middle Layer (Color) or Standard Shadow */}
            {!isGhost && (
                <span
                    className={cn(
                        "absolute inset-0 rounded-xl border-2 border-black transition-transform duration-200 ease-out",
                        layerColor ? layerColor : "bg-black",
                        "translate-x-[4px] translate-y-[4px] group-hover:translate-x-[6px] group-hover:translate-y-[6px]",
                        "group-active:translate-x-0 group-active:translate-y-0"
                    )}
                />
            )}

            {/* Top Button Layer */}
            <span
                className={cn(
                    "relative block border-2 border-black rounded-xl font-bold transition-transform duration-200 ease-out group-active:translate-x-[4px] group-active:translate-y-[4px] flex items-center justify-center gap-2",
                    sizes[size],
                    textColorClass,
                    bgColorClass,
                    contentClassName
                )}
            >
                {children}
            </span>
        </>
    );

    const commonProps = {
        className: cn("relative group inline-block", className),
        initial: "rest",
        whileHover: "hover",
        whileTap: "press",
        variants: isThunder ? thunderVariants : undefined,
    };

    if (href) {
        return (
            <MotionLink
                href={href}
                {...(commonProps as any)}
                onClick={onClick as any}
                ref={ref as any}
            >
                {content}
            </MotionLink>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            {...commonProps}
            {...props}
            ref={ref as any}
        >
            {content}
        </motion.button>
    );
});

NeoButton.displayName = "NeoButton";

export default NeoButton;
