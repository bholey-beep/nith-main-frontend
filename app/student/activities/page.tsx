'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface Responsibility {
  id: number;
  activity_en: string;
  activity_hn: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  role_title_en: string;
  role_title_hn: string;
  role_desc_en: string;
  role_desc_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'ACTIVITIES',
  title_hn: 'गतिविधियां',
  sub_title_en: 'Duties and responsibilities of the Dean (Student Welfare)',
  sub_title_hn: 'डीन (छात्र कल्याण) के कर्तव्य और जिम्मेदारियाँ',
  role_title_en: 'Dean (Student Welfare) — Role & Responsibilities',
  role_title_hn: 'डीन (छात्र कल्याण) — भूमिका और जिम्मेदारियां',
  role_desc_en: 'As per the schedule ‘C’ of NIT statutes the role and responsibilities of the Dean (Student Welfare) is to conduct activities throughout the year are as follows:',
  role_desc_hn: 'एनआईटी नियमावली की अनुसूची \'C\' के अनुसार, डीन (छात्र कल्याण) की भूमिकाएँ और जिम्मेदारियाँ वर्ष भर गतिविधियों का संचालन करना हैं.',
};

const FALLBACK_RESPONSIBILITIES: Responsibility[] = [
  { id: 1, activity_en: "Advice the Director in organising the student counseling.", activity_hn: "छात्रों की काउंसलिंग आयोजित करने में निदेशक को सलाह देना।" },
  { id: 2, activity_en: "Responsible for the publication of students’ Magazine, News Bulletins, News Letter etc.", activity_hn: "छात्रों की पत्रिका, समाचार बुलेटिन, समाचार पत्र आदि के प्रकाशन के लिए जिम्मेदार होना।" },
  { id: 3, activity_en: "Advice the Director in matters related to students discipline and welfare.", activity_hn: "छात्रों के अनुशासन और कल्याण से संबंधित मामलों में निदेशक को सलाह देना।" },
  { id: 4, activity_en: "Assist the Director in matters related to the Students Union/Association/Council.", activity_hn: "छात्र संघ/एसोसिएशन/परिषद से संबंधित मामलों में निदेशक की सहायता करना।" },
  { id: 5, activity_en: "Co-Ordinate the NCC, NSS, Games, Swimming Pool, Sports, Cultural and Co-curricular and Extra-curricular activities of the students.", activity_hn: "छात्रों की एनसीसी, एनएसएस, खेल, स्विमिंग पूल, खेलकूद, सांस्कृतिक और सह-पाठ्यचर्या और पाठ्येतर गतिविधियों का समन्वय करना।" },
  { id: 6, activity_en: "Keep a record of Alumni and correspond with them.", activity_hn: "पूर्व छात्रों का रिकॉर्ड रखना और उनके साथ पत्राचार करना।" },
  { id: 7, activity_en: "Conduct the enquiries of students indulged in indiscipline.", activity_hn: "अनुशासनहीनता में लिप्त छात्रों की जांच करना।" },
  { id: 8, activity_en: "Correspond with Parents/Guardians of students about their progress and individual problem/welfare.", activity_hn: "छात्रों की प्रगति और व्यक्तिगत समस्या/कल्याण के बारे में उनके माता-पिता/अभिभावकों के साथ पत्राचार करना।" }
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [responsibilities, setResponsibilities] = useState<Responsibility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        
        // Fetch heading
        const headRes = await fetch(`${apiUrl}/api/student-activities`, { cache: 'no-store' });
        if (headRes.ok) {
          const headData = await headRes.json();
          if (headData.title_en) {
            setHeading(headData);
          }
        }

        // Fetch responsibilities list
        const listRes = await fetch(`${apiUrl}/api/student-activities/list`, { cache: 'no-store' });
        if (listRes.ok) {
          const listData = await listRes.json();
          if (Array.isArray(listData) && listData.length > 0) {
            setResponsibilities(listData);
          } else {
            setResponsibilities(FALLBACK_RESPONSIBILITIES);
          }
        } else {
          setResponsibilities(FALLBACK_RESPONSIBILITIES);
        }
      } catch (err) {
        console.error('Error fetching student activities dynamic content:', err);
        setResponsibilities(FALLBACK_RESPONSIBILITIES);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Header31 />
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#800000]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {isHindi ? 'होम' : 'Home'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {isHindi ? 'छात्र' : 'Student'}
            </span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {isHindi ? 'गतिविधियां' : 'Activities'}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 text-center py-20 px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase">
              {isHindi ? heading.title_hn : heading.title_en}
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              {isHindi ? heading.sub_title_hn : heading.sub_title_en}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
            {isHindi ? heading.role_title_hn : heading.role_title_en}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6 font-medium">
            {isHindi ? heading.role_desc_hn : heading.role_desc_en}
          </p>

          <div className="prose prose-slate max-w-none">
            <ul className="space-y-4 pl-0 list-none">
              {responsibilities.map((item, idx) => (
                <motion.li 
                  key={item.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="flex items-start gap-3.5 group"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#800000]/10 text-[#800000] flex items-center justify-center font-bold text-sm group-hover:bg-[#800000] group-hover:text-white transition-all duration-200">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 font-medium group-hover:text-gray-950 transition-colors leading-relaxed pt-0.5">
                    {isHindi ? item.activity_hn : item.activity_en}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
