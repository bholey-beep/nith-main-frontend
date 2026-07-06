'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { ChevronRight } from 'lucide-react';

interface Society {
  id: number;
  name_en: string;
  name_hn: string;
  focus_en: string;
  focus_hn: string;
  faculty_en: string;
  faculty_hn: string;
  contact: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  about_title_en: string;
  about_title_hn: string;
  about_desc1_en: string;
  about_desc1_hn: string;
  about_desc2_en: string;
  about_desc2_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'CULTURAL — INTRODUCTION',
  title_hn: 'सांस्कृतिक — परिचय',
  sub_title_en: 'Cultural activities at our institute enrich student life, foster creativity, and build a sense of community. Through clubs, societies and regular events, students get opportunities to showcase talents, work in teams, and engage with the wider campus culture.',
  sub_title_hn: 'हमारे संस्थान में सांस्कृतिक गतिविधियाँ छात्र जीवन को समृद्ध करती हैं, रचनात्मकता को बढ़ावा देती हैं और समुदाय की भावना निर्मित करती हैं। क्लबों, सोसाइटीज़ और कार्यक्रमों के माध्यम से छात्र अपनी प्रतिभा दिखाने, टीम में काम करने और परिसर संस्कृति में भाग लेने के अवसर पाते हैं।',
  about_title_en: 'About Cultural Activities',
  about_title_hn: 'सांस्कृतिक गतिविधियों के बारे में',
  about_desc1_en: 'Cultural engagements play a vital role in holistic student development. Events like cultural nights, music and dance competitions, theatre festivals, art exhibitions and film screenings are organised throughout the year in collaboration with departmental and student clubs.',
  about_desc1_hn: 'सांस्कृतिक गतिविधियाँ समग्र छात्र विकास में महत्वपूर्ण भूमिका निभाती हैं। सांस्कृतिक रात्रियाँ, संगीत और नृत्य प्रतियोगिताएँ, नाट्य उत्सव, कला प्रदर्शनियाँ और फिल्म स्क्रीनिंग वर्ष भर आयोजित की जाती हैं।',
  about_desc2_en: 'Students are encouraged to form new clubs, participate in inter-collegiate events, and contribute to annual cultural fests that promote diversity and creative expression.',
  about_desc2_hn: 'छात्रों को नए क्लब बनाने, अंतर-कॉलेज कार्यक्रमों में भाग लेने और विविधता व रचनात्मक अभिव्यक्ति को बढ़ावा देने वाले वार्षिक उत्सवों में योगदान करने के लिए प्रोत्साहित किया जाता।'
};

