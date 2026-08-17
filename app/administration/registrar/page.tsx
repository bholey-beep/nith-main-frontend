'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2, Building } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface RegistrarData {
  id?: number;
  image?: string;
  heading_en?: string;
  heading_hi?: string;
  designation_en?: string;
  designation_hi?: string;
  description_en?: string;
  description_hi?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function RegistrarPage() {
  const language = useSelector((state: RootState) => state.language?.value || 'en');
  const isHindi = language === 'hi';

  const [registrar, setRegistrar] = useState<RegistrarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/administration/registrar`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.registrar) setRegistrar(data.registrar);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const name = isHindi
    ? registrar?.heading_hi || registrar?.heading_en || 'डॉ. अर्चना संतोष नानोटी'
    : registrar?.heading_en || 'Dr. Archana Santosh Nanoty';

  const designation = isHindi
    ? registrar?.designation_hi || registrar?.designation_en || 'कुलसचिव, एनआईटी हमीरपुर'
    : registrar?.designation_en || 'Registrar, National Institute of Technology Hamirpur';

  const description = isHindi
    ? registrar?.description_hi || registrar?.description_en || ''
    : registrar?.description_en || '';

  const photo =
    registrar?.image ||
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80';

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
          <span className="text-[#631012] font-bold">{isHindi ? 'कुलसचिव' : 'Registrar'}</span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="flex justify-end">
          <Link
            href="/administration/registrar/office"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-[#631012] hover:text-white border border-gray-300 text-xs font-bold text-gray-700 transition-colors shadow-sm"
          >
            <Building size={14} />
            <span>{isHindi ? 'कुलसचिव कार्यालय कर्मचारी' : "Registrar's Office Staff"}</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading Registrar profile...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="shrink-0 mx-auto md:mx-0">
                <img
                  src={photo}
                  alt={name}
                  className="w-52 h-64 sm:w-60 sm:h-72 object-cover rounded-xl border-2 border-gray-200 shadow-md"
                />
              </div>

              <div className="space-y-4 flex-grow">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#631012] tracking-tight">
                    {name}
                  </h1>
                  <p className="text-sm sm:text-base font-semibold text-[#002b49] mt-1">
                    {designation}
                  </p>
                </div>

                <div className="w-16 h-0.5 bg-[#631012] opacity-70" />

                <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3 font-sans">
                  {description}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
