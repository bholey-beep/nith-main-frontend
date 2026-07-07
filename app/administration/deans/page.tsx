'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function TableSection({ title, rows }: { title: string; rows: any[] }) {
  if (rows.length === 0) return null;
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-x-auto mb-12 text-left">
      <h2 className="text-2xl font-bold text-[#800000] mb-6 border-b pb-4">{title}</h2>
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
          {rows.map((d, i) => (
            <tr key={d.id || i} className="border-b hover:bg-gray-50">
              <td className="py-4 align-top">{i + 1}</td>
              <td className="py-4 align-top">
                <div className="font-bold text-gray-900">{d.name}</div>
                <div className="text-xs text-gray-500 mt-1">{d.title}</div>
              </td>
              <td className="py-4 align-top text-gray-700 font-medium">{d.responsibility}</td>
              <td className="py-4 align-top text-gray-600">{d.phone || '--'}</td>
              <td className="py-4 align-top">
                <a className="text-[#800000] font-bold hover:underline" href={`mailto:${d.email}`}>
                  {d.email}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DeansPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/administration/deans')
      .then(res => res.json())
      .then(json => {
        if (json.success) setList(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;

  const deans = list.filter(d => d.category?.toLowerCase().trim() === 'dean');
  const associateDeans = list.filter(d => d.category?.toLowerCase().trim() === 'associate dean');

  return (
    <div className="min-h-screen bg-gray-50 text-black">

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
            <span className="text-[#800000] font-medium">Deans</span>
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
            Deans
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Leadership and responsibilities of Deans and Associate Deans.
          </p>
        </motion.div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <TableSection title="Deans" rows={deans} />
          <TableSection title="Associate Deans" rows={associateDeans} />
        </div>
      </section>

    </div>
  );
}