const FALLBACK_SOCIETIES: Society[] = [
  {
    id: 1,
    name_en: 'Cultural Council',
    name_hn: 'सांस्कृतिक परिषद',
    focus_en: 'Coordination of all cultural activities and annual festival',
    focus_hn: 'सभी सांस्कृतिक गतिविधियों और वार्षिक उत्सव का समन्वय',
    faculty_en: 'Prof. A. Sharma',
    faculty_hn: 'प्रो. ए. शर्मा',
    contact: 'council@nit.ac.in'
  },
  {
    id: 2,
    name_en: 'Music Club',
    name_hn: 'संगीत क्लब',
    focus_en: 'Vocal, instrumental and band performances',
    focus_hn: 'गायन, वादन और बैंड प्रदर्शन',
    faculty_en: 'Dr. R. Verma',
    faculty_hn: 'डॉ. आर. वर्मा',
    contact: 'music@nit.ac.in'
  },
  {
    id: 3,
    name_en: 'Dance Club',
    name_hn: 'नृत्य क्लब',
    focus_en: 'Classical, folk and contemporary dance',
    focus_hn: 'शास्त्रीय, लोक और समकालीन नृत्य',
    faculty_en: 'Prof. S. Kaur',
    faculty_hn: 'प्रो. एस. कौर',
    contact: 'dance@nit.ac.in'
  },
  {
    id: 4,
    name_en: 'Drama & Theatre',
    name_hn: 'नाटक और रंगमंच',
    focus_en: 'Stage plays, skits and playwriting workshops',
    focus_hn: 'मंच नाटक, प्रहसन और नाटक लेखन कार्यशालाएँ',
    faculty_en: 'Dr. N. Iyer',
    faculty_hn: 'डॉ. एन. अय्यर',
    contact: 'drama@nit.ac.in'
  },
  {
    id: 5,
    name_en: 'Literary Club',
    name_hn: 'साहित्यिक क्लब',
    focus_en: 'Debates, creative writing and poetry slams',
    focus_hn: 'वाद-विवाद, रचनात्मक लेखन और कविता पाठ',
    faculty_en: 'Prof. M. Gupta',
    faculty_hn: 'प्रो. एम. गुप्ता',
    contact: 'literary@nit.ac.in'
  },
  {
    id: 6,
    name_en: 'Fine Arts Club',
    name_hn: 'ललित कला क्लब',
    focus_en: 'Painting, sketching and applied arts',
    focus_hn: 'चित्रकारी, रेखाचित्र और अनुप्रयुक्त कला',
    faculty_en: 'Prof. L. Rao',
    faculty_hn: 'प्रो. एल. राव',
    contact: 'arts@nit.ac.in'
  },
  {
    id: 7,
    name_en: 'Photography Club',
    name_hn: 'फोटोग्राफी क्लब',
    focus_en: 'Workshops, campus photography and exhibitions',
    focus_hn: 'कार्यशालाएँ, परिसर फोटोग्राफी और प्रदर्शनियाँ',
    faculty_en: 'Dr. P. Singh',
    faculty_hn: 'डॉ. पी. सिंह',
    contact: 'photo@nit.ac.in'
  },
  {
    id: 8,
    name_en: 'Film & Media Club',
    name_hn: 'फिल्म और मीडिया क्लब',
    focus_en: 'Short films, editing and media workshops',
    focus_hn: 'लघु फिल्में, संपादन और मीडिया कार्यशालाएँ',
    faculty_en: 'Prof. D. Mehta',
    faculty_hn: 'प्रो. डी. मेहता',
    contact: 'media@nit.ac.in'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function CulturalIntroductionPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        
        // Fetch headings
        const headRes = await fetch(`${apiUrl}/api/student-cultural`, { cache: 'no-store' });
        if (headRes.ok) {
          const headData = await headRes.json();
          if (headData.title_en) {
            setHeading(headData);
          }
        }

        // Fetch clubs list
        const socRes = await fetch(`${apiUrl}/api/student-cultural/societies`, { cache: 'no-store' });
        if (socRes.ok) {
          const socData = await socRes.json();
          if (Array.isArray(socData) && socData.length > 0) {
            setSocieties(socData);
          } else {
            setSocieties(FALLBACK_SOCIETIES);
          }
        } else {
          setSocieties(FALLBACK_SOCIETIES);
        }
      } catch (err) {
        console.error('Error fetching dynamic cultural introduction:', err);
        setSocieties(FALLBACK_SOCIETIES);
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
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      <Header31 />

      {/* Breadcrumbs Navigation */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {isHindi ? 'होम' : 'Home'}
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-400">{isHindi ? 'छात्र' : 'Student'}</span>
            <ChevronRight size={14} className="text-gray-400" />
            <Link
              href="/student/cultural"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {isHindi ? 'सांस्कृतिक' : 'Cultural'}
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#800000] font-medium">
              {isHindi ? 'परिचय' : 'Introduction'}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        {/* Subtle Ambient Decorative Circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 uppercase">
            {isHindi ? heading.title_hn : heading.title_en}
          </h1>
          <p className="text-white/90 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isHindi ? heading.sub_title_hn : heading.sub_title_en}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {/* About Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
            {isHindi ? heading.about_title_hn : heading.about_title_en}
          </h2>

          <div className="space-y-4 text-slate-600 text-base leading-relaxed font-normal">
            <p>{isHindi ? heading.about_desc1_hn : heading.about_desc1_en}</p>
            {heading.about_desc2_en && (
              <p>{isHindi ? heading.about_desc2_hn : heading.about_desc2_en}</p>
            )}
          </div>
        </motion.section>

        {/* Societies & Clubs Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-150 shadow-sm p-6 md:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
              {isHindi ? 'सांस्कृतिक सोसाइटी और क्लब' : 'Cultural Societies & Clubs'}
            </h3>
            <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1 rounded-full w-fit">
              {isHindi ? 'प्रभारी शिक्षक से संपर्क के लिए ईमेल पर क्लिक करें' : 'Click email to contact the faculty-in-charge'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed border-collapse">
              <colgroup>
                <col style={{ width: '8%' }} />
                <col style={{ width: '24%' }} />
                <col style={{ width: '38%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 px-4">{isHindi ? 'क्रमांक' : 'Sl. No.'}</th>
                  <th className="py-3 px-4">{isHindi ? 'सोसाइटी / क्लब' : 'Society / Club'}</th>
                  <th className="py-3 px-4">{isHindi ? 'गतिविधियाँ / लक्ष्य' : 'Focus / Activities'}</th>
                  <th className="py-3 px-4">{isHindi ? 'प्रभारी संकाय' : 'Faculty In-charge'}</th>
                  <th className="py-3 px-4">{isHindi ? 'संपर्क' : 'Contact'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {societies.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-4 text-slate-500 font-semibold">{idx + 1}</td>
                    <td className="py-4 px-4 text-slate-900 font-bold">
                      {isHindi ? s.name_hn : s.name_en}
                    </td>
                    <td className="py-4 px-4 text-slate-600 text-sm leading-relaxed font-medium">
                      {isHindi ? s.focus_hn : s.focus_en}
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-semibold text-sm">
                      {isHindi ? s.faculty_hn : s.faculty_en}
                    </td>
                    <td className="py-4 px-4 text-sm text-[#800000] font-semibold break-all">
                      <a href={`mailto:${s.contact}`} className="hover:underline transition-all">
                        {s.contact}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
