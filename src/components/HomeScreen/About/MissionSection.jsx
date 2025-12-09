// "use client";

// import Image from "next/image";

// export default function MissionSection() {
//   return (
//     <section className="w-full py-4 md:py-20 bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.15),white)]">
//       {/* FULL WIDTH GRID → max-w removed */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
//         {/* RIGHT SIDE IMAGE */}
//         <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-lg h-full">
//           <Image
//             src="/aboutUs/cargo-container-harbor.jpg"
//             alt="Mission Image"
//             width={680}
//             height={333}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* LEFT SIDE TEXT */}
//         <div className="order-2 lg:order-1 px-6">
//           {/* I added px-6 here so text stays aligned */}
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
//             Our Mission
//           </h2>

//           <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-800">
//             We revolutionize international logistics by combining cutting-edge
//             technology with human expertise. Our mission is to make global
//             shipping accessible, affordable, and reliable for businesses of all
//             sizes.
//           </p>

//           <ul className="space-y-5 sm:space-y-6">
//             {[
//               {
//                 title: "Real-time Tracking",
//                 desc: "Complete visibility into every shipment across 150+ countries.",
//               },
//               {
//                 title: "24/7 Support",
//                 desc: "Multilingual support team ready to assist anytime.",
//               },
//               {
//                 title: "Competitive Rates",
//                 desc: "Best rates negotiated directly with carriers worldwide.",
//               },
//             ].map((item, i) => (
//               <li key={i} className="flex items-start gap-4">
//                 <span className="w-4 h-4 bg-[var(--custom-red)] rounded-full mt-1.5 flex-shrink-0" />
//                 <div>
//                   <h4 className="font-semibold text-lg sm:text-xl">
//                     {item.title}
//                   </h4>
//                   <p className="text-sm sm:text-base text-gray-800 mt-1">
//                     {item.desc}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";

export default function MissionSection() {
  return (
    // FULL WIDTH BACKGROUND
    <section className="w-screen ml-[calc(50%-50vw)] bg-[radial-gradient(circle_at_top_left,rgba(255,0,0,0.15),white)] py-4 md:py-20">
      {/* CENTERED CONTENT */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* RIGHT SIDE IMAGE */}
          <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-lg h-full">
            <Image
              src="/aboutUs/cargo-container-harbor.jpg"
              alt="Mission Image"
              width={680}
              height={333}
              className="w-full h-full object-cover"
            />
          </div>

          {/* LEFT SIDE TEXT */}
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-base sm:text-lg mb-6 leading-relaxed text-gray-800">
              We revolutionize international logistics by combining cutting-edge
              technology with human expertise. Our mission is to make global
              shipping accessible, affordable, and reliable for businesses of
              all sizes.
            </p>

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
      </div>
    </section>
  );
}
