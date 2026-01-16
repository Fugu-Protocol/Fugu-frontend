
"use client";

import React from "react";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import ScrollReveal from "@/components/shared/scroll-reveal";
import ScrollAnimation from "@/components/shared/scroll-animation";

const FAQSection = () => {
    return (
        <section className="py-20 container mx-auto px-6 md:px-8 max-w-3xl">
            <ScrollReveal variant="fadeIn">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black">Got Questions?</h2>
                </div>

                <div className="space-y-4">
                    {FAQ_ITEMS.map((faq, index) => (
                        <ScrollAnimation
                            key={index}
                            variant="zoomIn"
                            delay={index * 0.1}
                            duration={0.5}
                        >
                            <details className="group bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_#000] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]">
                                <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-lg list-none select-none group-hover:text-primary transition-colors">
                                    {faq.q}
                                    <Plus className="transition-transform duration-300 group-open:rotate-45 group-hover:scale-110" />
                                </summary>
                                <div className="p-6 pt-0 text-gray-600 border-t-2 border-transparent group-open:border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    {faq.a}
                                </div>
                            </details>
                        </ScrollAnimation>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default FAQSection;
