import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreenProof | The Institutional Grade ESG Oracle",
  description: "The world's first biocybernetic consensus engine. GreenProof synchronizes physical, legal, and ethical reality using Chainlink CRE and ZK-SNARKs. RWA Infrastructure for the Future.",
  keywords: ["ZK-SNARK", "RWA", "ESG", "Chainlink", "CCIP", "Green Bonds", "Institutional DeFi", "Sovereign Compliance"],
  openGraph: {
    title: "GreenProof | Sovereign Compliance",
    description: "Prove ESG ≥ 80% without revealing private data. Bridge it to any chain in 1 click.",
    url: "https://greenproof.vercel.app",
    siteName: "GreenProof Protocol",
    images: [
      {
        url: "/assets/branding/og-banner.png",
        width: 1200,
        height: 630,
        alt: "GreenProof Protocol Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenProof | The Institutional Grade ESG Oracle",
    description: "Zero-Knowledge ESG Compliance for the RWA Era.",
    images: ["/assets/branding/og-banner.png"],
  },
  icons: {
    icon: "/assets/branding/institutional_seal.png",
    apple: "/assets/branding/institutional_seal.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
