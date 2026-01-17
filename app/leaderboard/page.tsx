import React from "react";
import LeaderboardView from "@/features/leaderboard/components/leaderboard-view";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leaderboard | Fugu Protocol",
    description: "Top traders and prediction market winners.",
};

export default function LeaderboardPage() {
    return <LeaderboardView />;
}
