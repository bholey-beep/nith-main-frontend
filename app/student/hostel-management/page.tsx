'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface HostelHeading {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
}

interface HostelFunctionary {
  id: number;
  hostel_name: string;
  name: string;
  responsibility: string;
  phone: string;
  email: string;
  priority: number;
}

const DEFAULT_HEADING: HostelHeading = {
  title_en: 'Hostel Functionaries',
  title_hn: 'छात्रावास पदाधिकारी',
  sub_title_en: 'Chief Warden and wardens / assistant wardens contact details',
  sub_title_hn: 'मुख्य वार्डन और वार्डन / सहायक वार्डन संपर्क विवरण'
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isEn = language === 'en';

  const [heading, setHeading] = useState<HostelHeading>(DEFAULT_HEADING);
  const [functionaries, setFunctionaries] = useState<HostelFunctionary[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const headRes = await fetch(`${API_URL}/api/student-hostel-management`, { cache: 'no-store' });
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeading({
              title_en: hData.title_en || DEFAULT_HEADING.title_en,
              title_hn: hData.title_hn || DEFAULT_HEADING.title_hn,
              sub_title_en: hData.sub_title_en || DEFAULT_HEADING.sub_title_en,
              sub_title_hn: hData.sub_title_hn || DEFAULT_HEADING.sub_title_hn,
            });
          }
        }

        const listRes = await fetch(`${API_URL}/api/student-hostel-management/list`, { cache: 'no-store' });
        if (listRes.ok) {
          const lData = await listRes.json();
          if (lData && lData.length > 0) {
            setFunctionaries(lData);
          }
        }
      } catch (error) {
        console.error('Failed to load hostel functionaries data dynamically:', error);
      }
    };

    loadData();
  }, []);

  // Filter Chief Warden items
  const chief = functionaries
    .filter((f) => f.hostel_name === 'Chief Warden')
    .map((f) => [f.name, f.responsibility, f.phone, f.email]);

  // Group other functionaries by Hostel Name (maintaining database priority order)
  const otherHostelsMap: { [key: string]: string[][] } = {};
  functionaries
    .filter((f) => f.hostel_name !== 'Chief Warden')
    .forEach((f) => {
      if (!otherHostelsMap[f.hostel_name]) {
        otherHostelsMap[f.hostel_name] = [];
      }
      otherHostelsMap[f.hostel_name].push([f.name, f.responsibility, f.phone, f.email]);
    });

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-8xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {isEn ? 'Home' : 'मुख्य पृष्ठ'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">{isEn ? 'Student' : 'छात्र'}</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {isEn ? heading.title_en : heading.title_hn}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-20 md:py-28 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            {isEn ? heading.title_en : heading.title_hn}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed font-light">
            {isEn ? heading.sub_title_en : heading.sub_title_hn}
          </p>
        </motion.div>
      </section>

      <main className="max-w-8xl mx-auto p-6 space-y-6">
        {/* Chief Warden Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 text-[#800000]">
            {isEn ? 'Chief Warden & Warden In-Charges' : 'मुख्य वार्डन और वार्डन प्रभारी'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto text-sm">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-3 pr-6 font-semibold">{isEn ? 'Sl. No.' : 'क्र. सं.'}</th>
                  <th className="py-3 pr-6 font-semibold">{isEn ? 'Name' : 'नाम'}</th>
                  <th className="py-3 pr-6 font-semibold">{isEn ? 'Responsibility' : 'दायित्व'}</th>
                  <th className="py-3 pr-6 font-semibold">{isEn ? 'Phone No.' : 'फोन नंबर'}</th>
                  <th className="py-3 pr-6 font-semibold">{isEn ? 'Email' : 'ईमेल'}</th>
                </tr>
              </thead>
              <tbody>
                {chief.map((r, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 text-gray-500">{i + 1}</td>
                    <td className="py-3 font-semibold text-gray-900">{r[0]}</td>
                    <td className="py-3 text-gray-600">{r[1]}</td>
                    <td className="py-3 text-gray-600">{r[2]}</td>
                    <td className="py-3">
                      <a href={`mailto:${r[3]}`} className="text-[#800000] hover:underline font-medium">
                        {r[3]}
                      </a>
                    </td>
                  </tr>
                ))}
                {chief.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400 italic">
                      {isEn ? 'No chief warden data loaded.' : 'मुख्य वार्डन का कोई विवरण उपलब्ध नहीं है।'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Wardens / Assistant Wardens Grid */}
        <section className="bg-gray-50/50 border border-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-[#800000] border-b pb-2">
            {isEn ? 'Wardens / Assistant Wardens' : 'वार्डन / सहायक वार्डन'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(otherHostelsMap).map((hostelName) => (
              <HostelTable
                key={hostelName}
                title={hostelName}
                rows={otherHostelsMap[hostelName]}
                isEn={isEn}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function HostelTable({ title, rows, isEn }: { title: string; rows: string[][]; isEn: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2 text-[#800000]">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto text-sm">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '42%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '13%' }} />
          </colgroup>
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2 pr-4 font-semibold">{isEn ? 'Sl.' : 'क्र.'}</th>
              <th className="py-2 pr-4 font-semibold">{isEn ? 'Name' : 'नाम'}</th>
              <th className="py-2 pr-4 font-semibold">{isEn ? 'Designation' : 'पद'}</th>
              <th className="py-2 pr-4 font-semibold">{isEn ? 'Phone' : 'फ़ोन'}</th>
              <th className="py-2 pr-4 font-semibold">{isEn ? 'Email' : 'ईमेल'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b hover:bg-gray-50/50 transition-colors">
                <td className="py-2.5 text-gray-500">{i + 1}</td>
                <td className="py-2.5 font-semibold text-gray-900">{r[0]}</td>
                <td className="py-2.5 text-gray-600">{r[1]}</td>
                <td className="py-2.5 text-gray-600">{r[2]}</td>
                <td className="py-2.5">
                  {r[3] && r[3] !== '-' ? (
                    <a
                      href={`mailto:${r[3].split(' ')[0]}`}
                      className="text-[#800000] hover:underline font-medium"
                    >
                      {r[3]}
                    </a>
                  ) : (
                    '--'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
