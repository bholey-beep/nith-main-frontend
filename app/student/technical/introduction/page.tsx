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

// Robust static fallback variables in case the API is offline
const fallbackHeading = {
  title_en: 'TECHNICAL — INTRODUCTION',
  title_hn: 'तकनीकी — परिचय',
  sub_title_en: 'Technical clubs and societies nurture innovation, hands-on learning, and interdisciplinary projects. Students collaborate on robotics, software, electronics and space initiatives while participating in hackathons, competitions and research programmes.',
  sub_title_hn: 'तकनीकी क्लब और सोसाइटी नवप्रवर्तन, व्यावहारिक सीखने और अंत:विषय परियोजनाओं को बढ़ावा देते हैं। छात्र रोबोटिक्स, सॉफ़्टवेयर, इलेक्ट्रॉनिक्स और अन्तरिक्ष पहलों पर सहयोग करते हैं और हैकाथॉन, प्रतियोगिताओं और शोध कार्यक्रमों में भाग लेते हैं।',
  about_title_en: 'About Technical Clubs',
  about_title_hn: 'तकनीकी क्लबों के बारे में',
  about_desc1_en: 'Technical societies provide platforms for students to apply classroom knowledge to real-world problems. From prototype development and coding challenges to inter-college contests and research collaborations, these clubs build practical skills and industry readiness.',
  about_desc1_hn: 'तकनीकी सोसाइटी छात्रों को कक्षा के ज्ञान को वास्तविक दुनिया की समस्याओं पर लागू करने का मंच प्रदान करती हैं। प्रोटोटाइप विकास, कोडिंग चुनौतियाँ, अंतर-कॉलेज प्रतियोगिताएँ और शोध सहयोग छात्रों में व्यावहारिक कौशल और इंडस्ट्री के लिए तैयार होने की क्षमता विकसित करते हैं।',
  about_desc2_en: 'Students are encouraged to start new initiatives, take part in national-level competitions, and seek mentorship from faculty and industry experts.',
  about_desc2_hn: 'छात्रों को नई पहल शुरू करने, राष्ट्रीय स्तर की प्रतियोगिताओं में भाग लेने और फैकल्टी व उद्योग विशेषज्ञों से मार्गदर्शन लेने के लिए प्रोत्साहित किया जाता है।'
};

const fallbackSocieties = [
  {
    name_en: 'Robotics & Automation Club',
    name_hn: 'रोबोटिक्स एंड ऑटोमेशन क्लब',
    focus_en: 'Robotics design, autonomous systems, competitions (RoboFest, TechX)',
    focus_hn: 'रोबोटिक्स डिजाइन, स्वायत्त प्रणाली, प्रतियोगिताएं (रोबोफेस्ट, टेकएक्स)',
    faculty_en: 'Prof. R. Kumar',
    faculty_hn: 'प्रो. आर. कुमार',
    contact: 'robotics@nit.ac.in',
  },
  {
    name_en: 'Coding Club (CodeCell)',
    name_hn: 'कोडिंग क्लब (CodeCell)',
    focus_en: 'Competitive programming, coding workshops, hackathons',
    focus_hn: 'प्रतियोगी प्रोग्रामिंग, कोडिंग कार्यशालाएं, हैकाथॉन',
    faculty_en: 'Dr. A. Rao',
    faculty_hn: 'डॉ. ए. राव',
    contact: 'codecell@nit.ac.in',
  },
  {
    name_en: 'AI & ML Society',
    name_hn: 'एआई एंड एमएल सोसाइटी',
    focus_en: 'Machine learning projects, seminars and research initiatives',
    focus_hn: 'मशीन लर्निंग प्रोजेक्ट्स, सेमिनार और शोध पहल',
    faculty_en: 'Dr. S. Bansal',
    faculty_hn: 'डॉ. एस. बंसल',
    contact: 'aiml@nit.ac.in',
  },
  {
    name_en: 'Electronics & Embedded Systems',
    name_hn: 'इलेक्ट्रॉनिक्स एंड एंबेडेड सिस्टम्स',
    focus_en: 'PCB design, embedded projects and IoT labs',
    focus_hn: 'पीसीबी डिजाइन, एंबेडेड प्रोजेक्ट्स और आईओटी लैब्स',
    faculty_en: 'Prof. T. Iyer',
    faculty_hn: 'प्रो. टी. अय्यर',
    contact: 'ees@nit.ac.in',
  },
  {
    name_en: 'IEEE Student Branch',
    name_hn: 'आईईईई स्टूडेंट ब्रांच',
    focus_en: 'Technical talks, publications, standards and networking',
    focus_hn: 'तकनीकी वार्ता, प्रकाशन, मानक और नेटवर्किंग',
    faculty_en: 'Prof. M. N. Singh',
    faculty_hn: 'प्रो. एम. एन. सिंह',
    contact: 'ieee@nit.ac.in',
  },
  {
    name_en: 'Software & App Developers',
    name_hn: 'सॉफ्टवेयर एंड ऐप डेवलपर्स',
    focus_en: 'Mobile/web development, open-source collaboration',
    focus_hn: 'मोबाइल/वेब विकास, ओपन-सोर्स सहयोग',
    faculty_en: 'Prof. V. Desai',
    faculty_hn: 'प्रो. वी. देसाई',
    contact: 'apps@nit.ac.in',
  },
  {
    name_en: 'Astronomy & Space Society',
    name_hn: 'एस्ट्रोनामी एंड स्पेस सोसाइटी',
    focus_en: 'Astronomy nights, astrophotography and public outreach',
    focus_hn: 'खगोल विज्ञान रातें, एस्ट्रोफोटोग्राफी और सार्वजनिक आउटरीच',
    faculty_en: 'Dr. P. Nair',
    faculty_hn: 'डॉ. पी. नायर',
    contact: 'astro@nit.ac.in',
  },
  {
    name_en: 'SAE Collegiate Club',
    name_hn: 'एसएई कॉलेजिएट क्लब',
    focus_en: 'Vehicle design, Formula/BAJA teams and motorsport events',
    focus_hn: 'वाहन डिजाइन, फॉर्मूला/बाजा टीमें और मोटरस्पोर्ट कार्यक्रम',
    faculty_en: 'Prof. D. Joshi',
    faculty_hn: 'प्रो. डी. जोशी',
    contact: 'sae@nit.ac.in',
  },
];

