'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Building2, Loader2, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface Dept {
  id: number;
  name_en: string;
  name_hn?: string;
  description_en?: string;
  photo_url?: string;
}

const DEPT_ICONS: Record<string, string> = {
  'Computer Science & Engineering': '💻',
  'Civil Engineering': '🏗️',
  'Electrical Engineering': '⚡',
  'Electronics & Communication Engineering': '📡',
  'Mechanical Engineering': '⚙️',
  'Chemical Engineering': '🧪',
  'Architecture': '🏛️',
  'Mathematics': '📐',
  'Physics': '🔬',
  'Chemistry': '⚗️',
  'Humanities & Social Sciences': '📚',
};

export default function DepartmentsPage() {
  const language = useSelector((state: RootState) => state.language?.value || 'en');
  const isHindi = language === 'hi';
  const [depts, setDepts] = useState<Dept[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/departments`)
      .then(r => r.json())
      .then(d => { setDepts(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012]">Home</Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-[#631012] font-bold">Departments</span>
        </div>
      </div>

      {/* Header banner */}
      <div className="bg-gradient-to-br from-[#631012] to-[#8a1a1c] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Departments</h1>
          </div>
          <p className="text-white/80 mt-2">National Institute of Technology Hamirpur</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#631012]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {depts.map(dept => (
              <Link
                key={dept.id}
                href={`/departments/${dept.id}`}
                className="group border border-gray-200 rounded-lg overflow-hidden hover:border-[#631012] hover:shadow-lg transition-all duration-200"
              >
                <div className="p-5 flex items-start gap-4">
                  <span className="text-3xl shrink-0">{DEPT_ICONS[dept.name_en] || '🎓'}</span>
                  <div className="flex-grow min-w-0">
                    <h2 className="text-sm font-bold text-gray-900 group-hover:text-[#631012] transition-colors leading-snug">
                      {isHindi ? dept.name_hn || dept.name_en : dept.name_en}
                    </h2>
                    {dept.description_en && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {dept.description_en.slice(0, 120)}...
                      </p>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#631012] shrink-0 mt-0.5 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
