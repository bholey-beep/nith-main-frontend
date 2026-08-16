'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentFacultyView from '../../_components/DepartmentFacultyView';

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

const mncFallbackFaculty = [
  {
    title: 'Professors',
    featured: true,
    members: [
      {
        name: 'Prof. Yogeshver Dutt Sharma',
        designation: 'HoD & Professor',
        interests: 'Applied Mathematics, Mechanics (Fluid & Solid), Thermal, Bio, Nano Convection, Wave Propagation',
        email: 'yds@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Prof. Sunil',
        designation: 'Professor',
        interests: 'Magnetohydrodynamics, Ferrohydrodynamics, Plasma Instabilities, Non-linear Stability of Fluids',
        email: 'sunil@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
  {
    title: 'Associate Professors',
    members: [
      {
        name: 'Dr. Ramesh Kumar Vats',
        designation: 'Associate Professor',
        interests: 'Fixed Point Theory (Functional Analysis), Fractional Calculus, Optimization',
        email: 'rkvats@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Pawan Kumar Sharma',
        designation: 'Associate Professor',
        interests: 'Elasticity, Thermoelasticity, Free & Forced Vibration Numerical Analysis',
        email: 'pawan@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
  {
    title: 'Assistant Professors (Grade-I)',
    members: [
      {
        name: 'Dr. Suket Kumar',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Functional Analysis, Operator Theory, Metric Fixed Point Theory',
        email: 'suket@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Rifaqat Ali',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Numerical Analysis, Mathematical Modeling, Differential Equations',
        email: 'rifaqat@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
];

export default function MNCFacultyPage() {
  return (
    <DepartmentLayout dept={mncMeta} deptSlug="mnc">
      <DepartmentFacultyView departmentCode="mnc" fallbackGroups={mncFallbackFaculty} />
    </DepartmentLayout>
  );
}