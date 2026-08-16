'use client';

import React, { useState } from 'react';
import { Search, Mail } from 'lucide-react';

export interface StaffMember {
  name: string;
  designation: string;
  email?: string;
  phone?: string;
  room?: string;
  role?: string;
}

export interface DepartmentStaffViewProps {
  departmentName: string;
  staff: StaffMember[];
}

export default function DepartmentStaffView({
  departmentName,
  staff = [],
}: DepartmentStaffViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = staff.filter((member) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      member.name.toLowerCase().includes(q) ||
      member.designation.toLowerCase().includes(q) ||
      (Boolean(member.email) && member.email!.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-300 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#631012]">
            Staff Directory
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-0.5">
            Technical & Support Staff
          </h2>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search staff by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-gray-300 focus:outline-none focus:border-[#631012] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Staff Table */}
      {filteredStaff.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border border-gray-200 p-6">
          <p className="text-sm font-semibold text-gray-700">No staff members found.</p>
        </div>
      ) : (
        <div className="border border-gray-300 overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-gray-800">
            <thead className="bg-gray-100 border-b border-gray-300 text-gray-700 font-mono uppercase text-xs">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Room / Office</th>
                <th className="py-3 px-4">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredStaff.map((member, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-gray-500">{index + 1}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{member.name}</td>
                  <td className="py-3 px-4 text-[#631012] font-medium">{member.designation}</td>
                  <td className="py-3 px-4 text-gray-600 font-mono">{member.room || '-'}</td>
                  <td className="py-3 px-4 font-mono">
                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-700 hover:text-[#631012] flex items-center gap-1.5 hover:underline"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#631012]" />
                        <span>{member.email}</span>
                      </a>
                    ) : member.phone ? (
                      <span>{member.phone}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
