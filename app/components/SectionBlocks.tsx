'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type Lang = 'en' | 'hi';

type ActivityItem = {
  id: number;
  title_en: string;
  title_hn?: string | null;
  description_en?: string | null;
  description_hn?: string | null;
};

type FunctionaryItem = {
  id: number;
  title_en: string;
  title_hn?: string | null;
  name_en: string;
  name_hn?: string | null;
  responsibility_en?: string | null;
  responsibility_hn?: string | null;
  phone?: string | null;
  email?: string | null;
  faculty_id?: number | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf7f5] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#631012] via-[#7a1214] to-[#9b1f22] text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white_0,_transparent_35%),radial-gradient(circle_at_bottom_left,_white_0,_transparent_28%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide backdrop-blur-sm">
            CMS Preview
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight uppercase">{title}</h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-white/80 leading-relaxed">{subtitle}</p>
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-6 py-10 md:py-14">{children}</main>
    </div>
  );
}

export function ActivitiesSectionPage({
  titleEn,
  titleHi,
  subtitleEn,
  subtitleHi,
  endpoint,
}: {
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  endpoint: string;
}) {
  const language = useSelector((state: RootState) => state.language.value) as Lang;
  const isHindi = language === 'hi';
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchItems() {
      try {
        const response = await fetch(endpoint, { cache: 'no-store' });
        const json = await response.json();
        const data = json?.data?.activities || [];
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (fetchError) {
        console.error(fetchError);
        if (!cancelled) {
          setError('Failed to load section data');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchItems();
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  const headerTitle = isHindi ? titleHi : titleEn;
  const headerSubtitle = isHindi ? subtitleHi : subtitleEn;

  return (
    <PageShell title={headerTitle} subtitle={headerSubtitle}>
      {loading ? (
        <div className="rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">Loading...</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-white p-10 text-center text-red-700 shadow-sm">{error}</div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/10 bg-white p-10 text-center text-slate-500 shadow-sm">
          No items available yet.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <article key={item.id} className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-[#631012]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#631012]">
                  {headerTitle}
                </span>
                <span className="text-sm font-semibold text-slate-300">0{index + 1}</span>
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-[#631012]">
                {isHindi ? item.title_hn || item.title_en : item.title_en}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                {isHindi ? item.description_hn || item.description_en : item.description_en}
              </p>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}

export function FunctionariesSectionPage({
  titleEn,
  titleHi,
  subtitleEn,
  subtitleHi,
  endpoint,
}: {
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  endpoint: string;
}) {
  const language = useSelector((state: RootState) => state.language.value) as Lang;
  const isHindi = language === 'hi';
  const [items, setItems] = useState<FunctionaryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchItems() {
      try {
        const response = await fetch(endpoint, { cache: 'no-store' });
        const json = await response.json();
        const data = json?.data?.functionaries || [];
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch (fetchError) {
        console.error(fetchError);
        if (!cancelled) {
          setError('Failed to load functionaries');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchItems();
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  const grouped = useMemo(() => {
    const map = new Map<string, FunctionaryItem[]>();
    for (const item of items) {
      const key = isHindi ? item.title_hn || item.title_en : item.title_en;
      const current = map.get(key) || [];
      current.push(item);
      map.set(key, current);
    }
    return Array.from(map.entries()).map(([title, rows]) => ({ title, rows }));
  }, [items, isHindi]);

  const headerTitle = isHindi ? titleHi : titleEn;
  const headerSubtitle = isHindi ? subtitleHi : subtitleEn;

  return (
    <PageShell title={headerTitle} subtitle={headerSubtitle}>
      {loading ? (
        <div className="rounded-3xl border border-black/5 bg-white p-10 text-center shadow-sm">Loading...</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-white p-10 text-center text-red-700 shadow-sm">{error}</div>
      ) : grouped.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-black/10 bg-white p-10 text-center text-slate-500 shadow-sm">
          No functionaries available yet.
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map((section) => (
            <section key={section.title} className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
              <div className="bg-slate-950 px-6 py-4 text-white">
                <h2 className="text-lg font-bold tracking-tight">{section.title}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-100">
                  <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    <tr>
                      <th className="px-5 py-4">{isHindi ? 'नाम' : 'Name'}</th>
                      <th className="px-5 py-4">{isHindi ? 'उत्तरदायित्व' : 'Responsibility'}</th>
                      <th className="px-5 py-4">{isHindi ? 'संपर्क' : 'Contact'}</th>
                      <th className="px-5 py-4">Faculty Id</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {section.rows.map((item) => (
                      <tr key={item.id} className="hover:bg-[#631012]/[0.03]">
                        <td className="px-5 py-4 align-top">
                          <div className="font-semibold text-slate-900">{isHindi ? item.name_hn || item.name_en : item.name_en}</div>
                        </td>
                        <td className="px-5 py-4 align-top text-slate-600">
                          {isHindi ? item.responsibility_hn || item.responsibility_en || '-' : item.responsibility_en || '-'}
                        </td>
                        <td className="px-5 py-4 align-top text-sm text-slate-600">
                          <div>{item.phone || '-'}</div>
                          <div className="text-[#631012]">{item.email || '-'}</div>
                        </td>
                        <td className="px-5 py-4 align-top text-sm font-semibold text-[#631012]">{item.faculty_id || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
