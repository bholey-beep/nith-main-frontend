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

interface Facility {
  id: number;
  facility_en: string;
  facility_hn: string;
}

interface Event {
  id: number;
  event_en: string;
  event_hn: string;
}

interface Achievement {
  id: number;
  achievement_en: string;
  achievement_hn: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  intro_title_en: string;
  intro_title_hn: string;
  intro_desc_en: string;
  intro_desc_hn: string;
  facilities_title_en: string;
  facilities_title_hn: string;
  events_title_en: string;
  events_title_hn: string;
  achievements_title_en: string;
  achievements_title_hn: string;
  achievements_desc_en: string;
  achievements_desc_hn: string;
  contact_title_en: string;
  contact_title_hn: string;

  coord1_name_en: string;
  coord1_name_hn: string;
  coord1_role_en: string;
  coord1_role_hn: string;
  coord1_contact: string;
  coord1_email: string;

  coord2_name_en: string;
  coord2_name_hn: string;
  coord2_address_en: string;
  coord2_address_hn: string;
  coord2_contact: string;
  coord2_email: string;
}

// 100% Robust fallback values matching the original static content
const DEFAULT_HEADINGS: HeadingData = {
  title_en: 'SPORTS & GAMES',
  title_hn: 'खेलकूद और खेल',
  sub_title_en: 'Promoting health, teamwork and excellence through various sports and recreational activities.',
  sub_title_hn: 'विभिन्न खेल और मनोरंजक गतिविधियों के माध्यम से स्वास्थ्य, टीम भावना और उत्कृष्टता को बढ़ावा देना।',
  intro_title_en: 'Introduction',
  intro_title_hn: 'परिचय',
  intro_desc_en: 'The Sports & Games section at our institute is dedicated to encouraging physical fitness, sportsmanship and competitive excellence among students. We offer coaching, regular tournaments and facilities across indoor and outdoor disciplines.',
  intro_desc_hn: 'हमारे संस्थान में खेल और खेल अनुभाग छात्रों में शारीरिक फिटनेस, खेल भावना और प्रतियोगी उत्कृष्टता को बढ़ावा देने के लिए समर्पित है। हम कोचिंग, नियमित टूर्नामेंट और इनडोर और आउटडोर दोनों प्रकार की सुविधाएँ प्रदान करते हैं।',
  facilities_title_en: 'Facilities',
  facilities_title_hn: 'सुविधाएँ',
  events_title_en: 'Major Events',
  events_title_hn: 'मुख्य आयोजन',
  achievements_title_en: 'Notable Achievements',
  achievements_title_hn: 'उल्लेखनीय उपलब्धियाँ',
  achievements_desc_en: 'Our teams and individual athletes have secured medals and top finishes at zonal and national level competitions across multiple disciplines.',
  achievements_desc_hn: 'हमारी टीमों और व्यक्तिगत खिलाड़ियों ने कई विषयों में क्षेत्रीय और राष्ट्रीय स्तर की प्रतियोगिताओं में पदक और शीर्ष रैंक हासिल किए हैं।',
  contact_title_en: 'Contact & Coordinators',
  contact_title_hn: 'संपर्क और समन्वयक',

  coord1_name_en: 'Prof. R.K. Jamalta',
  coord1_name_hn: 'प्रो. आर.के. जमालता',
  coord1_role_en: 'Faculty In-charge, Sports & Games',
  coord1_role_hn: 'फैकल्टी प्रभारी, खेल और खेल',
  coord1_contact: '254570 | Mobile: 7018709303',
  coord1_email: 'jamalta@nith.ac.in',

  coord2_name_en: 'Sports Office',
  coord2_name_hn: 'खेल कार्यालय',
  coord2_address_en: 'Sports Complex, Institute Campus',
  coord2_address_hn: 'खेल परिसर, संस्थान परिसर',
  coord2_contact: '254570',
  coord2_email: 'sports@nith.ac.in',
};

const DEFAULT_FACILITIES: Facility[] = [
  { id: 1, facility_en: 'Athletic track and outdoor fields', facility_hn: 'एथलेटिक ट्रैक और बाहरी मैदान' },
  { id: 2, facility_en: 'Multi-purpose indoor stadium and courts', facility_hn: 'मल्टी-परपज़ इनडोर स्टेडियम और कोर्ट' },
  { id: 3, facility_en: 'Gymnasium with modern equipment', facility_hn: 'आधुनिक उपकरणों वाला जिम' },
  { id: 4, facility_en: 'Swimming pool and aquatics facilities', facility_hn: 'तैराकी पूल और जल क्रीड़ा सुविधाएँ' },
  { id: 5, facility_en: 'Coaching and fitness programs', facility_hn: 'कोचिंग और फिटनेस प्रोग्राम' }
];

