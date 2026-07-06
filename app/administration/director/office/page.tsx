'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

import { useState, useEffect } from 'react';

export default function DirectorOfficePage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/administration/office-staff')
      .then(res => res.json())
      .then(json => {
        if (json.success) setStaffList(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const director = staffList.filter(s => s.is_director);
  const officeStaff = staffList.filter(s => !s.is_director);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;
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
            <span className="text-gray-400">Administration</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">Director Office</span>
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
          className="relative z-10 text-center py-20 md:py-28 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Director Office
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-md md:text-lg leading-relaxed font-light">
            Contact details of the Director and office staff.
          </p>
        </motion.div>
      </section>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Director
            </h2>
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="py-3 pr-6">Sl. No.</th>
                  <th className="py-3 pr-6">Name</th>
                  <th className="py-3 pr-6">Designation</th>
                  <th className="py-3 pr-6">Phone No.</th>
                  <th className="py-3 pr-6">Email</th>
                </tr>
              </thead>
              <tbody>
                {director.map((d, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-4 align-top">{i + 1}</td>
                    <td className="py-4 align-top">{d.name}</td>
                    <td className="py-4 align-top">{d.designation}</td>
                    <td className="py-4 align-top">{d.phone}</td>
                    <td className="py-4 align-top">
                      <a
                        className="text-[#800000] font-medium"
                        href={`mailto:${d.email}`}
                      >
                        {d.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-x-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Office Staff
            </h2>
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="text-sm text-gray-500 border-b">
                  <th className="py-3 pr-6">Sl. No.</th>
                  <th className="py-3 pr-6">Name</th>
                  <th className="py-3 pr-6">Designation</th>
                  <th className="py-3 pr-6">Phone No.</th>
                  <th className="py-3 pr-6">Email</th>
                </tr>
              </thead>
              <tbody>
                {officeStaff.map((s, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-4 align-top">{i + 1}</td>
                    <td className="py-4 align-top">{s.name}</td>
                    <td className="py-4 align-top">{s.designation}</td>
                    <td className="py-4 align-top">{s.phone}</td>
                    <td className="py-4 align-top">
                      {s.email !== '--' ? (
                        <a
                          className="text-[#800000] font-medium"
                          href={`mailto:${s.email}`}
                        >
                          {s.email}
                        </a>
                      ) : (
                        <span className="text-gray-500">--</span>
                      )}
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
