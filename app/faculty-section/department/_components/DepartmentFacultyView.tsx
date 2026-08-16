'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Mail, Search, ExternalLink, Loader2 } from 'lucide-react';

export interface FacultyMember {
  name: string;
  designation: string;
  interests?: string;
  email?: string;
  phone?: string;
  photo_url?: string;
  profile_url?: string;
  qualification?: string;
}

export interface FacultyGroup {
  title: string;
  featured?: boolean;
  members: FacultyMember[];
}

export interface DepartmentFacultyViewProps {
  departmentCode: string;
  fallbackGroups?: FacultyGroup[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function DepartmentFacultyView({
  departmentCode,
  fallbackGroups = [],
}: DepartmentFacultyViewProps) {
  const [facultyGroups, setFacultyGroups] = useState<FacultyGroup[]>(fallbackGroups);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('All');

  useEffect(() => {
    let cancelled = false;

    const loadFaculty = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE}/v1/departments/${departmentCode}/faculty?language=en&active_only=true`,
          { cache: 'no-store' }
        );

        if (!res.ok) {
          if (!cancelled && fallbackGroups.length > 0) setFacultyGroups(fallbackGroups);
          return;
        }

        const json = await res.json();
        const rows = json?.data || [];

        if (Array.isArray(rows) && rows.length > 0 && !cancelled) {
          const groupsMap = new Map<string, FacultyGroup>();

          rows.forEach((row: any) => {
            const title = row.group_title || row.designation_en || row.designation || 'Faculty';
            if (!groupsMap.has(title)) {
              groupsMap.set(title, {
                title,
                featured: Boolean(row.is_featured || title.toLowerCase().includes('professor')),
                members: [],
              });
            }

            groupsMap.get(title)!.members.push({
              name: row.name || row.name_en || '',
              designation: row.designation_en || row.designation || title,
              interests: row.interests || row.research_interests || '',
              email: row.email || '',
              phone: row.phone || '',
              photo_url: row.photo_url || row.image_url || '',
              profile_url: row.profile_url || '',
              qualification: row.qualification || 'Ph.D.',
            });
          });

          setFacultyGroups(Array.from(groupsMap.values()));
        } else if (!cancelled && fallbackGroups.length > 0) {
          setFacultyGroups(fallbackGroups);
        }
      } catch (err) {
        console.error('Error fetching faculty data:', err);
        if (!cancelled && fallbackGroups.length > 0) {
          setFacultyGroups(fallbackGroups);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadFaculty();
    return () => {
      cancelled = true;
    };
  }, [departmentCode]);

  const allMembers = useMemo(() => {
    return facultyGroups.flatMap((group) =>
      group.members.map((m) => ({ ...m, groupTitle: group.title }))
    );
  }, [facultyGroups]);

  const designations = useMemo(() => {
    const set = new Set<string>();
    facultyGroups.forEach((g) => set.add(g.title));
    return ['All', ...Array.from(set)];
  }, [facultyGroups]);

  const filteredMembers = useMemo(() => {
    return allMembers.filter((m) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.interests && m.interests.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (m.email && m.email.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDesignation =
        selectedDesignation === 'All' || m.groupTitle === selectedDesignation;

      return matchesSearch && matchesDesignation;
    });
  }, [allMembers, searchQuery, selectedDesignation]);

  return (
    <div className="space-y-6">
      {/* Header with Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-300 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#631012]">
            Directory
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-0.5">Faculty Members</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-300 focus:outline-none focus:border-[#631012] w-full sm:w-56"
            />
          </div>

          <select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            className="px-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-300 focus:outline-none focus:border-[#631012] text-gray-700 font-medium"
          >
            {designations.map((desig) => (
              <option key={desig} value={desig}>
                {desig}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 border border-gray-200">
          <Loader2 className="w-6 h-6 animate-spin text-[#631012] mb-2" />
          <p className="text-gray-500 text-xs font-mono">Loading faculty records...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border border-gray-200 p-6">
          <p className="text-sm font-semibold text-gray-700">No faculty members found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMembers.map((member, idx) => (
            <div
              key={idx}
              className="border border-gray-300 bg-white p-4 flex flex-col justify-between hover:border-[#631012] transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Photo */}
                {member.photo_url ? (
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-20 h-24 object-cover border border-gray-300 shrink-0 bg-gray-100"
                  />
                ) : (
                  <div className="w-20 h-24 bg-gray-100 border border-gray-300 flex items-center justify-center font-bold text-base text-gray-500 shrink-0 font-mono">
                    {member.name
                      .split(' ')
                      .filter(Boolean)
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                )}

                {/* Info */}
                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#631012]">
                    {member.designation}
                  </div>
                  {member.qualification && (
                    <div className="text-xs text-gray-500 font-mono">
                      {member.qualification}
                    </div>
                  )}

                  {member.interests && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase text-gray-400 block font-mono">
                        Research Area:
                      </span>
                      <p className="text-xs text-gray-700 line-clamp-2 mt-0.5">
                        {member.interests}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
                {member.email ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1.5 text-gray-700 hover:text-[#631012] font-mono truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#631012] shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                ) : (
                  <span className="text-gray-400 italic">No email</span>
                )}

                <a
                  href={member.profile_url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#631012] hover:underline font-semibold flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
