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

export default function InstituteCoordinatorPage() {
  const [list, setList] = useState<any[]>([]);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, listRes] = await Promise.all([
          fetch('http://localhost:5000/api/v1/administration/institute-coordinators-info'),
          fetch('http://localhost:5000/api/v1/administration/institute-coordinators')
        ]);
        const infoData = await infoRes.json();
        const listData = await listRes.json();
        
        if (infoData.success) setInfo(infoData.data);
        if (listData.success) setList(listData.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-black">
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
            <span className="text-gray-400">Administration</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">Coordinator</span>
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
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 uppercase">
            {info?.hero_heading || 'Institute Coordinator'}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {info?.hero_subheading || 'Contact details of institute coordinators and their responsibilities.'}
          </p>
        </motion.div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="py-3 pr-6">Sl. No.</th>
                  <th className="py-3 pr-6">Name</th>
                  <th className="py-3 pr-6">Responsibility</th>
                  <th className="py-3 pr-6">Phone No.</th>
                  <th className="py-3 pr-6">Email</th>
                </tr>
              </thead>

              <tbody>
                {list.map((c, i) => (
                  <tr key={c.id || i} className="border-b hover:bg-gray-50">
                    <td className="py-4 align-top">{i + 1}</td>
                    <td className="py-4 align-top font-semibold">{c.name}</td>
                    <td className="py-4 align-top text-gray-700">{c.responsibility || c.resp}</td>
                    <td className="py-4 align-top">{c.phone || '--'}</td>
                    <td className="py-4 align-top">
                      <a
                        className="text-[#800000] font-medium"
                        href={`mailto:${c.email}`}
                      >
                        {c.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
