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
      <div className="bg-gray-200 pt-[100px] pb-[15px]">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg px-8 pb-12 pt-[100px] text-gray-800 leading-relaxed">

          {/* HERO IMAGE */}
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-md mb-10">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
              <p className="text-sm md:text-lg opacity-90 mt-1">{service.description}</p>
            </div>
          </div>

          {/* SERVICE OVERVIEW */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Service Overview</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {service.longDescription}
            </p>
          </div>

          {/* KEY FEATURES */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
            <h3 className="text-xl font-bold mb-4 text-[var(--custom-red)]">
              Key Features
            </h3>

            <ul className="space-y-4">
              {service.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--custom-red)] text-xl mt-1">✔</span>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {feat}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </Layout>
  );
}
