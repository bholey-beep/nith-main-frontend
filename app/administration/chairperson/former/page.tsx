'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface FormerChairperson {
  id: number;
  type: string;
  heading_en: string;
  heading_hi?: string;
  dates: string;
  image: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function FormerChairpersonsPage() {
  const language = useSelector((state: RootState) => state.language?.value || 'en');
  const isHindi = language === 'hi';

  const [formerList, setFormerList] = useState<FormerChairperson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/administration/chairperson`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.formerChairpersons) setFormerList(data.formerChairpersons);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'प्रशासन' : 'Administration'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <Link href="/administration/chairperson" className="text-gray-600 hover:text-[#631012]">
            {isHindi ? 'अध्यक्ष' : 'Chairperson'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'पूर्व अध्यक्ष' : 'Former Chairpersons'}
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {isHindi ? 'पूर्व अध्यक्ष, शासी मंडल' : 'Former Chairpersons, Board of Governors'}
          </h1>
          <div className="w-16 h-0.5 bg-[#631012] mx-auto opacity-70" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading Former Chairpersons...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
            {formerList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center group bg-white"
              >
                <div className="w-36 h-44 sm:w-40 sm:h-48 overflow-hidden rounded border border-gray-300 shadow-sm bg-gray-100 flex items-center justify-center">
                  <img
                    src={
                      item.image ||
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={item.heading_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-3 space-y-1">
                  <h3 className="font-bold text-xs sm:text-sm text-[#800000] border-b border-[#800000]/40 pb-0.5 inline-block">
                    {isHindi ? item.heading_hi || item.heading_en : item.heading_en}
                  </h3>
                  <p className="text-[11px] text-gray-700 font-mono">{item.dates}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
