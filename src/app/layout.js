import "./globals.css";
import Providers from "./provider";
import { TopProgressBar } from "@/components/TopProgressBar";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://transport.thecanbrand.com'),
    title: "Can International",
    description:
      "Can International: Nepal's trusted logistics company specializing in fast, secure, and affordable international shipping.",
    icons: {
      icon: "/favicon.png",
    },

    openGraph: {
      title: "Can International",
      description:
        "Can International: Nepal's trusted logistics company specializing in fast, secure, and affordable international shipping.",
      images: ["/meta-image.jpg"],
    },
  };
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <TopProgressBar />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
