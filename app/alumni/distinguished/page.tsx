'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, Award, User, Loader2, ExternalLink } from 'lucide-react';

interface DistinguishedAlumnus {
  id: number;
  sl_no: string;
  name_en: string;
  name_hn: string;
  batch_en: string;
  batch_hn: string;
  photo: string;
  achievement_en?: string;
  achievement_hn?: string;
  department_en?: string;
  department_hn?: string;
  linkedin?: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'List of Noted Alumni',
  title_hn: 'प्रतिष्ठित पूर्व छात्रों की सूची',
  sub_title_en: 'Distinguished graduates of NIT Hamirpur who have made outstanding contributions in governance, industry, and academia.',
  sub_title_hn: 'एनआईटी हमीरपुर के प्रतिष्ठित स्नातक जिन्होंने शासन, उद्योग और शिक्षा जगत में उत्कृष्ट योगदान दिया है।'
};

const FALLBACK_ALUMNI: DistinguishedAlumnus[] = [
  {
    id: 1,
    sl_no: '1',
    name_en: 'O.P. Minhas Dy Director General, Indian Telecom Service, Deptt. of Telecommunication',
    name_hn: 'ओ.पी. मिन्हास उप महानिदेशक, भारतीय दूरसंचार सेवा, दूरसंचार विभाग',
    batch_en: '1990',
    batch_hn: '1990',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    department_en: 'Electronics & Communication Engineering',
  },
  {
    id: 2,
    sl_no: '2',
    name_en: 'B.S. Bodh, Executive Director, Indian Railway Board',
    name_hn: 'बी.एस. बोध, कार्यकारी निदेशक, भारतीय रेलवे बोर्ड',
    batch_en: '1990',
    batch_hn: '1990',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    department_en: 'Civil Engineering',
  },
  {
    id: 3,
    sl_no: '3',
    name_en: 'Rupinder Shelly Director Operations, Asahi India Glass Ltd.',
    name_hn: 'रुपिंदर शैली निदेशक संचालन, असाही इंडिया ग्लास लिमिटेड',
    batch_en: '1990',
    batch_hn: '1990',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    department_en: 'Mechanical Engineering',
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DistinguishedAlumniPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [alumni, setAlumni] = useState<DistinguishedAlumnus[]>(FALLBACK_ALUMNI);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch heading
        const hRes = await fetch(`${API_BASE}/api/alumni-distinguished`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // Fetch list
        const lRes = await fetch(`${API_BASE}/api/alumni-distinguished/list`, { cache: 'no-store' });
        if (lRes.ok) {
          const lData = await lRes.json();
          if (!cancelled && Array.isArray(lData) && lData.length > 0) {
            setAlumni(lData);
          }
        }
      } catch (err) {
        console.error('Error fetching distinguished alumni:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'पूर्व छात्र' : 'Alumni'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'प्रतिष्ठित पूर्व छात्र' : 'Distinguished Alumni'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Title */}
        <div className="text-center space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#631012] tracking-tight">
            {isHindi ? heading.title_hn || heading.title_en : heading.title_en}
          </h1>
          {heading.sub_title_en && (
            <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
              {isHindi ? heading.sub_title_hn || heading.sub_title_en : heading.sub_title_en}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading distinguished alumni records...</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
            {/* Section Header Band (Matched Institutional Style) */}
            <div className="bg-[#fcf5f5] border-b border-gray-300 border-l-4 border-l-[#631012] px-6 py-3.5 text-center">
              <h2 className="text-sm sm:text-base font-bold text-[#631012] tracking-wide">
                {isHindi ? heading.title_hn || 'प्रतिष्ठित पूर्व छात्रों की सूची' : heading.title_en || 'List of Noted Alumni'}
              </h2>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                {/* Table Header (Deep Maroon Site Theme) */}
                <thead>
                  <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4 border-r border-[#7a1a1d] w-16 text-center">
                      Sl. No.
                    </th>
                    <th className="py-3.5 px-6 border-r border-[#7a1a1d]">
                      {isHindi ? 'नाम एवं पद' : 'Name'}
                    </th>
                    <th className="py-3.5 px-6 border-r border-[#7a1a1d] w-36 text-center">
                      {isHindi ? 'बैच' : 'Batch'}
                    </th>
                    <th className="py-3.5 px-6 w-56 text-center">
                      {isHindi ? 'फोटो' : 'Photo'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  {alumni.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="hover:bg-red-50/30 transition-colors"
                    >
                      {/* Sl. No. */}
                      <td className="py-4 px-4 text-center font-mono font-bold text-gray-700 border-r border-gray-200 align-middle">
                        {item.sl_no || index + 1}
                      </td>

                      {/* Name & Details */}
                      <td className="py-4 px-6 border-r border-gray-200 align-middle space-y-1">
                        <div className="font-semibold text-gray-900 leading-relaxed text-sm sm:text-base">
                          {isHindi
                            ? item.name_hn || item.name_en
                            : item.name_en}
                        </div>
                        {item.department_en && (
                          <div className="text-xs text-gray-500 font-medium">
                            {isHindi ? item.department_hn || item.department_en : item.department_en}
                          </div>
                        )}
                        {item.linkedin && (
                          <a
                            href={item.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#631012] hover:underline font-medium pt-1"
                          >
                            <span>LinkedIn Profile</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </td>

                      {/* Batch */}
                      <td className="py-4 px-6 text-center font-mono font-bold text-gray-800 border-r border-gray-200 align-middle text-sm sm:text-base">
                        {isHindi
                          ? item.batch_hn || item.batch_en || '--'
                          : item.batch_en || '--'}
                      </td>

                      {/* Photo */}
                      <td className="py-4 px-6 text-center align-middle">
                        {item.photo ? (
                          <div className="inline-block relative">
                            <img
                              src={item.photo}
                              alt={item.name_en}
                              className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded border border-gray-300 shadow-sm mx-auto bg-gray-50"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-28 sm:w-28 sm:h-32 bg-gray-100 rounded border border-gray-200 flex flex-col items-center justify-center mx-auto text-gray-400">
                            <User size={24} />
                            <span className="text-[10px] mt-1">No Photo</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
