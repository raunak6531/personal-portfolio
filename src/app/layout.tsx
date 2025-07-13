import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

import { BackToTop } from "@/components/ui/BackToTop";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PerformanceMonitor } from "@/components/ui/PerformanceMonitor";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Professional Portfolio | Raunak Sadana",
  description: "Full Stack Developer specializing in modern web applications. View my projects, skills, and experience.",
  keywords: ["portfolio", "web developer", "full stack", "react", "next.js", "typescript"],
  authors: [{ name: "Raunak Sadana" }],
  creator: "Raunak Sadana",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Professional Portfolio | Raunak Sadana",
    description: "Full Stack Developer specializing in modern web applications.",
    siteName: "Raunak Sadana Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Portfolio | Raunak Sadana",
    description: "Full Stack Developer specializing in modern web applications.",
    creator: "@raunak6531",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider>
          <PerformanceMonitor />
          <CustomCursor />
          <main className="min-h-screen">
            {children}
          </main>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
