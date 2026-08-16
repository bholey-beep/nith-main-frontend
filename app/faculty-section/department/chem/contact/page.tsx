'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentContactView from '../../_components/DepartmentContactView';

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

const chemContact = {
  hodName: 'Dr. Pamita Awasthi',
  hodEmail: 'pamita@nith.ac.in',
  hodPhone: '+91-1972-254100',
  officeEmail: 'chemd@nith.ac.in',
  officePhone: '+91-1972-254101',
  location: 'Department of Chemical Sciences & Engineering, Science Block-A, NIT Hamirpur (HP) - 177005',
  officeHours: 'Monday to Friday: 09:00 AM - 05:30 PM (IST)',
};

export default function ChemContactPage() {
  return (
    <DepartmentLayout dept={chemMeta} deptSlug="chem">
      <DepartmentContactView departmentName="Chemical Sciences & Engineering" departmentCode="CHEM" contact={chemContact} />
    </DepartmentLayout>
  );
}
