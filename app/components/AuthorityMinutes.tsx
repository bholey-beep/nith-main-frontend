'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, FileText, Loader2, ExternalLink } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface MeetingMinute {
  id: string;
  title: string;
  meeting_date?: string;
  date?: string;
  document_url?: string;
  documentUrl?: string;
  uploaded_date?: string;
}

export default function AuthorityMinutes({
  title,
  titleHi,
  apiBase,
}: {
  title: string;
  titleHi?: string;
  apiBase: string;
}) {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [data, setData] = useState<MeetingMinute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/${apiBase}/minutes`;
        const res = await fetch(url, { cache: 'no-store' });

        if (res.ok) {
          const json = await res.json();
          setData(Array.isArray(json) ? json : json.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch minutes', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiBase]);

  const displayTitle = isHindi && titleHi ? titleHi : title;

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'प्राधिकरण' : 'Authorities'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">{displayTitle}</span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Centered Page Heading matching Screenshot */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {displayTitle}
          </h1>
          <div className="w-16 h-0.5 bg-[#631012] mx-auto opacity-70" />
        </div>

        {/* Institutional Table Matching Screenshot */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-gray-800 border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-300 text-gray-700 font-semibold">
                  <th className="py-3 px-4 w-20 text-left border-r border-gray-200">
                    Sl. No
                  </th>
                  <th className="py-3 px-6 border-r border-gray-200">
                    Particulars
                  </th>
                  <th className="py-3 px-6 w-48 text-left">
                    Date of Meeting
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={3} className="text-center py-16 text-gray-500">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#631012] mb-2" />
                      <span>Loading meeting records...</span>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-16 text-gray-500">
                      No meeting minutes available at this time.
                    </td>
                  </tr>
                ) : (
                  data.map((item, idx) => {
                    const docUrl = item.document_url || item.documentUrl || '#';
                    const rawDate = item.meeting_date || item.date;
                    const formattedDate = rawDate
                      ? new Date(rawDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        }).replace(/\//g, '.')
                      : '-';

                    return (
                      <tr key={item.id || idx} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3 px-4 text-left font-sans text-gray-700 border-r border-gray-200">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-6 border-r border-gray-200">
                          {docUrl && docUrl !== '#' ? (
                            <a
                              href={docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-[#631012] hover:text-[#800000] hover:underline inline-flex items-center gap-1.5"
                            >
                              <span>{item.title}</span>
                            </a>
                          ) : (
                            <span className="font-bold text-gray-900">{item.title}</span>
                          )}
                        </td>
                        <td className="py-3 px-6 font-sans text-gray-700 whitespace-nowrap">
                          {formattedDate}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
