"use client";

import React from "react";
import HeroSection from "@/components/HomeScreen/Herosection";
import Faq from "@/components/HomeScreen/Faq"
import Contact from "@/components/HomeScreen/Contact";
import AboutUsSection from "@/components/HomeScreen/About/AboutUsSection";

export const HomeScreen = () => {
  return (
    <main>
      <HeroSection />
      <AboutUsSection/>
      <Faq />
      <Contact/>
    </main>
  );
};
