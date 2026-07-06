'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface LalkaarHeading {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  event_date_en: string;
  event_date_hn: string;
  event_venue_en: string;
  event_venue_hn: string;
  coordinator_en: string;
  coordinator_hn: string;
  register_url: string;
  brochure_url: string;
  quick_info_title_en: string;
  quick_info_title_hn: string;
  quick_info1_en: string;
  quick_info1_hn: string;
  quick_info2_en: string;
  quick_info2_hn: string;
  quick_info3_en: string;
  quick_info3_hn: string;
}

interface LalkaarSection {
  id?: number;
  key: string;
  en: string;
  hi: string;
  contentEn: string;
  contentHi: string;
}

const DEFAULT_HEADING: LalkaarHeading = {
  title_en: 'LALKAAR',
  title_hn: 'ललकार',
  sub_title_en: 'A celebration of sports, martial arts and student performances.',
  sub_title_hn: 'खेल, मार्शल आर्ट्स और छात्र प्रदर्शन का उत्सव।',
  event_date_en: '10th March, 2026',
  event_date_hn: '10 मार्च, 2026',
  event_venue_en: 'Institute Sports Ground',
  event_venue_hn: 'संस्थान खेल मैदान',
  coordinator_en: 'Prof. R.K. Jamalta — jamalta@nith.ac.in',
  coordinator_hn: 'प्रो. आर.के. जमालता — jamalta@nith.ac.in',
  register_url: '/student/sports',
  brochure_url: '/student/sports',
  quick_info_title_en: 'Quick Info',
  quick_info_title_hn: 'त्वरित जानकारी',
  quick_info1_en: 'Crowd expected: 1500+',
  quick_info1_hn: 'अपेक्षित भीड़: 1500+',
  quick_info2_en: 'Refreshments stalls: Available',
  quick_info2_hn: 'खाद्य स्टॉल: उपलब्ध',
  quick_info3_en: 'First-aid: At main gate',
  quick_info3_hn: 'प्रथम चिकित्सा: मुख्य गेट पर'
};

