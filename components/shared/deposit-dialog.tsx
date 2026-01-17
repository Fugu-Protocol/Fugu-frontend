"use client";

import React from "react";
import { X, Wallet, Zap, CreditCard, ChevronRight } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

interface DepositOption {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    rightContent?: React.ReactNode;
}

interface DepositDialogProps {
    children: React.ReactNode;
    balance?: number;
}

const DepositDialog = ({ children, balance = 4.53 }: DepositDialogProps) => {
    const depositOptions: DepositOption[] = [
        {
            id: "wallet",
            icon: (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-white" />
                </div>
            ),
            title: "Wallet (...b7d6)",
            subtitle: "$38.32 • Instant",
        },
        {
            id: "crypto",
            icon: (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                </div>
            ),
            title: "Transfer Crypto",
            subtitle: "No limit • Instant",
            rightContent: (
                <div className="flex items-center gap-0.5">
                    {/* Crypto icons */}
                    <div className="w-5 h-5 rounded-full bg-orange-500 border-2 border-[#1e2836] flex items-center justify-center text-[8px] font-bold text-white">₿</div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-[#1e2836] -ml-1.5 flex items-center justify-center text-[8px] font-bold text-white">Ξ</div>
                    <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-[#1e2836] -ml-1.5 flex items-center justify-center text-[8px] font-bold text-white">$</div>
                    <div className="w-5 h-5 rounded-full bg-purple-500 border-2 border-[#1e2836] -ml-1.5 flex items-center justify-center text-[8px] font-bold text-white">◎</div>
                    <div className="w-5 h-5 rounded-full bg-gray-600 border-2 border-[#1e2836] -ml-1.5 flex items-center justify-center text-[8px] font-bold text-white">+</div>
                </div>
            ),
        },
        {
            id: "card",
            icon: (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                </div>
            ),
            title: "Deposit with Card",
            subtitle: "$50,000 • 5 min",
            rightContent: (
                <div className="flex items-center gap-1">
                    <div className="w-8 h-5 rounded bg-red-500 flex items-center justify-center text-[6px] font-bold text-white">VISA</div>
                </div>
            ),
        },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                className="bg-[#1a2332] border border-[#2a3a4a] rounded-2xl p-0 max-w-md shadow-2xl"
                showCloseButton={false}
            >
                {/* Header */}
                <div className="relative px-6 pt-5 pb-4 text-center border-b border-[#2a3a4a]">
                    <DialogTitle className="text-white text-lg font-semibold">
                        Deposit
                    </DialogTitle>
                    <p className="text-gray-400 text-sm mt-1">
                        Fugu Balance: <span className="text-white font-medium">${balance.toFixed(2)}</span>
                    </p>
                    <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-[#2a3a4a] rounded-lg">
                        <X className="w-5 h-5" />
                    </DialogClose>
                </div>

                {/* Deposit Options */}
                <div className="p-4">
                    {/* Primary Wallet Option */}
                    <button className="w-full flex items-center gap-3 p-3 bg-[#243347] hover:bg-[#2d3f54] border border-[#3a4a5a] rounded-xl transition-all duration-200 group">
                        {depositOptions[0].icon}
                        <div className="flex-1 text-left">
                            <p className="text-white font-medium text-sm">{depositOptions[0].title}</p>
                            <p className="text-gray-400 text-xs">{depositOptions[0].subtitle}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-4">
                        <div className="flex-1 h-px bg-[#2a3a4a]"></div>
                        <span className="text-gray-500 text-xs font-medium">more</span>
                        <div className="flex-1 h-px bg-[#2a3a4a]"></div>
                    </div>

                    {/* Other Options */}
                    <div className="space-y-2">
                        {depositOptions.slice(1).map((option) => (
                            <button
                                key={option.id}
                                className="w-full flex items-center gap-3 p-3 bg-[#1e2836] hover:bg-[#243347] border border-transparent hover:border-[#3a4a5a] rounded-xl transition-all duration-200 group"
                            >
                                {option.icon}
                                <div className="flex-1 text-left">
                                    <p className="text-white font-medium text-sm">{option.title}</p>
                                    <p className="text-gray-400 text-xs">{option.subtitle}</p>
                                </div>
                                {option.rightContent && (
                                    <div className="mr-2">
                                        {option.rightContent}
                                    </div>
                                )}
                                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors" />
                            </button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DepositDialog;
