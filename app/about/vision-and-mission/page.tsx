'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  ChevronRight,
  Target,
  BookOpen,
  Cpu,
  Briefcase,
  Compass,
  Award,
  Users,
  Building,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface MissionPillar {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface LegacyStat {
  id: number;
  value: string;
  label: string;
  description: string;
}

interface PageData {
  vision_heading: string;
  vision_subtitle: string;
  vision_description: string;
  mission_heading: string;
  mission_subtitle: string;
  tagline: string;
  tagline_description: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Cpu,
  Briefcase,
  Compass,
  Target,
};

const FALLBACK_PAGE: PageData = {
  vision_heading: 'Our Vision',
  vision_subtitle: 'A Global Leader in Technical Education & Transformative Innovation',
  vision_description: 'To build a vibrant, multidisciplinary learning environment that fosters research excellence, sustainable technological solutions, ethical leadership, and global competence for the betterment of society and the nation.',
  mission_heading: 'Our Mission',
  mission_subtitle: 'Strategic Paths Towards Academic & Societal Leadership',
  tagline: 'Education, Innovation & Excellence for Sustainable Future',
  tagline_description: 'Bridging the gap between Himalayan wisdom and 21st-century technological breakthroughs through collaborative research and industry integration.',
};

const FALLBACK_PILLARS = [
  {
    id: 1,
    icon: 'BookOpen',
    title_en: 'Academic Excellence & Rigour',
    title_hi: 'शैक्षणिक उत्कृष्टता और कठोरता',
    description_en: 'Provide cutting-edge undergraduate, postgraduate, and doctoral education that meets international accreditation and dynamic industry requirements.',
    description_hi: 'अत्याधुनिक स्नातक, स्नातकोत्तर और डॉक्टरेट शिक्षा प्रदान करना जो अंतर्राष्ट्रीय मान्यता और गतिशील उद्योग आवश्यकताओं को पूरा करती है।'
  },
  {
    id: 2,
    icon: 'Cpu',
    title_en: 'High-Impact Research & Innovation',
    title_hi: 'उच्च-प्रभाव अनुसंधान और नवाचार',
    description_en: 'Advance interdisciplinary research in clean energy, artificial intelligence, sustainable materials, and healthcare technology.',
    description_hi: 'स्वच्छ ऊर्जा, कृत्रिम बुद्धिमत्ता, सतत सामग्री और स्वास्थ्य प्रौद्योगिकी में अंतःविषय अनुसंधान को आगे बढ़ाना।'
  },
  {
    id: 3,
    icon: 'Briefcase',
    title_en: 'Industry & Entrepreneurship Synergy',
    title_hi: 'उद्योग और उद्यमिता तालमेल',
    description_en: 'Promote startup ecosystems, patent commercialization, technology incubation, and corporate research alliances.',
    description_hi: 'स्टार्टअप पारिस्थितिकी तंत्र, पेटेंट व्यावसायीकरण, प्रौद्योगिकी इनक्यूबेशन और कॉर्पोरेट अनुसंधान गठबंधनों को बढ़ावा देना।'
  },
  {
    id: 4,
    icon: 'Compass',
    title_en: 'Ethical Leadership & Social Impact',
    title_hi: 'नैतिक नेतृत्व और सामाजिक प्रभाव',
    description_en: 'Instill human values, environmental stewardship, empathy, and professional integrity in students for holistic nation-building.',
    description_hi: 'समग्र राष्ट्र निर्माण के लिए छात्रों में मानवीय मूल्यों, पर्यावरण संरक्षण, सहानुभूति और पेशेवर सत्यनिष्ठा का संचार करना।'
  }
];

const FALLBACK_STATS = [
  { id: 1, value: '320+', label: 'Acres Lush Green Campus', description: 'Picturesque Himalayan pine hills with state-of-the-art infrastructure.' },
  { id: 2, value: '4,500+', label: 'Active Students', description: 'Enrolled across B.Tech, B.Arch, M.Tech, MBA, M.Sc, and PhD programs.' },
  { id: 3, value: '25,000+', label: 'Global Alumni Network', description: 'Distinguished leaders across industry, research, academia, and civil services.' },
  { id: 4, value: '100+', label: 'Patents & Labs', description: 'Pioneering cutting-edge research in sustainable and computing technologies.' }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function VisionMissionPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [pillars, setPillars] = useState<MissionPillar[]>([]);
  const [stats, setStats] = useState<LegacyStat[]>(FALLBACK_STATS);
  const [pageData, setPageData] = useState<PageData>(FALLBACK_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchVisionMission() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/vision-mission`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success && !cancelled) {
          const items = Array.isArray(json.data) && json.data.length > 0 ? json.data : FALLBACK_PILLARS;
          const mapped = items.map((item: any) => ({
            id: item.id,
            icon: item.icon || 'BookOpen',
            title: isHindi && item.title_hi ? item.title_hi : item.title_en,
            description: isHindi && item.description_hi ? item.description_hi : item.description_en,
          }));
          setPillars(mapped);

          if (json.page && (json.page.vision_heading_en || json.page.vision_heading_hi)) {
            setPageData({
              vision_heading: isHindi && json.page.vision_heading_hi ? json.page.vision_heading_hi : json.page.vision_heading_en || FALLBACK_PAGE.vision_heading,
              vision_subtitle: isHindi && json.page.vision_subtitle_hi ? json.page.vision_subtitle_hi : json.page.vision_subtitle_en || FALLBACK_PAGE.vision_subtitle,
              vision_description: isHindi && json.page.vision_description_hi ? json.page.vision_description_hi : json.page.vision_description_en || FALLBACK_PAGE.vision_description,
              mission_heading: isHindi && json.page.mission_heading_hi ? json.page.mission_heading_hi : json.page.mission_heading_en || FALLBACK_PAGE.mission_heading,
              mission_subtitle: isHindi && json.page.mission_subtitle_hi ? json.page.mission_subtitle_hi : json.page.mission_subtitle_en || FALLBACK_PAGE.mission_subtitle,
              tagline: isHindi && json.page.tagline_hi ? json.page.tagline_hi : json.page.tagline_en || FALLBACK_PAGE.tagline,
              tagline_description: isHindi && json.page.tagline_description_hi ? json.page.tagline_description_hi : json.page.tagline_description_en || FALLBACK_PAGE.tagline_description,
            });
          }

          if (Array.isArray(json.stats) && json.stats.length > 0) {
            setStats(
              json.stats.map((s: any) => ({
                id: s.id,
                value: isHindi && s.value_hi ? s.value_hi : s.value_en,
                label: isHindi && s.label_hi ? s.label_hi : s.label_en,
                description: isHindi && s.description_hi ? s.description_hi : s.description_en,
              }))
            );
          }
        }
      } catch (err) {
        console.error('Error fetching vision mission:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchVisionMission();
    return () => {
      cancelled = true;
    };
  }, [isHindi]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'संस्थान के बारे में' : 'About NITH'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'विजन और मिशन' : 'Vision & Mission'}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#500c0e] via-[#631012] to-[#7a1a1d] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Target size={14} />
            <span>{isHindi ? 'विजन और मिशन' : 'Vision & Mission'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {pageData.vision_heading} & {pageData.mission_heading}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            {pageData.tagline}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-12">
        {/* Vision Statement Box */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-3 relative z-10 border-t-4 border-t-[#631012]">
          <div className="inline-block px-3 py-1 bg-[#631012]/10 text-[#631012] text-xs font-bold uppercase rounded">
            {isHindi ? 'संस्थान का विजन' : 'Institute Vision'}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {pageData.vision_subtitle}
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-2">
            {pageData.vision_description}
          </p>
        </div>

        {/* Mission Pillars */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#631012] uppercase tracking-wide">
              {pageData.mission_heading}
            </h2>
            <p className="text-xs text-gray-500 max-w-xl mx-auto">
              {pageData.mission_subtitle}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
              <Loader2 className="w-8 h-8 animate-spin text-[#631012] mb-2" />
              <p className="text-xs font-mono text-gray-500">Loading mission statements...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((item, idx) => {
                const IconComp = ICON_MAP[item.icon] || BookOpen;
                return (
                  <div
                    key={item.id || idx}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#631012]/40 transition-all flex gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#631012]/10 text-[#631012] flex items-center justify-center group-hover:bg-[#631012] group-hover:text-white transition-colors shrink-0">
                      <IconComp size={24} />
                    </div>
                    <div className="space-y-1.5 flex-grow">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#631012] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Legacy & Impact Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-gray-900">
              {isHindi ? 'हमारी विरासत और राष्ट्रव्यापी प्रभाव' : 'Our Enduring Impact & Reach'}
            </h3>
            <p className="text-xs text-gray-500">
              {isHindi ? 'दशकों से तकनीकी नवाचार और अनुसंधान में अग्रणी' : 'Decades of transformative higher education and global contributions'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-gray-50/70 p-5 rounded-lg border border-gray-200 text-center space-y-1 hover:border-[#631012]/30 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-black text-[#631012] font-mono">
                  {stat.value}
                </div>
                <div className="font-bold text-gray-900 text-xs sm:text-sm">
                  {stat.label}
                </div>
                <div className="text-[11px] text-gray-500 leading-snug">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
