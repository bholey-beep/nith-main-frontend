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
    <div className="bg-white border border-gray-200 hover:border-[#631012] shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between group relative overflow-hidden">
      {/* Top Accent Line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#631012] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#631012] text-white shadow-sm flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
            <span className="text-[11px] font-semibold text-[#631012] uppercase tracking-wider">Latest Highlights</span>
          </div>
        </div>
        <Link href={href} className="text-gray-400 group-hover:text-[#631012] transition-colors p-1">
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Items List */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-none border border-gray-100"></div>
            ))}
          </div>
        ) : items.length > 0 ? (
          items.map((item, idx) => (
            <Link
              href={href}
              key={idx}
              className="block p-3 border border-gray-100 hover:border-gray-200 hover:bg-red-50/30 transition-all duration-200 group/item relative"
            >
              <div className="flex items-start gap-3">
                <span className="text-[11px] font-bold text-gray-400 group-hover/item:text-[#631012] transition-colors pt-0.5">
                  #0{idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover/item:text-[#631012] transition-colors line-clamp-1">
                    {isAchievement ? (item.heading_en || item.tagline_en) : item.title_en}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {isAchievement ? item.description_en : (item.date || item.description_en || 'View details')}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover/item:text-[#631012] transition-transform group-hover/item:translate-x-0.5 self-center flex-shrink-0" />
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-400 text-xs text-center py-8 italic bg-gray-50/50 border border-dashed border-gray-200">
            No updates available at this moment.
          </div>
        )}
      </div>

      {/* Footer */}
      <Link href={href} className="block">
        <div className="bg-gray-50 py-3 px-5 border-t border-gray-100 text-xs font-bold text-[#631012] uppercase tracking-wider flex items-center justify-between hover:bg-red-50/40 transition-colors">
          <span>Explore All {title}</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
}

export function AcademicsPreview() {
  return <SectionPreview title="Academics" endpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/homepage/academic`} dataKey="academics" icon={<BookOpen size={24} />} href="/homepage/academics" />;
}

export function AdmissionsPreview() {
  return <SectionPreview title="Admissions" endpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/homepage/admission`} dataKey="admissions" icon={<GraduationCap size={24} />} href="/homepage/admissions" />;
}

export function NewsPreview() {
  return <SectionPreview title="News & Updates" endpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/homepage/news`} dataKey="newss" icon={<Calendar size={24} />} href="/homepage/news" />;
}

export function EventsPreview() {
  return <SectionPreview title="Events" endpoint={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/homepage/event`} dataKey="events" icon={<Calendar size={24} />} href="/homepage/event" />;
}

export function AchievementsPreview() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackAchievements = [
    {
      id: 1,
      heading_en: 'NIRF Ranking & National Excellence',
      tagline_en: 'Ranking',
      description_en: 'Ranked among top engineering institutes across India for research and academic excellence.',
    },
    {
      id: 2,
      heading_en: '100+ Patents Filed & Granted',
      tagline_en: 'Innovation',
      description_en: 'Faculty and student innovations leading to significant intellectual property output.',
    },
    {
      id: 3,
      heading_en: 'Smart India Hackathon Winners',
      tagline_en: 'Student Laurels',
      description_en: 'First prize won by engineering teams in AI and robotics national competitions.',
    },
    {
      id: 4,
      heading_en: '₹50+ Crore Research Grants',
      tagline_en: 'Research',
      description_en: 'Funded projects and state-of-the-art laboratory development supported by DST & SERB.',
    },
  ];

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')}/v1/homepage/achievements`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setItems(json.data.slice(0, 4));
        } else {
          setItems(fallbackAchievements);
        }
      } catch (err) {
        console.error('Error fetching achievements preview:', err);
        setItems(fallbackAchievements);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  const displayList = items.length > 0 ? items : fallbackAchievements;

  return (
    <div className="w-full my-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#631012] text-white rounded-none shadow-sm flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Key Achievements & Honors</h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Recognizing excellence across academia, innovation & student laurels</p>
          </div>
        </div>

        <Link
          href="/homepage/achievements"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#631012] hover:text-red-900 transition-colors uppercase tracking-wider group"
        >
          View All Achievements
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Small Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {displayList.map((item, idx) => (
          <Link
            key={item.id || idx}
            href="/homepage/achievements"
            className="block h-full"
          >
            <div className="bg-white border border-gray-200 hover:border-[#631012] p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
              {/* Top Accent Line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#631012] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Tag / Category Badge & Index */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-red-50 text-[#631012] border border-red-100">
                    {item.tagline_en || 'Milestone'}
                  </span>
                  <span className="text-xs font-bold text-gray-300 group-hover:text-[#631012]/40 transition-colors">
                    #0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 group-hover:text-[#631012] transition-colors text-base leading-snug line-clamp-2 mb-2">
                  {item.heading_en || item.title_en}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-3">
                  {item.description_en}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#631012]">
                <span className="group-hover:underline">Read details</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
