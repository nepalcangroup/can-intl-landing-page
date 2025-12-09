// "use client";

// import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { Button } from "@mui/material";
// import Image from "next/image";

// export default function HeroSection() {
//   const images = ["/heroSection/shipment.jpg", "/heroSection/aeroplane.jpg"];
//   const responsive = {
//     desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
//     tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
//     mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
//   };
//   return (
//     <section className="relative h-screen w-full" id="discover">
//       <Carousel
//         responsive={responsive}
//         infinite
//         autoPlay
//         autoPlaySpeed={5000}
//         arrows={true}
//         showDots={false}
//         containerClass="h-full"
//         itemClass="h-full"
//       >
//         {images.map((img, index) => (
//           <div key={index} className="relative w-full h-screen">
//             <Image
//               src={img}
//               alt={`Slide ${index + 1}`}
//               fill
//               className="object-cover"
//               priority
//             />
//             <div className="absolute inset-0 bg-black/40"></div>
//           </div>
//         ))}
//       </Carousel>
//       {/* CENTER CONTENT */}
//       <div className="absolute top-[38%] left-1/2 -translate-x-1/2 z-10 w-full md:w-auto px-6 md:px-0 text-center">
//         {/* MAIN TITLE */}
//         <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl leading-tight">
//           Track Your Shipment
//         </h1>

//         {/* TRACKING INPUT BAR */}
//         <div className="mt-6 bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-2xl w-full md:w-[600px] mx-auto flex items-center gap-3">
//           <input
//             type="text"
//             placeholder="Enter your tracking number(s)"
//             className="flex-grow px-4 py-3 text-gray-700 bg-white rounded-lg outline-none text-sm md:text-base shadow-sm"
//           />

//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: "var(--custom-red)",
//               px: 4,
//               py: 1.7,
//               fontSize: "1rem",
//               fontWeight: "bold",
//               textTransform: "none",
//               borderRadius: "10px",
//               "&:hover": { bgcolor: "#c60000" },
//             }}
//           >
//             Track
//           </Button>
//         </div>

//         {/* 3 CARDS EXACT LIKE DHL */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-[950px] mx-auto">
//           {/* CARD 1 */}
//           <div className="bg-white/95 backdrop-blur-md p-7 rounded-xl shadow-2xl text-center hover:scale-105 transition-transform">
//             <div className="text-red-600 text-5xl mb-4">📦</div>
//             <h3 className="text-xl font-bold text-gray-900">Ship Now</h3>
//             <p className="text-gray-600 text-sm mt-2">Find the right service</p>
//           </div>

//           {/* CARD 2 */}
//           <div className="bg-white/95 backdrop-blur-md p-7 rounded-xl shadow-2xl text-center hover:scale-105 transition-transform">
//             <div className="text-red-600 text-5xl mb-4">📝</div>
//             <h3 className="text-xl font-bold text-gray-900">Get a Quote</h3>
//             <p className="text-gray-600 text-sm mt-2">
//               Estimate cost to share and compare
//             </p>
//           </div>

//           {/* CARD 3 */}
//           <div className="bg-white/95 backdrop-blur-md p-7 rounded-xl shadow-2xl text-center hover:scale-105 transition-transform">
//             <div className="text-red-600 text-5xl mb-4">🤝</div>
//             <h3 className="text-xl font-bold text-gray-900">
//               Request a Business Account
//             </h3>
//             <p className="text-gray-600 text-sm mt-2">
//               Learn about shipping discounts
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* <div className="absolute top-1/4 left-0 md:left-12 lg:left-24 z-10 max-w-2xl px-16 md:px-12">
//         <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
//           Welcome to{" "}
//           <span className="text-[var(--custom-red)] font-extrabold drop-shadow-lg">
//             Can International
//           </span>
//         </h1>
//         <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-200 drop-shadow-md max-w-lg">
//           We make international shipping easier with a smart management system
//           that streamlines the movement of goods worldwide.
//         </p>
//         <p className="mt-2 text-base md:text-lg lg:text-xl text-gray-200 drop-shadow-md max-w-lg">
//           One solution to simplify all your global logistics.
//         </p>
//         <a href="#contact">
//           <Button
//             variant="contained"
//             sx={{
//               bgcolor: "var(--custom-red)",
//               mt: 4,
//               px: 3,
//               py: 1,
//               fontSize: "0.9rem",
//               fontWeight: "bold",
//               textTransform: "none",
//               borderRadius: "8px",
//               "&:hover": { bgcolor: "#c60000" },
//             }}
//             className="shadow-lg"
//           >
//             Get Started
//           </Button>
//         </a>
//       </div> */}
//     </section>
//   );
// }
"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "@mui/material";
import Image from "next/image";

export default function HeroSection() {
  const images = ["/heroSection/shipment.jpg", "/heroSection/aeroplane.jpg"];

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <section
      className="relative h-[115vh] w-full overflow-hidden"
      id="discover"
    >
      {/* BACKGROUND CAROUSEL */}
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        arrows={false}
        showDots={false}
        containerClass="h-full"
        itemClass="h-full"
      >
        {images.map((img, index) => (
          <div key={index} className="relative w-full h-[115vh]">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </Carousel>

      {/* CENTER CONTENT - FIXED HEIGHT & PERFECTLY CENTERED */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-full px-6 md:px-0 text-center z-20">
        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-2xl leading-tight">
          Track Your Shipment
        </h1>

        {/* TRACKING BAR */}
        <div
          className="mt-6 bg-white/95 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-2xl 
                        w-full md:w-[650px] mx-auto flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Enter your tracking number(s)"
            className="flex-grow px-4 py-3 text-gray-700 bg-white rounded-xl outline-none 
                       text-sm md:text-base shadow-md"
          />

          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--custom-red)",
              px: 4,
              py: 1.8,
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "12px",
              "&:hover": { bgcolor: "#c60000" },
            }}
          >
            Track
          </Button>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-[1000px] mx-auto">
          {/* Card Component */}
          {[
            {
              icon: "📦",
              title: "Ship Now",
              desc: "Find the right courier service instantly.",
            },
            {
              icon: "🧾",
              title: "Get a Quote",
              desc: "Get competitive rates for your shipment.",
            },
            {
              icon: "🤝",
              title: "Business Account",
              desc: "Unlock wholesale pricing & benefits.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl 
                         text-center hover:scale-105 hover:shadow-3xl 
                         transition-all duration-300 border border-white/40"
            >
              <div className="text-red-600 text-6xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
