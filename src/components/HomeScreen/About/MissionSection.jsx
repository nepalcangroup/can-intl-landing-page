"use client";

import Image from "next/image";

export default function MissionSection() {
  return (
    <section className="py-4 md:py-20 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-lg ">
          <Image
            src="/aboutUs/cargo-container-harbor.jpg"
            alt="Mission Image"
            width={680}
            height={333}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Our Mission
          </h2>

          {/* Main paragraph */}
          <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-800">
            We revolutionize international logistics by combining cutting-edge
            technology with human expertise. Our mission is to make global
            shipping accessible, affordable, and reliable for businesses of all
            sizes.
          </p>

          {/* List items */}
          <ul className="space-y-5 sm:space-y-6">
            {[
              {
                title: "Real-time Tracking",
                desc: "Complete visibility into every shipment across 150+ countries.",
              },
              {
                title: "24/7 Support",
                desc: "Multilingual support team ready to assist anytime.",
              },
              {
                title: "Competitive Rates",
                desc: "Best rates negotiated directly with carriers worldwide.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="w-4 h-4 bg-[var(--custom-red)] rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg sm:text-xl">
                    {item.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-800 mt-1">
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
