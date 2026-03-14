import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundCanvas } from "@/components/BackgroundCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreenProof | The Institutional Grade ESG Oracle",
  description: "The world's first biocybernetic consensus engine. GreenProof synchronizes physical, legal, and ethical reality using Chainlink CRE and ZK-SNARKs. RWA Infrastructure for the Future.",
  // ... rest of metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <BackgroundCanvas />
        <main className="relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}
