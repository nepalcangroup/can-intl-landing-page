"use client";

import React from "react";
import MissionSection from "./MissionSection";
import GlobalNetworkSection from "./GlobalNetworkSection";
import OverviewSection from "./OverViewSection";
import WhyChooseUs from "./WhyChooseUs";

export default function AboutUsSection() {
  return (
    <section id="about" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-4xl font-bold text-[var(--custom-red)] text-center">
          About Us
        </h1>
        <OverviewSection/>
        <MissionSection />
        <WhyChooseUs/>
        <GlobalNetworkSection />
      </div>
    </section>
  );
}