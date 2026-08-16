'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentContactView from '../../_components/DepartmentContactView';

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

const mncContact = {
  hodName: 'Prof. Yogeshver Dutt Sharma',
  hodEmail: 'yds@nith.ac.in',
  hodPhone: '+91-1972-254200',
  officeEmail: 'mathd@nith.ac.in',
  officePhone: '+91-1972-254201',
  location: 'Department of Mathematics & Scientific Computing, Science Block-B, NIT Hamirpur (HP) - 177005',
  officeHours: 'Monday to Friday: 09:00 AM - 05:30 PM (IST)',
};

export default function MNCContactPage() {
  return (
    <DepartmentLayout dept={mncMeta} deptSlug="mnc">
      <DepartmentContactView departmentName="Mathematics & Scientific Computing" departmentCode="M&SC" contact={mncContact} />
    </DepartmentLayout>
  );
}
