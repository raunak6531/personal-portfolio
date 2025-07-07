import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PerformanceMonitor } from "@/components/ui/PerformanceMonitor";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ClientThemeToggle } from "@/components/ui/ClientThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Professional Portfolio | Your Name",
  description: "Full Stack Developer specializing in modern web applications. View my projects, skills, and experience.",
  keywords: ["portfolio", "web developer", "full stack", "react", "next.js", "typescript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Professional Portfolio | Your Name",
    description: "Full Stack Developer specializing in modern web applications.",
    siteName: "Your Name Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Portfolio | Your Name",
    description: "Full Stack Developer specializing in modern web applications.",
    creator: "@yourusername",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider defaultTheme="dark">
          <PerformanceMonitor />
          <CustomCursor />
          <ScrollProgress />
          <main className="min-h-screen">
            {children}
          </main>
          <BackToTop />
          <ClientThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