export default function TechnicalIntroductionPage() {
  const language = useSelector((state: RootState) => state.language.value);

  const [headingData, setHeadingData] = useState<any>(null);
  const [societies, setSocieties] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function fetchData() {
      try {
        const headRes = await fetch(`${API_URL}/api/student-technical-intro`);
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeadingData(hData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch technical intro headings:', err);
      }

      try {
        const socRes = await fetch(`${API_URL}/api/student-technical-intro/societies`);
        if (socRes.ok) {
          const sData = await socRes.json();
          if (Array.isArray(sData) && sData.length > 0) {
            setSocieties(sData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch technical societies list:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL]);

  // Merge dynamic state with static fallbacks
  const activeHeading = headingData || fallbackHeading;
  const activeSocieties = societies.length > 0 ? societies : fallbackSocieties;

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
              {language == 'en' ? 'Home' : 'होम'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {language == 'en' ? 'Student' : 'छात्र'}
            </span>
            <span>›</span>
            <Link
              href="/student/technical"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language == 'en' ? 'Technical' : 'तकनीकी'}
            </Link>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {language == 'en' ? 'Introduction' : 'परिचय'}
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 text-center py-20 px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase">
              {language == 'en' ? activeHeading.title_en : activeHeading.title_hn}
            </h1>
            <p className="text-white/85 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              {language == 'en' ? activeHeading.sub_title_en : activeHeading.sub_title_hn}
            </p>
          </div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {language == 'en' ? activeHeading.about_title_en : activeHeading.about_title_hn}
          </h2>

          <div className="prose prose-slate text-gray-700 space-y-4">
            <p>
              {language == 'en' ? activeHeading.about_desc1_en : activeHeading.about_desc1_hn}
            </p>
            {activeHeading.about_desc2_en && (
              <p>
                {language == 'en' ? activeHeading.about_desc2_en : activeHeading.about_desc2_hn}
              </p>
            )}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {language == 'en'
                ? 'Technical Societies & Clubs'
                : 'तकनीकी सोसाइटी और क्लब'}
            </h3>
            <p className="text-sm text-gray-500">
              {language == 'en'
                ? 'Click a row to contact the faculty-in-charge'
                : 'किसी पंक्ति पर क्लिक करके संपर्क करें'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-[#800000] text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium">#</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {language == 'en' ? 'Society / Club' : 'सोसाइटी / क्लब'}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {language == 'en'
                      ? 'Focus / Activities'
                      : 'केंद्र / गतिविधियाँ'}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {language == 'en' ? 'Faculty In-charge' : 'फैकल्टी प्रभारी'}
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    {language == 'en' ? 'Contact' : 'संपर्क'}
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {activeSocieties.map((s, idx) => (
                  <tr
                    key={s.id || s.name_en}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => {
                      if (s.contact) {
                        window.location.href = `mailto:${s.contact}`;
                      }
                    }}
                  >
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                      {language == 'en' ? s.name_en : s.name_hn || s.name_en}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {language == 'en' ? s.focus_en : s.focus_hn || s.focus_en}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {language == 'en' ? s.faculty_en : s.faculty_hn || s.faculty_en}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#800000] underline">
                      {s.contact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

