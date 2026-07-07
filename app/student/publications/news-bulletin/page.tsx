'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { FileText, Calendar, Download, Mail, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

// ─── Move API_URL outside the component so it is a stable reference
// and does not re-trigger useEffect on every render ───────────────────────────
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getAttachmentUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${API_URL}${url}`;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

interface NewsBulletinHeading {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  latest_title_en: string;
  latest_title_hn: string;
  latest_desc_en: string;
  latest_desc_hn: string;
  archive_title_en: string;
  archive_title_hn: string;
  archive_desc_en: string;
  archive_desc_hn: string;
  contact_title_en: string;
  contact_title_hn: string;
  contact_desc_en: string;
  contact_desc_hn: string;
  coord_office_en: string;
  coord_office_hn: string;
  coord_email: string;
  coord_phone: string;
  coord_hours_en: string;
  coord_hours_hn: string;
}

interface NewsBulletinItem {
  id?: number;
  title_en: string;
  title_hn: string;
  bulletin_date: string;
  excerpt_en: string;
  excerpt_hn: string;
  pdf_url: string;
}

const DEFAULT_HEADING: NewsBulletinHeading = {
  title_en: 'News Bulletin',
  title_hn: 'समाचार बुलेटिन',
  sub_title_en: 'Official monthly digest that summarizes campus news, important notices, achievements and upcoming events for the institute community.',
  sub_title_hn: 'आधिकारिक मासिक सारांश जो संस्थान समुदाय के लिए परिसर के समाचार, महत्वपूर्ण नोटिस, उपलब्धियों और आगामी कार्यक्रमों का सारांश प्रस्तुत करता है।',
  latest_title_en: 'Latest Bulletins',
  latest_title_hn: 'नवीनतम बुलेटिन',
  latest_desc_en: 'Browse recent editions and download the full PDF for details.',
  latest_desc_hn: 'हाल के संस्करण ब्राउज़ करें और विवरण के लिए पूरा पीडीएफ डाउनलोड करें।',
  archive_title_en: 'Archive',
  archive_title_hn: 'संग्रह',
  archive_desc_en: 'Past bulletins organized chronologically.',
  archive_desc_hn: 'कालानुक्रमिक रूप से व्यवस्थित पिछले बुलेटिन।',
  contact_title_en: 'Contact',
  contact_title_hn: 'संपर्क',
  contact_desc_en: 'For submissions, corrections or circulation requests contact the Publications Office.',
  contact_desc_hn: 'प्रविष्टियों, सुधारों या प्रसार अनुरोधों के लिए प्रकाशन कार्यालय से संपर्क करें।',
  coord_office_en: 'Publications Office',
  coord_office_hn: 'प्रकाशन कार्यालय',
  coord_email: 'publications@nith.ac.in',
  coord_phone: '+91-00000-00000',
  coord_hours_en: 'Mon-Fri 09:30-17:30',
  coord_hours_hn: 'सोम-शुक्र 09:30-17:30',
};

const DEFAULT_BULLETINS: NewsBulletinItem[] = [
  {
    title_en: 'Institute News Bulletin - January 2026',
    title_hn: 'संस्थान समाचार बुलेटिन - जनवरी 2026',
    bulletin_date: '2026-01-15',
    excerpt_en: 'Highlights: Convocation details, Research grants awarded, Upcoming events and important notices for students and faculty.',
    excerpt_hn: 'मुख्य आकर्षण: दीक्षांत समारोह का विवरण, अनुसंधान अनुदान प्रदान किया गया, आगामी कार्यक्रम और छात्रों और संकाय के लिए महत्वपूर्ण नोटिस।',
    pdf_url: '#',
  },
  {
    title_en: 'Institute News Bulletin - December 2025',
    title_hn: 'संस्थान समाचार बुलेटिन - दिसंबर 2025',
    bulletin_date: '2025-12-10',
    excerpt_en: 'Year-end highlights, departmental achievements, and campus events roundup.',
    excerpt_hn: 'वर्ष के अंत के मुख्य आकर्षण, विभागीय उपलब्धियां, और परिसर के कार्यक्रमों का संकलन।',
    pdf_url: '#',
  },
  {
    title_en: 'Institute News Bulletin - September 2025',
    title_hn: 'संस्थान समाचार बुलेटिन - सितंबर 2025',
    bulletin_date: '2025-09-05',
    excerpt_en: 'Student achievements, upcoming workshops and notable alumni interactions.',
    excerpt_hn: 'छात्र उपलब्धियां, आगामी कार्यशालाएं और उल्लेखनीय पूर्व छात्रों की बातचीत।',
    pdf_url: '#',
  },
];

export default function NewsBulletinPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isEn = language === 'en';

  const [heading, setHeading] = useState<NewsBulletinHeading>(DEFAULT_HEADING);
  const [bulletins, setBulletins] = useState<NewsBulletinItem[]>(DEFAULT_BULLETINS);

  // ─── API_URL is now stable (module-level const), so the dependency array
  // is effectively [] and the effect runs only once on mount ─────────────────
  useEffect(() => {
    const loadData = async () => {
      try {
        const headRes = await fetch(`${API_URL}/api/student-news-bulletin`, { cache: 'no-store' });
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeading({
              title_en: hData.title_en || DEFAULT_HEADING.title_en,
              title_hn: hData.title_hn || DEFAULT_HEADING.title_hn,
              sub_title_en: hData.sub_title_en || DEFAULT_HEADING.sub_title_en,
              sub_title_hn: hData.sub_title_hn || DEFAULT_HEADING.sub_title_hn,
              latest_title_en: hData.latest_title_en || DEFAULT_HEADING.latest_title_en,
              latest_title_hn: hData.latest_title_hn || DEFAULT_HEADING.latest_title_hn,
              latest_desc_en: hData.latest_desc_en || DEFAULT_HEADING.latest_desc_en,
              latest_desc_hn: hData.latest_desc_hn || DEFAULT_HEADING.latest_desc_hn,
              archive_title_en: hData.archive_title_en || DEFAULT_HEADING.archive_title_en,
              archive_title_hn: hData.archive_title_hn || DEFAULT_HEADING.archive_title_hn,
              archive_desc_en: hData.archive_desc_en || DEFAULT_HEADING.archive_desc_en,
              archive_desc_hn: hData.archive_desc_hn || DEFAULT_HEADING.archive_desc_hn,
              contact_title_en: hData.contact_title_en || DEFAULT_HEADING.contact_title_en,
              contact_title_hn: hData.contact_title_hn || DEFAULT_HEADING.contact_title_hn,
              contact_desc_en: hData.contact_desc_en || DEFAULT_HEADING.contact_desc_en,
              contact_desc_hn: hData.contact_desc_hn || DEFAULT_HEADING.contact_desc_hn,
              coord_office_en: hData.coord_office_en || DEFAULT_HEADING.coord_office_en,
              coord_office_hn: hData.coord_office_hn || DEFAULT_HEADING.coord_office_hn,
              coord_email: hData.coord_email || DEFAULT_HEADING.coord_email,
              coord_phone: hData.coord_phone || DEFAULT_HEADING.coord_phone,
              coord_hours_en: hData.coord_hours_en || DEFAULT_HEADING.coord_hours_en,
              coord_hours_hn: hData.coord_hours_hn || DEFAULT_HEADING.coord_hours_hn,
            });
          }
        }

        const listRes = await fetch(`${API_URL}/api/student-news-bulletin/list`, { cache: 'no-store' });
        if (listRes.ok) {
          const lData: NewsBulletinItem[] = await listRes.json();
          if (lData && lData.length > 0) {
            setBulletins(lData);
          }
        }
      } catch (error) {
        console.error('Failed to load news bulletin dynamic details:', error);
      }
    };

    loadData();
  }, []); // empty — API_URL is a module-level constant, not a reactive value

  // First 3 items shown as "latest" cards; all items in the archive table
  const latestBulletins = bulletins.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#800000] transition-colors duration-200">
              {isEn ? 'Home' : 'मुख्य पृष्ठ'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">{isEn ? 'Student' : 'छात्र'}</span>
            <span>›</span>
            <span className="text-gray-400">{isEn ? 'Publications' : 'प्रकाशन'}</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {isEn ? heading.title_en : heading.title_hn}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
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
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            {isEn ? heading.title_en : heading.title_hn}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isEn ? heading.sub_title_en : heading.sub_title_hn}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">

        {/* ── Latest Bulletins Cards ─────────────────────────────────────────── */}
        <section className="mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              {isEn ? heading.latest_title_en : heading.latest_title_hn}
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              {isEn ? heading.latest_desc_en : heading.latest_desc_hn}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBulletins.map((b, idx) => (
              <motion.div
                // Use a stable key: prefer DB id, fall back to title+idx
                key={b.id !== undefined ? `bulletin-${b.id}` : `default-${idx}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInScale}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#800000] flex items-center justify-center text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {isEn ? b.title_en : b.title_hn}
                    </h3>
                    <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Calendar size={14} />
                      {new Date(b.bulletin_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mt-4 text-sm">
                  {isEn ? b.excerpt_en : b.excerpt_hn}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={getAttachmentUrl(b.pdf_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000] text-white rounded-md text-sm hover:bg-[#6a0000] transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    {isEn ? 'View' : 'देखें'}
                  </a>
                  <a
                    href={getAttachmentUrl(b.pdf_url)}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {isEn ? 'Download PDF' : 'डाउनलोड पीडीएफ'}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Archive Table ──────────────────────────────────────────────────── */}
        <section className="mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              {isEn ? heading.archive_title_en : heading.archive_title_hn}
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              {isEn ? heading.archive_desc_en : heading.archive_desc_hn}
            </p>
          </motion.div>

          <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <table className="w-full text-sm">
              <thead>
                {/* Fixed: was border-gray-150 (invalid) → border-gray-200 */}
                <tr className="text-left bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 font-semibold text-gray-700">{isEn ? 'Sl. No.' : 'क्र. सं.'}</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">{isEn ? 'Title' : 'शीर्षक'}</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">{isEn ? 'Date' : 'दिनांक'}</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">{isEn ? 'Actions' : 'कार्रवाई'}</th>
                </tr>
              </thead>
              <tbody>
                {bulletins.map((a, idx) => (
                  <tr
                    key={a.id !== undefined ? `archive-${a.id}` : `archive-default-${idx}`}
                    className="border-b border-gray-100 hover:bg-gray-50/40 transition-colors"
                  >
                    <td className="px-4 py-3 align-top text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-3 align-top font-medium text-gray-900">
                      {isEn ? a.title_en : a.title_hn}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-600">
                      {new Date(a.bulletin_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex gap-2">
                        <a
                          href={getAttachmentUrl(a.pdf_url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#800000] text-white rounded-md text-sm hover:bg-[#6a0000] transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {isEn ? 'View' : 'देखें'}
                        </a>
                        <a
                          href={getAttachmentUrl(a.pdf_url)}
                          download
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {isEn ? 'Download' : 'डाउनलोड'}
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
                {bulletins.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-400 italic">
                      {isEn ? 'No bulletins available.' : 'कोई बुलेटिन उपलब्ध नहीं है।'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Contact Section ────────────────────────────────────────────────── */}
        <section className="mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              {isEn ? heading.contact_title_en : heading.contact_title_hn}
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              {isEn ? heading.contact_desc_en : heading.contact_desc_hn}
            </p>
          </motion.div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-14 h-14 rounded-lg bg-[#800000] flex items-center justify-center text-white shrink-0">
                <Mail className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">
                  {isEn ? heading.coord_office_en : heading.coord_office_hn}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEn ? 'Email' : 'ईमेल'}:{' '}
                  <a
                    className="text-[#800000] font-medium hover:underline"
                    href={`mailto:${heading.coord_email}`}
                  >
                    {heading.coord_email}
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  {isEn ? 'Phone' : 'दूरभाष'}: {heading.coord_phone}
                </p>
                <p className="text-sm text-gray-500 pt-1 flex items-center gap-1.5">
                  <Clock size={14} />
                  {isEn
                    ? `Office hours: ${heading.coord_hours_en}`
                    : `कार्यालय समय: ${heading.coord_hours_hn}`}
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
