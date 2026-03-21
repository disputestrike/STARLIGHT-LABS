// components/layout/Layout.tsx
"use client";

import React, { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
  userRole?: string;
}

export default function Layout({ children, userRole }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation userRole={userRole} />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
