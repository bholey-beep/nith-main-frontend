'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ChevronRight, Calendar, Landmark, Award, BookOpen, Clock, Loader2 } from 'lucide-react';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
}

interface PageOverview {
  description1: string;
  description2: string;
  legacy: string;
}

const FALLBACK_OVERVIEW: PageOverview = {
  description1: 'National Institute of Technology Hamirpur (NITH), nestled in the scenic Shivalik ranges of Himachal Pradesh, was established in 1986 as Regional Engineering College (REC) Hamirpur, a joint venture of the Government of India and the Government of Himachal Pradesh.',
  description2: 'The institute was upgraded to National Institute of Technology with Deemed University status on June 26, 2002, and later awarded the status of Institute of National Importance under the NIT Act 2007. Over the decades, NITH has emerged as a premier technical education institution committed to excellence in academics, groundbreaking research, and societal development.',
  legacy: 'Spanning over 320 acres of lush pine-forested terrain, NIT Hamirpur is celebrated for its world-class academic environment, high-impact innovations, vibrant student life, and global alumni network.',
};

const FALLBACK_OVERVIEW_HI: PageOverview = {
  description1: 'राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर (एनआईटीएच), हिमाचल प्रदेश की सुरम्य शिवालिक पर्वतमाला में स्थित, 1986 में भारत सरकार और हिमाचल प्रदेश सरकार के एक संयुक्त उद्यम के रूप में क्षेत्रीय इंजीनियरिंग कॉलेज (आरईसी) हमीरपुर के रूप में स्थापित किया गया था।',
  description2: 'संस्थान को 26 जून 2002 को मानद विश्वविद्यालय के दर्जे के साथ राष्ट्रीय प्रौद्योगिकी संस्थान में अपग्रेड किया गया, और बाद में एनआईटी अधिनियम 2007 के तहत राष्ट्रीय महत्व का संस्थान घोषित किया गया।',
  legacy: '320 एकड़ से अधिक हरे-भरे चीड़ के जंगलों में फैला, एनआईटी हमीरपुर अपने विश्वस्तरीय शैक्षणिक वातावरण, नवाचार, जीवंत छात्र जीवन और वैश्विक पूर्व छात्र नेटवर्क के लिए प्रसिद्ध है।',
};

