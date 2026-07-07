'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import {
  Award,
  Star,
  GraduationCap,
  Users,
  Download,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Award,
  Star,
  GraduationCap,
  Users,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/students?page_name=prizes-medals')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading prizes medals data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black font-bold">
        {language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
      </div>
    );
  }

  // Fallbacks
  const title = data
    ? (language === 'hi' ? data.title_hi || data.title_en : data.title_en)
    : (language === 'hi' ? 'पुरस्कार और पदक' : 'Prizes & Medals');

  const description = data
    ? (language === 'hi' ? data.description_hi || data.description_en : data.description_en)
    : (language === 'hi'
      ? 'शैक्षणिक, अनुसंधान और सेवा में उत्कृष्टता को मान्यता देने वाले परिसर के पुरस्कारों, पदकों और पुरस्कारों की एक क्यूरेटेड सूची।'
      : 'A curated list of campus prizes, medals and awards recognising excellence across academics, research and service.');

  const overview = data?.content
    ? (language === 'hi' ? data.content.overview_hi || data.content.overview_en : data.content.overview_en)
    : (language === 'hi'
      ? 'पुरस्कार मानदंड, नामांकन प्रक्रिया और प्रत्येक सम्मान का प्रतिनिधित्व करने वाले विवरण पर मान्यता और पात्रता विवरण।'
      : 'Details on award criteria, nomination process, and what each honour represents.');

  const prizes = data?.content
    ? (language === 'hi' ? data.content.prizes_hi || data.content.prizes_en : data.content.prizes_en)
    : [];

  const links = data?.content?.links || [];

  const contactName = data?.content?.contact_name || 'Dr. Jane Doe';
  const contactRole = data?.content?.contact_role || 'Associate Dean (Student Welfare)';
  const contactEmail = data?.content?.contact_email || 'studentwelfare@nith.ac.in';
  const contactPhone = data?.content?.contact_phone || '254000';

  return (
    <div className="min-h-screen bg-white text-left">
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
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {description}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-center sm:text-left mb-6"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {language === 'hi' ? 'मान्यता और पात्रता' : 'Recognitions & Eligibility'}
              </h2>
              <p className="text-gray-600 max-w-2xl">
                {overview}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {prizes.map((p: any, idx: number) => {
                const IconComponent = iconMap[p.icon] || Award;
                return (
                  <motion.article
                    key={p.id || idx}
                    variants={fadeInScale}
                    className="group relative bg-white rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#800000] to-[#631012] flex items-center justify-center mb-4 shadow-lg">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#800000] transition-colors leading-tight">
                        {p.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {p.description}
                      </p>

                      <div className="text-sm text-gray-700 space-y-1 border-t pt-3 border-gray-50">
                        <div>
                          <strong className="text-gray-900">
                            {language === 'hi' ? 'पात्रता:' : 'Eligibility:'}
                          </strong>{' '}
                          {p.eligibility}
                        </div>
                        <div>
                          <strong className="text-gray-900">{language === 'hi' ? 'पुरस्कार:' : 'Award:'}</strong>{' '}
                          {p.award}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center text-[#800000] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-bold">
                          {language === 'hi' ? 'नामांकन / विवरण' : 'Nomination / Details'}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-1 text-gray-900">
                {language === 'hi' ? 'डाउनलोड करने योग्य दस्तावेज़' : 'Downloadable Documents'}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {language === 'hi'
                  ? 'संदर्भ के लिए फॉर्म, नामांकन टेम्प्लेट और पिछले पुरस्कारों की सूची।'
                  : 'Forms, nomination templates and past award lists for reference.'}
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
                      {link.is_pdf ? <Download className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-gray-900 group-hover:text-[#800000] transition-colors">{link.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{link.is_pdf ? (language === 'hi' ? 'पीडीएफ डाउनलोड करें' : 'Download PDF') : (language === 'hi' ? 'सूची देखें' : 'View list')}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <aside className="bg-white rounded-2xl shadow-md p-6 h-fit border border-gray-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {language === 'hi' ? 'संपर्क एवं नामांकन डेस्क' : 'Contact & Nomination Desk'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'hi'
                  ? 'नामांकन, स्पष्टीकरण और समारोह समन्वय के लिए नीचे संकाय प्रभारी से संपर्क करें।'
                  : 'For nominations, clarifications and ceremony coordination, reach out to the faculty incharge below.'}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-[#800000] pl-3 py-1">
                <div className="font-bold text-gray-900">{contactName}</div>
                <div className="text-gray-500 text-xs mt-0.5">{contactRole}</div>
                <div className="text-gray-600 mt-2">
                  Email:{' '}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-[#800000] hover:underline font-semibold"
                  >
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
