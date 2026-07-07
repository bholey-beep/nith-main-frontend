'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface YogaHeading {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  about_title_en: string;
  about_title_hn: string;
  about_desc_en: string;
  about_desc_hn: string;
}

interface YogaSchedule {
  id?: number;
  time_en: string;
  time_hn: string;
  title_en: string;
  title_hn: string;
}

interface YogaBenefit {
  id?: number;
  benefit_en: string;
  benefit_hn: string;
}

interface YogaInstructor {
  id?: number;
  name_en: string;
  name_hn: string;
  role_en: string;
  role_hn: string;
  email: string;
}

const DEFAULT_HEADING: YogaHeading = {
  title_en: 'INTERNATIONAL YOGA DAY',
  title_hn: 'अंतर्राष्ट्रीय योग दिवस',
  sub_title_en: 'Join the campus community for yoga sessions that promote wellness, balance and mindful living.',
  sub_title_hn: 'संपूर्ण छात्र समुदाय में शामिल हो कर स्वास्थ्य, संतुलन और मानसिक शांति के लिए योग सत्रों में भाग लें।',
  about_title_en: 'About the Event',
  about_title_hn: 'कार्यक्रम के बारे में',
  about_desc_en: 'International Yoga Day at the institute brings students, staff and faculty together for guided yoga practices, breathing exercises and workshops led by trained instructors. The aim is to encourage physical and mental wellbeing, accessible to participants of all levels.',
  about_desc_hn: 'संस्थान में अंतर्राष्ट्रीय योग दिवस छात्रों, स्टाफ और संकाय को प्रशिक्षित प्रशिक्षकों द्वारा संचालित मार्गदर्शित योग, श्वास अभ्यास और कार्यशालाओं के लिए एकत्र करता है। उद्देश्य सभी स्तरों के प्रतिभागियों के लिए शारीरिक और मानसिक स्वास्थ्य को प्रोत्साहित करना है।'
};

const DEFAULT_SCHEDULE: YogaSchedule[] = [
  {
    time_en: '06:00 AM – 07:30 AM',
    time_hn: 'सुबह 06:00 – 07:30',
    title_en: 'Morning Yoga (All levels)',
    title_hn: 'मॉर्निंग योग (सभी स्तर)'
  },
  {
    time_en: '08:00 AM – 09:00 AM',
    time_hn: 'सुबह 08:00 – 09:00',
    title_en: 'Breathing & Relaxation Workshop',
    title_hn: 'प्राणायाम और विश्राम कार्यशाला'
  },
  {
    time_en: '10:00 AM – 12:00 PM',
    time_hn: 'सुबह 10:00 – 12:00',
    title_en: 'Advanced Techniques session',
    title_hn: 'उन्नत तकनीक सत्र'
  },
  {
    time_en: '03:00 PM – 04:00 PM',
    time_hn: 'दोपहर 03:00 – 04:00',
    title_en: 'Community Session & Q&A',
    title_hn: 'सामुदायिक सत्र और प्रश्नोत्तर'
  }
];

const DEFAULT_BENEFITS: YogaBenefit[] = [
  {
    benefit_en: 'Improve flexibility, strength and posture',
    benefit_hn: 'लचीलापन, ताकत और मुद्रा में सुधार'
  },
  {
    benefit_en: 'Reduce stress with breathing techniques',
    benefit_hn: 'श्वास तकनीकों से तनाव में कमी'
  },
  {
    benefit_en: 'Increase mental clarity and focus',
    benefit_hn: 'मानसिक स्पष्टता और एकाग्रता में वृद्धि'
  },
  {
    benefit_en: 'Suitable for beginners and advanced practitioners',
    benefit_hn: 'शुरुआती और उन्नत दोनों के लिए उपयुक्त'
  }
];

const DEFAULT_INSTRUCTORS: YogaInstructor[] = [
  {
    name_en: 'Ms. Ananya Sharma',
    name_hn: 'सुश्री अनन्या शर्मा',
    role_en: 'Senior Yoga Trainer',
    role_hn: 'वरिष्ठ योग प्रशिक्षक',
    email: 'ananya@yoga.nith.ac.in'
  },
  {
    name_en: 'Mr. Vikram Singh',
    name_hn: 'श्री विक्रम सिंह',
    role_en: 'Breathwork Specialist',
    role_hn: 'श्वास अभ्यास विशेषज्ञ',
    email: 'vikram@yoga.nith.ac.in'
  }
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isEn = language === 'en';

  const [heading, setHeading] = useState<YogaHeading>(DEFAULT_HEADING);
  const [schedule, setSchedule] = useState<YogaSchedule[]>(DEFAULT_SCHEDULE);
  const [benefits, setBenefits] = useState<YogaBenefit[]>(DEFAULT_BENEFITS);
  const [instructors, setInstructors] = useState<YogaInstructor[]>(DEFAULT_INSTRUCTORS);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const loadData = async () => {
      try {
        const headRes = await fetch(`${API_URL}/api/student-yogaday`, { cache: 'no-store' });
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
            });
          }
        }

        const schedRes = await fetch(`${API_URL}/api/student-yogaday/schedule`, { cache: 'no-store' });
        if (schedRes.ok) {
          const sData = await schedRes.json();
          if (Array.isArray(sData) && sData.length > 0) {
            setSchedule(sData);
          }
        }

        const benefitsRes = await fetch(`${API_URL}/api/student-yogaday/benefits`, { cache: 'no-store' });
        if (benefitsRes.ok) {
          const bData = await benefitsRes.json();
          if (Array.isArray(bData) && bData.length > 0) {
            setBenefits(bData);
          }
        }

        const instRes = await fetch(`${API_URL}/api/student-yogaday/instructors`, { cache: 'no-store' });
        if (instRes.ok) {
          const iData = await instRes.json();
          if (Array.isArray(iData) && iData.length > 0) {
            setInstructors(iData);
          }
        }
      } catch (err) {
        console.warn('Failed to load dynamic Yoga Day data. Using defaults.', err);
      }
    };
    loadData();
  }, [API_URL]);

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
              {isEn ? 'International Yoga Day' : 'अंतर्राष्ट्रीय योग दिवस'}
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center py-20 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase">
            {isEn ? heading.title_en : heading.title_hn}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isEn ? heading.sub_title_en : heading.sub_title_hn}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {isEn ? heading.about_title_en : heading.about_title_hn}
          </h2>
          <p className="text-gray-700 whitespace-pre-wrap">
            {isEn ? heading.about_desc_en : heading.about_desc_hn}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isEn ? 'Schedule' : 'अनुसूची'}
              </h3>
              <div className="text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  {schedule.map((s, idx) => (
                    <li key={s.id || idx}>
                      <span className="font-medium">
                        {isEn ? s.time_en : s.time_hn}
                      </span>
                      {' · '}
                      <span>
                        {isEn ? s.title_en : s.title_hn}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                {isEn ? 'Benefits' : 'लाभ'}
              </h3>
              <div className="text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  {benefits.map((b, idx) => (
                    <li key={b.id || idx}>
                      {isEn ? b.benefit_en : b.benefit_hn}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">
              {isEn ? 'Instructors' : 'प्रशिक्षक'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              {instructors.map((i, idx) => (
                <div className="space-y-1" key={i.id || idx}>
                  <div className="font-medium">
                    {isEn ? i.name_en : i.name_hn}
                  </div>
                  <div className="text-sm">
                    {isEn ? i.role_en : i.role_hn}
                  </div>
                  {i.email && (
                    <div className="text-sm">Email: {i.email}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
