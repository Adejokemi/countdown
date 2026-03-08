import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Event Countdown Dashboard",
    template: "%s | Event Countdown",
  },
  description:
    "A modern, dark-themed dashboard to track upcoming deadlines, trips, and milestones with live countdown timers.",
  keywords: [
    "countdown",
    "event tracker",
    "dashboard",
    "time management",
    "deadline tracker",
  ],
  authors: [{ name: "Sherifat Omitogun" }],
  creator: "Sherifat Omitogun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com", 
    title: "Event Countdown Dashboard",
    description:
      "Track your most critical upcoming events and deadlines with real-time countdowns.",
    siteName: "Event Countdown",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Countdown Dashboard",
    description:
      "Track your most critical upcoming events and deadlines with real-time countdowns.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#0f172a] text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
