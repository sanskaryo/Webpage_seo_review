import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEO Tag Analyzer | Check Your Website's SEO Health",
  description: "Analyze your website's SEO tags, meta descriptions, Open Graph and Twitter Card implementation. Get visual feedback and recommendations to improve your search engine rankings.",
  keywords: "SEO analyzer, meta tags, SEO checker, website analysis, SEO tools, Open Graph, Twitter Cards, SEO audit, search engine optimization",
  authors: [{ name: "Vibe Coding by Replit and DeepLearning.AI" }],
  creator: "Vibe Coding Course",
  publisher: "Replit and DeepLearning.AI",
  metadataBase: new URL("https://seo-tag-analyzer.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seo-tag-analyzer.vercel.app",
    title: "SEO Tag Analyzer | Check Your Website's SEO Health",
    description: "Analyze your website's SEO tags, meta descriptions, Open Graph and Twitter Card implementation. Get visual feedback and recommendations to improve your search engine rankings.",
    siteName: "SEO Tag Analyzer",
    images: [
      {
        url: "https://seo-tag-analyzer.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SEO Tag Analyzer - Visual SEO Analysis Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Tag Analyzer | Check Your Website's SEO Health",
    description: "Analyze your website's SEO tags, meta descriptions, Open Graph and Twitter Card implementation. Get visual feedback and recommendations.",
    images: ["https://seo-tag-analyzer.vercel.app/og-image.png"],
    creator: "@replit",
    site: "@deeplearningai",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  category: "Technology",
  verification: {
    google: "google-site-verification-code",
  },
  other: {
    "theme-color": "#0F172A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
