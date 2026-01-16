"use client";

import React from "react";
import { Globe, TrendingUp, DollarSign } from "lucide-react";
import ScrollReveal from "@/components/shared/scroll-reveal";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-20 container mx-auto">
            <ScrollReveal variant="scaleUp">
                <div className="bg-white border-4 border-black rounded-3xl p-10 md:p-20 shadow-[12px_12px_0px_0px_#000]">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            How to Puff Up Your Portfolio
                        </h2>
                        <p className="text-xl">Start predicting in 3 simple steps.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                        {HOW_IT_WORKS_STEPS.map((step, index) => (
                            <div
                                key={step.step}
                                className="flex flex-col items-center text-center group"
                            >
                                <ScrollReveal
                                    variant={index === 0 ? "slideRight" : index === 2 ? "slideLeft" : "zoomIn"}
                                >
                                    <div className="relative inline-block mb-6">
                                        <div className="w-24 h-24 rounded-full bg-[#f0fdfa] border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-[4px_4px_0px_0px_#000]">
                                            {step.icon}
                                        </div>
                                        <div className="absolute -top-2 -right-2 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white z-10 shadow-sm">
                                            {step.step}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">{step.title}</h3>
                                    <p className="text-gray-600 font-medium">{step.desc}</p>
                                </ScrollReveal>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default HowItWorks;
