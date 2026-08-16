'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentProgrammesView from '../../_components/DepartmentProgrammesView';

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

const mncProgrammes = [
  {
    degree: 'B.Tech in Mathematics & Computing',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    intake: 60,
    description:
      'Premier hybrid degree combining rigorous mathematics, theoretical computer science, financial engineering, scientific computing, and artificial intelligence.',
    specializations: [
      'Discrete Mathematics & Graph Theory',
      'Design & Analysis of Algorithms',
      'Numerical Methods & Scientific Computing',
      'Financial Mathematics & Quantitative Finance',
      'Artificial Intelligence & Machine Learning',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Master of Science (M.Sc.) in Mathematics & Scientific Computing',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    intake: 25,
    description:
      'Postgraduate program designed to bridge pure mathematical abstractions with real-world computational implementations and scientific modeling.',
    specializations: [
      'Real & Complex Analysis',
      'Abstract & Linear Algebra',
      'Computational Fluid Dynamics',
      'Optimization Techniques & Operations Research',
      'Probability & Stochastic Processes',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Doctor of Philosophy (Ph.D.) in Mathematics & Computing',
    level: 'Doctoral Research',
    duration: '3 - 5 Years',
    intake: 'As per vacancy',
    description:
      'Advanced doctoral degree in fluid mechanics, magnetohydrodynamics, fixed point theory, thermoelasticity, and scientific machine learning.',
    specializations: [
      'Magnetohydrodynamics & Plasma Dynamics',
      'Functional Analysis & Operator Theory',
      'Thermoelasticity & Wave Propagation',
      'Fractional Calculus & Optimization',
    ],
    syllabusLink: '/academics/doctoral-ordinances',
  },
];

export default function MNCProgrammesPage() {
  return (
    <DepartmentLayout dept={mncMeta} deptSlug="mnc">
      <DepartmentProgrammesView departmentName="Mathematics & Scientific Computing" programmes={mncProgrammes} />
    </DepartmentLayout>
  );
}