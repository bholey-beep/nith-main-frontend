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
    key: 'vision',
    title: 'Vision of NAD',
    content:
      'The National Academic Depository (NAD) aims to provide a secure, digital depository for academic awards, ensuring accessibility, authenticity and easy verification of academic records across institutions.',
  },
  {
    key: 'about',
    title: 'About NAD',
    content:
      'NAD is an online storehouse of academic awards (certificates, diplomas, degrees, mark sheets). It facilitates issuance, storage, retrieval and verification of academic documents in a digital format.',
  },
  {
    key: 'features',
    title: 'Features of NAD',
    content:
      'Secure storage, instant verification, tamper-proof records, institution integration, student access and download, and support for multiple formats.',
  },
  {
    key: 'benefits',
    title: 'Benefits of NAD',
    content:
      'Ease of verification for employers, reduced paperwork for institutions, quick access for students, reduced fraud, and centralized archival of awards.',
  },
  {
    key: 'roles',
    title: 'Roles & Responsibilities',
    content:
      'Institutions: issue documents to NAD; Students: consent and access records; Employers: verify credentials via NAD; NAD: maintain secure repository and APIs.',
  },
  {
    key: 'register',
    title: 'How to Register on NAD',
    content:
      '1) Create an account on the NAD portal. 2) Add your institution details. 3) Link issued awards. 4) Verify email and mobile. 5) Grant permissions to share or download documents.',
  },
  {
    key: 'abc',
    title: 'Academic Bank of Credits (ABC)',
    content:
      'ABC enables credit accumulation and transfer across institutions. NAD integration allows records of earned credits to be securely stored and shared for academic mobility.',
  },
  {
    key: 'notices',
    title: 'Notices',
    content:
      'All NAD-related notices, announcements and maintenance windows will appear here. (Dummy notice) NAD will be upgraded on 2026-02-01 between 02:00-04:00 AM.',
  },
  {
    key: 'contact',
    title: 'Contact',
    content:
      'For NAD support contact: nad-support@nith.ac.in or call +91-12345-67890. Office hours: Mon-Fri 09:30-17:30.',
  },
];

export default function Page() {
  const [active, setActive] = useState<string>('vision');
  const current = SECTIONS.find((s) => s.key === active) ?? SECTIONS[0];

  return (
    <div className=" bg-gray-50  ">
      <div>
        
      </div>
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
            <span className="text-gray-400">Academics</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">NAD</span>
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
            National Academic Depository (NAD)
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Secure, digital repository for academic awards — store, access, and
            verify certificates and transcripts online.
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-72 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">NAD</h3>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => setActive(s.key)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${active === s.key ? 'bg-[#800000] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content panel */}
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
              {current.key === 'register' ? (
                <div>
                  <p>Follow these quick steps to register:</p>
                  <ol>
                    <li>
                      Create your account on the NAD portal with a valid email.
                    </li>
                    <li>Complete institution verification (if applicable).</li>
                    <li>Upload or link issued awards to your profile.</li>
                    <li>
                      Verify and share links with employers or institutions.
                    </li>
                  </ol>
                </div>
              ) : current.key === 'features' ? (
                <div>
                  <ul>
                    <li>Secure digital storage of awards.</li>
                    <li>API access for institution integration.</li>
                    <li>Student-controlled sharing.</li>
                    <li>Instant verification for employers.</li>
                  </ul>
                </div>
              ) : current.key === 'abc' ? (
                <div>
                  <p>
                    The Academic Bank of Credits (ABC) allows students to
                    accumulate credits for courses across institutions. NAD
                    integration ensures credits and earned records are
                    verifiable.
                  </p>
                </div>
              ) : (
                <p>{current.content}</p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="/downloads"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000] text-white rounded-md text-sm hover:bg-[#6a0000]"
              >
                Download Guide
              </a>
              <a
                href="mailto:nad-support@nith.ac.in"
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
