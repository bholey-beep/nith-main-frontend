'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { 
  Calendar, 
  Star, 
  Trophy, 
  MapPin, 
  Award, 
  ChevronRight, 
  Sparkles,
  Info
} from 'lucide-react';

interface FestivalEvent {
  id: number;
  name_en: string;
  name_hn: string;
  category_en: string;
  category_hn: string;
  description_en: string;
  description_hn: string;
  prize_en: string;
  prize_hn: string;
  venue_en: string;
  venue_hn: string;
}

interface Highlight {
  id: number;
  highlight_en: string;
  highlight_hn: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  about_title_en: string;
  about_title_hn: string;
  about_desc_en: string;
  about_desc_hn: string;
  events_title_en: string;
  events_title_hn: string;
  events_sub_en: string;
  events_sub_hn: string;
  schedule_title_en: string;
  schedule_title_hn: string;
  schedule_desc_en: string;
  schedule_desc_hn: string;
  dates_en: string;
  dates_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'ANNUAL CULTURAL FEST (HILL\'FFAIR)',
  title_hn: 'वार्षिक सांस्कृतिक महोत्सव (हिल\'फेयर)',
  sub_title_en: 'The unison of arts and manifestations of the human intellect is the attribute that makes our country so truly aesthetic and gratifying that one is drawn into the alchemy of its diversities of cultures. With this as its essence, Hill\'ffair has carried the badge for being the best cultural extravaganza in North India and continued to stay true to its grandeur, and that of NIT Hamirpur, with changing times and vogue.',
  sub_title_hn: 'कला और मानव बुद्धि की अभिव्यक्ति हमारे देश को सौंदर्यपूर्ण और आनंददायक बनाती है। इसी भाव के साथ हिल\'फेयर उत्तर भारत के सर्वश्रेष्ठ सांस्कृतिक उत्सव के रूप में उभरा है और समय के साथ अपनी भव्यता और एनआईटी हमीरपुर की प्रतिष्ठा बनाए रखा है।',
  about_title_en: 'About Hill\'ffair',
  about_title_hn: 'हिल\'फेयर के बारे में',
  about_desc_en: 'With a humble beginning in 1988, Hill\'ffair has gradually emerged to be the institute’s cultural glory and a portal to immerge pioneering ideas and talents from all over the nation culminating in these three days. Enthralling dance choreographies, music performances, concerts, dramatics, national level competitions and numerous cultural events — all, in the dell of the pastoral White Peak mountains and the placid small-town environment — leave no stone unturned in making the festival an unparalleled celebration of culture, education and competition.',
  about_desc_hn: '1988 में एक विनम्र शुरुआत के साथ, हिल\'फेयर धीरे-धीरे संस्थान की सांस्कृतिक गौरव और राष्ट्रभर से प्रतिभाओं और नवीन विचारों को समेटने वाला मंच बन गया। नृत्य, संगीत, नाटक, राष्ट्रीय स्तर की प्रतियोगिताएँ और अनेक सांस्कृतिक कार्यक्रम — पहाड़ी वाइट पीक की पृष्ठभूमि और शांत छोटे शहर के माहौल में — इस उत्सव को संस्कृति, शिक्षा और प्रतिस्पर्धा का अद्वितीय उत्सव बनाते हैं।',
  events_title_en: 'Festival Events',
  events_title_hn: 'उत्सव की प्रतियोगिताएँ',
  events_sub_en: 'Participate in our diverse range of competitions and events',
  events_sub_hn: 'हमारी विविध प्रतियोगिताओं और कार्यक्रमों में भाग लें',
  schedule_title_en: 'Festival Schedule',
  schedule_title_hn: 'उत्सव की समय सारणी',
  schedule_desc_en: 'Mark your calendars for the biggest cultural event of the year!',
  schedule_desc_hn: 'वर्ष के सबसे बड़े सांस्कृतिक कार्यक्रम के लिए अपने कैलेंडर को चिह्नित करें!',
  dates_en: 'October 15-17, 2026',
  dates_hn: '15-17 अक्टूबर, 2026'
};

const FALLBACK_HIGHLIGHTS: Highlight[] = [
  { id: 1, highlight_en: 'Enthralling dance choreographies and music performances', highlight_hn: 'रोमांचक नृत्य कोरियोग्राफी और संगीत प्रदर्शन' },
  { id: 2, highlight_en: 'Concerts and national-level competitions', highlight_hn: 'संगीत कार्यक्रम और राष्ट्रीय स्तर की प्रतियोगिताएं' },
  { id: 3, highlight_en: 'Stage dramatics and cultural exhibitions', highlight_hn: 'मंच नाटक और सांस्कृतिक प्रदर्शनियाँ' },
  { id: 4, highlight_en: 'Workshops, film screenings, and media events', highlight_hn: 'कार्यशालाएँ, फिल्म स्क्रीनिंग और मीडिया कार्यक्रम' },
  { id: 5, highlight_en: 'Opportunities for inter-college collaboration and cultural exchange', highlight_hn: 'अंतर-कॉलेज सहयोग और सांस्कृतिक आदान-प्रदान के अवसर' }
];

