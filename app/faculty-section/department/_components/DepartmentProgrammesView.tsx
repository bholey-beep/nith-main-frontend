'use client';

import React from 'react';
import { FileText } from 'lucide-react';

export interface ProgrammeItem {
  degree: string;
  level: string;
  duration: string;
  intake?: string | number;
  description: string;
  specializations?: string[];
  syllabusLink?: string;
}

export interface DepartmentProgrammesViewProps {
  departmentName: string;
  programmes: ProgrammeItem[];
}

export default function DepartmentProgrammesView({
  departmentName,
  programmes = [],
}: DepartmentProgrammesViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-300 pb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#631012]">
          Academics
        </span>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          Programmes Offered
        </h2>
        <p className="text-xs text-gray-600 mt-0.5 font-mono">
          Department of {departmentName}
        </p>
      </div>

      {/* Programmes List */}
      <div className="space-y-6">
        {programmes.map((prog, idx) => (
          <div
            key={idx}
            className="border border-gray-300 bg-white p-6 space-y-4 hover:border-[#631012] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-[#631012] bg-gray-100 px-2 py-0.5 border border-gray-200 inline-block mb-1">
                  {prog.level}
                </span>
                <h3 className="text-lg font-bold text-gray-900">{prog.degree}</h3>
              </div>

              <div className="text-xs font-mono text-gray-600 space-x-3 shrink-0">
                <span>Duration: <strong>{prog.duration}</strong></span>
                {prog.intake && <span>| Intake: <strong>{prog.intake} Seats</strong></span>}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {prog.description}
            </p>

            {prog.specializations && prog.specializations.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono block mb-1.5">
                  Curriculum & Specialization Areas:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {prog.specializations.map((spec, specIdx) => (
                    <span
                      key={specIdx}
                      className="text-xs px-2.5 py-0.5 bg-gray-50 border border-gray-200 text-gray-800 font-mono"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {prog.syllabusLink && (
              <div className="pt-3 border-t border-gray-200">
                <a
                  href={prog.syllabusLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#631012] hover:underline font-mono"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Detailed Syllabus & Course Structure</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
