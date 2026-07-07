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

interface NccHeading {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  history_title_en: string;
  history_title_hn: string;
  history_desc_en: string;
  history_desc_hn: string;
  motto_title_en: string;
  motto_title_hn: string;
  motto_desc_en: string;
  motto_desc_hn: string;
  aim_title_en: string;
  aim_title_hn: string;
  aim_desc_en: string;
  aim_desc_hn: string;
  camps_title_en: string;
  camps_title_hn: string;
  community_title_en: string;
  community_title_hn: string;
  coord_email: string;
  calendar_url: string;
}

interface NccCamp {
  id?: number;
  camp_en: string;
  camp_hn: string;
}

interface NccCommunity {
  id?: number;
  service_en: string;
  service_hn: string;
}

const DEFAULT_HEADING: NccHeading = {
  title_en: 'National Cadet Corps (NCC)',
  title_hn: 'राष्ट्रीय कैडेट कोर (एनसीसी)',
  sub_title_en: 'NCC fosters discipline, leadership and community service through training and outreach programs for students.',
  sub_title_hn: 'एनसीसी छात्रों के लिए प्रशिक्षण और आउटरीच कार्यक्रमों के माध्यम से अनुशासन, नेतृत्व और सामुदायिक सेवा को बढ़ावा देता है।',
  history_title_en: 'History',
  history_title_hn: 'इतिहास',
  history_desc_en: 'The NCC (National Cadet Corps) has its origin in the University Corps formed in the early 20th century. It was later formalized into NCC to develop discipline and leadership among the youth through military-style training and community service.',
  history_desc_hn: 'एनसीसी (राष्ट्रीय कैडेट कोर) की उत्पत्ति 20वीं सदी की शुरुआत में गठित यूनिवर्सिटी कोर में हुई है। बाद में इसे सैन्य-शैली के प्रशिक्षण और सामुदायिक सेवा के माध्यम से युवाओं में अनुशासन और नेतृत्व विकसित करने के लिए एनसीसी का रूप दिया गया।',
  motto_title_en: 'NCC Motto',
  motto_title_hn: 'एनसीसी आदर्श वाक्य',
  motto_desc_en: "The official motto of NCC is 'Unity and Discipline', emphasizing the values the organization seeks to instill in cadets.",
  motto_desc_hn: "एनसीसी का आधिकारिक आदर्श वाक्य 'एकता और अनुशासन' है, जो उन मूल्यों पर जोर देता है जो संगठन कैडेटों में पैदा करना चाहता है।",
  aim_title_en: 'Aim of NCC',
  aim_title_hn: 'एनसीसी का उद्देश्य',
  aim_desc_en: 'NCC aims to develop character, leadership, a spirit of adventure, and the ideals of selfless service among young citizens.',
  aim_desc_hn: 'एनसीसी का उद्देश्य युवा नागरिकों के बीच चरित्र, नेतृत्व, साहस की भावना और निस्वार्थ सेवा के आदर्शों को विकसित करना है।',
  camps_title_en: 'Central Camps',
  camps_title_hn: 'केंद्रीय शिविर',
  community_title_en: 'Community Services',
  community_title_hn: 'सामुदायिक सेवाएं',
  coord_email: 'ncc-coordinator@nith.ac.in',
  calendar_url: '/student/welfare'
};

const DEFAULT_CAMPS: NccCamp[] = [
  {
    camp_en: 'Leadership and team-building exercises.',
    camp_hn: 'नेतृत्व और टीम-निर्माण अभ्यास।'
  },
  {
    camp_en: 'Adventure sports (trekking, obstacle courses).',
    camp_hn: 'साहसिक खेल (ट्रेकिंग, बाधा कोर्स)।'
  },
  {
    camp_en: 'Drill and ceremonial training.',
    camp_hn: 'ड्रिल और औपचारिक प्रशिक्षण।'
  },
  {
    camp_en: 'Competitive events and awarding of certificates.',
    camp_hn: 'प्रतिस्पर्धी कार्यक्रम और प्रमाणपत्रों का वितरण।'
  }
];

