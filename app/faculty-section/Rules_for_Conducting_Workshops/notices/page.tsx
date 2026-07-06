'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { FileText, FileType } from 'lucide-react';
import { motion } from 'framer-motion';

interface WorkshopNotice {
  id: number;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  pdf_url: string;
  word_url: string;
  date_en: string;
  date_hn: string;
}

export default function WorkshopNoticesTable() {
  const language = useSelector((state: any) => state.language.value);
  const isHindi = language === 'hi';
  const [notices, setNotices] = useState<WorkshopNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/faculty-workshop/notices`);
        if (res.ok) {
          const data = await res.json();
          setNotices(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error fetching notices:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="p-20 text-center text-gray-400 bg-white rounded-3xl shadow-sm">
        <div className="animate-spin w-10 h-10 border-4 border-[#631012] border-t-transparent rounded-full mx-auto mb-4"></div>
        {isHindi ? 'लोड हो रहा है...' : 'Loading content...'}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-t-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-20">S.I no</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-[#631012] uppercase tracking-wider">{isHindi ? 'विवरण' : 'Particulars'}</th>
              <th className="px-6 py-5 text-left text-xs font-bold text-[#631012] uppercase tracking-wider w-32">{isHindi ? 'अपलोड की तिथि' : 'Date of Upload'}</th>
              <th className="px-6 py-5 text-center text-xs font-bold text-[#631012] uppercase tracking-wider w-32">{isHindi ? 'टिप्पणी' : 'Remarks'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {notices.map((item, idx) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-6 text-sm font-mono text-gray-400">
                  {(idx + 1).toString().padStart(2, '0')}
                </td>
                <td className="px-6 py-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-900 group-hover:text-[#631012] transition-colors">
                      {isHindi ? item.title_hn : item.title_en}
                    </span>
                    <span className="text-xs text-gray-500 font-light mt-1">
                      {isHindi ? item.description_hn : item.description_en}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-6 text-sm text-gray-500 whitespace-nowrap">
                  {isHindi ? item.date_hn : item.date_en}
                </td>
                <td className="px-6 py-6">
                  <div className="flex justify-center flex-col gap-2">
                    {item.pdf_url && (
                      <a 
                        href={item.pdf_url}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-[10px] font-bold hover:bg-red-100 transition-all border border-red-100"
                      >
                        <FileText size={12} /> PDF
                      </a>
                    )}
                    {item.word_url && (
                      <a 
                        href={item.word_url}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-bold hover:bg-blue-100 transition-all border border-blue-100"
                      >
                        <FileType size={12} /> WORD
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                  {isHindi ? 'कोई सूचना नहीं मिली' : 'No notices found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
