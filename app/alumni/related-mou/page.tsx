'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, FileText, ExternalLink, Loader2 } from 'lucide-react';

interface MoUItem {
  id: number;
  sl_no: string;
  title_en: string;
  title_hn: string;
  drafted_date: string;
  document_url: string;
  file_type: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const FALLBACK_MOUS: MoUItem[] = [
  {
    id: 1,
    sl_no: '1',
    title_en: 'MoU between EPACK Durable limited and NIT Hamirpur (H.P.)',
    title_hn: 'ईपैक ड्यूरेबल लिमिटेड और एनआईटी हमीरपुर (हि.प्र.) के बीच समझौता ज्ञापन (MoU)',
    drafted_date: '2024-01-15',
    document_url: 'https://nith.ac.in',
    file_type: 'PDF',
  },
];

export default function AlumniRelatedMouPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [mous, setMous] = useState<MoUItem[]>(FALLBACK_MOUS);
  const [heading, setHeading] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch heading
        const hRes = await fetch(`${API_BASE}/api/alumni-mou`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // Fetch list
        const lRes = await fetch(`${API_BASE}/api/alumni-mou/list`, { cache: 'no-store' });
        if (lRes.ok) {
          const lData = await lRes.json();
          if (!cancelled && Array.isArray(lData) && lData.length > 0) {
            setMous(lData);
          }
        }
      } catch (err) {
        console.error('Error fetching MoUs:', err);
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
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
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
            {language === 'en' ? 'Alumni Related MoU' : 'अल्युम्नाई संबंधित समझौता ज्ञापन (MoU)'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Title */}
        <div className="text-center space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#631012] tracking-tight">
            {heading?.title_en
              ? language === 'en'
                ? heading.title_en
                : heading.title_hn || heading.title_en
              : language === 'en'
              ? 'Alumni Related MoU'
              : 'अल्युम्नाई संबंधित समझौता ज्ञापन (MoU)'}
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
            <p className="text-xs font-mono text-gray-500">Loading MoU records...</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
            {/* Section Band (Matched Institutional Style) */}
            <div className="bg-[#fcf5f5] border-b border-gray-300 border-l-4 border-l-[#631012] px-6 py-3.5 text-center">
              <h2 className="text-sm sm:text-base font-bold text-[#631012] tracking-wide">
                {language === 'en' ? 'Alumni Related MoU' : 'पूर्व छात्र संबंधित समझौता ज्ञापन'}
              </h2>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                {/* Table Header (Deep Maroon Site Theme) */}
                <thead>
                  <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4 border-r border-[#7a1a1d] w-20 text-center">
                      Sl. No.
                    </th>
                    <th className="py-3.5 px-6">
                      {language === 'en' ? 'MoU' : 'समझौता ज्ञापन (MoU)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  {mous.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="hover:bg-red-50/40 transition-colors"
                    >
                      <td className="py-4 px-4 text-center font-mono font-bold text-gray-700 border-r border-gray-200">
                        {item.sl_no || index + 1}
                      </td>
                      <td className="py-4 px-6">
                        {item.document_url ? (
                          <a
                            href={item.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#631012] hover:text-[#500c0e] hover:underline font-semibold text-xs sm:text-sm group"
                          >
                            <span>
                              {language === 'en'
                                ? item.title_en
                                : item.title_hn || item.title_en}
                            </span>
                            <ExternalLink
                              size={14}
                              className="text-gray-400 group-hover:text-[#631012] shrink-0"
                            />
                          </a>
                        ) : (
                          <span className="font-semibold text-gray-900">
                            {language === 'en'
                              ? item.title_en
                              : item.title_hn || item.title_en}
                          </span>
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
