'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2, Shield, ExternalLink, Phone, Mail } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface CVOData {
  id?: number;
  name?: string;
  responsibility?: string;
  phone_no?: string;
  email?: string;
  photo?: string;
}

interface CVOLink {
  id: number;
  name: string;
  links: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function VigilancePage() {
  const language = useSelector((state: RootState) => state.language?.value || 'en');
  const isHindi = language === 'hi';

  const [officer, setOfficer] = useState<CVOData | null>(null);
  const [links, setLinks] = useState<CVOLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/administration/cvo`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.officer) setOfficer(data.officer);
        if (Array.isArray(data.links)) setLinks(data.links);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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
            {isHindi ? 'सतर्कता अनुभाग' : 'Chief Vigilance Officer'}
          </span>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {isHindi ? 'मुख्य सतर्कता अधिकारी' : 'Chief Vigilance Officer (CVO)'}
          </h1>
          <div className="w-16 h-0.5 bg-[#631012] mx-auto opacity-70" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading vigilance details...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* CVO Officer Card */}
            {officer && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    src={
                      officer.photo ||
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={officer.name || 'CVO'}
                    className="w-32 h-40 sm:w-36 sm:h-44 object-cover rounded-lg border-2 border-gray-200 shadow-sm shrink-0"
                  />
                  <div className="space-y-3 text-center sm:text-left flex-grow">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#631012]">
                        {officer.name}
                      </h2>
                      <p className="text-sm font-semibold text-[#002b49] mt-0.5">
                        {officer.responsibility || 'Chief Vigilance Officer'}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-gray-700">
                      {officer.phone_no && (
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded border border-gray-200">
                          <Phone size={14} className="text-[#631012]" />
                          <span className="font-mono">{officer.phone_no}</span>
                        </div>
                      )}
                      {officer.email && (
                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded border border-gray-200">
                          <Mail size={14} className="text-[#631012]" />
                          <a
                            href={`mailto:${officer.email}`}
                            className="font-mono text-[#631012] font-semibold hover:underline"
                          >
                            {officer.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vigilance Portals & Links */}
            {links.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-[#e9f2f8] border-b border-gray-300 px-6 py-3 text-center">
                  <h3 className="text-base font-bold text-[#0c344e]">
                    {isHindi ? 'महत्वपूर्ण सतर्कता पोर्टल एवं परिपत्र' : 'Important Vigilance Portals & Circulars'}
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {links.map((lnk) => (
                    <div
                      key={lnk.id}
                      className="p-4 hover:bg-gray-50 flex items-center justify-between gap-4 transition-colors"
                    >
                      <span className="font-medium text-sm text-gray-900">{lnk.name}</span>
                      <a
                        href={lnk.links}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#631012] hover:underline shrink-0 bg-red-50 px-3 py-1.5 rounded border border-red-200"
                      >
                        <span>Visit Portal</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
