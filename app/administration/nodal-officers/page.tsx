'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface NodalOfficerRecord {
  id: number;
  type: string;
  sl_no: string;
  name: string;
  responsibility: string;
  phone_no: string;
  email: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function NodalOfficersPage() {
  const language = useSelector((state: RootState) => state.language?.value || 'en');
  const isHindi = language === 'hi';

  const [list, setList] = useState<NodalOfficerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/administration/nodal-officers`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
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
          <span className="text-[#631012] font-bold">
            {isHindi ? 'नोडल अधिकारी' : 'Nodal Officers'}
          </span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {isHindi ? 'नोडल अधिकारी' : 'Nodal Officers'}
          </h1>
          <div className="w-16 h-0.5 bg-[#631012] mx-auto opacity-70" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading Nodal Officers...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
            <div className="bg-[#e9f2f8] border-b border-gray-300 px-6 py-3 text-center">
              <h2 className="text-base sm:text-lg font-bold text-[#0c344e] tracking-wide">
                {isHindi ? 'नोडल अधिकारी' : 'Nodal Officers'}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-gray-800 border-collapse">
                <thead>
                  <tr className="bg-[#002b49] text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-3 px-4 w-16 text-center border-r border-white/20">Sl. No.</th>
                    <th className="py-3 px-6 border-r border-white/20 w-64">Name</th>
                    <th className="py-3 px-6 border-r border-white/20">Responsibility</th>
                    <th className="py-3 px-4 w-36 border-r border-white/20">Phone No.</th>
                    <th className="py-3 px-6">Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {list.map((n, i) => (
                    <tr key={n.id || i} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3.5 px-4 text-center font-sans text-gray-600 border-r border-gray-200 align-top">
                        {n.sl_no || i + 1}
                      </td>
                      <td className="py-3.5 px-6 border-r border-gray-200 font-bold text-gray-900 align-top text-sm">
                        {n.name}
                      </td>
                      <td className="py-3.5 px-6 border-r border-gray-200 text-gray-800 align-top leading-relaxed">
                        {n.responsibility}
                      </td>
                      <td className="py-3.5 px-4 border-r border-gray-200 text-gray-700 font-mono text-xs align-top whitespace-nowrap">
                        {n.phone_no || '--'}
                      </td>
                      <td className="py-3.5 px-6 align-top">
                        {n.email ? (
                          <div className="space-y-1">
                            {n.email.split(',').map((em, idx) => (
                              <a
                                key={idx}
                                href={`mailto:${em.trim()}`}
                                className="block text-[#631012] hover:text-[#800000] font-mono text-xs font-semibold hover:underline"
                              >
                                {em.trim()}
                              </a>
                            ))}
                          </div>
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
        )}
      </main>
    </div>
  );
}
