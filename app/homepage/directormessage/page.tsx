'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Quote } from 'lucide-react';

interface DirectorData {
  image: string;
  label_en: string;
  label_hi: string;
  heading_en: string;
  heading_hi: string;
  name_en: string;
  name_hi: string;
  designation_en: string;
  designation_hi: string;
  institute_en: string;
  institute_hi: string;
  message_en: string;
  message_hi: string;
}

const fallbackDirectorData: DirectorData = {
  image: '/admin.jpg',
  label_en: "Leadership & Vision",
  label_hi: "नेतृत्व और दृष्टिकोण",
  heading_en: "From the Director's Desk",
  heading_hi: "निदेशक का संदेश",
  name_en: "Prof. H. M. Suryawanshi",
  name_hi: "प्रो. एच. एम. सूर्यवंशी",
  designation_en: "Director",
  designation_hi: "निदेशक",
  institute_en: "National Institute of Technology Hamirpur",
  institute_hi: "राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर",
  message_en: "At NIT Hamirpur, our pursuit is grounded in advancing scientific knowledge, fostering pioneering innovation, and empowering responsible leaders equipped to address the complex technological and societal challenges of our world.",
  message_hi: "एनआईटी हमीरपुर में, हमारा प्रयास वैज्ञानिक ज्ञान को आगे बढ़ाने, अग्रणी नवाचार को बढ़ावा देने और हमारे समाज की जटिल तकनीकी चुनौतियों का समाधान करने के लिए जिम्मेदार नेताओं को सशक्त बनाने पर आधारित है।"
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function Director() {
  const language = useSelector((state: RootState) => state.language.value);

  const [directorData, setDirectorData] = useState<DirectorData>(fallbackDirectorData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchDirector() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/v1/homepage/director`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch director data');
        const json = await res.json();

        if (mounted && json.success && json.data) {
          setDirectorData({
            image: json.data.image || fallbackDirectorData.image,
            label_en: json.data.label_en || fallbackDirectorData.label_en,
            label_hi: json.data.label_hi || fallbackDirectorData.label_hi,
            heading_en: json.data.heading_en || fallbackDirectorData.heading_en,
            heading_hi: json.data.heading_hi || fallbackDirectorData.heading_hi,
            name_en: json.data.name_en || fallbackDirectorData.name_en,
            name_hi: json.data.name_hi || fallbackDirectorData.name_hi,
            designation_en: json.data.designation_en || fallbackDirectorData.designation_en,
            designation_hi: json.data.designation_hi || fallbackDirectorData.designation_hi,
            institute_en: json.data.institute_en || fallbackDirectorData.institute_en,
            institute_hi: json.data.institute_hi || fallbackDirectorData.institute_hi,
            message_en: json.data.message_en || fallbackDirectorData.message_en,
            message_hi: json.data.message_hi || fallbackDirectorData.message_hi,
          });
        }
      } catch (err) {
        console.warn('Using fallback director data due to fetch error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchDirector();

    return () => {
      mounted = false;
    };
  }, []);

  const label = language === 'hi' ? directorData.label_hi : directorData.label_en;
  const heading = language === 'hi' ? directorData.heading_hi : directorData.heading_en;
  const name = language === 'hi' ? directorData.name_hi : directorData.name_en;
  const designation = language === 'hi' ? directorData.designation_hi : directorData.designation_en;
  const institute = language === 'hi' ? directorData.institute_hi : directorData.institute_en;
  const message = language === 'hi' ? directorData.message_hi : directorData.message_en;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden border-t border-b border-gray-100">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#631012]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-[2px] bg-[#631012]"></span>
            <span className="text-[#631012] font-bold tracking-widest uppercase text-xs sm:text-sm">
              {label}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {heading}
          </h2>
        </div>

        {/* Main Content Box */}
        <div className="bg-white border border-gray-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#631012] z-20"></div>

          {/* Left Column: Portrait & Title Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-gray-900 to-black text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Gradient */}
            <div className="absolute inset-0 bg-[#631012]/20 mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10">
              <div className="relative w-full aspect-[4/5] max-w-[320px] mx-auto overflow-hidden shadow-2xl border-2 border-white/20 bg-gray-800 mb-6">
                {directorData.image ? (
                  <Image
                    src={directorData.image}
                    alt={name || 'Director'}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                    Portrait
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-10 text-center sm:text-left mt-2">
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {name}
              </h3>
              <p className="text-sm font-semibold text-red-300 uppercase tracking-wider mt-1">
                {designation}
              </p>
              <div className="w-12 h-[2px] bg-[#631012] my-3 mx-auto sm:mx-0"></div>
              <p className="text-xs text-gray-400 font-medium tracking-wide">
                {institute}
              </p>
            </div>
          </div>

          {/* Right Column: Quote & Message */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white relative">
            {/* Watermark Quote Icon */}
            <Quote className="absolute top-6 right-8 w-24 h-24 text-gray-100 -rotate-12 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#631012] border border-red-100 text-xs font-bold uppercase tracking-wider mb-6">
                <Quote className="w-3.5 h-3.5" />
                Message to Students & Scholars
              </div>

              <blockquote className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose font-normal italic">
                &ldquo;{message}&rdquo;
              </blockquote>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#631012]/10 flex items-center justify-center text-[#631012] font-bold text-sm">
                  NIT
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">Office of the Director</p>
                  <p className="text-xs text-gray-500">Hamirpur, Himachal Pradesh, India</p>
                </div>
              </div>

              <a
                href="/homepage/directormessage"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 hover:bg-[#631012] text-white text-xs font-bold uppercase tracking-widest transition-colors duration-300"
              >
                Read Full Profile
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}