const FALLBACK_EVENTS: FestivalEvent[] = [
  {
    id: 1,
    name_en: 'Battle of Bands',
    name_hn: 'बैटल ऑफ बैंड्स',
    category_en: 'Music',
    category_hn: 'संगीत',
    description_en: 'Rock, Pop, and Fusion band competition',
    description_hn: 'रॉक, पॉप और फ्यूजन बैंड प्रतियोगिता',
    prize_en: '₹50,000',
    prize_hn: '₹50,000',
    venue_en: 'Main Stage',
    venue_hn: 'मुख्य मंच'
  },
  {
    id: 2,
    name_en: 'Nritya - Dance Competition',
    name_hn: 'नृत्य प्रतियोगिता',
    category_en: 'Dance',
    category_hn: 'नृत्य',
    description_en: 'Classical, Western, and Folk dance competition',
    description_hn: 'शास्त्रीय, पश्चिमी और लोक नृत्य प्रतियोगिता',
    prize_en: '₹40,000',
    prize_hn: '₹40,000',
    venue_en: 'Open Air Theatre',
    venue_hn: 'ओपन एयर थिएटर'
  },
  {
    id: 3,
    name_en: 'Nukkad Natak',
    name_hn: 'नुक्कड़ नाटक',
    category_en: 'Theatre',
    category_hn: 'रंगमंच',
    description_en: 'Street play competition on social themes',
    description_hn: 'सामाजिक विषयों पर नुक्कड़ नाटक प्रतियोगिता',
    prize_en: '₹30,000',
    prize_hn: '₹30,000',
    venue_en: 'Campus Grounds',
    venue_hn: 'परिसर मैदान'
  },
  {
    id: 4,
    name_en: 'Canvas Carnival',
    name_hn: 'कैनवास कार्निवल',
    category_en: 'Art',
    category_hn: 'कला',
    description_en: 'Painting and sketching competition',
    description_hn: 'पेंटिंग और स्केचिंग प्रतियोगिता',
    prize_en: '₹15,000',
    prize_hn: '₹15,000',
    venue_en: 'Art Gallery',
    venue_hn: 'कला दीर्घा'
  },
  {
    id: 5,
    name_en: 'Fashion Show',
    name_hn: 'फैशन शो',
    category_en: 'Fashion',
    category_hn: 'फैशन',
    description_en: 'Theme-based fashion parade',
    description_hn: 'थीम आधारित फैशन परेड',
    prize_en: '₹35,000',
    prize_hn: '₹35,000',
    venue_en: 'Main Auditorium',
    venue_hn: 'मुख्य सभागार'
  },
  {
    id: 6,
    name_en: 'Quiz Masters',
    name_hn: 'क्विज मास्टर्स',
    category_en: 'Literary',
    category_hn: 'साहित्यिक',
    description_en: 'General knowledge and entertainment quiz',
    description_hn: 'सामान्य ज्ञान और मनोरंजन प्रश्नोत्तरी',
    prize_en: '₹20,000',
    prize_hn: '₹20,000',
    venue_en: 'Seminar Hall',
    venue_hn: 'सेमीनार हॉल'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function HillfairPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [events, setEvents] = useState<FestivalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        
        // Fetch headings
        const headRes = await fetch(`${apiUrl}/api/student-hillfair`, { cache: 'no-store' });
        if (headRes.ok) {
          const headData = await headRes.json();
          if (headData.title_en) {
            setHeading(headData);
          }
        }

        // Fetch highlights
        const highRes = await fetch(`${apiUrl}/api/student-hillfair/highlights`, { cache: 'no-store' });
        if (highRes.ok) {
          const hiData = await highRes.json();
          if (Array.isArray(hiData) && hiData.length > 0) {
            setHighlights(hiData);
          } else {
            setHighlights(FALLBACK_HIGHLIGHTS);
          }
        } else {
          setHighlights(FALLBACK_HIGHLIGHTS);
        }

        // Fetch events
        const evRes = await fetch(`${apiUrl}/api/student-hillfair/events`, { cache: 'no-store' });
        if (evRes.ok) {
          const eData = await evRes.json();
          if (Array.isArray(eData) && eData.length > 0) {
            setEvents(eData);
          } else {
            setEvents(FALLBACK_EVENTS);
          }
        } else {
          setEvents(FALLBACK_EVENTS);
        }
      } catch (err) {
        console.error('Error fetching dynamic Hill\'ffair data:', err);
        setHighlights(FALLBACK_HIGHLIGHTS);
        setEvents(FALLBACK_EVENTS);
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
            <Link href="/" className="hover:text-[#800000] transition-colors duration-200">
              {isHindi ? 'होम' : 'Home'}
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-400">{isHindi ? 'छात्र' : 'Student'}</span>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/student/cultural" className="hover:text-[#800000] transition-colors duration-200">
              {isHindi ? 'सांस्कृतिक' : 'Cultural'}
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#800000] font-medium">Hill'ffair</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        {/* Ambient Decorative Circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-16 right-16 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700" />
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
        {/* SECTION 1: ABOUT & HIGHLIGHTS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* About Narrative Block */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
                {isHindi ? heading.about_title_hn : heading.about_title_en}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line font-normal">
                {isHindi ? heading.about_desc_hn : heading.about_desc_en}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-[#800000] font-semibold bg-[#800000]/5 px-3 py-1.5 rounded-lg border border-[#800000]/10 w-fit">
              <Sparkles size={14} className="animate-spin text-[#800000]" style={{ animationDuration: '3s' }} />
              <span>{isHindi ? 'महानतम भव्यता का संगम' : 'Extravaganza of Youth & Creative Arts'}</span>
            </div>
          </motion.div>

          {/* Highlights List Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-150 shadow-sm p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
              {isHindi ? 'उत्सव की मुख्य विशेषताएं' : 'Festival Highlights'}
            </h2>
            <ul className="space-y-4">
              {highlights.map((hi) => (
                <li key={hi.id} className="flex items-start gap-3">
                  <span className="bg-[#800000]/10 text-[#800000] p-1 rounded-full flex-shrink-0 mt-0.5">
                    <Star size={14} className="fill-[#800000]" />
                  </span>
                  <p className="text-slate-700 text-sm font-semibold leading-relaxed">
                    {isHindi ? hi.highlight_hn : hi.highlight_en}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* SECTION 2: SCHEDULE BANNER */}
        {heading.dates_en && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-r from-[#800000] to-[#631012] rounded-2xl text-white p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full w-fit flex items-center gap-1">
                <Calendar size={12} />
                <span>{isHindi ? 'उत्सव की तारीखें' : 'Save the Dates'}</span>
              </span>
              <h3 className="text-2xl font-black">{isHindi ? heading.schedule_title_hn : heading.schedule_title_en}</h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-xl">{isHindi ? heading.schedule_desc_hn : heading.schedule_desc_en}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-8 py-6 rounded-2xl border border-white/20 text-center font-extrabold text-2xl tracking-wide min-w-[220px]">
              {isHindi ? heading.dates_hn : heading.dates_en}
            </div>
          </motion.section>
        )}

        {/* SECTION 3: COMPETITIONS / EVENTS */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="border-l-4 border-[#800000] pl-3">
            <h2 className="text-3xl font-extrabold text-slate-900 leading-none">
              {isHindi ? heading.events_title_hn : heading.events_title_en}
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              {isHindi ? heading.events_sub_hn : heading.events_sub_en}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <div 
                key={e.id}
                className="bg-white rounded-2xl border border-slate-150 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Visual Category Label */}
                <div className="absolute top-0 right-0 bg-[#800000]/10 text-[#800000] px-4 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider">
                  {isHindi ? e.category_hn : e.category_en}
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#800000] transition-colors leading-snug">
                    {isHindi ? e.name_hn : e.name_en}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {isHindi ? e.description_hn : e.description_en}
                  </p>
                </div>

                <div className="border-t border-slate-100 my-4 pt-4 space-y-2 text-xs">
                  {e.prize_en && (
                    <div className="flex items-center gap-2 text-slate-700">
                      <Award size={14} className="text-[#800000]" />
                      <span className="font-bold text-slate-800">{isHindi ? 'पुरस्कार राशि:' : 'Prize Worth:'}</span>
                      <span className="font-extrabold text-emerald-700">{isHindi ? e.prize_hn : e.prize_en}</span>
                    </div>
                  )}
                  {e.venue_en && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={14} className="text-slate-400" />
                      <span className="font-semibold">{isHindi ? 'स्थान:' : 'Venue:'}</span>
                      <span className="font-bold text-slate-700">{isHindi ? e.venue_hn : e.venue_en}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
