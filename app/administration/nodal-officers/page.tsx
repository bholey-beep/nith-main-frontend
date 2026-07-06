'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function NodalOfficersPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/administration/nodal-officers')
      .then(res => res.json())
      .then(json => {
        if (json.success) setList(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;

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
            <span className="text-[#800000] font-medium">Nodal Officers</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            Nodal Officers
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Officers responsible for various institutional initiatives
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl px-6 py-3 text-center border-b-2 border-[#800000]">
            <h2 className="text-xl font-semibold text-gray-700">
              Nodal Officers
            </h2>
          </div>

          <div className="bg-white rounded-b-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-[#800000] to-[#631012] text-white">
                    <th className="px-6 py-4 text-sm font-semibold">Sl. No.</th>
                    <th className="px-6 py-4 text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Responsibility
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Phone No.
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((officer, i) => (
                    <tr
                      key={officer.id || i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {officer.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {officer.responsibility}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {officer.phone || '--'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <a
                          href={`mailto:${officer.email}`}
                          className="text-[#631012] hover:underline"
                        >
                          {officer.email}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </main>

    </div>
  );
}
