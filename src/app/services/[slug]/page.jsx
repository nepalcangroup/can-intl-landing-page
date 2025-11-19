

import { notFound } from "next/navigation";
import Image from "next/image";
import { services } from "@/data/services";
import { Layout } from "@/components/Layout";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
 const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <Layout>
      <section className="pt-28 md:pt-32 py-12 md:py-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          {/* HERO IMAGE */}
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold">
                {service.title}
              </h1>
              <p className="text-base md:text-xl mt-2 opacity-90">
                {service.description}
              </p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
              Service Overview
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              {service.longDescription}
            </p>
          </div>

          {/* KEY FEATURES */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-[var(--custom-red)]">
              Key Features
            </h3>

            <ul className="space-y-4">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--custom-red)] text-xl md:text-2xl mt-1">
                    ✔
                  </span>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {feat}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
