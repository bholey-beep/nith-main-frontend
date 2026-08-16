'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

export interface DepartmentMeta {
  code: string;
  name: string;
  nameHindi: string;
  established?: string;
  stats?: {
    facultyCount?: string | number;
    labsCount?: string | number;
    programmesCount?: string | number;
    publicationsCount?: string | number;
  };
}

export interface DepartmentLayoutProps {
  dept: DepartmentMeta;
  deptSlug: string;
  children: React.ReactNode;
}

export default function DepartmentLayout({
  dept,
  deptSlug,
  children,
}: DepartmentLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'About Us / Overview',
      href: `/faculty-section/department/${deptSlug}`,
      exact: true,
    },
    {
      label: 'Vision & Mission',
      href: `/faculty-section/department/${deptSlug}/vision-mission`,
      altHref: `/faculty-section/department/${deptSlug}/vision-and-mission`,
    },
    {
      label: 'Faculty Directory',
      href: `/faculty-section/department/${deptSlug}/faculty`,
    },
    {
      label: 'Technical & Support Staff',
      href: `/faculty-section/department/${deptSlug}/staff`,
    },
    {
      label: 'Academic Programmes',
      href: `/faculty-section/department/${deptSlug}/programme-offered`,
      altHref: `/faculty-section/department/${deptSlug}/programmes-offered`,
    },
    {
      label: 'Laboratories & Facilities',
      href: `/faculty-section/department/${deptSlug}/labs`,
    },
    {
      label: 'Research & Publications',
      href: `/faculty-section/department/${deptSlug}/research-publications`,
    },
    {
      label: 'Contact Information',
      href: `/faculty-section/department/${deptSlug}/contact`,
    },
  ];

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.exact) {
      return pathname === item.href || pathname === `${item.href}/`;
    }
    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`) ||
      (Boolean(item.altHref) &&
        (pathname === item.altHref || pathname.startsWith(`${item.altHref}/`)))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 flex flex-col font-sans">
      {/* Department Institutional Header matched with navbar (#500c0e / #631012) */}
      <header className="bg-[#500c0e] text-white border-b-4 border-[#631012] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono tracking-widest uppercase text-amber-200 font-bold">
                DEPARTMENT OF {dept.code}
              </span>
              {dept.established && (
                <span className="text-xs text-gray-300 font-mono">
                  | Established {dept.established}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
              {dept.name}
            </h1>
            {dept.nameHindi && (
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                {dept.nameHindi}
              </p>
            )}
          </div>

          {/* Mobile navigation toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-[#3b080a] hover:bg-[#2e0608] text-white text-xs font-semibold uppercase tracking-wider border border-white/20 w-fit"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Menu</span>
          </button>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Formal Left Sidebar */}
          <aside
            className={`w-full lg:w-64 xl:w-72 shrink-0 bg-white border border-gray-300 shadow-sm ${
              mobileMenuOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-[#f0f2f5] px-4 py-3 border-b border-gray-300">
              <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-gray-700">
                Navigation Menu
              </h2>
            </div>

            <nav className="divide-y divide-gray-200">
              {navItems.map((item) => {
                const active = isItemActive(item);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-xs sm:text-sm transition-colors ${
                      active
                        ? 'bg-[#631012] text-white font-bold border-l-4 border-[#3b080a]'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-[#631012] font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 ${
                        active ? 'text-white' : 'text-gray-400'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 w-full min-w-0 bg-white border border-gray-300 shadow-sm p-6 sm:p-8 md:p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
