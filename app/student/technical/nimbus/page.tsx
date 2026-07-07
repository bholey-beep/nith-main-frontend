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
  title_en: 'NIMBUS',
  title_hn: 'निम्बस',
  sub_title_en: 'NIMBUS is all about students from different branches coming together, forming departmental teams and societies, making technical projects and organising workshops and exhibitions. In other words, students working for Nimbus gain knowledge about all sorts of technologies around, couple it with hands on experience and spread it around the campus for all other students to learn.',
  sub_title_hn: 'NIMBUS विभिन्न शाखाओं के छात्रों को एक साथ लाकर विभागीय टीमों और सोसाइटीज़ का निर्माण करने, तकनीकी परियोजनाएँ बनाने और कार्यशालाएँ व प्रदर्शनियाँ आयोजित करने पर केंद्रित है। दूसरे शब्दों में, Nimbus पर काम करने वाले छात्र विविध तकनीकों का ज्ञान प्राप्त करते हैं, उसे व्यावहारिक अनुभव के साथ जोड़ते हैं और पूरे परिसर में अन्य छात्रों के लिए साझा करते हैं।',
  about_desc1_en: 'NIMBUS brings together students across disciplines to foster hands-on technical learning and peer-driven mentorship. Teams and societies formed under Nimbus work on prototypes, host workshops, put up exhibitions and run knowledge-sharing sessions that benefit the wider student community.',
  about_desc1_hn: 'NIMBUS विभिन्न विषयों के छात्रों को व्यावहारिक तकनीकी शिक्षा और सहपाठी-आधारित मार्गदर्शन को बढ़ावा देने के लिए एक साथ लाता है। Nimbus के तहत गठित टीमें प्रोटोटाइप पर काम करती हैं, कार्यशालाएँ आयोजित करती हैं, प्रदर्शनियाँ लगाती हैं और उन ज्ञान-साषा सत्रों का संचालन करती हैं जो व्यापक छात्र समुदाय के लिए लाभदायक होते हैं।',
  about_desc2_en: 'Participation in Nimbus activities equips students with practical skills, exposure to multidisciplinary technologies and opportunities to present projects at college and inter-college events.',
  about_desc2_hn: 'Nimbus गतिविधियों में भाग लेने से छात्रों को व्यावहारिक कौशल, बहु-विषयक तकनीकों का अनुभव और कॉलेज तथा अंतर-कॉलेज कार्यक्रमों में परियोजनाएँ प्रस्तुत करने के अवसर मिलते हैं।',
  activities_title_en: 'Key Activities',
  activities_title_hn: 'मुख्य गतिविधियाँ'
};

const fallbackActivities = [
  {
    activity_en: 'Departmental teams and technical societies',
    activity_hn: 'विभागीय टीमें और तकनीकी सोसाइटीज़',
  },
  {
    activity_en: 'Project showcases and exhibitions',
    activity_hn: 'परियोजना प्रदर्शन और प्रदर्शनियाँ',
  },
  {
    activity_en: 'Workshops, hands-on labs and training sessions',
    activity_hn: 'वर्कशॉप, व्यावहारिक लैब और प्रशिक्षण सत्र',
  },
  {
    activity_en: 'Interdisciplinary collaboration and mentorship',
    activity_hn: 'बाहु-आयामी सहयोग और मार्गदर्शन',
  },
  {
    activity_en: 'Opportunities to present projects and participate in competitions',
    activity_hn: 'परियोजनाएँ प्रस्तुत करने और प्रतियोगिताओं में भाग लेने के अवसर',
  },
];

export default function NimbusPage() {
  const language = useSelector((state: RootState) => state.language.value);

  const [headingData, setHeadingData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function fetchData() {
      try {
        const headRes = await fetch(`${API_URL}/api/student-nimbus`);
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeadingData(hData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch Nimbus headings:', err);
      }

      try {
        const actRes = await fetch(`${API_URL}/api/student-nimbus/activities`);
        if (actRes.ok) {
          const aData = await actRes.json();
          if (Array.isArray(aData) && aData.length > 0) {
            setActivities(aData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch Nimbus activities list:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL]);

  // Merge dynamic state with static fallbacks
  const activeHeading = headingData || fallbackHeading;
  const activeActivities = activities.length > 0 ? activities : fallbackActivities;

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
              {language == 'en' ? 'Nimbus' : 'निम्बस'}
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
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {language == 'en' ? activeHeading.activities_title_en : activeHeading.activities_title_hn}
          </h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {activeActivities.map((act) => (
              <li key={act.id || act.activity_en}>
                {language == 'en' ? act.activity_en : act.activity_hn || act.activity_en}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
