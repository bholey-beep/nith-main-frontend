'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Download, ExternalLink } from 'lucide-react';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/students?page_name=scholarships')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading scholarships data:', err);
        setLoading(false);
      });
  }, []);

  // Fallbacks
  const title = data
    ? (language === 'hi' ? data.title_hi || data.title_en : data.title_en)
    : (language === 'hi' ? 'छात्रवृत्ति और कल्याण' : 'Scholarships & Welfare');

  const description = data
    ? (language === 'hi' ? data.description_hi || data.description_en : data.description_en)
    : (language === 'hi'
      ? 'छात्रवृत्ति, नोडल अधिकारियों, पोर्टलों और डाउनलोड करने योग्य योजना दस्तावेजों पर केंद्रीकृत जानकारी - जिसका उद्देश्य छात्रों को कुशलतापूर्वक सहायता प्राप्त करने में मदद करना है।'
      : 'Centralized information on scholarships, nodal officers, portals and downloadable scheme documents — aimed to help students access support efficiently.');

  const overview = data?.content
    ? (language === 'hi' ? data.content.overview_hi || data.content.overview_en : data.content.overview_en)
    : (language === 'hi'
      ? 'छात्रवृत्ति से संबंधित प्रश्नों और योजना समन्वय के लिए प्रमुख संपर्क, साथ ही पोर्टलों और डाउनलोड करने योग्य दस्तावेजों के सीधे लिंक।'
      : 'Key contacts for scholarship-related queries and scheme coordination, along with direct links to portals and downloadable documents.');

  const faculty = data?.content
    ? (language === 'hi' ? data.content.faculty_hi || data.content.faculty_en : data.content.faculty_en)
    : [];

  const links = data?.content?.links || [];

  const contactName = data?.content?.contact_name || 'Dr. Pardeep Singh';
  const contactRole = data?.content?.contact_role || 'Associate Dean (Student Activities & Scholarships)';
  const contactEmail = data?.content?.contact_email || 'ad_sas@nith.ac.in';
  const contactPhone = data?.content?.contact_phone || '254436';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faculty;
    return faculty.filter(
      (f: any) =>
        (f.name || '').toLowerCase().includes(q) ||
        (f.responsibility || '').toLowerCase().includes(q) ||
        (f.email || '').toLowerCase().includes(q) ||
        (f.phone || '').includes(q)
    );
  }, [query, faculty]);

  function copyEmail(email: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      alert('Email copied to clipboard!');
    }
  }

  function exportCSV() {
    const header = ['Sl. No.', 'Name', 'Responsibility', 'Phone', 'Email'];
    const rows = faculty.map((f: any, i: number) => [
      String(i + 1),
      f.name,
      f.responsibility,
      f.phone,
      f.email,
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'faculty-functionaries-scholarships.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] text-black font-bold">
        {language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-left">
      <Header31 />

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language === 'hi' ? 'होम' : 'Home'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">{language === 'hi' ? 'छात्र' : 'Student'}</span>
            <span>›</span>
            <span className="text-gray-400">{language === 'hi' ? 'कल्याण' : 'Welfare'}</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">{title}</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-28 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 leading-tight">
            {title}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-md md:text-lg leading-relaxed font-light">
            {description}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {language === 'hi' ? 'संकाय पदाधिकारी' : 'Faculty Functionaries'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {overview}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#800000]/30 text-black"
                      placeholder={language === 'hi' ? 'नाम या ईमेल द्वारा खोजें...' : 'Search by name, role...'}
                      aria-label="Search faculty"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>

                  <button
                    onClick={exportCSV}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000] text-white font-bold rounded-lg text-sm hover:bg-[#6a0000] transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" /> {language === 'hi' ? 'सीएसवी निर्यात' : 'Export CSV'}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse table-auto">
                  <thead>
                    <tr className="bg-gray-50 text-left border-b border-gray-150">
                      <th className="px-4 py-3 font-semibold text-gray-700 w-12">Sl.</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'नाम' : 'Name'}</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'दायित्व' : 'Responsibility'}</th>
                      <th className="px-4 py-3 font-semibold text-gray-700 w-24">{language === 'hi' ? 'फ़ोन' : 'Phone'}</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'ईमेल' : 'Email'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((f: any, idx: number) => (
                      <tr key={idx} className="border-b hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 align-top font-medium text-gray-500">{idx + 1}</td>
                        <td className="px-4 py-3 align-top font-bold text-gray-900">
                          {f.name}
                        </td>
                        <td className="px-4 py-3 align-top text-gray-600 leading-relaxed">
                          {f.responsibility}
                        </td>
                        <td className="px-4 py-3 align-top font-medium text-gray-800">{f.phone}</td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-3">
                            <a
                              href={`mailto:${f.email}`}
                              className="text-[#800000] underline font-medium hover:text-[#6a0000]"
                            >
                              {f.email}
                            </a>
                            <button
                              onClick={() => copyEmail(f.email)}
                              aria-label={`Copy ${f.email}`}
                              className="text-gray-400 hover:text-gray-600 text-xs border border-gray-200 px-2 py-0.5 rounded transition-all bg-white"
                            >
                              {language === 'hi' ? 'कॉपी करें' : 'Copy'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-gray-400 italic"
                        >
                          {language === 'hi' ? 'कोई संकाय आपकी खोज से मेल नहीं खाता है।' : 'No functionaries match your search.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-1 text-gray-900">
                {language === 'hi' ? 'आवेदन कैसे करें / उपयोगी लिंक' : 'How to Apply / Useful Links'}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {language === 'hi'
                  ? 'छात्रवृत्ति आवेदनों और अभिलेखों के लिए पोर्टलों और डाउनलोड करने योग्य दस्तावेजों के सीधे लिंक।'
                  : 'Direct links to portals and downloadable documents for scholarship applications and records.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {links.map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md hover:border-gray-200 transition-all bg-white group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#800000] flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      {link.type === 'pdf' ? <Download className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900 group-hover:text-[#800000] transition-colors">{link.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{link.subtitle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <aside className="bg-white rounded-2xl shadow-md p-6 h-fit border border-gray-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{language === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Assistance?'}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'hi'
                  ? 'छात्रवृत्ति प्रश्नों और आवेदन सहायता के लिए नीचे दिए गए कार्यालय से संपर्क करें।'
                  : 'For scholarship queries and application support contact the office below.'}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-[#800000] pl-3 py-1">
                <div className="font-bold text-gray-900">{contactName}</div>
                <div className="text-gray-500 text-xs mt-0.5">{contactRole}</div>
                <div className="text-gray-600 mt-2">
                  Email:{' '}
                  <a href={`mailto:${contactEmail}`} className="text-[#800000] hover:underline font-semibold">
                    {contactEmail}
                  </a>
                </div>
                <div className="text-gray-600 mt-1">{language === 'hi' ? 'फ़ोन' : 'Phone'}: {contactPhone}</div>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#800000] text-white font-bold rounded-lg text-sm hover:bg-[#6a0000] transition-colors shadow-md shadow-[#800000]/10 w-full justify-center"
                >
                  {language === 'hi' ? 'कार्यालय को ईमेल करें' : 'Email Office'}
                </a>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 text-xs text-gray-400">
              <div>{language === 'hi' ? 'अंतिम अपडेट: जनवरी 2026' : 'Last updated: Jan 2026'}</div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
