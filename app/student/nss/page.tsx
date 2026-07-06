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

interface NssHeading {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  about_title_en: string;
  about_title_hn: string;
  about_desc_en: string;
  about_desc_hn: string;
  objective_title_en: string;
  objective_title_hn: string;
  activities_title_en: string;
  activities_title_hn: string;
  contact_title_en: string;
  contact_title_hn: string;
  coord_name_en: string;
  coord_name_hn: string;
  coord_email: string;
  coord_phone: string;
  coord_office_en: string;
  coord_office_hn: string;
  coord_hours_en: string;
  coord_hours_hn: string;
  calendar_url: string;
}

interface NssObjective {
  id?: number;
  objective_en: string;
  objective_hn: string;
}

interface NssActivity {
  id?: number;
  activity_en: string;
  activity_hn: string;
}

const DEFAULT_HEADING: NssHeading = {
  title_en: 'National Service Scheme (NSS)',
  title_hn: 'राष्ट्रीय सेवा योजना (एनएसएस)',
  sub_title_en: 'NSS encourages students to participate in community service and social outreach activities to foster social responsibility and leadership.',
  sub_title_hn: 'एनएसएस छात्रों को सामाजिक जिम्मेदारी और नेतृत्व को बढ़ावा देने के लिए सामुदायिक सेवा और सामाजिक आउटरीच गतिविधियों में भाग लेने के लिए प्रोत्साहित करता है।',
  about_title_en: 'About NSS',
  about_title_hn: 'एनएसएस के बारे में',
  about_desc_en: 'The National Service Scheme (NSS) is a public service program under the Ministry of Youth Affairs and Sports. NSS aims to develop students personality through community service and to inculcate social responsibility among youth.',
  about_desc_hn: 'राष्ट्रीय सेवा योजना (एनएसएस) युवा मामले और खेल मंत्रालय के तहत एक सार्वजनिक सेवा कार्यक्रम है। एनएसएस का उद्देश्य सामुदायिक सेवा के माध्यम से छात्रों के व्यक्तित्व का विकास करना और युवाओं में सामाजिक जिम्मेदारी की भावना पैदा करना है।',
  objective_title_en: 'Objective of NSS',
  objective_title_hn: 'एनएसएस का उद्देश्य',
  activities_title_en: 'NSS Regular Activities',
  activities_title_hn: 'एनएसएस की नियमित गतिविधियां',
  contact_title_en: 'Contact Us',
  contact_title_hn: 'संपर्क करें',
  coord_name_en: 'NSS Coordinator',
  coord_name_hn: 'एनएसएस समन्वयक',
  coord_email: 'nss-coordinator@nith.ac.in',
  coord_phone: '+91-00000-00000',
  coord_office_en: 'Student Affairs Building',
  coord_office_hn: 'छात्र कल्याण भवन',
  coord_hours_en: 'Mon-Fri 10:00-16:00',
  coord_hours_hn: 'सोम-शुक्र 10:00-16:00',
  calendar_url: '/student/welfare'
};

const DEFAULT_OBJECTIVES: NssObjective[] = [
  {
    objective_en: 'Developing student personality through community service.',
    objective_hn: 'सामुदायिक सेवा के माध्यम से छात्र व्यक्तित्व का विकास करना।'
  },
  {
    objective_en: 'Creating social awareness and leadership skills.',
    objective_hn: 'सामाजिक जागरूकता और नेतृत्व कौशल का निर्माण करना।'
  },
  {
    objective_en: 'Promoting national integration and social cohesion.',
    objective_hn: 'राष्ट्रीय एकीकरण और सामाजिक समरसता को बढ़ावा देना।'
  }
];

