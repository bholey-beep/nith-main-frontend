'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentContactView from '../../_components/DepartmentContactView';

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

const mscContact = {
  hodName: 'Dr. Vishal Singh',
  hodEmail: 'vishalchib@nith.ac.in',
  hodPhone: '+91-1972-254500',
  officeEmail: 'msed@nith.ac.in',
  officePhone: '+91-1972-254501',
  location: 'Department of Materials Science & Engineering, Workshop & Materials Complex, NIT Hamirpur (HP) - 177005',
  officeHours: 'Monday to Friday: 09:00 AM - 05:30 PM (IST)',
};

export default function MSCContactPage() {
  return (
    <DepartmentLayout dept={mscMeta} deptSlug="msc">
      <DepartmentContactView departmentName="Materials Science & Engineering" departmentCode="MSE" contact={mscContact} />
    </DepartmentLayout>
  );
}
