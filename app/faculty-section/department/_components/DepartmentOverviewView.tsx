'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface ProgrammePreview {
  name: string;
  level: string;
  desc: string;
}

export interface DepartmentOverviewData {
  departmentName: string;
  departmentCode: string;
  deptSlug: string;
  aboutText: string[];
  hodMessage?: {
    name: string;
    designation: string;
    quote: string;
    photoUrl?: string;
  };
  focusAreas?: string[];
  programmes?: ProgrammePreview[];
  highlights?: { title: string; desc: string; stat?: string }[];
}

export default function DepartmentOverviewView({
  data,
}: {
  data: DepartmentOverviewData;
}) {
  return (
    <div className="space-y-10">
      {/* Overview Section */}
      <section className="space-y-4">
        <div className="border-b border-gray-300 pb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#631012]">
            Overview
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1">
            About the Department
          </h2>
        </div>

        <div className="space-y-3 text-sm text-gray-700 leading-relaxed text-justify">
          {data.aboutText.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </section>

      {/* Head of Department Message */}
      {data.hodMessage && (
        <section className="border-l-4 border-[#631012] bg-gray-50 p-6 border-y border-r border-gray-200">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {data.hodMessage.photoUrl ? (
              <img
                src={data.hodMessage.photoUrl}
                alt={data.hodMessage.name}
                className="w-24 h-28 object-cover border border-gray-300 shrink-0 bg-white"
              />
            ) : (
              <div className="w-24 h-28 bg-gray-200 border border-gray-300 flex items-center justify-center font-bold text-xl text-gray-600 shrink-0 font-mono">
                {data.hodMessage.name
                  .split(' ')
                  .filter(Boolean)
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
            )}

            <div className="space-y-2 flex-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#631012]">
                Head of Department Message
              </span>
              <h3 className="text-base font-bold text-gray-900">
                {data.hodMessage.name}
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                {data.hodMessage.designation}
              </p>
              <blockquote className="text-xs sm:text-sm text-gray-700 italic border-t border-gray-200 pt-2 mt-2 leading-relaxed">
                "{data.hodMessage.quote}"
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* Key Research Areas */}
      {data.focusAreas && data.focusAreas.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-gray-300 pb-2">
            <h3 className="text-lg font-bold text-gray-900">
              Key Research & Thrust Areas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white border border-gray-300 text-xs sm:text-sm font-medium text-gray-800 flex items-center gap-2 hover:border-[#631012] transition-colors"
              >
                <span className="w-1.5 h-1.5 bg-[#631012] shrink-0" />
                <span>{area}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Academic Programmes Summary */}
      {data.programmes && data.programmes.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <h3 className="text-lg font-bold text-gray-900">
              Academic Programmes
            </h3>
            <Link
              href={`/faculty-section/department/${data.deptSlug}/programme-offered`}
              className="text-xs font-bold text-[#631012] hover:underline flex items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="border border-gray-300 divide-y divide-gray-200">
            {data.programmes.map((prog, idx) => (
              <div key={idx} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#631012] bg-gray-100 px-2 py-0.5 border border-gray-200">
                      {prog.level}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">{prog.name}</h4>
                  </div>
                  <p className="text-xs text-gray-600">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Department Highlights */}
      {data.highlights && data.highlights.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-gray-300 pb-2">
            <h3 className="text-lg font-bold text-gray-900">
              Key Highlights & Achievements
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.highlights.map((h, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 border border-gray-300 space-y-1"
              >
                {h.stat && (
                  <span className="text-xl font-bold font-mono text-[#631012] block">
                    {h.stat}
                  </span>
                )}
                <h4 className="text-xs font-bold uppercase text-gray-900">{h.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
