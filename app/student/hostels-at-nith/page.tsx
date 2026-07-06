'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface HostelHeading {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  warden_contacts_en: string;
  warden_contacts_hn: string;
  mess_timings_en: string;
  mess_timings_hn: string;
  rules_url: string;
  maintenance_url: string;
  emergency_url: string;
}

interface HostelItem {
  id: number;
  key_name: string;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  photo_url: string;
  features_en: string;
  features_hn: string;
}

const DEFAULT_HEADING: HostelHeading = {
  title_en: 'NITH Hostels',
  title_hn: 'एनआईटीएच छात्रावास',
  sub_title_en: 'Hostel accommodation, contact points and brief descriptions for each hall of residence.',
  sub_title_hn: 'संस्थान के प्रत्येक छात्रावास के लिए आवास, संपर्क सूत्र और संक्षिप्त विवरण।',
  warden_contacts_en: 'Contact your hostel warden via the Student Office for emergencies and maintenance requests.',
  warden_contacts_hn: 'आपात स्थिति और रखरखाव अनुरोधों के लिए छात्र कार्यालय के माध्यम से अपने छात्रावास वार्डन से संपर्क करें।',
  mess_timings_en: 'Breakfast: 7:30 - 9:00\nLunch: 12:30 - 2:00\nDinner: 8:00 - 9:30',
  mess_timings_hn: 'नाश्ता: 7:30 - 9:00\nदोपहर का भोजन: 12:30 - 2:00\nरात का खाना: 8:00 - 9:30',
  rules_url: '/about/connectivity',
  maintenance_url: '/student/hostels-at-nith',
  emergency_url: '/student/ncc'
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isEn = language === 'en';

  const [active, setActive] = useState<string>('introduction');
  const [heading, setHeading] = useState<HostelHeading>(DEFAULT_HEADING);
  const [hostels, setHostels] = useState<HostelItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const headRes = await fetch(`${API_URL}/api/student-hostels-at-nith`, { cache: 'no-store' });
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeading({
              title_en: hData.title_en || DEFAULT_HEADING.title_en,
              title_hn: hData.title_hn || DEFAULT_HEADING.title_hn,
              sub_title_en: hData.sub_title_en || DEFAULT_HEADING.sub_title_en,
              sub_title_hn: hData.sub_title_hn || DEFAULT_HEADING.sub_title_hn,
              warden_contacts_en: hData.warden_contacts_en || DEFAULT_HEADING.warden_contacts_en,
              warden_contacts_hn: hData.warden_contacts_hn || DEFAULT_HEADING.warden_contacts_hn,
              mess_timings_en: hData.mess_timings_en || DEFAULT_HEADING.mess_timings_en,
              mess_timings_hn: hData.mess_timings_hn || DEFAULT_HEADING.mess_timings_hn,
              rules_url: hData.rules_url || DEFAULT_HEADING.rules_url,
              maintenance_url: hData.maintenance_url || DEFAULT_HEADING.maintenance_url,
              emergency_url: hData.emergency_url || DEFAULT_HEADING.emergency_url
            });
          }
        }

        const listRes = await fetch(`${API_URL}/api/student-hostels-at-nith/list`, { cache: 'no-store' });
        if (listRes.ok) {
          const lData = await listRes.json();
          if (lData && lData.length > 0) {
            setHostels(lData);
            // Pre-select introduction key if it exists, otherwise first element
            const hasIntro = lData.find((h: HostelItem) => h.key_name === 'introduction');
            if (hasIntro) {
              setActive('introduction');
            } else if (lData[0]?.key_name) {
              setActive(lData[0].key_name);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load dynamic hostels list:', error);
      }
    };

    loadData();
  }, []);

  const current = hostels.find((s) => s.key_name === active) || hostels[0];

  // Parse custom features list
  const activeFeatures = current
    ? (isEn ? current.features_en : current.features_hn)?.split('\n').filter(Boolean) || []
    : [];

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-base text-gray-600">
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

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-72 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-[#800000]">
              {isEn ? heading.title_en : heading.title_hn}
            </h3>
            <ul className="space-y-2">
              {hostels.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => setActive(s.key_name)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors text-base font-semibold ${
                      active === s.key_name ? 'bg-[#800000] text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {isEn ? s.title_en : s.title_hn}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content panel */}
          <section className="flex-1 bg-white rounded-lg shadow-sm p-6 border border-gray-100 min-h-[350px]">
            {current ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 border-b pb-2 text-[#800000]">
                  {isEn ? current.title_en : current.title_hn}
                </h2>
                <div className="mt-5 flex flex-col md:flex-row md:items-start gap-6">
                  <img
                    src={current.photo_url !== '#' ? current.photo_url : `/images/hostels/${current.key_name}.jpg`}
                    alt={`${isEn ? current.title_en : current.title_hn} photo`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/nith.jpg';
                    }}
                    className="w-full md:w-64 h-40 md:h-44 object-cover rounded-md bg-gray-100 flex-shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                        {isEn ? current.description_en : current.description_hn}
                      </p>

                      {activeFeatures.length > 0 && (
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
                          <ul className="text-base text-gray-700 list-disc pl-5 font-semibold">
                            {activeFeatures.map((feat, index) => (
                              <li key={index}>{feat}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-6 flex justify-end">
                        <Link
                          href="/student/hostel-management"
                          className="inline-flex items-center px-5 py-2.5 bg-[#800000] text-white text-base font-semibold rounded-lg hover:bg-[#6e0000] transition duration-200"
                        >
                          {isEn ? 'Contact Warden' : 'वार्डन से संपर्क करें'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 italic">
                {isEn ? 'No hostel content available.' : 'कोई छात्रावास सामग्री उपलब्ध नहीं है।'}
              </div>
            )}
          </section>

          {/* Right display panel */}
          <aside className="w-full md:w-72 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h4 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1 text-[#800000]">
              {isEn ? 'Quick Info' : 'त्वरित जानकारी'}
            </h4>
            <div className="text-base text-slate-700 space-y-4">
              <div>
                <div className="font-bold text-gray-900">{isEn ? 'Warden & Contacts' : 'वार्डन और संपर्क'}</div>
                <div className="text-slate-600 text-sm leading-relaxed mt-1">
                  {isEn ? heading.warden_contacts_en : heading.warden_contacts_hn}
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-900">{isEn ? 'Mess Timings' : 'भोजन कक्ष का समय'}</div>
                <div className="text-slate-600 text-sm leading-relaxed mt-1 font-medium whitespace-pre-line">
                  {isEn ? heading.mess_timings_en : heading.mess_timings_hn}
                </div>
              </div>

              <div>
                <div className="font-bold text-gray-900">{isEn ? 'Important Links' : 'महत्वपूर्ण लिंक्स'}</div>
                <ul className="mt-2 space-y-1.5 text-sm font-semibold">
                  <li>
                    <Link href={heading.rules_url || '#'} className="text-[#800000] hover:underline">
                      {isEn ? 'Hostel Rules' : 'छात्रावास के नियम'}
                    </Link>
                  </li>
                  <li>
                    <Link href={heading.maintenance_url || '#'} className="text-[#800000] hover:underline">
                      {isEn ? 'Apply for Maintenance' : 'रखरखाव के लिए आवेदन करें'}
                    </Link>
                  </li>
                  <li>
                    <Link href={heading.emergency_url || '#'} className="text-[#800000] hover:underline">
                      {isEn ? 'Emergency Contacts' : 'आपातकालीन संपर्क'}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