const DEFAULT_COMMUNITY: NccCommunity[] = [
  {
    service_en: 'Disaster relief participation and coordination.',
    service_hn: 'आपदा राहत भागीदारी और समन्वय।'
  },
  {
    service_en: 'Blood donation and health awareness drives.',
    service_hn: 'रक्तदान और स्वास्थ्य जागरूकता अभियान।'
  },
  {
    service_en: 'Tree plantation and environmental conservation projects.',
    service_hn: 'वृक्षारोपण और पर्यावरण संरक्षण परियोजनाएं।'
  },
  {
    service_en: 'Community literacy and outreach programs.',
    service_hn: 'सामुदायिक साक्षरता और आउटरीच कार्यक्रम।'
  }
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isEn = language === 'en';

  const [active, setActive] = useState<string>('history');
  const [heading, setHeading] = useState<NccHeading>(DEFAULT_HEADING);
  const [camps, setCamps] = useState<NccCamp[]>(DEFAULT_CAMPS);
  const [community, setCommunity] = useState<NccCommunity[]>(DEFAULT_COMMUNITY);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const loadData = async () => {
      try {
        const headRes = await fetch(`${API_URL}/api/student-ncc`, { cache: 'no-store' });
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeading({
              title_en: hData.title_en || DEFAULT_HEADING.title_en,
              title_hn: hData.title_hn || DEFAULT_HEADING.title_hn,
              sub_title_en: hData.sub_title_en || DEFAULT_HEADING.sub_title_en,
              sub_title_hn: hData.sub_title_hn || DEFAULT_HEADING.sub_title_hn,
              history_title_en: hData.history_title_en || DEFAULT_HEADING.history_title_en,
              history_title_hn: hData.history_title_hn || DEFAULT_HEADING.history_title_hn,
              history_desc_en: hData.history_desc_en || DEFAULT_HEADING.history_desc_en,
              history_desc_hn: hData.history_desc_hn || DEFAULT_HEADING.history_desc_hn,
              motto_title_en: hData.motto_title_en || DEFAULT_HEADING.motto_title_en,
              motto_title_hn: hData.motto_title_hn || DEFAULT_HEADING.motto_title_hn,
              motto_desc_en: hData.motto_desc_en || DEFAULT_HEADING.motto_desc_en,
              motto_desc_hn: hData.motto_desc_hn || DEFAULT_HEADING.motto_desc_hn,
              aim_title_en: hData.aim_title_en || DEFAULT_HEADING.aim_title_en,
              aim_title_hn: hData.aim_title_hn || DEFAULT_HEADING.aim_title_hn,
              aim_desc_en: hData.aim_desc_en || DEFAULT_HEADING.aim_desc_en,
              aim_desc_hn: hData.aim_desc_hn || DEFAULT_HEADING.aim_desc_hn,
              camps_title_en: hData.camps_title_en || DEFAULT_HEADING.camps_title_en,
              camps_title_hn: hData.camps_title_hn || DEFAULT_HEADING.camps_title_hn,
              community_title_en: hData.community_title_en || DEFAULT_HEADING.community_title_en,
              community_title_hn: hData.community_title_hn || DEFAULT_HEADING.community_title_hn,
              coord_email: hData.coord_email || DEFAULT_HEADING.coord_email,
              calendar_url: hData.calendar_url || DEFAULT_HEADING.calendar_url
            });
          }
        }

        const campRes = await fetch(`${API_URL}/api/student-ncc/camps`, { cache: 'no-store' });
        if (campRes.ok) {
          const cData = await campRes.json();
          if (Array.isArray(cData) && cData.length > 0) {
            setCamps(cData);
          }
        }

        const commRes = await fetch(`${API_URL}/api/student-ncc/community`, { cache: 'no-store' });
        if (commRes.ok) {
          const cmData = await commRes.json();
          if (Array.isArray(cmData) && cmData.length > 0) {
            setCommunity(cmData);
          }
        }
      } catch (err) {
        console.warn('Failed to load dynamic NCC data. Using defaults.', err);
      }
    };
    loadData();
  }, [API_URL]);

  const SECTIONS = [
    {
      key: 'history',
      title: isEn ? heading.history_title_en : heading.history_title_hn,
      content: isEn ? heading.history_desc_en : heading.history_desc_hn,
    },
    {
      key: 'motto',
      title: isEn ? heading.motto_title_en : heading.motto_title_hn,
      content: isEn ? heading.motto_desc_en : heading.motto_desc_hn,
    },
    {
      key: 'aim',
      title: isEn ? heading.aim_title_en : heading.aim_title_hn,
      content: isEn ? heading.aim_desc_en : heading.aim_desc_hn,
    },
    {
      key: 'camps',
      title: isEn ? heading.camps_title_en : heading.camps_title_hn,
      content: '',
    },
    {
      key: 'community',
      title: isEn ? heading.community_title_en : heading.community_title_hn,
      content: '',
    },
  ];

  const current = SECTIONS.find((s) => s.key === active) ?? SECTIONS[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div>
        <Header31 />
      </div>

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {isEn ? 'Home' : 'होम'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {isEn ? 'Student' : 'छात्र'}
            </span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {isEn ? 'NCC' : 'एनसीसी'}
            </span>
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
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 uppercase">
            {isEn ? heading.title_en : heading.title_hn}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isEn ? heading.sub_title_en : heading.sub_title_hn}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-72 bg-white rounded-lg shadow-sm p-4 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {isEn ? 'NCC' : 'एनसीसी'}
            </h3>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => setActive(s.key)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                      active === s.key 
                        ? 'bg-[#800000] text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content panel */}
          <section className="flex-1 bg-white rounded-lg shadow-sm p-6 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between border-b pb-3">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {current.title}
                </h2>
                <div className="text-sm text-gray-500 font-medium">
                  {SECTIONS.findIndex((s) => s.key === current.key) + 1} /{' '}
                  {SECTIONS.length}
                </div>
              </div>

              <div className="mt-4 prose prose-sm max-w-none text-gray-700">
                {current.key === 'camps' ? (
                  <div>
                    <p className="font-medium mb-3">
                      {isEn ? 'Sample central camp activities include:' : 'सत्र के दौरान केंद्रीय शिविर गतिविधियों में शामिल हैं:'}
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      {camps.map((c, idx) => (
                        <li key={c.id || idx}>
                          {isEn ? c.camp_en : c.camp_hn}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : current.key === 'community' ? (
                  <div>
                    <ul className="list-disc pl-6 space-y-2">
                      {community.map((cm, idx) => (
                        <li key={cm.id || idx}>
                          {isEn ? cm.service_en : cm.service_hn}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {current.content}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 border-t pt-4">
              <Link
                href={heading.calendar_url}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000] hover:bg-[#6a0000] text-white rounded-md text-sm font-medium transition duration-200"
              >
                {isEn ? 'View Training Calendar' : 'प्रशिक्षण कैलेंडर देखें'}
              </Link>
              <a
                href={`mailto:${heading.coord_email}`}
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100 font-medium transition duration-200"
              >
                {isEn ? 'Contact Coordinator' : 'समन्वयक से संपर्क करें'}
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
