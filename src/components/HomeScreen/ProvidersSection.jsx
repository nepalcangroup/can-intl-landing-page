"use client";

export default function ProvidersSection() {
  const providers = [
    "Blue Star Express",
    "Curvex",
    "DHL Express",
    "DTDC",
    "Nepal Express",
    "SF International",
    "DPNEX Logistic",
  ];

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
          Our Trusted Providers
        </h2>

        {/* Provider Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {providers.map((provider, index) => (
            <div
              key={index}
              className="bg-white border border-red-300 shadow-md rounded-xl 
              p-6 flex items-center justify-center text-center 
              text-gray-800 font-bold text-lg sm:text-xl
              hover:shadow-xl hover:-translate-y-1 hover:border-red-500
              transition-all duration-300"
            >
              {provider}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
