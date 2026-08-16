'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentStaffView from '../../_components/DepartmentStaffView';

const chemMeta = {
  code: 'CHEM',
  name: 'Department of Chemical Sciences & Engineering',
  nameHindi: 'रासायनिक विज्ञान एवं इंजीनियरिंग विभाग',
  established: '1986',
  stats: {
    facultyCount: '16+',
    labsCount: '8+',
    programmesCount: '3',
    publicationsCount: '340+',
  },
};

const chemStaff = [
  {
    name: 'Sh. Suresh Kumar',
    designation: 'Senior Technical Officer (Instrumentation)',
    email: 'suresh_chem@nith.ac.in',
    phone: '+91-1972-254130',
    room: 'Analytical Instrumentation Lab Room 104',
  },
  {
    name: 'Sh. Vijay Dogra',
    designation: 'Technical Assistant (Organic Synthesis)',
    email: 'vijay_chem@nith.ac.in',
    phone: '+91-1972-254132',
    room: 'Synthesis Lab Room 003',
  },
  {
    name: 'Smt. Rita Sharma',
    designation: 'Senior Assistant (Department Office)',
    email: 'rita_chem@nith.ac.in',
    phone: '+91-1972-254110',
    room: 'Chemistry Office Room 001',
  },
];

export default function ChemStaffPage() {
  return (
    <DepartmentLayout dept={chemMeta} deptSlug="chem">
      <DepartmentStaffView departmentName="Chemical Sciences & Engineering" staff={chemStaff} />
    </DepartmentLayout>
  );
}
