"use client";

import React from "react";
import Image from "next/image";

export default function GlobalNetworkSection() {
  const points = [
    {
      title: "Strategic Partnerships",
      desc: "Collaborating with 500+ trusted logistics partners worldwide",
    },
    {
      title: "Local Expertise",
      desc: "Local teams understanding regional regulations and customs",
    },
    {
      title: "Technology-Driven",
      desc: "AI-powered optimization for faster and cheaper shipments",
    },
  ];

  return (
    <section className="py-12 md:py-4 bg-white">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-stretch">
        <div className="flex items-stretch">
          <div className="bg-[#dee9f0] rounded-2xl p-8 shadow-lg w-full flex items-center justify-center">
            <div className="rounded-xl overflow-hidden w-full h-full max-h-[480px]">
              <Image
                src="/aboutUs/network.jpg"
                alt="Network Image"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Connected Globally,
            <br className="hidden sm:block" />{" "}
            <span className="block sm:inline"> Responsive Locally</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl">
            With distribution centers across six continents and partnerships
            with leading carriers, we provide seamless logistics solutions
            wherever your business takes you.
          </p>

          <div className="space-y-5 sm:space-y-6">
            {points.map((p, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 h-12 sm:h-14 bg-[var(--custom-red)] rounded-full flex-shrink-0 mt-1" />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
