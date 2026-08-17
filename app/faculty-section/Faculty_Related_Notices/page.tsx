'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, FileText, ExternalLink, Loader2 } from 'lucide-react';

interface FacultyNotice {
  id: number;
  sl_no: string;
  title_en: string;
  title_hn: string;
  description_en?: string;
  description_hn?: string;
  remarks_en?: string;
  remarks_hn?: string;
  date_en: string;
  date_hn: string;
  view_url?: string;
  download_url?: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'Notices/Office Orders/Notifications',
  title_hn: 'सूचनाएं / कार्यालय आदेश / अधिसूचनाएं',
  sub_title_en: 'Official notices, office orders, and notifications related to faculty welfare and administration at NIT Hamirpur.',
  sub_title_hn: 'एनआईटी हमीरपुर में संकाय कल्याण और प्रशासन से संबंधित आधिकारिक सूचनाएं, कार्यालय आदेश और अधिसूचनाएं।',
};

const FALLBACK_NOTICES: FacultyNotice[] = [
  {
    id: 1,
    sl_no: '1',
    title_en: 'Office order regarding TA DA Entitlements of Temporary Faculty Members',
    title_hn: 'अस्थायी संकाय सदस्यों के टीए डीए पात्रता के संबंध में कार्यालय आदेश',
    remarks_en: 'Office of The Registrar , NIT Hamirpur (HP)',
    remarks_hn: 'कुलसचिव कार्यालय, एनआईटी हमीरपुर (हि.प्र.)',
    date_en: '08-10-2025',
    date_hn: '08-10-2025',
    view_url: 'https://nith.ac.in/uploads/topics/1696752000.pdf',
  },
  {
    id: 2,
    sl_no: '2',
    title_en: 'Office order regarding CPDA',
    title_hn: 'सीपीडीए के संबंध में कार्यालय आदेश',
    remarks_en: 'Dean (Faculty Welfare) , NIT Hamirpur (HP)',
    remarks_hn: 'डीन (संकाय कल्याण), एनआईटी हमीरपुर (हि.प्र.)',
    date_en: '14-07-2022',
    date_hn: '14-07-2022',
    view_url: 'https://nith.ac.in/uploads/topics/16578687799757.pdf',
  },
  {
    id: 3,
    sl_no: '3',
    title_en: 'Notice regarding FDP/e-FDP, STC/e-STC, Workshop/e-Workshop, Seminar/e-Seminar etc.',
    title_hn: 'एफडीपी/ई-एफडीपी, एसटीसी/ई-एसटीसी, कार्यशाला/ई-कार्यशाला, संगोष्ठी/ई-संगोष्ठी आदि के संबंध में सूचना।',
    remarks_en: 'Dean (Faculty Welfare) , NIT Hamirpur (HP)',
    remarks_hn: 'डीन (संकाय कल्याण), एनआईटी हमीरपुर (हि.प्र.)',
    date_en: '17-09-2021',
    date_hn: '17-09-2021',
    view_url: 'https://nith.ac.in/uploads/topics/16318683515822.pdf',
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function FacultyRelatedNoticesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [notices, setNotices] = useState<FacultyNotice[]>(FALLBACK_NOTICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch heading
        const hRes = await fetch(`${API_BASE}/api/faculty-notices`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // Fetch list
        const lRes = await fetch(`${API_BASE}/api/faculty-notices/list`, { cache: 'no-store' });
        if (lRes.ok) {
          const lData = await lRes.json();
          if (!cancelled && Array.isArray(lData) && lData.length > 0) {
            setNotices(lData);
          }
        }
      } catch (err) {
        console.error('Error fetching faculty notices:', err);
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
          <span className="text-gray-400">{isHindi ? 'संकाय अनुभाग' : 'Faculty Section'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'संकाय संबंधित सूचनाएं' : 'Faculty Related Notices'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Title (Centered as in Screenshot) */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#631012] tracking-tight">
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
            <p className="text-xs font-mono text-gray-500">Loading notices...</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                {/* Deep Maroon Table Header */}
                <thead>
                  <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4 border-r border-[#7a1a1d] w-16 text-center">
                      Sl. No.
                    </th>
                    <th className="py-3.5 px-6 border-r border-[#7a1a1d]">
                      {isHindi ? 'विवरण' : 'Particulars'}
                    </th>
                    <th className="py-3.5 px-6 border-r border-[#7a1a1d] w-72">
                      {isHindi ? 'टिप्पणी' : 'Remarks (if any)'}
                    </th>
                    <th className="py-3.5 px-6 w-36 text-center">
                      {isHindi ? 'अपलोड तिथि' : 'Date of Upload'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  {notices.map((item, index) => {
                    const docUrl = item.view_url || item.download_url;
                    return (
                      <tr
                        key={item.id || index}
                        className="hover:bg-red-50/30 transition-colors"
                      >
                        {/* Sl. No. */}
                        <td className="py-4 px-4 text-center font-mono font-bold text-gray-700 border-r border-gray-200 align-middle">
                          {item.sl_no || index + 1}
                        </td>

                        {/* Particulars */}
                        <td className="py-4 px-6 border-r border-gray-200 align-middle font-medium">
                          {docUrl && docUrl !== '#' ? (
                            <a
                              href={docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#631012] hover:text-[#500c0e] hover:underline inline-flex items-center gap-1.5"
                            >
                              <span>
                                {isHindi ? item.title_hn || item.title_en : item.title_en}
                              </span>
                              <ExternalLink size={12} className="text-[#631012]/60" />
                            </a>
                          ) : (
                            <span className="text-gray-900">
                              {isHindi ? item.title_hn || item.title_en : item.title_en}
                            </span>
                          )}
                        </td>

                        {/* Remarks */}
                        <td className="py-4 px-6 border-r border-gray-200 align-middle text-gray-700 text-xs sm:text-sm">
                          {isHindi ? item.remarks_hn || item.remarks_en || '--' : item.remarks_en || '--'}
                        </td>

                        {/* Date of Upload */}
                        <td className="py-4 px-6 text-center font-mono font-semibold text-gray-800 border-gray-200 align-middle whitespace-nowrap text-xs sm:text-sm">
                          {isHindi ? item.date_hn || item.date_en || '--' : item.date_en || '--'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
