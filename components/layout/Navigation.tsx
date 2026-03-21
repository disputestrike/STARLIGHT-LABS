// components/layout/Navigation.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavigationProps {
  userRole?: string;
}

export default function Navigation({ userRole }: NavigationProps) {
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", roles: ["ADMIN", "FOUNDER", "DELIVERY_LEAD"] },
    { label: "Projects", href: "/projects", roles: ["ADMIN", "FOUNDER", "DELIVERY_LEAD", "PROJECT_MANAGER"] },
    { label: "Talent", href: "/talent", roles: ["ADMIN", "FOUNDER", "TALENT_MANAGER"] },
    { label: "Sales", href: "/sales", roles: ["ADMIN", "FOUNDER", "SDR", "ACCOUNT_EXECUTIVE"] },
    { label: "Financial", href: "/financial", roles: ["ADMIN", "FOUNDER", "FINANCE"] },
    { label: "Team", href: "/team", roles: ["ADMIN", "FOUNDER"] },
  ];

  const visibleItems = navItems.filter((item) =>
    userRole ? item.roles.includes(userRole) : true
  );

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">
                S
              </div>
              <span className="font-bold text-lg">Starlight Labs</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {visibleItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-blue-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/profile")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
