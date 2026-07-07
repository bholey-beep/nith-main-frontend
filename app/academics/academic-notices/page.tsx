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

type Notice = {
  id: string;
  title: string;
  date?: string;
  pdfUrl?: string;
};

export default function AcademicNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/academics/notices')
      .then(res => res.json())
      .then(json => {
        if (json.success) setNotices(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
            <span className="text-[#800000] font-medium">Academic Notices</span>
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
            Academic Notices
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Institute notices related to academics (view or download PDFs)
          </p>
        </motion.div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-[80px_1fr_140px] gap-4 bg-gray-50 border-b border-gray-200 p-4 text-sm font-semibold text-gray-700">
              <div className="text-center text-gray-500">S.I no</div>
              <div className="uppercase tracking-wider text-xs font-bold text-[#631012]">Notice Description</div>
              <div className="text-center uppercase tracking-wider text-xs font-bold text-[#631012]">Downloads</div>
            </div>

            {notices.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No notices found.</div>
            ) : (
              notices.map((notice, i) => (
                <div key={notice.id} className="grid grid-cols-[80px_1fr_140px] gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 items-center">
                  <div className="text-center font-mono text-gray-400">{(i + 1).toString().padStart(2, '0')}</div>
                  <div className="space-y-1">
                    <div className="font-bold text-gray-900">{notice.title}</div>
                    <div className="text-gray-600 text-sm">{notice.description}</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">{notice.category} • {notice.date}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <a href={notice.view_url} target="_blank" rel="noopener noreferrer" className="text-[#631012] hover:underline text-sm font-medium">View</a>
                    <a href={notice.download_url} download className="text-[#631012] hover:underline text-sm font-medium">Pdf</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
