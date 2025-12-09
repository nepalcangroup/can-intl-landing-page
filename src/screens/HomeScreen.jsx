"use client";

import React from "react";
import HeroSection from "@/components/HomeScreen/Herosection";
import Faq from "@/components/HomeScreen/Faq";
import Contact from "@/components/HomeScreen/Contact";
import AboutUsSection from "@/components/HomeScreen/About/AboutUsSection";
import ReviewsPage from "@/components/HomeScreen/Review";
import ProvidersSection from "@/components/HomeScreen/ProvidersSection";

export const HomeScreen = () => {
  return (
    <main>
      <HeroSection />

      <AboutUsSection />
      <ReviewsPage />
      <ProvidersSection />
      <Faq />
      <Contact />
    </main>
  );
};
