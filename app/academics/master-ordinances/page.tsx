'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const ORDINANCES = [
  {
    id: 'm2024',
    title: "Master's Ordinances w.e.f. 2024",
    year: '2024',
    url: '/pdfs/masters-ordinances-2024.pdf',
  },
  {
    id: 'm2021',
    title: "Master's Ordinances w.e.f. 2021",
    year: '2021',
    url: '/pdfs/masters-ordinances-2021.pdf',
  },
  {
    id: 'm2018',
    title: "Master's Ordinances w.e.f. 2018",
    year: '2018',
    url: '/pdfs/masters-ordinances-2018.pdf',
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      

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
            <span className="text-[#800000] font-medium">
              Master&apos;s Ordinances
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
            Master&apos;s Ordinances
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Ordinances governing Master&apos;s programmes — view or download
            official PDFs below.
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Master&apos;s Ordinances
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed border-collapse">
              <colgroup>
                <col style={{ width: '6%' }} />
                <col style={{ width: '64%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-50 text-sm text-gray-600">
                  <th className="py-3 px-4">Sl.</th>
                  <th className="py-3 px-4">Ordinance</th>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ORDINANCES.map((o, i) => (
                  <tr
                    key={o.id}
                    className={`border-b hover:bg-gray-50 ${i % 2 === 1 ? 'bg-gray-50' : ''}`}
                  >
                    <td className="py-3 px-4 text-sm text-gray-700 align-top">
                      {i + 1}
                    </td>
                    <td className="py-3 px-4 align-top text-gray-900 font-medium">
                      {o.title}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 align-top">
                      {o.year}
                    </td>
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-center gap-2">
                        <a
                          href={o.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-sm bg-white text-[#800000] border-[#800000]"
                        >
                          View
                        </a>
                        <a
                          href={o.url}
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
          <h3 className="text-lg font-medium text-gray-900">Notes</h3>
          <p className="mt-2 text-gray-700 text-sm">
            The ordinances linked above are the authoritative documents. If you
            need assistance, contact the Academic Office at{' '}
            <a
              href="mailto:academic@nith.ac.in"
              className="text-[#800000] underline"
            >
              academic@nith.ac.in
            </a>
            .
          </p>
        </section>
      </main>

      
    </div>
  );
}
