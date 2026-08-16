'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentStaffView from '../../_components/DepartmentStaffView';

const mscMeta = {
  code: 'MSE',
  name: 'Department of Materials Science & Engineering',
  nameHindi: 'पदार्थ विज्ञान एवं इंजीनियरिंग विभाग',
  established: '2013',
  stats: {
    facultyCount: '12+',
    labsCount: '7+',
    programmesCount: '3',
    publicationsCount: '290+',
  },
};

const mscStaff = [
  {
    name: 'Sh. Amit Dogra',
    designation: 'Technical Officer (Metallurgy & Testing)',
    email: 'amit_mse@nith.ac.in',
    phone: '+91-1972-254530',
    room: 'Microscopy Lab Room 102',
  },
  {
    name: 'Smt. Deepa Sharma',
    designation: 'Senior Assistant (Department Office)',
    email: 'deepa_mse@nith.ac.in',
    phone: '+91-1972-254510',
    room: 'MSE Main Office Room 001',
  },
];

export default function MSCStaffPage() {
  return (
    <DepartmentLayout dept={mscMeta} deptSlug="msc">
      <DepartmentStaffView departmentName="Materials Science & Engineering" staff={mscStaff} />
    </DepartmentLayout>
  );
}
