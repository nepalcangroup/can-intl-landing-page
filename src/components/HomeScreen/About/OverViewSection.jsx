"use client";

import Image from "next/image";

export default function OverviewSection() {
  return (
    <section className="py-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="order-1 lg:order-1 rounded-xl overflow-hidden shadow-lg max-w-[500px] mx-auto">
          <Image
            src="/aboutUs/warehouse.png"
            alt="Overview Image"
            width={500}
            height={333}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="order-2 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Company Overview
          </h2>

          <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-800">
            Can International is a global logistics and shipping company
            dedicated to making international trade seamless, secure, and
            accessible. We connect businesses and consumers with fast,
            transparent, and reliable cross-border shipping solutions.
          </p>

          <ul className="space-y-6">
            {[
              {
                title: "Global Presence",
                desc: "Serving clients across 150+ countries with extensive logistics capabilities.",
              },
              {
                title: "Reliable Operations",
                desc: "Built on transparency, technology, and trusted international partnerships.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-4 h-4 bg-[var(--custom-red)] rounded-full mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg sm:text-xl">
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-800">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