const FALLBACK_TIMELINE = [
  {
    id: 1,
    year: '1986',
    title_en: 'Foundation as Regional Engineering College',
    title_hi: 'क्षेत्रीय इंजीनियरिंग कॉलेज के रूप में स्थापना',
    description_en: 'Established as REC Hamirpur with Civil and Electrical Engineering undergraduate programmes to advance technical education in the Himalayan region.',
    description_hi: 'हिमालयी क्षेत्र में तकनीकी शिक्षा को बढ़ावा देने के लिए सिविल और इलेक्ट्रिकल इंजीनियरिंग स्नातक कार्यक्रमों के साथ आरईसी हमीरपुर के रूप में स्थापित।'
  },
  {
    id: 2,
    year: '1989',
    title_en: 'Introduction of Mechanical and Electronics Disciplines',
    title_hi: 'मैकेनिकल और इलेक्ट्रॉनिक्स विषयों की शुरुआत',
    description_en: 'Expanded academic footprint with Mechanical Engineering and Electronics & Communication Engineering departments and laboratory complexes.',
    description_hi: 'मैकेनिकल इंजीनियरिंग और इलेक्ट्रॉनिक्स एवं संचार इंजीनियरिंग विभागों और प्रयोगशाला परिसरों के साथ शैक्षणिक विस्तार।'
  },
  {
    id: 3,
    year: '1995',
    title_en: 'Launch of Computer Science & Engineering',
    title_hi: 'कंप्यूटर साइंस एंड इंजीनियरिंग की शुरुआत',
    description_en: 'Established the Department of Computer Science & Engineering and campus-wide computer networking infrastructure.',
    description_hi: 'कंप्यूटर साइंस एंड इंजीनियरिंग विभाग और परिसर-व्यापी कंप्यूटर नेटवर्किंग बुनियादी ढांचे की स्थापना।'
  },
  {
    id: 4,
    year: '2002',
    title_en: 'Deemed University & National Institute of Technology',
    title_hi: 'डीम्ड यूनिवर्सिटी और राष्ट्रीय प्रौद्योगिकी संस्थान',
    description_en: 'Upgraded to National Institute of Technology (NIT) with Deemed University status, empowering autonomous curriculum and advanced research degree offerings.',
    description_hi: 'डीम्ड यूनिवर्सिटी के दर्जे के साथ राष्ट्रीय प्रौद्योगिकी संस्थान (एनआईटी) में अपग्रेड किया गया, जिससे स्वायत्त पाठ्यक्रम और उन्नत अनुसंधान कार्यक्रमों का मार्ग प्रशस्त हुआ।'
  },
  {
    id: 5,
    year: '2007',
    title_en: 'Institute of National Importance (INI)',
    title_hi: 'राष्ट्रीय महत्व का संस्थान (आईएनआई)',
    description_en: 'Enacted by the Parliament of India under the NIT Act 2007 as an Institute of National Importance, positioning NITH at the forefront of national education.',
    description_hi: 'एनआईटी अधिनियम 2007 के तहत भारत की संसद द्वारा राष्ट्रीय महत्व के संस्थान के रूप में घोषित किया गया।'
  },
  {
    id: 6,
    year: '2015',
    title_en: 'Centres of Excellence & International Collaborations',
    title_hi: 'उत्कृष्टता केंद्र और अंतर्राष्ट्रीय सहयोग',
    description_en: 'Inauguration of state-of-the-art research centres in Energy and Environmental Engineering, Materials Science, and MoUs with global universities.',
    description_hi: 'ऊर्जा और पर्यावरण इंजीनियरिंग, सामग्री विज्ञान में अत्याधुनिक अनुसंधान केंद्रों का उद्घाटन और वैश्विक विश्वविद्यालयों के साथ समझौता ज्ञापन।'
  },
  {
    id: 7,
    year: '2025',
    title_en: 'Pioneering NEP 2020 & AI Interdisciplinary Research',
    title_hi: 'एनईपी 2020 और एआई अंतःविषय अनुसंधान में अग्रणी',
    description_en: 'Implementing multidisciplinary NEP 2020 curriculum, cutting-edge AI/ML centres, robust incubation ecosystems, and green sustainable campus initiatives.',
    description_hi: 'बहुविषयक एनईपी 2020 पाठ्यक्रम, अत्याधुनिक एआई/एमएल केंद्र, मजबूत इनक्यूबेशन पारिस्थितिकी तंत्र और हरित सतत परिसर पहल का कार्यान्वयन।'
  }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function HistoryPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [overview, setOverview] = useState<PageOverview>(FALLBACK_OVERVIEW);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchHistory() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/history`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success && !cancelled) {
          // Process timeline
          const items = Array.isArray(json.data) && json.data.length > 0 ? json.data : FALLBACK_TIMELINE;
          const mapped = items.map((item: any) => ({
            id: item.id,
            year: item.year,
            title: isHindi && item.title_hi ? item.title_hi : item.title_en,
            description: isHindi && item.description_hi ? item.description_hi : item.description_en,
          }));
          setTimelineEvents(mapped);

          // Process overview
          if (json.page && (json.page.description1_en || json.page.description1_hi)) {
            setOverview({
              description1: isHindi && json.page.description1_hi ? json.page.description1_hi : json.page.description1_en || FALLBACK_OVERVIEW.description1,
              description2: isHindi && json.page.description2_hi ? json.page.description2_hi : json.page.description2_en || FALLBACK_OVERVIEW.description2,
              legacy: isHindi && json.page.legacy_hi ? json.page.legacy_hi : json.page.legacy_en || FALLBACK_OVERVIEW.legacy,
            });
          } else {
            setOverview(isHindi ? FALLBACK_OVERVIEW_HI : FALLBACK_OVERVIEW);
          }
        }
      } catch (err) {
        console.error('Error loading history:', err);
        if (!cancelled) {
          setOverview(isHindi ? FALLBACK_OVERVIEW_HI : FALLBACK_OVERVIEW);
          setTimelineEvents(
            FALLBACK_TIMELINE.map((item) => ({
              id: item.id,
              year: item.year,
              title: isHindi ? item.title_hi : item.title_en,
              description: isHindi ? item.description_hi : item.description_en,
            }))
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchHistory();
    return () => {
      cancelled = true;
    };
  }, [isHindi]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'संस्थान के बारे में' : 'About NITH'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'इतिहास और विकास' : 'History & Timeline'}
          </span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-[#500c0e] via-[#631012] to-[#7a1a1d] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Landmark size={14} />
            <span>{isHindi ? 'स्थापना वर्ष 1986' : 'Established in 1986'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {isHindi ? 'एनआईटी हमीरपुर का इतिहास' : 'History of NIT Hamirpur'}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            {isHindi
              ? 'क्षेत्रीय इंजीनियरिंग कॉलेज से राष्ट्रीय महत्व के प्रमुख संस्थान तक की गौरवशाली विकास यात्रा।'
              : 'A proud journey of transformation from Regional Engineering College to an Institute of National Importance.'}
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-12">
        {/* Narrative Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-4 relative z-10">
          <div className="border-l-4 border-[#631012] pl-4 space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {isHindi ? 'संस्थान की पृष्ठभूमि एवं विकास' : 'Historical Background & Evolution'}
            </h2>
            <p className="text-xs text-gray-500 font-mono">
              {isHindi ? 'शैक्षणिक उत्कृष्टता और राष्ट्र निर्माण के 38+ वर्ष' : '38+ Years of Technical Excellence & Nation Building'}
            </p>
          </div>

          <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
            <p>{overview.description1}</p>
            <p>{overview.description2}</p>
            <p className="bg-[#631012]/5 p-4 rounded-lg border-l-2 border-[#631012] text-gray-800 font-medium">
              {overview.legacy}
            </p>
          </div>
        </div>

        {/* Chronological Timeline Section */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#631012] uppercase tracking-wide">
              {isHindi ? 'प्रमुख ऐतिहासिक मील के पत्थर' : 'Chronological Milestones'}
            </h2>
            <p className="text-xs text-gray-500">
              {isHindi ? 'संस्थान की स्थापना से लेकर आज तक का महत्वपूर्ण घटनाक्रम' : 'Key historical events shaping our legacy of excellence'}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
              <Loader2 className="w-8 h-8 animate-spin text-[#631012] mb-2" />
              <p className="text-xs font-mono text-gray-500">Loading timeline milestones...</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-[#631012]/30 ml-4 sm:ml-32 space-y-8 py-4">
              {timelineEvents.map((event, idx) => (
                <div key={event.id || idx} className="relative pl-6 sm:pl-8 group">
                  {/* Timeline Badge for Year on Desktop */}
                  <div className="hidden sm:flex absolute -left-32 top-0.5 w-24 justify-end font-mono font-bold text-sm text-[#631012] text-right">
                    {event.year}
                  </div>

                  {/* Bullet Node */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#631012] group-hover:scale-125 transition-transform" />

                  {/* Content Card */}
                  <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm group-hover:shadow-md group-hover:border-[#631012]/40 transition-all space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="sm:hidden font-mono font-bold text-xs bg-[#631012] text-white px-2 py-0.5 rounded">
                        {event.year}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#631012] transition-colors">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
