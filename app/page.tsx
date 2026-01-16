"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/features/landing/components/hero-section";
import HowItWorks from "@/features/landing/components/how-it-works";
import LeaderboardTeaser from "@/features/landing/components/leaderboard-teaser";
import FAQSection from "@/features/landing/components/faq-section";
import MarketCard from "@/features/markets/components/market-card";
import BentoItem from "@/features/stats/components/bento-item";
import ScrollReveal from "@/components/shared/scroll-reveal";
import ScrollProgress from "@/components/shared/scroll-progress";
import ScrollAnimation from "@/components/shared/scroll-animation";
import NeoButton from "@/components/ui/neo-button";
import ChatInterface from "@/components/ChatInterface";
import { MARKETS, CATEGORIES, BENTO_STATS } from "@/lib/constants";

// Mock Data
// Mock Data migrated to lib/constant
const categories = CATEGORIES;
const markets = MARKETS;



export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMarkets =
    activeCategory === "All"
      ? markets
      : markets.filter((m) => m.category === activeCategory);

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen relative overflow-hidden">
        <Navbar />

        <HeroSection />

        {/* Live Markets Section */}
        <section
          id="markets"
          className="py-20 bg-white border-y-2 border-black"
        >
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                <div>
                  <h2 className="text-5xl font-black mb-2 flex items-center gap-3">
                    Trending Markets <span className="text-green inline-block animate-pulse-live">●</span>
                  </h2>
                  <p className="text-xl font-medium text-gray-500">
                    Real-time odds on key assets.
                  </p>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-lg font-bold border-2 border-black whitespace-nowrap transition-all ${activeCategory === cat
                        ? "bg-primary text-white shadow-[4px_4px_0px_0px_#000]"
                        : "bg-white hover:bg-gray-100"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Market Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {filteredMarkets.map((market, index) => (
                <ScrollAnimation
                  key={market.id}
                  variant="zoomIn"
                  delay={index * 0.1}
                  duration={0.5}
                >
                  <MarketCard market={market} />
                </ScrollAnimation>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <div className="mt-12 text-center">
                <NeoButton variant="secondary" size="md">
                  View All Markets <ArrowRight size={20} />
                </NeoButton>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Bento Stats Grid */}
        <section id="stats" className="py-20 bg-[#a5f3fc]/30">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black">Platform Stats</h2>
                <p className="text-gray-600 font-bold">Trust in numbers.</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {BENTO_STATS.map((stat, index) => (
                <ScrollAnimation variant="slideUp" delay={0.1 * (index + 1)} key={stat.title}>
                  <BentoItem
                    title={stat.title}
                    value={stat.value}
                    sub={stat.sub}
                    icon={stat.icon}
                    color={stat.color}
                    size={stat.size}
                  />
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks />

        <LeaderboardTeaser />

        <FAQSection />

        <Footer />
        <ChatInterface />
      </div>
    </>
  );
}
