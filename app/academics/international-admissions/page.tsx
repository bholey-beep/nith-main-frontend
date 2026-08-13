'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const SECTIONS = [
  {
    key: 'intro',
    title: 'Introduction',
    content:
      'Welcome to NITH — international admissions information and a quick overview for prospective students.',
  },
  {
    key: 'message',
    title: 'Message',
    content:
      'Message from the International Office: We welcome students from across the world to be part of our vibrant community.',
  },
  {
    key: 'why',
    title: 'Why Study at NITH',
    content:
      'Strong academic programs, research opportunities, and a supportive campus environment.',
  },
  {
    key: 'life',
    title: 'Life in Bharat',
    content:
      'Cultural experiences, local hospitality, and opportunities to explore India during your studies.',
  },
  {
    key: 'campus',
    title: 'Campus Life',
    content:
      'Clubs, societies, sports, and on-campus facilities to support student life and learning.',
  },
  {
    key: 'connect',
    title: 'Connectivity',
    content:
      'Transport options and connectivity to nearby cities and airports.',
  },
  {
    key: 'hear',
    title: "Hear from our Intl' Students",
    content: 'Student testimonials and experiences — (dummy content).',
  },
  {
    key: 'counselling',
    title: 'Counselling and Mental Health Services',
    content:
      'We provide counselling services and mental health support to all students.',
  },
  {
    key: 'contact',
    title: 'Contact details',
    content:
      'Email: intl-admissions@nith.ac.in | Phone: +91-12345-67890 | Office hours: Mon-Fri 09:30-17:30',
  },
];

export default function Page() {
  const [active, setActive] = useState<string>('intro');
  const current = SECTIONS.find((s) => s.key === active) ?? SECTIONS[0];

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              Home
            </Link>
            <span>›</span>
            <span className="text-gray-400">About</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              International Admissions
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            International Admissions
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Information for international applicants — programs, campus life,
            support services, and how to apply.
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-72 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              International Admissions
            </h3>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => setActive(s.key)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${active === s.key ? 'bg-[#800000] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    aria-pressed={active === s.key}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <section className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {current.title}
              </h2>
              <div className="text-sm text-gray-500">
                {SECTIONS.findIndex((s) => s.key === current.key) + 1} /{' '}
                {SECTIONS.length}
              </div>
            </div>

            <div className="mt-4 prose prose-sm max-w-none text-gray-700">
              <p>{current.content}</p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="/academics/admissions-2025-26"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000] text-white rounded-md text-sm hover:bg-[#6a0000]"
              >
                Download Guide
              </a>
              <a
                href="mailto:intl-admissions@nith.ac.in"
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                Contact Support
              </a>
            </div>
          </section>
        </div>
      </main>

      
    </div>
  );
}
