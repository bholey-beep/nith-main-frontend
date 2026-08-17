'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, Mail, Phone, Loader2 } from 'lucide-react';

interface Row {
  id: number;
  faculty_id?: number | null;
  sl_no: string;
  name_en: string;
  name_hn: string;
  responsibility_en: string;
  responsibility_hn: string;
  phone: string;
  email: string;
  section_title_en: string;
  section_title_hn: string;
}

interface Section {
  title_en: string;
  title_hn: string;
  members: Row[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const FALLBACK_SECTIONS: Section[] = [
  {
    title_en: 'Dean and Associate Dean (Alumni & Resources)',
    title_hn: 'डीन और एसोसिएट डीन (पूर्व छात्र और संसाधन)',
    members: [
      {
        id: 1,
        sl_no: '1',
        name_en: 'Prof. Ashwani Kumar Chandel',
        name_hn: 'प्रो. अश्विनी कुमार चंदेल',
        responsibility_en: 'Dean',
        responsibility_hn: 'डीन',
        phone: '254054',
        email: 'dar@nith.ac.in',
        section_title_en: 'Dean and Associate Dean (Alumni & Resources)',
        section_title_hn: 'डीन और एसोसिएट डीन (पूर्व छात्र और संसाधन)',
      },
      {
        id: 2,
        sl_no: '2',
        name_en: 'Dr. Gargi Khanna',
        name_hn: 'डॉ. गार्गी खन्ना',
        responsibility_en: 'Associate Dean',
        responsibility_hn: 'एसोसिएट डीन',
        phone: '254634',
        email: 'gargi@nith.ac.in',
        section_title_en: 'Dean and Associate Dean (Alumni & Resources)',
        section_title_hn: 'डीन और एसोसिएट डीन (पूर्व छात्र और संसाधन)',
      },
      {
        id: 3,
        sl_no: '3',
        name_en: 'Dr. Ashwani Kumar',
        name_hn: 'डॉ. अश्विनी कुमार',
        responsibility_en: 'Associate Dean (Resource Generation & Industrialization)',
        responsibility_hn: 'एसोसिएट डीन (संसाधन सृजन और औद्योगिकीकरण)',
        phone: '254638',
        email: 'ashwani@nith.ac.in',
        section_title_en: 'Dean and Associate Dean (Alumni & Resources)',
        section_title_hn: 'डीन और एसोसिएट डीन (पूर्व छात्र और संसाधन)',
      },
    ],
  },
  {
    title_en: 'Alumni Association',
    title_hn: 'पूर्व छात्र संघ',
    members: [
      {
        id: 4,
        sl_no: '1',
        name_en: 'Dr. Jyoti Srivastava',
        name_hn: 'डॉ. ज्योति श्रीवास्तव',
        responsibility_en: 'Faculty Incharge',
        responsibility_hn: 'संकाय प्रभारी',
        phone: '254401',
        email: 'jyoti.s@nith.ac.in',
        section_title_en: 'Alumni Association',
        section_title_hn: 'पूर्व छात्र संघ',
      },
      {
        id: 5,
        sl_no: '2',
        name_en: 'Dr. Vandana Sharma',
        name_hn: 'डॉ. वंदना शर्मा',
        responsibility_en: 'Faculty Incharge',
        responsibility_hn: 'संकाय प्रभारी',
        phone: '254920',
        email: 'vandna@nith.ac.in',
        section_title_en: 'Alumni Association',
        section_title_hn: 'पूर्व छात्र संघ',
      },
    ],
  },
  {
    title_en: 'Resource Generation',
    title_hn: 'संसाधन सृजन',
    members: [
      {
        id: 6,
        sl_no: '1',
        name_en: 'Dr. Amit Kaul',
        name_hn: 'डॉ. अमित कौल',
        responsibility_en: 'Faculty Incharge',
        responsibility_hn: 'संकाय प्रभारी',
        phone: '254544',
        email: 'amitkaul@nith.ac.in',
        section_title_en: 'Resource Generation',
        section_title_hn: 'संसाधन सृजन',
      },
    ],
  },
  {
    title_en: 'Staff',
    title_hn: 'कर्मचारी',
    members: [
      {
        id: 7,
        sl_no: '1',
        name_en: 'Sh. Sanjay Jamwal',
        name_hn: 'श्री संजय जमवाल',
        responsibility_en: 'Deputy Registrar',
        responsibility_hn: 'उप कुलसचिव',
        phone: '--',
        email: '--',
        section_title_en: 'Staff',
        section_title_hn: 'कर्मचारी',
      },
    ],
  },
];

export default function AlumniFunctionariesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [sections, setSections] = useState<Section[]>(FALLBACK_SECTIONS);
  const [heading, setHeading] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Heading
        const hRes = await fetch(`${API_BASE}/api/alumni-functionaries`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // List
        const lRes = await fetch(`${API_BASE}/api/alumni-functionaries/list`, { cache: 'no-store' });
        if (lRes.ok) {
          const lData = await lRes.json();
          if (!cancelled && Array.isArray(lData) && lData.length > 0) {
            const sectionsMap: { [key: string]: Section } = {};
            lData.forEach((row: any) => {
              const key = row.section_title_en || 'General';
              if (!sectionsMap[key]) {
                sectionsMap[key] = {
                  title_en: row.section_title_en || 'General',
                  title_hn: row.section_title_hn || '',
                  members: [],
                };
              }
              sectionsMap[key].members.push(row);
            });
            setSections(Object.values(sectionsMap));
          }
        }
      } catch (err) {
        console.error('Error fetching alumni functionaries:', err);
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
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {language === 'en' ? 'Home' : 'होम'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{language === 'en' ? 'Alumni' : 'पूर्व छात्र'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {language === 'en' ? 'Functionaries' : 'पदाधिकारी'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Title Header Matched with Site Theme */}
        <div className="text-center space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#631012] tracking-tight">
            {heading?.title_en
              ? language === 'en'
                ? heading.title_en
                : heading.title_hn || heading.title_en
              : language === 'en'
              ? 'Functionaries'
              : 'पदाधिकारी'}
          </h1>
          {heading?.sub_title_en && (
            <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
              {language === 'en' ? heading.sub_title_en : heading.sub_title_hn || heading.sub_title_en}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading functionaries...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {sections.map((section, sIdx) => (
              <div
                key={sIdx}
                className="bg-white border border-gray-300 shadow-sm overflow-hidden"
              >
                {/* Section Header (Refined Institutional Band) */}
                <div className="bg-[#fcf5f5] border-b border-gray-300 border-l-4 border-l-[#631012] px-5 py-3 text-center">
                  <h2 className="text-sm sm:text-base font-bold text-[#631012] tracking-wide">
                    {language === 'en'
                      ? section.title_en
                      : section.title_hn || section.title_en}
                  </h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    {/* Table Header (Deep Maroon Site Theme) */}
                    <thead>
                      <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                        <th className="py-3 px-4 border-r border-[#7a1a1d] w-16 text-center">
                          Sl. No.
                        </th>
                        <th className="py-3 px-4 border-r border-[#7a1a1d]">
                          {language === 'en' ? 'Name' : 'नाम'}
                        </th>
                        <th className="py-3 px-4 border-r border-[#7a1a1d]">
                          {language === 'en' ? 'Responsibility' : 'जिम्मेदारी'}
                        </th>
                        <th className="py-3 px-4 border-r border-[#7a1a1d] whitespace-nowrap">
                          {language === 'en' ? 'Phone No.' : 'फ़ोन नंबर'}
                        </th>
                        <th className="py-3 px-4">
                          {language === 'en' ? 'Email' : 'ईमेल'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                      {section.members.map((member, mIdx) => (
                        <tr
                          key={member.id || mIdx}
                          className="hover:bg-red-50/40 transition-colors"
                        >
                          <td className="py-3 px-4 text-center font-mono font-medium text-gray-600 border-r border-gray-200">
                            {member.sl_no}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900 border-r border-gray-200">
                            {language === 'en'
                              ? member.name_en
                              : member.name_hn || member.name_en}
                          </td>
                          <td className="py-3 px-4 text-gray-700 border-r border-gray-200 font-medium">
                            {language === 'en'
                              ? member.responsibility_en
                              : member.responsibility_hn || member.responsibility_en}
                          </td>
                          <td className="py-3 px-4 font-mono text-gray-700 border-r border-gray-200 whitespace-nowrap">
                            {member.phone && member.phone !== '--' ? (
                              <span className="flex items-center gap-1.5">
                                <Phone size={13} className="text-[#631012] shrink-0" />
                                <span>{member.phone}</span>
                              </span>
                            ) : (
                              <span className="text-gray-400">--</span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono">
                            {member.email && member.email !== '--' ? (
                              <a
                                href={`mailto:${member.email}`}
                                className="text-[#631012] hover:text-[#500c0e] hover:underline flex items-center gap-1.5 font-medium"
                              >
                                <Mail size={13} className="text-[#631012] shrink-0" />
                                <span>{member.email}</span>
                              </a>
                            ) : (
                              <span className="text-gray-400">--</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
