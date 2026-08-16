'use client';

import React from 'react';
import { Mail, PhoneCall, MapPin, Clock, ExternalLink } from 'lucide-react';

export interface ContactInfo {
  hodName?: string;
  hodEmail?: string;
  hodPhone?: string;
  officeEmail?: string;
  officePhone?: string;
  location?: string;
  officeHours?: string;
  address?: string;
}

export interface DepartmentContactViewProps {
  departmentName: string;
  departmentCode: string;
  contact: ContactInfo;
}

export default function DepartmentContactView({
  departmentName,
  departmentCode,
  contact,
}: DepartmentContactViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-300 pb-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#631012]">
          Communication
        </span>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          Contact Information
        </h2>
        <p className="text-xs text-gray-600 mt-0.5 font-mono">
          Department of {departmentName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HOD Contact Box */}
        <div className="border border-gray-300 bg-white p-6 space-y-4">
          <div className="border-b border-gray-200 pb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#631012]">
              Head of Department (HOD)
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-1">
              {contact.hodName || `Head, Dept. of ${departmentCode}`}
            </h3>
            <p className="text-xs text-gray-600">
              Department of {departmentName}
            </p>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-gray-700 font-mono">
            {contact.hodEmail && (
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#631012] shrink-0" />
                <a
                  href={`mailto:${contact.hodEmail}`}
                  className="hover:text-[#631012] hover:underline truncate"
                >
                  {contact.hodEmail}
                </a>
              </div>
            )}
            {contact.hodPhone && (
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#631012] shrink-0" />
                <span>{contact.hodPhone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Department Office Box */}
        <div className="border border-gray-300 bg-white p-6 space-y-4">
          <div className="border-b border-gray-200 pb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-600">
              Administrative Office
            </span>
            <h3 className="text-base font-bold text-gray-900 mt-1">
              Department Office
            </h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-gray-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#631012] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gray-900 block text-xs font-mono uppercase">
                  Location
                </span>
                <span className="text-xs text-gray-700">
                  {contact.location || `${departmentName} Building, NIT Hamirpur, H.P. - 177005`}
                </span>
              </div>
            </div>

            {contact.officeHours && (
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#631012] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 block text-xs font-mono uppercase">
                    Working Hours
                  </span>
                  <span className="text-xs text-gray-700">{contact.officeHours}</span>
                </div>
              </div>
            )}

            {contact.officeEmail && (
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <Mail className="w-4 h-4 text-[#631012] shrink-0" />
                <a
                  href={`mailto:${contact.officeEmail}`}
                  className="hover:text-[#631012] hover:underline"
                >
                  {contact.officeEmail}
                </a>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-gray-200">
            <a
              href="https://nith.ac.in"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#631012] hover:underline font-mono"
            >
              <span>NIT Hamirpur Official Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
