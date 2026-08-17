'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  ChevronRight,
  Landmark,
  Sparkles,
  Sun,
  GraduationCap,
  MapPin,
  Mountain,
  BookOpen,
  Loader2,
} from 'lucide-react';

interface CityInfo {
  id: number;
  icon: string;
  title: string;
  description: string;
  image_url: string;
}

interface CityCard {
  id: number;
  label: string;
  value: string;
}

interface PageData {
  heading: string;
  introduction: string;
  overview_title: string;
  overview_subtitle: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Landmark,
  Sparkles,
  Sun,
  GraduationCap,
  Mountain,
  BookOpen,
};

const FALLBACK_PAGE: PageData = {
  heading: 'About Hamirpur City',
  introduction: 'Hamirpur, the educational heartland of Himachal Pradesh, is a vibrant town nestled amidst the tranquil pine-clad hills of the Shivalik range. Renowned for having the highest literacy rate in the state and second highest in India, Hamirpur combines serene natural splendor with a rich cultural heritage and dynamic student community.',
  overview_title: 'City Overview & Cultural Heritage',
  overview_subtitle: 'Discover the History, Climate, Culture, and Tourist Attractions of Hamirpur.',
};

const FALLBACK_CARDS = [
  { id: 1, label: 'State & District', value: 'Himachal Pradesh (Hamirpur Dist.)' },
  { id: 2, label: 'Elevation', value: '785 metres (2,575 ft) AMSL' },
  { id: 3, label: 'Literacy Rate', value: '88.15% (Highest in HP)' },
  { id: 4, label: 'Climate', value: 'Sub-tropical to Temperate' },
];

