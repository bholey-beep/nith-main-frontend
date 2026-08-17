'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  ChevronRight,
  ShieldCheck,
  Trophy,
  Globe,
  Users,
  Heart,
  ClipboardCheck,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface CoreValue {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface PageData {
  hero_heading: string;
  hero_description: string;
  pillars_heading: string;
  pillars_subtitle: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Trophy,
  Globe,
  Users,
  Heart,
  ClipboardCheck,
};

const FALLBACK_PAGE: PageData = {
  hero_heading: 'Core Values of NIT Hamirpur',
  hero_description: 'At National Institute of Technology Hamirpur, our core values represent the foundational principles that guide our academic endeavours, student development, research innovation, and societal commitment.',
  pillars_heading: 'The Principles That Guide Us',
  pillars_subtitle: 'Building a legacy of integrity, scientific curiosity, and holistic growth.',
};

const FALLBACK_VALUES = [
  {
    id: 1,
    icon: 'ShieldCheck',
    title_en: 'Integrity & Ethics',
    title_hi: 'सत्यनिष्ठा और नैतिकता',
    description_en: 'Upholding absolute honesty, moral responsibility, academic transparency, and uncompromising ethical conduct in all research and governance.',
    description_hi: 'सभी अनुसंधान और शासन में पूर्ण ईमानदारी, नैतिक जिम्मेदारी, शैक्षणिक पारदर्शिता और नैतिक आचरण को बनाए रखना।'
  },
  {
    id: 2,
    icon: 'Trophy',
    title_en: 'Academic & Research Excellence',
    title_hi: 'शैक्षणिक और अनुसंधान उत्कृष्टता',
    description_en: 'Striving for global benchmarks in engineering, architecture, sciences, and humanities through rigorous pedagogy and high-impact scholarship.',
    description_hi: 'सख्त शिक्षण और उच्च-प्रभाव छात्रवृत्ति के माध्यम से इंजीनियरिंग, वास्तुकला, विज्ञान और मानविकी में वैश्विक बेंचमार्क हासिल करना।'
  },
  {
    id: 3,
    icon: 'Globe',
    title_en: 'Innovation & Sustainability',
    title_hi: 'नवाचार और स्थिरता',
    description_en: 'Fostering inventive problem-solving focused on ecological preservation, renewable energy, circular economy, and socio-economic progress.',
    description_hi: 'पारिस्थितिक संरक्षण, नवीकरणीय ऊर्जा, चक्रीय अर्थव्यवस्था और सामाजिक-आर्थिक प्रगति पर केंद्रित समस्या-समाधान को बढ़ावा देना।'
  },
  {
    id: 4,
    icon: 'Users',
    title_en: 'Inclusivity & Diversity',
    title_hi: 'समावेशिता और विविधता',
    description_en: 'Cultivating an empathetic, egalitarian, and collaborative campus culture that celebrates diverse cultures, perspectives, and talents.',
    description_hi: 'एक सहानुभूतिपूर्ण, समतावादी और सहयोगात्मक परिसर संस्कृति का निर्माण करना जो विविध संस्कृतियों, दृष्टिकोणों और प्रतिभाओं का सम्मान करती है।'
  },
  {
    id: 5,
    icon: 'Heart',
    title_en: 'Social Responsibility & Patriotism',
    title_hi: 'सामाजिक उत्तरदायित्व और राष्ट्र सेवा',
    description_en: 'Dedicated to community welfare, rural transformation, technology transfer to hill areas, and national development goals (Atmanirbhar Bharat).',
    description_hi: 'सामुदायिक कल्याण, ग्रामीण परिवर्तन, पहाड़ी क्षेत्रों में प्रौद्योगिकी हस्तांतरण और राष्ट्रीय विकास लक्ष्यों (आत्मनिर्भर भारत) के लिए समर्पित।'
  },
  {
    id: 6,
    icon: 'ClipboardCheck',
    title_en: 'Lifelong Learning & Leadership',
    title_hi: 'आजीवन सीखना और नेतृत्व',
    description_en: 'Nurturing adaptive curiosity, analytical resilience, and leadership qualities in students to excel in dynamically changing global landscapes.',
    description_hi: 'गतिशील रूप से बदलती वैश्विक चुनौतियों में उत्कृष्ट प्रदर्शन करने के लिए छात्रों में जिज्ञासा, विश्लेषणात्मक लचीलापन और नेतृत्व गुणों का पोषण करना।'
  }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function CoreValuesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [values, setValues] = useState<CoreValue[]>([]);
  const [pageData, setPageData] = useState<PageData>(FALLBACK_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchValues() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/core-values`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success && !cancelled) {
          const items = Array.isArray(json.data) && json.data.length > 0 ? json.data : FALLBACK_VALUES;
          const mapped = items.map((item: any) => ({
            id: item.id,
            icon: item.icon || 'ShieldCheck',
            title: isHindi && item.title_hi ? item.title_hi : item.title_en,
            description: isHindi && item.description_hi ? item.description_hi : item.description_en,
          }));
          setValues(mapped);

          if (json.page && (json.page.hero_heading_en || json.page.hero_heading_hi)) {
            setPageData({
              hero_heading: isHindi && json.page.hero_heading_hi ? json.page.hero_heading_hi : json.page.hero_heading_en || FALLBACK_PAGE.hero_heading,
              hero_description: isHindi && json.page.hero_description_hi ? json.page.hero_description_hi : json.page.hero_description_en || FALLBACK_PAGE.hero_description,
              pillars_heading: isHindi && json.page.pillars_heading_hi ? json.page.pillars_heading_hi : json.page.pillars_heading_en || FALLBACK_PAGE.pillars_heading,
              pillars_subtitle: isHindi && json.page.pillars_subtitle_hi ? json.page.pillars_subtitle_hi : json.page.pillars_subtitle_en || FALLBACK_PAGE.pillars_subtitle,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching core values:', err);
        if (!cancelled) {
          setValues(
            FALLBACK_VALUES.map((item) => ({
              id: item.id,
              icon: item.icon,
              title: isHindi ? item.title_hi : item.title_en,
              description: isHindi ? item.description_hi : item.description_en,
            }))
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchValues();
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
            {isHindi ? 'मूल मूल्य' : 'Core Values'}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#500c0e] via-[#631012] to-[#7a1a1d] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles size={14} />
            <span>{isHindi ? 'संस्थागत सिद्धांत' : 'Guiding Principles'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {pageData.hero_heading}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            {pageData.hero_description}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-12">
        <div className="text-center space-y-1 pt-4">
          <h2 className="text-2xl font-bold text-[#631012] uppercase tracking-wide">
            {pageData.pillars_heading}
          </h2>
          <p className="text-xs text-gray-500 max-w-xl mx-auto">
            {pageData.pillars_subtitle}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-xl">
            <Loader2 className="w-8 h-8 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading core values...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item) => {
              const IconComp = ICON_MAP[item.icon] || ShieldCheck;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#631012]/40 transition-all duration-300 flex flex-col space-y-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#631012]/10 text-[#631012] flex items-center justify-center group-hover:bg-[#631012] group-hover:text-white transition-colors duration-300 shrink-0">
                    <IconComp size={24} />
                  </div>
                  <div className="space-y-2 flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#631012] transition-colors">
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
      </main>
    </div>
  );
}