const DEFAULT_SECTIONS: LalkaarSection[] = [
  {
    key: 'about',
    en: 'About Us',
    hi: 'हमारे बारे में',
    contentEn: 'Lalkaar is an annual sports and cultural meet celebrating student energy, teamwork and competitive spirit. It features exhibitions, matches, and performances across disciplines.',
    contentHi: 'ललकार एक वार्षिक खेल और सांस्कृतिक सम्मेलन है जो छात्र ऊर्जा, टीम वर्क और प्रतिस्पर्धी भावना का जश्न मनाता है। इसमें प्रदर्शन, मैच और कई गतिविधियाँ शामिल हैं।'
  },
  {
    key: 'facilities',
    en: 'Facilities',
    hi: 'सुविधाएँ',
    contentEn: 'Our campus provides outdoor fields, indoor stadiums, gymnasia and training spaces. Temporary arrangements are made during the event for staging and spectator areas.',
    contentHi: 'हमारे परिसर में बाहरी मैदान, इनडोर स्टेडियम, जिम और प्रशिक्षण स्थान शामिल हैं। कार्यक्रम के दौरान स्टेजिंग और दर्शक क्षेत्रों के लिए अस्थायी व्यवस्था की जाती है।'
  },
  {
    key: 'events',
    en: 'Events',
    hi: 'आयोजन',
    contentEn: 'Events include athletics, team sports (football, basketball, volleyball), martial arts demonstrations, and cultural performances.',
    contentHi: 'आयोजनों में एथलेटिक्स, टीम स्पोर्ट्स (फुटबॉल, बास्केटबॉल, वॉलीबॉल), मार्शल आर्ट्स प्रदर्शन और सांस्कृतिक कार्यक्रम शामिल हैं।'
  },
  {
    key: 'karates',
    en: 'Karates',
    hi: 'मुक्केबाज़ी',
    contentEn: 'Karate demonstrations and friendly competitions are organised with coaching clinics for beginners.',
    contentHi: 'कराते प्रदर्शन और फ्रेंडली प्रतियोगिताएँ आयोजित की जाती हैं, जिनमें शुरुआती के लिए कोचिंग क्लिनिक्स शामिल हैं।'
  },
  {
    key: 'yoga',
    en: 'Yoga',
    hi: 'योग',
    contentEn: 'Yoga sessions and workshops focusing on wellness, flexibility and mindfulness are conducted by certified instructors.',
    contentHi: 'स्वास्थ्य, लचीलापन और माइंडफुलनेस पर केंद्रित योग सत्र और कार्यशालाएँ प्रमाणित प्रशिक्षकों द्वारा कराई जाती हैं।'
  },
  {
    key: 'achievements',
    en: 'Achievements',
    hi: 'उपलब्धियाँ',
    contentEn: 'Students consistently secure top positions in zonal and national competitions; several medalists emerge each year.',
    contentHi: 'छात्र क्षेत्रीय और राष्ट्रीय प्रतियोगिताओं में लगातार शीर्ष स्थान प्राप्त करते हैं; प्रत्येक वर्ष कई पदक विजेता उभरते हैं।'
  },
  {
    key: 'contact',
    en: 'Contact Us',
    hi: 'संपर्क करें',
    contentEn: 'For inquiries: Sports Office | Phone: 254570 | Email: sports@nith.ac.in',
    contentHi: 'संपर्क के लिए: खेल कार्यालय | फोन: 254570 | ईमेल: sports@nith.ac.in'
  }
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const [active, setActive] = useState('about');
  const [heading, setHeading] = useState<LalkaarHeading>(DEFAULT_HEADING);
  const [sections, setSections] = useState<LalkaarSection[]>(DEFAULT_SECTIONS);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const loadData = async () => {
      try {
        const headRes = await fetch(`${API_URL}/api/student-lalkaar`, { cache: 'no-store' });
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeading({
              title_en: hData.title_en || DEFAULT_HEADING.title_en,
              title_hn: hData.title_hn || DEFAULT_HEADING.title_hn,
              sub_title_en: hData.sub_title_en || DEFAULT_HEADING.sub_title_en,
              sub_title_hn: hData.sub_title_hn || DEFAULT_HEADING.sub_title_hn,
              event_date_en: hData.event_date_en || DEFAULT_HEADING.event_date_en,
              event_date_hn: hData.event_date_hn || DEFAULT_HEADING.event_date_hn,
              event_venue_en: hData.event_venue_en || DEFAULT_HEADING.event_venue_en,
              event_venue_hn: hData.event_venue_hn || DEFAULT_HEADING.event_venue_hn,
              coordinator_en: hData.coordinator_en || DEFAULT_HEADING.coordinator_en,
              coordinator_hn: hData.coordinator_hn || DEFAULT_HEADING.coordinator_hn,
              register_url: hData.register_url || DEFAULT_HEADING.register_url,
              brochure_url: hData.brochure_url || DEFAULT_HEADING.brochure_url,
              quick_info_title_en: hData.quick_info_title_en || DEFAULT_HEADING.quick_info_title_en,
              quick_info_title_hn: hData.quick_info_title_hn || DEFAULT_HEADING.quick_info_title_hn,
              quick_info1_en: hData.quick_info1_en || DEFAULT_HEADING.quick_info1_en,
              quick_info1_hn: hData.quick_info1_hn || DEFAULT_HEADING.quick_info1_hn,
              quick_info2_en: hData.quick_info2_en || DEFAULT_HEADING.quick_info2_en,
              quick_info2_hn: hData.quick_info2_hn || DEFAULT_HEADING.quick_info2_hn,
              quick_info3_en: hData.quick_info3_en || DEFAULT_HEADING.quick_info3_en,
              quick_info3_hn: hData.quick_info3_hn || DEFAULT_HEADING.quick_info3_hn,
            });
          }
        }

        const secRes = await fetch(`${API_URL}/api/student-lalkaar/sections`, { cache: 'no-store' });
        if (secRes.ok) {
          const sData = await secRes.json();
          if (Array.isArray(sData) && sData.length > 0) {
            const formatted = sData.map((s: any) => ({
              id: s.id,
              key: s.key,
              en: s.en,
              hi: s.hi,
              contentEn: s.content_en,
              contentHi: s.content_hi
            }));
            setSections(formatted);
          }
        }
      } catch (err) {
        console.warn('Failed to load dynamic sports Lalkaar data. Using fallbacks.', err);
      }
    };
    loadData();
  }, []);

  const activeSection = sections.find((s) => s.key === active) || sections[0] || DEFAULT_SECTIONS[0];
  const isEn = language === 'en';

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
              {isEn ? 'Home' : 'होम'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {isEn ? 'Student' : 'छात्र'}
            </span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {isEn ? 'Sports' : 'खेलकूद'}
            </span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {isEn ? 'Lalkaar' : 'ललकार'}
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center py-20 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase">
            {isEn ? heading.title_en : heading.title_hn}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isEn ? heading.sub_title_en : heading.sub_title_hn}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_280px] gap-6">
          {/* Left Sidebar */}
          <aside className="hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="text-lg font-semibold mb-3">
                {isEn ? 'Explore' : 'खोजें'}
              </h3>
              <nav className="space-y-2">
                {sections.map((s, idx) => (
                  <button
                    key={s.id || s.key || idx}
                    onClick={() => setActive(s.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${active === s.key ? 'bg-[#800000] text-white' : 'hover:bg-gray-100'}`}
                  >
                    {isEn ? s.en : s.hi}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
          {/* Main / Right display */}
          <section className="space-y-6">
            {/* Mobile selector */}
            <div className="md:hidden bg-white rounded-lg shadow-sm p-4">
              <label className="sr-only">
                {isEn ? 'Select section' : 'धारा चुनें'}
              </label>
              <select
                value={active}
                onChange={(e) => setActive(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2"
              >
                {sections.map((s, idx) => (
                  <option key={s.id || s.key || idx} value={s.key}>
                    {isEn ? s.en : s.hi}
                  </option>
                ))}
              </select>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-2xl font-semibold mb-3">
                {isEn ? activeSection.en : activeSection.hi}
              </h2>
              <p className="text-gray-700">
                {isEn ? activeSection.contentEn : activeSection.contentHi}
              </p>
              {/* Dynamic extra content for display */}
              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <p>
                  <span className="font-semibold text-gray-800">{isEn ? 'Date' : 'तिथि'}:</span> {isEn ? heading.event_date_en : heading.event_date_hn}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">{isEn ? 'Venue' : 'स्थल'}:</span> {isEn ? heading.event_venue_en : heading.event_venue_hn}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">{isEn ? 'Coordinator' : 'समन्वयक'}:</span> {isEn ? heading.coordinator_en : heading.coordinator_hn}
                </p>
              </div>
              {/* Quick actions / links */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={heading.register_url}
                  className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-[#800000] hover:text-white transition"
                >
                  {isEn ? 'Register' : 'पंजीकरण'}
                </Link>
                <Link
                  href={heading.brochure_url}
                  className="px-4 py-2 rounded-lg border border-slate-200"
                >
                  {isEn ? 'Download Brochure' : 'ब्रॉशर डाउनलोड करें'}
                </Link>
              </div>
            </motion.div>
          </section>
          <aside className="hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h4 className="font-semibold mb-2">
                {isEn ? heading.quick_info_title_en : heading.quick_info_title_hn}
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>
                  {isEn ? heading.quick_info1_en : heading.quick_info1_hn}
                </li>
                <li>
                  {isEn ? heading.quick_info2_en : heading.quick_info2_hn}
                </li>
                <li>
                  {isEn ? heading.quick_info3_en : heading.quick_info3_hn}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