const FALLBACK_INFO = [
  {
    id: 1,
    icon: 'Landmark',
    title_en: 'Historic Sujanpur Tira & Fort',
    title_hi: 'ऐतिहासिक सुजानपुर टीरा और किला',
    description_en: 'Built in 1748 AD by Raja Abhay Chand and expanded by Maharaja Sansar Chand, famed for Kangra wall paintings and the royal chaugan (ground).',
    description_hi: '1748 ईस्वी में राजा अभय चंद द्वारा निर्मित और महाराजा संसार चंद द्वारा विस्तारित, कांगड़ा भित्ति चित्रों और शाही चौगान के लिए प्रसिद्ध।',
    image_url: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    icon: 'Sparkles',
    title_en: 'Baba Balak Nath Temple, Deotsidh',
    title_hi: 'बाबा बालक नाथ मंदिर, दियोटसिद्ध',
    description_en: 'A holy cave shrine situated on the Dhaulagiri hill border attracting millions of pilgrims from across India and the globe during the Chaitra Fair.',
    description_hi: 'धौलागिरी पहाड़ी सीमा पर स्थित एक पवित्र गुफा मंदिर जो चैत्र मेले के दौरान भारत और दुनिया भर से लाखों तीर्थयात्रियों को आकर्षित करता है।',
    image_url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    icon: 'Sun',
    title_en: 'Scenic Pine Forests & Shivalik Vistas',
    title_hi: 'सुरम्य चीड़ के जंगल और शिवालिक दृश्य',
    description_en: 'Clean mountain air, invigorating nature trails, and breathtaking panoramic views of the snow-clad Dhauladhar peaks during winter months.',
    description_hi: 'स्वच्छ पहाड़ी हवा, स्फूर्तिदायक प्रकृति ट्रेल्स और सर्दियों के महीनों के दौरान बर्फ से ढकी धौलाधार चोटियों के लुभावने दृश्य।',
    image_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    icon: 'GraduationCap',
    title_en: 'Premier Academic & Research Hub',
    title_hi: 'प्रमुख शैक्षणिक और अनुसंधान केंद्र',
    description_en: 'A thriving ecosystem of scholars, engineers, and scientists making Hamirpur a beacon of innovation and youth empowerment in North India.',
    description_hi: 'विद्वानों, इंजीनियरों और वैज्ञानिकों का एक संपन्न पारिस्थितिकी तंत्र जो हमीरपुर को उत्तर भारत में नवाचार और युवा सशक्तिकरण का एक प्रकाशस्तंभ बनाता है।',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function TheCityPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [cityInfo, setCityInfo] = useState<CityInfo[]>([]);
  const [cards, setCards] = useState<CityCard[]>(FALLBACK_CARDS);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [pageData, setPageData] = useState<PageData>(FALLBACK_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchCity() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/about-city`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success && !cancelled) {
          const items = Array.isArray(json.data) && json.data.length > 0 ? json.data : FALLBACK_INFO;
          setCityInfo(
            items.map((c: any) => ({
              id: c.id,
              icon: c.icon || 'Landmark',
              title: isHindi && c.title_hi ? c.title_hi : c.title_en,
              description: isHindi && c.description_hi ? c.description_hi : c.description_en,
              image_url: c.image_url || '',
            }))
          );

          if (Array.isArray(json.cards) && json.cards.length > 0) {
            setCards(
              json.cards.map((card: any) => ({
                id: card.id,
                label: isHindi && card.label_hi ? card.label_hi : card.label_en,
                value: isHindi && card.value_hi ? card.value_hi : card.value_en,
              }))
            );
          }

          if (Array.isArray(json.descriptions) && json.descriptions.length > 0) {
            setDescriptions(
              json.descriptions.map((d: any) => (isHindi && d.description_hi ? d.description_hi : d.description_en))
            );
          }

          if (json.page && (json.page.heading_en || json.page.heading_hi)) {
            setPageData({
              heading: isHindi && json.page.heading_hi ? json.page.heading_hi : json.page.heading_en || FALLBACK_PAGE.heading,
              introduction: isHindi && json.page.introduction_hi ? json.page.introduction_hi : json.page.introduction_en || FALLBACK_PAGE.introduction,
              overview_title: isHindi && json.page.overview_title_hi ? json.page.overview_title_hi : json.page.overview_title_en || FALLBACK_PAGE.overview_title,
              overview_subtitle: isHindi && json.page.overview_subtitle_hi ? json.page.overview_subtitle_hi : json.page.overview_subtitle_en || FALLBACK_PAGE.overview_subtitle,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching city info:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCity();
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
            {isHindi ? 'हमीरपुर शहर' : 'The City'}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#500c0e] via-[#631012] to-[#7a1a1d] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <MapPin size={14} />
            <span>{isHindi ? 'हिमाचल प्रदेश की शिक्षा राजधानी' : 'Education Capital of Himachal Pradesh'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {pageData.heading}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            {pageData.introduction}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-12">
        {/* City Stats Strip */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {cards.map((card) => (
            <div key={card.id} className="p-3 text-center space-y-1">
              <div className="text-xs text-gray-500 font-medium">
                {card.label}
              </div>
              <div className="text-sm sm:text-base font-bold text-gray-900">
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Section */}
        {descriptions.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-[#631012] pl-3">
              {pageData.overview_title}
            </h2>
            <div className="text-gray-700 text-xs sm:text-sm leading-relaxed space-y-3">
              {descriptions.map((desc, idx) => (
                <p key={idx}>{desc}</p>
              ))}
            </div>
          </div>
        )}

        {/* City Highlights & Tourist Landmarks */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#631012] uppercase tracking-wide">
              {isHindi ? 'हमीरपुर के प्रमुख आकर्षण व विरासत' : 'City Attractions & Heritage'}
            </h2>
            <p className="text-xs text-gray-500">
              {pageData.overview_subtitle}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
              <Loader2 className="w-8 h-8 animate-spin text-[#631012] mb-2" />
              <p className="text-xs font-mono text-gray-500">Loading city attractions...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityInfo.map((item) => {
                const IconComp = ICON_MAP[item.icon] || Landmark;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#631012]/40 transition-all overflow-hidden flex flex-col group"
                  >
                    {item.image_url && (
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-[#631012]/10 text-[#631012] flex items-center justify-center shrink-0">
                            <IconComp size={18} />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#631012] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
