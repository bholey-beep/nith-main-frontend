'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  ChevronRight,
  Plane,
  Train,
  Bus,
  MapPin,
  Clock,
  Compass,
  Navigation,
  Loader2,
} from 'lucide-react';

interface ConnectivityMode {
  id: number;
  icon: string;
  title: string;
  nearest_point: string;
  distance: string;
  travel_time: string;
  services: string;
  additional_info: string;
}

interface PageData {
  hero_heading: string;
  hero_description: string;
  travel_options_heading: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Plane,
  Train,
  Bus,
};

const FALLBACK_PAGE: PageData = {
  hero_heading: 'How to Reach NIT Hamirpur',
  hero_description: 'NIT Hamirpur is well-connected by road, rail, and air to major metropolitan hubs including New Delhi, Chandigarh, Kangra, and Shimla. Located at Anu, 4 km from Hamirpur city bus terminus.',
  travel_options_heading: 'Travel Options & Connectivity Routes',
};

const FALLBACK_MODES = [
  {
    id: 1,
    icon: 'Plane',
    title_en: 'By Air',
    title_hi: 'हवाई मार्ग द्वारा',
    nearest_point_en: 'Gaggal Airport (Dharamshala/Kangra) / Chandigarh Airport',
    nearest_point_hi: 'गग्गल हवाई अड्डा (कांगड़ा/धर्मशाला) / चंडीगढ़ हवाई अड्डा',
    distance_en: '85 km from Gaggal / 210 km from Chandigarh',
    distance_hi: 'गग्गल से 85 किमी / चंडीगढ़ से 210 किमी',
    travel_time_en: '2.5 - 4.5 Hours by Taxi/Bus',
    travel_time_hi: 'टैक्सी/बस द्वारा 2.5 - 4.5 घंटे',
    services_en: 'Regular daily flights from New Delhi (DEL) to Kangra Airport (DHM) operated by Alliance Air, SpiceJet, and IndiGo. Direct taxis and frequent state transport buses are available from Kangra to Hamirpur.',
    services_hi: 'एलायंस एयर, स्पाइसजेट और इंडिगो द्वारा संचालित नई दिल्ली (DEL) से कांगड़ा हवाई अड्डे (DHM) के लिए नियमित दैनिक उड़ानें। कांगड़ा से हमीरपुर के लिए सीधी टैक्सियाँ और लगातार राज्य परिवहन बसें उपलब्ध हैं।',
    additional_info_en: 'Chandigarh International Airport (IXC) serves as a convenient alternative with nationwide flight connectivity and 4.5-hour direct highway access to Hamirpur.',
    additional_info_hi: 'चंडीगढ़ अंतर्राष्ट्रीय हवाई अड्डा (IXC) देशव्यापी उड़ान कनेक्टिविटी और हमीरपुर के लिए 4.5 घंटे के सीधे राजमार्ग पहुंच के साथ एक सुविधाजनक विकल्प के रूप में कार्य करता है।'
  },
  {
    id: 2,
    icon: 'Train',
    title_en: 'By Train',
    title_hi: 'रेल मार्ग द्वारा',
    nearest_point_en: 'Una Himachal Railway Station (UHL) / Amb Andaura (AADR)',
    nearest_point_hi: 'ऊना हिमाचल रेलवे स्टेशन (UHL) / अंब अंदौरा (AADR)',
    distance_en: '78 km from Una / 80 km from Amb Andaura',
    distance_hi: 'ऊना से 78 किमी / अंब अंदौरा से 80 किमी',
    travel_time_en: '2 Hours by Bus / Taxi from Una',
    travel_time_hi: 'ऊना से बस / टैक्सी द्वारा 2 घंटे',
    services_en: 'Broad gauge railway stations with direct superfast and Vande Bharat Express connectivity to New Delhi (Vande Bharat Express 22447/22448, Himachal Express, Jan Shatabdi Express).',
    services_hi: 'नई दिल्ली के लिए सीधी सुपरफास्ट और वंदे भारत एक्सप्रेस कनेक्टिविटी वाले ब्रॉड गेज रेलवे स्टेशन (वंदे भारत एक्सप्रेस 22447/22448, हिमाचल एक्सप्रेस, जन शताब्दी एक्सप्रेस)।',
    additional_info_en: 'Round-the-clock HRTC buses and pre-paid taxis are easily available outside Una Railway Station directly to NIT Hamirpur campus.',
    additional_info_hi: 'ऊना रेलवे स्टेशन के बाहर से सीधे एनआईटी हमीरपुर परिसर के लिए 24 घंटे एचआरटीसी बसें और प्री-पेड टैक्सियां आसानी से उपलब्ध हैं।'
  },
  {
    id: 3,
    icon: 'Bus',
    title_en: 'By Road / Bus',
    title_hi: 'सड़क / बस द्वारा',
    nearest_point_en: 'Hamirpur Main Bus Stand (ISBT Hamirpur)',
    nearest_point_hi: 'हमीरपुर मुख्य बस स्टैंड (आईएसबीटी हमीरपुर)',
    distance_en: '4 km from Campus (Anu)',
    distance_hi: 'परिसर (अनु) से 4 किमी',
    travel_time_en: '10 mins via local city bus or taxi',
    travel_time_hi: 'स्थानीय सिटी बस या टैक्सी द्वारा 10 मिनट',
    services_en: 'Direct overnight Deluxe and Volvo AC buses run daily by HRTC and private operators from ISBT Kashmiri Gate New Delhi (450 km, 8-9 hours), Chandigarh ISBT Sector 43 (200 km, 4.5 hours), and Shimla (145 km, 4 hours).',
    services_hi: 'आईएसबीटी कश्मीरी गेट नई दिल्ली (450 किमी, 8-9 घंटे), चंडीगढ़ आईएसबीटी सेक्टर 43 (200 किमी, 4.5 घंटे), और शिमला (145 किमी, 4 घंटे) से एचआरटीसी और निजी ऑपरेटरों द्वारा प्रतिदिन सीधी वोल्वो एसी बसें चलती हैं।',
    additional_info_en: 'Local buses and autorickshaws ply frequently from Hamirpur Main Bus Stand to NIT Campus Gate (Anu).',
    additional_info_hi: 'हमीरपुर मुख्य बस स्टैंड से एनआईटी कैंपस गेट (अनु) तक स्थानीय बसें और ऑटो रिक्शा लगातार चलते हैं।'
  }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function ConnectivityPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [modes, setModes] = useState<ConnectivityMode[]>([]);
  const [pageData, setPageData] = useState<PageData>(FALLBACK_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchConnectivity() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/connectivity`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success && !cancelled) {
          const items = Array.isArray(json.data) && json.data.length > 0 ? json.data : FALLBACK_MODES;
          const mapped = items.map((item: any) => ({
            id: item.id,
            icon: item.icon || 'Bus',
            title: isHindi && item.title_hi ? item.title_hi : item.title_en,
            nearest_point: isHindi && item.nearest_point_hi ? item.nearest_point_hi : item.nearest_point_en,
            distance: isHindi && item.distance_hi ? item.distance_hi : item.distance_en,
            travel_time: isHindi && item.travel_time_hi ? item.travel_time_hi : item.travel_time_en,
            services: isHindi && item.services_hi ? item.services_hi : item.services_en,
            additional_info: isHindi && item.additional_info_hi ? item.additional_info_hi : item.additional_info_en,
          }));
          setModes(mapped);

          if (json.page && (json.page.hero_heading_en || json.page.hero_heading_hi)) {
            setPageData({
              hero_heading: isHindi && json.page.hero_heading_hi ? json.page.hero_heading_hi : json.page.hero_heading_en || FALLBACK_PAGE.hero_heading,
              hero_description: isHindi && json.page.hero_description_hi ? json.page.hero_description_hi : json.page.hero_description_en || FALLBACK_PAGE.hero_description,
              travel_options_heading: isHindi && json.page.travel_options_heading_hi ? json.page.travel_options_heading_hi : json.page.travel_options_heading_en || FALLBACK_PAGE.travel_options_heading,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching connectivity:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchConnectivity();
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
            {isHindi ? 'कनेक्टिविटी और रास्ते' : 'Connectivity'}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#500c0e] via-[#631012] to-[#7a1a1d] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Navigation size={14} />
            <span>{isHindi ? 'यात्रा और संपर्क' : 'Travel & Navigation'}</span>
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-xl">
            <Loader2 className="w-8 h-8 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading travel options...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {modes.map((item) => {
              const IconComp = ICON_MAP[item.icon] || Bus;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#631012]/40 transition-all flex flex-col md:flex-row gap-6 group"
                >
                  {/* Icon & Title */}
                  <div className="md:w-64 shrink-0 space-y-3">
                    <div className="w-14 h-14 rounded-xl bg-[#631012]/10 text-[#631012] flex items-center justify-center group-hover:bg-[#631012] group-hover:text-white transition-colors duration-300">
                      <IconComp size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#631012] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono mt-1">
                        {item.distance} • {item.travel_time}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-grow space-y-3 border-t md:border-t-0 md:border-l md:pl-6 border-gray-200 pt-4 md:pt-0">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-[#631012] uppercase tracking-wider">
                        {isHindi ? 'निकटतम बिंदु / केंद्र' : 'Nearest Transit Point'}
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        {item.nearest_point}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                        {isHindi ? 'उपलब्ध सेवाएं व दिशानिर्देश' : 'Services & Route Guidelines'}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {item.services}
                      </p>
                    </div>

                    {item.additional_info && (
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-600">
                        {item.additional_info}
                      </div>
                    )}
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
