"use client";

import React, { useEffect, useState } from "react";
import { Search, Flame, MoveUpRight, ArrowRight } from "lucide-react";
import { MARKETS } from "@/lib/constants";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { DialogTitle } from "@radix-ui/react-dialog"; // Accessibility
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function MarketCommandMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Toggle logic
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
                // Prevent slash from triggering in inputs
                if (
                    document.activeElement instanceof HTMLInputElement ||
                    document.activeElement instanceof HTMLTextAreaElement
                ) {
                    return;
                }
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    // Navigation logic
    const handleSelect = (marketId: number) => {
        setOpen(false);
        // Navigate to specific market page (mock navigation for now)
        // In real app: router.push(`/market/${marketId}`);
        alert(`Navigating to Market #${marketId}`);
    };

    return (
        <>
            {/* TRIGGER BUTTON (Navbar Search) */}
            <button
                onClick={() => setOpen(true)}
                className="relative group w-full flex items-center"
            >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                <div className="w-full bg-gray-100 hover:bg-gray-200 group-hover:bg-gray-200 border border-transparent focus:border-gray-300 rounded-lg pl-10 pr-12 py-2 text-left text-sm text-gray-500 font-medium transition-all">
                    Search markets...
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:flex items-center gap-1">
                    <kbd className="hidden sm:inline-block border border-gray-300 rounded px-1.5 py-0.5 bg-white/50 text-[10px] font-sans text-gray-400">
                        ⌘K
                    </kbd>
                </div>
            </button>

            {/* COMMAND DIALOG */}
            {/* Glassmorphism style for premium look */}
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                className="bg-[#4d3a42]/85 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl text-zinc-100 max-w-2xl overflow-hidden [&_[cmdk-input-wrapper]]:border-b [&_[cmdk-input-wrapper]]:border-white/10 [&_[cmdk-input]]:text-zinc-100 [&_[cmdk-input]]:placeholder:text-zinc-400 [&_[cmdk-group-heading]]:text-zinc-400 [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-wider"
            >
                {/* Accessibility Title */}
                <DialogTitle className="sr-only">Search Markets</DialogTitle>

                <CommandInput
                    placeholder="Search markets..."
                    className="text-lg h-14"
                />

                <CommandList className="max-h-[60vh] overflow-y-auto scrollbar-hide py-2 bg-transparent">
                    <CommandEmpty className="py-12 text-center text-sm text-zinc-500">
                        No markets found.
                    </CommandEmpty>

                    <CommandGroup heading="Trending" className="px-2">
                        {MARKETS.map((item) => (
                            <CommandItem
                                key={item.id}
                                value={`${item.question} ${item.category}`}
                                onSelect={() => handleSelect(item.id)}
                                className="
                                    data-[selected=true]:bg-zinc-900 data-[selected=true]:text-white 
                                    text-zinc-200 aria-selected:bg-zinc-900 aria-selected:text-white
                                    mx-1 px-3 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-all duration-75 group
                                    mb-1
                                "
                            >
                                {/* Main Icon */}
                                <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 text-xl shadow-inner bg-zinc-900 border border-zinc-800">
                                    {item.mainIcon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                                    <span className="text-sm font-medium truncate group-data-[selected=true]:text-white transition-colors">
                                        {item.question}
                                    </span>

                                    <div className="flex items-center gap-2 text-xs">
                                        {/* Category Badge */}
                                        <div className="flex items-center gap-1.5 text-zinc-400">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span>{item.category}</span>
                                        </div>

                                        <span className="text-zinc-600">•</span>

                                        {/* Volume */}
                                        <span className="text-zinc-500">
                                            Vol. {item.volume}
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side: Visuals */}
                                <div className="flex items-center gap-4 pl-2 ml-auto">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-medium text-emerald-400">
                                            {item.yes}% Yes
                                        </span>
                                        {item.isHot && (
                                            <span className="text-[10px] text-orange-400/80 flex items-center gap-0.5">
                                                <Flame className="w-3 h-3" /> Hot
                                            </span>
                                        )}
                                    </div>

                                    {/* Enter Arrow Hint (Only shows when selected via CSS group-data) */}
                                    <MoveUpRight className="w-4 h-4 text-zinc-500 opacity-0 group-data-[selected=true]:opacity-100 transition-opacity" />
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>

                {/* Footer */}
                <div className="bg-zinc-950 border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between text-[10px] text-zinc-500">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5">
                            <ArrowRight className="w-3 h-3" />
                            <span>select</span>
                        </span>
                        <span className="w-px h-3 bg-zinc-800"></span>
                        <span className="flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                                <kbd className="min-w-[16px] h-4 border border-zinc-800 rounded flex items-center justify-center bg-zinc-900 font-sans">↑</kbd>
                                <kbd className="min-w-[16px] h-4 border border-zinc-800 rounded flex items-center justify-center bg-zinc-900 font-sans">↓</kbd>
                            </div>
                            <span>navigate</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-zinc-600">Pro Tip: </span>
                        <span>Search by category (e.g. "Crypto")</span>
                    </div>
                </div>
            </CommandDialog>
        </>
    );
}
