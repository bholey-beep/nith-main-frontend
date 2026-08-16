'use client';

import React, { useState, useMemo } from 'react';
import { Search, ExternalLink } from 'lucide-react';

export interface PublicationItem {
  id?: string | number;
  title: string;
  authors?: string;
  journal?: string;
  year?: string | number;
  doi?: string;
  type?: 'Journal' | 'Conference' | 'Patent' | 'Project' | 'Book' | string;
  impactFactor?: string;
}

export interface DepartmentPublicationsViewProps {
  departmentName: string;
  publications: PublicationItem[];
}

export default function DepartmentPublicationsView({
  departmentName,
  publications = [],
}: DepartmentPublicationsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Journal', 'Conference', 'Patent', 'Project', 'Book'];

  const filteredPubs = useMemo(() => {
    return publications.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (Boolean(item.authors) && item.authors!.toLowerCase().includes(q)) ||
        (Boolean(item.journal) && item.journal!.toLowerCase().includes(q));

      const matchesType = selectedType === 'All' || item.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [publications, searchQuery, selectedType]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-300 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#631012]">
            Research
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-0.5">
            Publications & Research Output
          </h2>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search papers, authors, journals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-300 focus:outline-none focus:border-[#631012] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-300 overflow-x-auto">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
              selectedType === type
                ? 'border-[#631012] text-[#631012] bg-gray-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {type === 'All' ? 'All Publications' : `${type}s`}
          </button>
        ))}
      </div>

      {/* Publications Numbered Citation List */}
      {filteredPubs.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border border-gray-200 p-6">
          <p className="text-sm font-semibold text-gray-700">No publications found.</p>
        </div>
      ) : (
        <ol className="space-y-4">
          {filteredPubs.map((pub, idx) => (
            <li
              key={idx}
              className="border border-gray-300 bg-white p-4 space-y-2 hover:border-[#631012] transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase text-[#631012] bg-gray-100 px-2 py-0.5 border border-gray-200">
                  {pub.type || 'Journal'}
                </span>
                {pub.year && (
                  <span className="text-xs font-mono text-gray-600 font-bold">
                    [{pub.year}]
                  </span>
                )}
                {pub.impactFactor && (
                  <span className="text-xs font-mono text-gray-700 bg-gray-50 px-1.5 py-0.5 border border-gray-200">
                    Impact Factor: {pub.impactFactor}
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                {pub.title}
              </h3>

              {pub.authors && (
                <p className="text-xs text-gray-700">
                  <span className="font-semibold text-gray-900">Authors: </span>
                  {pub.authors}
                </p>
              )}

              {pub.journal && (
                <p className="text-xs text-gray-600 italic">
                  <span className="font-semibold not-italic text-gray-900">Published in: </span>
                  {pub.journal}
                </p>
              )}

              {pub.doi && (
                <div className="pt-2">
                  <a
                    href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#631012] hover:underline font-bold"
                  >
                    <span>DOI: {pub.doi}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
