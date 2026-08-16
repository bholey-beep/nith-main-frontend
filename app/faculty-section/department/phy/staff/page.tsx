'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentStaffView from '../../_components/DepartmentStaffView';

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

const phyStaff = [
  {
    name: 'Sh. Anil Kumar',
    designation: 'Technical Officer (Cryogenics & Optics)',
    email: 'anil_phy@nith.ac.in',
    phone: '+91-1972-254180',
    room: 'Condensed Matter Lab Room 104',
  },
  {
    name: 'Sh. Kuldeep Singh',
    designation: 'Senior Technical Assistant (Thin Films & Sputtering)',
    email: 'kuldeep_phy@nith.ac.in',
    phone: '+91-1972-254182',
    room: 'Sputtering Lab Room 202',
  },
  {
    name: 'Smt. Neena Kumari',
    designation: 'Senior Assistant (Academic & Office Records)',
    email: 'neena_phy@nith.ac.in',
    phone: '+91-1972-254160',
    room: 'Physics Office Room 001',
  },
];

export default function PHYStaffPage() {
  return (
    <DepartmentLayout dept={phyMeta} deptSlug="phy">
      <DepartmentStaffView departmentName="Physics & Photonics Science" staff={phyStaff} />
    </DepartmentLayout>
  );
}
