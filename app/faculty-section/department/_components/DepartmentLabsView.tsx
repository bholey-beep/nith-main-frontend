'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export interface LabItem {
  id?: string | number;
  name: string;
  nameHindi?: string;
  incharge?: string;
  staff?: string;
  location?: string;
  equipment?: string[];
  description?: string;
  capacity?: string | number;
}

export interface DepartmentLabsViewProps {
  departmentName: string;
  labs: LabItem[];
}

export default function DepartmentLabsView({
  departmentName,
  labs = [],
}: DepartmentLabsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLabs = labs.filter((lab) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      lab.name.toLowerCase().includes(q) ||
      (Boolean(lab.incharge) && lab.incharge!.toLowerCase().includes(q)) ||
      (Boolean(lab.location) && lab.location!.toLowerCase().includes(q)) ||
      (Boolean(lab.equipment) && lab.equipment!.some((eq) => eq.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-300 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#631012]">
            Infrastructure
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-0.5">
            Laboratories & Facilities
          </h2>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search laboratory or equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-300 focus:outline-none focus:border-[#631012] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Laboratories List */}
      {filteredLabs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border border-gray-200 p-6">
          <p className="text-sm font-semibold text-gray-700">No laboratories found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLabs.map((lab, index) => (
            <div
              key={index}
              className="border border-gray-300 bg-white p-5 space-y-3 hover:border-[#631012] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
                <h3 className="text-base font-bold text-gray-900">
                  {index + 1}. {lab.name}
                </h3>
                {lab.capacity && (
                  <span className="text-xs font-mono text-gray-600">
                    Capacity: {lab.capacity} Seats
                  </span>
                )}
              </div>

              {lab.description && (
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {lab.description}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 pt-1 font-mono">
                {lab.incharge && (
                  <div>
                    <span className="font-bold text-gray-900">Faculty In-Charge: </span>
                    <span>{lab.incharge}</span>
                  </div>
                )}
                {lab.location && (
                  <div>
                    <span className="font-bold text-gray-900">Location: </span>
                    <span>{lab.location}</span>
                  </div>
                )}
              </div>

              {lab.equipment && lab.equipment.length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 font-mono block mb-1.5">
                    Major Equipment & Software:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.equipment.map((eq, eqIdx) => (
                      <span
                        key={eqIdx}
                        className="text-xs px-2.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-800 font-mono"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
