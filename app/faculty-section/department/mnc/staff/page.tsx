'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentStaffView from '../../_components/DepartmentStaffView';

const mncMeta = {
  code: 'M&SC',
  name: 'Department of Mathematics & Scientific Computing',
  nameHindi: 'गणित एवं वैज्ञानिक संगणना विभाग',
  established: '1986',
  stats: {
    facultyCount: '15+',
    labsCount: '6+',
    programmesCount: '3',
    publicationsCount: '410+',
  },
};

const mncStaff = [
  {
    name: 'Sh. Pawan Kumar',
    designation: 'Technical Officer (Computing Facilities)',
    email: 'pawan_math@nith.ac.in',
    phone: '+91-1972-254230',
    room: 'Scientific Computing Lab Room 102',
  },
  {
    name: 'Smt. Vandana Sharma',
    designation: 'Senior Assistant (Academic Section)',
    email: 'vandana_math@nith.ac.in',
    phone: '+91-1972-254210',
    room: 'M&SC Office Room 001',
  },
];

export default function MNCStaffPage() {
  return (
    <DepartmentLayout dept={mncMeta} deptSlug="mnc">
      <DepartmentStaffView departmentName="Mathematics & Scientific Computing" staff={mncStaff} />
    </DepartmentLayout>
  );
}
