'use client';

import React from 'react';

export interface VisionMissionData {
  vision: string;
  mission: string[];
  peos?: { title: string; desc: string }[];
  psos?: { title: string; desc: string }[];
}

export interface DepartmentVisionMissionViewProps {
  departmentName: string;
  data: VisionMissionData;
}

export default function DepartmentVisionMissionView({
  departmentName,
  data,
}: DepartmentVisionMissionViewProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-gray-300 pb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#631012]">
          Institutional Goals
        </span>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          Vision & Mission
        </h2>
        <p className="text-xs text-gray-600 mt-0.5 font-mono">
          Department of {departmentName}
        </p>
      </div>

      {/* Vision */}
      <section className="border border-gray-300 bg-gray-50 p-6 space-y-2">
        <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-[#631012]">
          Vision Statement
        </h3>
        <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
          "{data.vision}"
        </p>
      </section>

      {/* Mission */}
      <section className="border border-gray-300 bg-white p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-[#631012]">
          Mission Statements
        </h3>
        <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
          {data.mission.map((item, idx) => (
            <li key={idx} className="pl-1">
              <span className="text-gray-800">{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Program Educational Objectives (PEOs) */}
      {data.peos && data.peos.length > 0 && (
        <section className="border border-gray-300 bg-white p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-gray-900 border-b border-gray-200 pb-2">
            Program Educational Objectives (PEOs)
          </h3>
          <div className="divide-y divide-gray-200">
            {data.peos.map((peo, idx) => (
              <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
                <span className="text-xs font-mono font-bold text-[#631012]">
                  {peo.title}
                </span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {peo.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Program Specific Outcomes (PSOs) */}
      {data.psos && data.psos.length > 0 && (
        <section className="border border-gray-300 bg-white p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-gray-900 border-b border-gray-200 pb-2">
            Program Specific Outcomes (PSOs)
          </h3>
          <div className="divide-y divide-gray-200">
            {data.psos.map((pso, idx) => (
              <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
                <span className="text-xs font-mono font-bold text-[#631012]">
                  {pso.title}
                </span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {pso.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
