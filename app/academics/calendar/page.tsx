'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

type Doc = {
  id: string;
  title: string;
  date?: string;
  url?: string;
};

export default function Page() {
  const [tab, setTab] = useState<'odd' | 'even'>('even');
  const [allCalendars, setAllCalendars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/academics/calendars')
      .then(res => res.json())
      .then(json => {
        if (json.success) setAllCalendars(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredDocs = allCalendars.filter(doc => {
    const title = doc.title?.toLowerCase() || '';
    if (tab === 'odd') return title.includes('odd');
    if (tab === 'even') return title.includes('even');
    return true;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

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
              Academic Calendar
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Academic Calendar
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Official academic calendars & examination schedules for Odd and Even
            semesters — view or download PDFs.
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Academic Calendar
            </h2>
            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setTab('odd')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === 'odd' ? 'bg-white text-[#800000] shadow' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Odd Semester
              </button>
              <button
                onClick={() => setTab('even')}
                className={`ml-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === 'even' ? 'bg-white text-[#800000] shadow' : 'text-gray-700 hover:bg-gray-200'}`}
              >
                Even Semester
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed border-collapse">
              <colgroup>
                <col style={{ width: '6%' }} />
                <col style={{ width: '64%' }} />
                <col style={{ width: '30%' }} />
              </colgroup>
              <thead>
                <tr className="bg-gray-50 text-sm text-gray-600 font-bold uppercase">
                  <th className="py-3 px-4">Sl.</th>
                  <th className="py-3 px-4">Document Title & Description</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">No {tab} semester calendars found.</td>
                  </tr>
                ) : (
                  filteredDocs.map((d, i) => (
                    <tr
                      key={d.id}
                      className={`border-b hover:bg-gray-50 transition-colors ${i % 2 === 1 ? 'bg-gray-50' : ''}`}
                    >
                      <td className="py-4 px-4 text-sm text-gray-700 align-top font-bold">
                        {i + 1}
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="text-gray-900 font-bold text-lg mb-1">{d.title}</div>
                        <div className="text-gray-500 text-sm">{d.description}</div>
                      </td>
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-3">
                          <a
                            href={d.view_url ?? '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold bg-white text-[#800000] border-[#800000] hover:bg-[#800000] hover:text-white transition-all"
                          >
                            View
                          </a>
                          <a
                            href={d.pdf_url ?? '#'}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000] text-white rounded-full text-sm font-bold hover:bg-[#631012] transition-all"
                          >
                            Download
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Official Notes</h3>
          <p className="text-gray-700 leading-relaxed">
            Please refer to the official institute notices for any last-minute
            changes to calendars or examination schedules. For queries contact
            the Office of Academic Affairs at{' '}
            <a
              href="mailto:academic@nith.ac.in"
              className="text-[#800000] font-bold underline"
            >
              academic@nith.ac.in
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
