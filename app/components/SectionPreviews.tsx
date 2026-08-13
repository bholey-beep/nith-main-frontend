'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PreviewProps {
  title: string;
  endpoint: string;
  dataKey: string;
  icon: React.ReactNode;
  isAchievement?: boolean;
  href: string;
}

export function SectionPreview({ title, endpoint, dataKey, icon, isAchievement, href }: PreviewProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      if (json.success) {
        let data = [];
        if (dataKey && json.data && json.data[dataKey]) {
          data = json.data[dataKey];
        } else if (Array.isArray(json.data)) {
          data = json.data;
        } else if (json.data && Array.isArray(json.data.admissions)) {
          data = json.data.admissions;
        }
        setItems(data.slice(0, 3)); // Only show top 3
      }
    } catch (err) {
      console.error('Error fetching preview data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="bg-[#631012] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          {icon}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <ChevronRight className="text-white/80 w-5 h-5" />
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        ) : items.length > 0 ? (
          items.map((item, idx) => (
            <div key={idx} className="group border-b border-gray-50 last:border-0 pb-4 last:pb-0">
              <h3 className="font-semibold text-gray-800 group-hover:text-[#631012] transition-colors line-clamp-1">
                {isAchievement ? (item.heading_en || item.tagline_en) : item.title_en}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                {isAchievement ? item.description_en : (item.date || item.description_en)}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-sm text-center py-6 italic">
            No updates available.
          </div>
        )}
      </div>
      <Link href={href}>
        <div className="bg-gray-50 py-2 px-5 border-t border-gray-100 text-sm font-medium text-[#631012] text-center uppercase tracking-wider group-hover:bg-[#631012] hover:text-[#631012] cursor-pointer block hover:bg-gray-100 transition-colors">
          View All
        </div>
      </Link>
    </div>
  );
}

export function AcademicsPreview() {
  return <SectionPreview title="Academics" endpoint="http://localhost:4000/v1/homepage/academic" dataKey="academics" icon={<BookOpen size={24} />} href="/homepage/academics" />;
}

export function AdmissionsPreview() {
  return <SectionPreview title="Admissions" endpoint="http://localhost:4000/v1/homepage/admission" dataKey="admissions" icon={<GraduationCap size={24} />} href="/homepage/admissions" />;
}

export function NewsPreview() {
  return <SectionPreview title="News & Updates" endpoint="http://localhost:4000/v1/homepage/news" dataKey="newss" icon={<Calendar size={24} />} href="/homepage/news" />;
}

export function EventsPreview() {
  return <SectionPreview title="Events" endpoint="http://localhost:4000/v1/homepage/event" dataKey="events" icon={<Calendar size={24} />} href="/homepage/event" />;
}

export function AchievementsPreview() {
  return <SectionPreview title="Achievements" endpoint="http://localhost:4000/v1/homepage/achievements" dataKey="" icon={<Trophy size={24} />} isAchievement={true} href="/homepage/achievements" />;
}
