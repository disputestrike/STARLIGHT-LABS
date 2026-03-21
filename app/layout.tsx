// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starlight Labs - AI-Native Talent & Delivery Platform",
  description:
    "Global AI-powered engineering delivery and talent pipeline platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
