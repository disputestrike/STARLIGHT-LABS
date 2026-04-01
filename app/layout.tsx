// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Starlight Labs",
    template: "%s · Starlight Labs",
  },
  description:
    "Global engineering delivery and talent—training, HR, and client outcomes on one operating platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
