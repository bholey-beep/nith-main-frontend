'use client';

import React, { useEffect, useState } from 'react';

interface MeetingMinute {
  id: string;
  title: string;
  date: string;
  documentUrl: string;
  uploadedDate: string;
  uploadedBy: string;
}

export default function AuthorityMinutes({ title, apiBase }: { title: string, apiBase: string }) {
  const [data, setData] = useState<MeetingMinute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/${apiBase}/minutes`, { cache: 'no-store' });
        
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const json = await res.json();
          if (Array.isArray(json)) {
            setData(json);
          } else if (json.data) {
            setData(json.data);
          }
        } else {
          console.error("API did not return JSON for minutes.", res.status);
        }
      } catch (err) {
        console.error('Failed to fetch minutes', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiBase]);

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#631012] mb-8">{title}</h2>
        <div className="w-full">
          <div className="w-full bg-white rounded-t-xl border border-gray-200 overflow-hidden">
            {/* Header Grid */}
            <div className="grid grid-cols-[80px_1fr_140px_140px] gap-4 bg-gray-50 border-b border-gray-200 p-4 text-sm font-semibold text-gray-700">
              <div className="text-center text-gray-500">S.No</div>
              <div className="uppercase tracking-wider text-xs font-bold text-[#631012]">
                Particulars
              </div>
              <div className="text-center uppercase tracking-wider text-xs font-bold text-[#631012]">
                Document
              </div>
              <div className="text-center uppercase tracking-wider text-xs font-bold text-[#631012]">
                Date of Upload
              </div>
            </div>
            
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : data.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No minutes available.</div>
            ) : (
              data.map((item, i) => (
                <div key={item.id || i} className="grid grid-cols-[80px_1fr_140px_140px] gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 items-center">
                  <div className="text-center font-mono text-gray-400">{(i + 1).toString().padStart(2, '0')}</div>
                  <div className="text-gray-600 text-sm">
                    {item.title}
                  </div>
                  <div className="text-center text-sm">
                    {item.documentUrl ? (
                      <a href={item.documentUrl} target="_blank" rel="noopener noreferrer" className="text-[#631012] hover:underline font-medium">
                        View PDF
                      </a>
                    ) : '-'}
                  </div>
                  <div className="text-center text-gray-600 text-sm">{item.uploadedDate || item.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
