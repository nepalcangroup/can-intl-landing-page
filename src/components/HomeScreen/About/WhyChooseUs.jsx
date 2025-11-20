"use client";

import React from "react";

const stats = [
  { label: "50k+", description: "Deliveries completed monthly" },
  { label: "24/7", description: "Customer support availability" },
  { label: "15 yrs", description: "Industry experience & expertise" },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-4 md:py-16 px-4 md:px-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4 text-[var(--custom-red)]">
          Why Choose Us
        </h2>
        <p className="text-gray-600">
          We're not just a logistics company—we're your trusted partner in
          keeping your business moving forward across the world.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[var(--custom-red)] text-white rounded-lg p-4 sm:p-6 
                 flex flex-col items-center text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
              {stat.label}
            </h3>
            <p className="text-xs sm:text-sm leading-snug">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
