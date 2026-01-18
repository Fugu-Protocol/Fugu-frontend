"use client";

import { createNetworkConfig, SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mysten/dapp-kit/dist/index.css";
import { ReactNode } from "react";

const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl("localnet") },
    testnet: { url: "https://fullnode.testnet.sui.io:443" },
    mainnet: { url: getFullnodeUrl("mainnet") },
});

const queryClient = new QueryClient();

export function SuiProvider({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
                <WalletProvider autoConnect>
                    {children}
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}
