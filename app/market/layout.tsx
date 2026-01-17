import React from "react";
import MarketNavbar from "@/components/layout/market-navbar";

export default function MarketLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-surface">
            <MarketNavbar />
            <main className="max-w-[1920px] mx-auto">
                {children}
            </main>
        </div>
    );
}
