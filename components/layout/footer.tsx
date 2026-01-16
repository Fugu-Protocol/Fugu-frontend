"use client";

import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer
            className="pt-16 pb-8 border-t-2 border-black bg-midnight text-white"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
                    <div className="md:w-1/3">
                        <div className="flex items-center gap-2 mb-4 text-gold">
                            <Image
                                src="/Fugu.png"
                                alt="Fugu Logo"
                                width={36}
                                height={34}
                                className="object-contain"
                            />
                            <span className="text-2xl font-black">FUGU</span>
                        </div>
                        <p className="text-gray-400">
                            The decentralized prediction market for the next generation. Built
                            with ❤️ on Sui.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                        <div>
                            <h4 className="font-bold mb-4 text-primary">Platform</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="hover:text-white cursor-pointer">Markets</li>
                                <li className="hover:text-white cursor-pointer">Portfolio</li>
                                <li className="hover:text-white cursor-pointer">Leaderboard</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-primary">Resources</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="hover:text-white cursor-pointer">Docs</li>
                                <li className="hover:text-white cursor-pointer">Whitepaper</li>
                                <li className="hover:text-white cursor-pointer">GitHub</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-primary">Community</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li className="hover:text-white cursor-pointer">Twitter / X</li>
                                <li className="hover:text-white cursor-pointer">Discord</li>
                                <li className="hover:text-white cursor-pointer">Blog</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>© 2026 FUGU Markets. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">
                        Disclaimer: FUGU is in Beta. This is not financial advice.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
