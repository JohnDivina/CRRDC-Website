import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://crrdc.clsu.edu.ph"),
  title: "Crops and Resources Research and Development Center | Central Luzon State University",
  description:
    "Official institutional portal of the Crops and Resources Research and Development Center (CRRDC) at Central Luzon State University (CLSU), Science City of Muñoz, Nueva Ecija. Leading research in crop genetics, certified seed production, postharvest technology, and agricultural sustainability.",
  keywords: [
    "CRRDC",
    "CLSU",
    "Central Luzon State University",
    "Crops Research",
    "Agricultural Research Philippines",
    "Plant Doctor",
    "Certified Seed",
    "Tissue Culture",
    "Muñoz Nueva Ecija",
  ],
  authors: [{ name: "Central Luzon State University" }],
  icons: {
    icon: "/logos/clsu-logo.png",
    apple: "/logos/clsu-logo.png",
  },
  openGraph: {
    title: "Crops and Resources Research and Development Center | CLSU",
    description:
      "Advancing science-driven agriculture, genetic improvement, and resource sustainability in Central Luzon and the Philippines.",
    url: "https://crrdc.clsu.edu.ph",
    siteName: "CRRDC CLSU",
    images: [
      {
        url: "/images/clsu-campus-banner.jpg",
        width: 1200,
        height: 630,
        alt: "CLSU CRRDC Campus Banner",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#fbfcf9] text-[#18231c] font-sans antialiased selection:bg-[#008736]/20 selection:text-[#124d26]">
        {children}
      </body>
    </html>
  );
}
