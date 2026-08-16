'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentStaffView from '../../_components/DepartmentStaffView';

const cseMeta = {
  code: 'CSE',
  name: 'Department of Computer Science & Engineering',
  nameHindi: 'कंप्यूटर विज्ञान एवं इंजीनियरिंग विभाग',
  established: '1989',
  stats: {
    facultyCount: '24+',
    labsCount: '12+',
    programmesCount: '4',
    publicationsCount: '520+',
  },
};

const cseStaff = [
  {
    name: 'Sh. Rajesh Kumar',
    designation: 'Senior Technical Assistant',
    email: 'rajesh_tech@nith.ac.in',
    phone: '+91-1972-254420',
    room: 'Lab Complex Room 104',
  },
  {
    name: 'Sh. Sunil Sharma',
    designation: 'Technical Officer (Computing Systems)',
    email: 'sunil_cs@nith.ac.in',
    phone: '+91-1972-254422',
    room: 'AI & GPU Lab Room 204',
  },
  {
    name: 'Smt. Anjana Devi',
    designation: 'Superintendent (Administration)',
    email: 'anjana_dept@nith.ac.in',
    phone: '+91-1972-254410',
    room: 'HOD Office Annex Room 001',
  },
  {
    name: 'Sh. Manoj Dogra',
    designation: 'Junior Assistant (Academic Cell)',
    email: 'manoj_cse@nith.ac.in',
    phone: '+91-1972-254412',
    room: 'Department Office Room 002',
  },
];

export default function CSEStaffPage() {
  return (
    <DepartmentLayout dept={cseMeta} deptSlug="cse">
      <DepartmentStaffView departmentName="Computer Science & Engineering" staff={cseStaff} />
    </DepartmentLayout>
  );
}
