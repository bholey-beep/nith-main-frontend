'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
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
            <span className="text-[#800000] font-medium">Time Table</span>
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
            Time Table for First Year
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Class timetables, classroom & section allocations for First Year —
            view or download PDFs.
          </p>
        </motion.div>
      </section>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Class Timetable for First Year Even Semester (Academic Year 2025-26)
          </h2>
          <p className="mt-2 text-gray-600">
            Below is a sample timetable overview for Even Semester. For the
            authoritative copy, use the View/Download links.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left table-fixed border-collapse bg-white shadow-sm rounded-md">
              <colgroup>
                <col style={{ width: '6%' }} />
                <col style={{ width: '64%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-50 text-sm text-gray-600">
                  <th className="py-3 px-4">Sl.</th>
                  <th className="py-3 px-4">Table / Document</th>
                  <th className="py-3 px-4">Semester</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 'even-1',
                    title:
                      'Class Timetable - First Year Even Semester (AY 2025-26)',
                    sem: 'Even',
                    url: '/pdfs/timetable-first-year-even-2025-26.pdf',
                  },
                  {
                    id: 'even-2',
                    title: 'Classroom & Section Allocation - Even Semester',
                    sem: 'Even',
                    url: '/pdfs/classroom-section-even-2025-26.pdf',
                  },
                ].map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b hover:bg-gray-50 ${idx % 2 === 1 ? 'bg-gray-50' : ''}`}
                  >
                    <td className="py-3 px-4 align-top text-sm text-gray-700">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 align-top">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-900 font-medium hover:text-[#800000]"
                      >
                        {item.title}
                      </a>
                    </td>
                    <td className="py-3 px-4 align-top text-sm text-gray-600">
                      {item.sem}
                    </td>
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-center gap-2">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-sm bg-white text-[#800000] border-[#800000]"
                        >
                          View
                        </a>
                        <a
                          href={item.url}
                          download
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#800000] text-white rounded-full text-sm"
                        >
                          Download
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            (Updated) Classroom, Section details and Timetable for First Year
            Odd Semester (Academic Year 2025-26)
          </h2>
          <p className="mt-2 text-gray-600">
            This section contains the updated classroom & section allocations
            and the odd-semester timetable. Changes marked as
            &quot;Updated&quot; are effective from 2026-01-15.
          </p>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-800">
                Classroom / Section (Sample)
              </h3>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>Section A: Room 101 (Block A)</li>
                <li>Section B: Room 102 (Block A)</li>
                <li>Section C: Room 201 (Block B)</li>
                <li>Section D: Room 202 (Block B)</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-800">
                Timetable Notes
              </h3>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>
                  Labs run in two shifts; check lab allocation PDF for exact
                  timings.
                </li>
                <li>Any last-minute changes will be updated on the portal.</li>
                <li>
                  Contact the Office of Academic Affairs for clarifications.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="/pdfs/timetable-first-year-odd-2025-26-updated.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-[#800000] text-white rounded-md text-sm"
            >
              View Updated PDF
            </a>
            <a
              href="/pdfs/timetable-first-year-odd-2025-26-updated.pdf"
              download
              className="px-4 py-2 border rounded-md text-sm text-gray-700"
            >
              Download
            </a>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900">
            More information
          </h3>
          <p className="mt-2 text-gray-700 text-sm">
            Queries about timetables or section assignments should be emailed to{' '}
            <a
              href="mailto:academic@nith.ac.in"
              className="text-[#800000] underline"
            >
              academic@nith.ac.in
            </a>{' '}
            or raised with the Department Office.
          </p>
        </section>
      </main>

      
    </div>
  );
}