const DEFAULT_EVENTS: Event[] = [
  { id: 1, event_en: 'Annual Sports Day (Inter-hostel & Institute level)', event_hn: 'वार्षिक खेल दिवस (इंटर-होस्टल और संस्थान स्तर)' },
  { id: 2, event_en: 'Inter-department tournaments and leagues', event_hn: 'इंटर-डिपार्टमेंट टूर्नामेंट और लीग' },
  { id: 3, event_en: 'External competitions and representation at Inter-NIT meets', event_hn: 'बाहरी प्रतियोगिताएँ और इंटर-एनआईटी में प्रतिनिधित्व' },
  { id: 4, event_en: 'Fitness camps and coaching clinics', event_hn: 'फिटनेस कैंप और कोचिंग क्लिनिक्स' }
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 1, achievement_en: 'Consistent representation at Inter-NIT Championships', achievement_hn: 'इंटर-एनआईटी चैम्पियनशिप में लगातार प्रतिनिधित्व' },
  { id: 2, achievement_en: 'Medal winners in athletics and team sports', achievement_hn: 'एथलेटिक्स और टीम स्पोर्ट्स में पदक विजेता' },
  { id: 3, achievement_en: 'Regular selection of students for state and national camps', achievement_hn: 'राज्य और राष्ट्रीय शिविरों के लिए नियमित चयन' }
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const [headings, setHeadings] = useState<HeadingData>(DEFAULT_HEADINGS);
  const [facilities, setFacilities] = useState<Facility[]>(DEFAULT_FACILITIES);
  const [events, setEvents] = useState<Event[]>(DEFAULT_EVENTS);
  const [achievements, setAchievements] = useState<Achievement[]>(DEFAULT_ACHIEVEMENTS);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const loadDynamicData = async () => {
      try {
        // Fetch Headings
        const headRes = await fetch(`${API_URL}/api/student-sports-intro`, { cache: 'no-store' });
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeadings({
              title_en: hData.title_en || DEFAULT_HEADINGS.title_en,
              title_hn: hData.title_hn || DEFAULT_HEADINGS.title_hn,
              sub_title_en: hData.sub_title_en || DEFAULT_HEADINGS.sub_title_en,
              sub_title_hn: hData.sub_title_hn || DEFAULT_HEADINGS.sub_title_hn,
              intro_title_en: hData.intro_title_en || DEFAULT_HEADINGS.intro_title_en,
              intro_title_hn: hData.intro_title_hn || DEFAULT_HEADINGS.intro_title_hn,
              intro_desc_en: hData.intro_desc_en || DEFAULT_HEADINGS.intro_desc_en,
              intro_desc_hn: hData.intro_desc_hn || DEFAULT_HEADINGS.intro_desc_hn,
              facilities_title_en: hData.facilities_title_en || DEFAULT_HEADINGS.facilities_title_en,
              facilities_title_hn: hData.facilities_title_hn || DEFAULT_HEADINGS.facilities_title_hn,
              events_title_en: hData.events_title_en || DEFAULT_HEADINGS.events_title_en,
              events_title_hn: hData.events_title_hn || DEFAULT_HEADINGS.events_title_hn,
              achievements_title_en: hData.achievements_title_en || DEFAULT_HEADINGS.achievements_title_en,
              achievements_title_hn: hData.achievements_title_hn || DEFAULT_HEADINGS.achievements_title_hn,
              achievements_desc_en: hData.achievements_desc_en || DEFAULT_HEADINGS.achievements_desc_en,
              achievements_desc_hn: hData.achievements_desc_hn || DEFAULT_HEADINGS.achievements_desc_hn,
              contact_title_en: hData.contact_title_en || DEFAULT_HEADINGS.contact_title_en,
              contact_title_hn: hData.contact_title_hn || DEFAULT_HEADINGS.contact_title_hn,

              coord1_name_en: hData.coord1_name_en || DEFAULT_HEADINGS.coord1_name_en,
              coord1_name_hn: hData.coord1_name_hn || DEFAULT_HEADINGS.coord1_name_hn,
              coord1_role_en: hData.coord1_role_en || DEFAULT_HEADINGS.coord1_role_en,
              coord1_role_hn: hData.coord1_role_hn || DEFAULT_HEADINGS.coord1_role_hn,
              coord1_contact: hData.coord1_contact || DEFAULT_HEADINGS.coord1_contact,
              coord1_email: hData.coord1_email || DEFAULT_HEADINGS.coord1_email,

              coord2_name_en: hData.coord2_name_en || DEFAULT_HEADINGS.coord2_name_en,
              coord2_name_hn: hData.coord2_name_hn || DEFAULT_HEADINGS.coord2_name_hn,
              coord2_address_en: hData.coord2_address_en || DEFAULT_HEADINGS.coord2_address_en,
              coord2_address_hn: hData.coord2_address_hn || DEFAULT_HEADINGS.coord2_address_hn,
              coord2_contact: hData.coord2_contact || DEFAULT_HEADINGS.coord2_contact,
              coord2_email: hData.coord2_email || DEFAULT_HEADINGS.coord2_email,
            });
          }
        }

        // Fetch Facilities
        const facRes = await fetch(`${API_URL}/api/student-sports-intro/facilities`, { cache: 'no-store' });
        if (facRes.ok) {
          const fData = await facRes.json();
          if (Array.isArray(fData)) setFacilities(fData);
        }

        // Fetch Events
        const evRes = await fetch(`${API_URL}/api/student-sports-intro/events`, { cache: 'no-store' });
        if (evRes.ok) {
          const eData = await evRes.json();
          if (Array.isArray(eData)) setEvents(eData);
        }

        // Fetch Achievements
        const achRes = await fetch(`${API_URL}/api/student-sports-intro/achievements`, { cache: 'no-store' });
        if (achRes.ok) {
          const aData = await achRes.json();
          if (Array.isArray(aData)) setAchievements(aData);
        }
      } catch (err) {
        console.warn('Backend is down or unreachable. Using robust static fallbacks.', err);
      }
    };
    loadDynamicData();
  }, []);

  const isEn = language === 'en';

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumbs */}
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
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial={fadeUp.hidden}
          animate={fadeUp.visible}
          className="relative z-10 text-center py-20 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase">
            {isEn ? headings.title_en : headings.title_hn}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isEn ? headings.sub_title_en : headings.sub_title_hn}
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6">
          
          {/* Introduction Header & Text */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {isEn ? headings.intro_title_en : headings.intro_title_hn}
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {isEn ? headings.intro_desc_en : headings.intro_desc_hn}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            
            {/* Facilities Bullet Points */}
            <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 shadow-xs">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-[#631012]/10">
                {isEn ? headings.facilities_title_en : headings.facilities_title_hn}
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {facilities.map((fac) => (
                  <li key={fac.id} className="leading-relaxed">
                    {isEn ? fac.facility_en : fac.facility_hn}
                  </li>
                ))}
              </ul>
            </div>

            {/* Major Events Bullet Points */}
            <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 shadow-xs">
              <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-[#631012]/10">
                {isEn ? headings.events_title_en : headings.events_title_hn}
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {events.map((ev) => (
                  <li key={ev.id} className="leading-relaxed">
                    {isEn ? ev.event_en : ev.event_hn}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Notable Achievements Checklist Section */}
          <div className="mt-8 bg-gray-50/50 p-6 rounded-xl border border-gray-100 shadow-xs">
            <h3 className="text-xl font-bold text-gray-800 mb-3 pb-2 border-b border-[#631012]/10">
              {isEn ? headings.achievements_title_en : headings.achievements_title_hn}
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {isEn ? headings.achievements_desc_en : headings.achievements_desc_hn}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {achievements.map((ach) => (
                <li key={ach.id} className="leading-relaxed">
                  {isEn ? ach.achievement_en : ach.achievement_hn}
                </li>
              ))}
            </ul>
          </div>

          {/* Coordinators & Contacts Footer Panel */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {isEn ? headings.contact_title_en : headings.contact_title_hn}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              
              {/* Faculty In-charge Card */}
              <div className="p-5 bg-[#631012]/5 rounded-xl border border-[#631012]/10 space-y-2">
                <div className="font-bold text-lg text-gray-900">
                  {isEn ? headings.coord1_name_en : headings.coord1_name_hn}
                </div>
                <div className="text-sm font-medium text-[#631012]">
                  {isEn ? headings.coord1_role_en : headings.coord1_role_hn}
                </div>
                <div className="text-sm space-y-1 text-gray-600 pt-1">
                  <div><span className="font-semibold text-gray-800">{isEn ? 'Phone' : 'फोन'}:</span> {headings.coord1_contact}</div>
                  <div><span className="font-semibold text-gray-800">Email:</span> {headings.coord1_email}</div>
                </div>
              </div>

              {/* Sports Office Card */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="font-bold text-lg text-gray-900">
                  {isEn ? headings.coord2_name_en : headings.coord2_name_hn}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {isEn ? headings.coord2_address_en : headings.coord2_address_hn}
                </div>
                <div className="text-sm space-y-1 text-gray-600 pt-1">
                  <div><span className="font-semibold text-gray-800">{isEn ? 'Office Contact' : 'कार्यालय संपर्क'}:</span> {headings.coord2_contact}</div>
                  <div><span className="font-semibold text-gray-800">Email:</span> {headings.coord2_email}</div>
                </div>
              </div>

            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
