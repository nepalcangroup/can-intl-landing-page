"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ReviewSection() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const cardWidth = container.firstChild?.offsetWidth || 0;

      container.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const reviews = [
    {
      name: "Ramesh Kumar",
      designation: "Exporter, Mumbai",
      flag: "/flags/in.png",
      review:
        "Best international logistics partner. Very fast customs clearance and excellent support.",
    },
    {
      name: "Sofia Mendes",
      designation: "Business Owner, Nepal",
      flag: "/flags/np.png",
      review:
        "The cargo arrived on time in perfect condition. Highly trusted service!",
    },
    {
      name: "Jonathan Lee",
      designation: "Logistics Head, Denmark",
      flag: "/flags/dk.png",
      review:
        "Professional team and smooth documentation process. Strongly recommend!",
    },
    {
      name: "Shreya Mehta",
      designation: "Importer, Delhi",
      flag: "/flags/in.png",
      review:
        "Best pricing and reliable tracking updates. Amazing support staff!",
    },
    {
      name: "Carlos Martinez",
      designation: "Retailer, Spain",
      flag: "/flags/spain.png",
      review:
        "Fast and transparent process. Packaging and handling quality is superb.",
    },
  ];

  return (
    <section className="w-full bg-white py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-red-600">
        What Our Clients Say
      </h2>

      {/* Auto-scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-hidden snap-x snap-mandatory px-6"
        style={{ scrollBehavior: "smooth" }}
      >
        {reviews.map((item, index) => (
          <div
            key={index}
            className="
              min-w-[80%] sm:min-w-[50%] md:min-w-[33%] 
              max-w-[80%] sm:max-w-[50%] md:max-w-[33%]
              snap-start rounded-2xl p-6 
              shadow-lg border border-red-400 
              bg-gradient-to-b from-red-100 to-white
            "
          >
            <p className="text-gray-700 mb-4 leading-relaxed text-base sm:text-lg">
              “{item.review}”
            </p>

            <h3 className="font-semibold text-lg sm:text-xl text-black">
              {item.name}
            </h3>

            {/* Flag + designation */}
            <div className="flex items-center gap-2 mt-1">
              <Image
                src={item.flag}
                alt={`${item.name} flag`}
                width={24}
                height={16}
                className="object-cover rounded-sm border"
              />
              <p className="text-gray-500 text-sm sm:text-base">
                {item.designation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
