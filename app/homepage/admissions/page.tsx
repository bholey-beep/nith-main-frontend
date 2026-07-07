'use client';

import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  FileText,
  ArrowRight,
  X,
} from 'lucide-react';

interface AdmissionItem {
  id: number;

  title_en: string;
  title_hi: string;

  description_en: string;
  description_hi: string;

  created_at?: string;
  updated_at?: string;
}

interface AdmissionsResponse {
  heading_en: string;
  heading_hi: string;
  admissions: AdmissionItem[];
}

export default function Admissions() {
  const [data, setData] = useState<AdmissionsResponse>({
    heading_en: '',
    heading_hi: '',
    admissions: [],
  });

  // ✅ ONLY NEW ADDITION
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const [selectedAdmission, setSelectedAdmission] =
    useState<AdmissionItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'http://localhost:4000/v1/homepage/admission'
      );

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSelectedAdmission(null);

  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-12 font-sans">
        <div className="text-center">Loading admissions...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gray-50 py-12 font-sans">
        <div className="text-center text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-12 font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* MAIN CARD (UNCHANGED) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col w-full">

          {/* HEADER (UNCHANGED + TOGGLE ADDED ONLY) */}
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">

            <h2 className="text-4xl font-bold text-[#631012] underline tracking-tight">
              {lang === 'en'
                ? data.heading_en || 'Admissions'
                : data.heading_hi || 'प्रवेश'}
            </h2>

            {/* 🔥 LANGUAGE TOGGLE (ONLY ADDITION) */}
            <div className="flex gap-2">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-sm rounded border transition ${
                  lang === 'en'
                    ? 'bg-[#631012] text-white'
                    : 'bg-gray-100'
                }`}
              >
                EN
              </button>

              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1 text-sm rounded border transition ${
                  lang === 'hi'
                    ? 'bg-[#631012] text-white'
                    : 'bg-gray-100'
                }`}
              >
                HI
              </button>
            </div>

          </div>

          {/* LIST (UNCHANGED UI) */}
          <div className="flex flex-col h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">

            {data.admissions.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-center justify-between py-6 px-8 border-b border-gray-100 hover:bg-[#631012]/5 transition-all duration-300 cursor-pointer"
              >

                <div className="flex flex-col gap-2 flex-1">

                  {/* TITLE SWITCH */}
                  <p className="text-lg font-medium text-gray-700 group-hover:text-black">
                    {lang === 'en'
                      ? item.title_en
                      : item.title_hi}
                  </p>

                  {/* DESCRIPTION SWITCH */}
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {lang === 'en'
                      ? item.description_en
                      : item.description_hi}
                  </p>

                </div>

                <div className="flex-shrink-0 pl-4">
                  <button
                    onClick={() => setSelectedAdmission(item)}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-gray-300 border group-hover:bg-[#631012] group-hover:text-white transition-all duration-300"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL (UNCHANGED UI + LANGUAGE SUPPORT) */}
      {selectedAdmission && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={closeModal}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Megaphone className="text-[#631012]" size={40} />
              <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                ADMISSION
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-4">
              {lang === 'en'
                ? selectedAdmission.title_en
                : selectedAdmission.title_hi}
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-700 mb-6">
              {lang === 'en'
                ? selectedAdmission.description_en
                : selectedAdmission.description_hi}
            </p>

            <button
              onClick={closeModal}
              className="w-full bg-[#631012] text-white py-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </section>
  );
}