"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type NavDropdownItem = { href: string; label: string; description?: string };

export function NavDropdown({ label, items }: { label: string; items: NavDropdownItem[] }) {
  const [open, setOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const clearLeave = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearLeave();
    setOpen(true);
  }, [clearLeave]);

  const scheduleClose = useCallback(() => {
    clearLeave();
    leaveTimer.current = setTimeout(() => setOpen(false), 200);
  }, [clearLeave]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className="flex items-center gap-0.5 rounded-md border border-transparent px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <svg className="h-4 w-4 opacity-60" aria-hidden viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.22 8.29a.75.75 0 01.01-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* Invisible hover bridge so pointer can reach the panel without closing */}
      <div
        className={`absolute left-0 top-full z-[200] w-full min-w-[12rem] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden
      >
        <div className="h-2 w-full" />
        <div
          className={`rounded-lg border border-slate-200 bg-white py-2 shadow-xl ring-1 ring-slate-900/5 transition duration-150 ${
            open ? "visible opacity-100" : "invisible opacity-0"
          }`}
          role="menu"
          aria-label={label}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              <span className="font-medium text-slate-900">{item.label}</span>
              {item.description ? (
                <span className="mt-0.5 block text-xs leading-snug text-slate-500">{item.description}</span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