const DEFAULT_ACTIVITIES: NssActivity[] = [
  {
    activity_en: 'Weekly community camps and outreach programs.',
    activity_hn: 'साप्ताहिक सामुदायिक शिविर और आउटरीच कार्यक्रम।'
  },
  {
    activity_en: 'Blood donation and health awareness camps.',
    activity_hn: 'रक्तदान और स्वास्थ्य जागरूकता शिविर।'
  },
  {
    activity_en: 'Environmental drives and cleanliness campaigns.',
    activity_hn: 'पर्यावरण अभियान और स्वच्छता अभियान।'
  },
  {
    activity_en: 'Skill-building workshops and training sessions.',
    activity_hn: 'कौशल-निर्माण कार्यशालाएं और प्रशिक्षण सत्र।'
  }
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isEn = language === 'en';

  const [active, setActive] = useState<string>('about');
  const [heading, setHeading] = useState<NssHeading>(DEFAULT_HEADING);
  const [objectives, setObjectives] = useState<NssObjective[]>(DEFAULT_OBJECTIVES);
  const [activities, setActivities] = useState<NssActivity[]>(DEFAULT_ACTIVITIES);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const loadData = async () => {
      try {
        const headRes = await fetch(`${API_URL}/api/student-nss`, { cache: 'no-store' });
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeading({
              title_en: hData.title_en || DEFAULT_HEADING.title_en,
              title_hn: hData.title_hn || DEFAULT_HEADING.title_hn,
              sub_title_en: hData.sub_title_en || DEFAULT_HEADING.sub_title_en,
              sub_title_hn: hData.sub_title_hn || DEFAULT_HEADING.sub_title_hn,
              about_title_en: hData.about_title_en || DEFAULT_HEADING.about_title_en,
              about_title_hn: hData.about_title_hn || DEFAULT_HEADING.about_title_hn,
              about_desc_en: hData.about_desc_en || DEFAULT_HEADING.about_desc_en,
              about_desc_hn: hData.about_desc_hn || DEFAULT_HEADING.about_desc_hn,
              objective_title_en: hData.objective_title_en || DEFAULT_HEADING.objective_title_en,
              objective_title_hn: hData.objective_title_hn || DEFAULT_HEADING.objective_title_hn,
              activities_title_en: hData.activities_title_en || DEFAULT_HEADING.activities_title_en,
              activities_title_hn: hData.activities_title_hn || DEFAULT_HEADING.activities_title_hn,
              contact_title_en: hData.contact_title_en || DEFAULT_HEADING.contact_title_en,
              contact_title_hn: hData.contact_title_hn || DEFAULT_HEADING.contact_title_hn,
              coord_name_en: hData.coord_name_en || DEFAULT_HEADING.coord_name_en,
              coord_name_hn: hData.coord_name_hn || DEFAULT_HEADING.coord_name_hn,
              coord_email: hData.coord_email || DEFAULT_HEADING.coord_email,
              coord_phone: hData.coord_phone || DEFAULT_HEADING.coord_phone,
              coord_office_en: hData.coord_office_en || DEFAULT_HEADING.coord_office_en,
              coord_office_hn: hData.coord_office_hn || DEFAULT_HEADING.coord_office_hn,
              coord_hours_en: hData.coord_hours_en || DEFAULT_HEADING.coord_hours_en,
              coord_hours_hn: hData.coord_hours_hn || DEFAULT_HEADING.coord_hours_hn,
              calendar_url: hData.calendar_url || DEFAULT_HEADING.calendar_url
            });
          }
        }

        const objRes = await fetch(`${API_URL}/api/student-nss/objectives`, { cache: 'no-store' });
        if (objRes.ok) {
          const oData = await objRes.json();
          if (Array.isArray(oData) && oData.length > 0) {
            setObjectives(oData);
          }
        }

        const actRes = await fetch(`${API_URL}/api/student-nss/activities`, { cache: 'no-store' });
        if (actRes.ok) {
          const aData = await actRes.json();
          if (Array.isArray(aData) && aData.length > 0) {
            setActivities(aData);
          }
        }
      } catch (err) {
        console.warn('Failed to load dynamic NSS data. Using defaults.', err);
      }
    };
    loadData();
  }, [API_URL]);

  const SECTIONS = [
    {
      key: 'about',
      title: isEn ? heading.about_title_en : heading.about_title_hn,
      content: isEn ? heading.about_desc_en : heading.about_desc_hn,
    },
    {
      key: 'objective',
      title: isEn ? heading.objective_title_en : heading.objective_title_hn,
      content: '',
    },
    {
      key: 'activities',
      title: isEn ? heading.activities_title_en : heading.activities_title_hn,
      content: '',
    },
    {
      key: 'contact',
      title: isEn ? heading.contact_title_en : heading.contact_title_hn,
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
              {isEn ? 'NSS' : 'एनएसएस'}
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
              {isEn ? 'NSS' : 'एनएसएस'}
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
                {current.key === 'objective' ? (
                  <div>
                    <p className="font-medium mb-3">
                      {isEn ? 'Key objectives of NSS include:' : 'एनएसएस के मुख्य उद्देश्यों में शामिल हैं:'}
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      {objectives.map((o, idx) => (
                        <li key={o.id || idx}>
                          {isEn ? o.objective_en : o.objective_hn}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : current.key === 'activities' ? (
                  <div>
                    <ul className="list-disc pl-6 space-y-2">
                      {activities.map((a, idx) => (
                        <li key={a.id || idx}>
                          {isEn ? a.activity_en : a.activity_hn}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : current.key === 'contact' ? (
                  <div className="space-y-2">
                    <p>
                      <strong>{isEn ? 'Coordinator:' : 'समन्वयक:'}</strong>{' '}
                      {isEn ? heading.coord_name_en : heading.coord_name_hn}
                    </p>
                    <p>
                      <strong>{isEn ? 'Email:' : 'ईमेल:'}</strong>{' '}
                      <a
                        href={`mailto:${heading.coord_email}`}
                        className="text-[#800000] hover:underline"
                      >
                        {heading.coord_email}
                      </a>
                    </p>
                    <p>
                      <strong>{isEn ? 'Phone:' : 'फ़ोन:'}</strong>{' '}
                      {heading.coord_phone}
                    </p>
                    <p>
                      <strong>{isEn ? 'Office Location:' : 'कार्यालय का स्थान:'}</strong>{' '}
                      {isEn ? heading.coord_office_en : heading.coord_office_hn}
                    </p>
                    <p>
                      <strong>{isEn ? 'Office Hours:' : 'कार्यालय समय:'}</strong>{' '}
                      {isEn ? heading.coord_hours_en : heading.coord_hours_hn}
                    </p>
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
                {isEn ? 'View Activities Calendar' : 'गतिविधियां कैलेंडर देखें'}
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
