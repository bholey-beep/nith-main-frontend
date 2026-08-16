'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentContactView from '../../_components/DepartmentContactView';

const phyMeta = {
  code: 'PHY',
  name: 'Department of Physics & Photonics Science',
  nameHindi: 'भौतिकी एवं फोटोनिक्स विज्ञान विभाग',
  established: '1986',
  stats: {
    facultyCount: '16+',
    labsCount: '8+',
    programmesCount: '3',
    publicationsCount: '450+',
  },
};

const phyContact = {
  hodName: 'Dr. Subhash Chand',
  hodEmail: 'schand@nith.ac.in',
  hodPhone: '+91-1972-254150',
  officeEmail: 'phyd@nith.ac.in',
  officePhone: '+91-1972-254151',
  location: 'Department of Physics & Photonics Science, Science Block-A, NIT Hamirpur (HP) - 177005',
  officeHours: 'Monday to Friday: 09:00 AM - 05:30 PM (IST)',
};

export default function PHYContactPage() {
  return (
    <DepartmentLayout dept={phyMeta} deptSlug="phy">
      <DepartmentContactView departmentName="Physics & Photonics Science" departmentCode="PHY" contact={phyContact} />
    </DepartmentLayout>
  );
}
