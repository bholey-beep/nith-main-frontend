'use client';

import React from 'react';
import DepartmentLayout from '../_components/DepartmentLayout';
import DepartmentOverviewView from '../_components/DepartmentOverviewView';

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

const mncOverviewData = {
  departmentName: 'Department of Mathematics & Scientific Computing',
  departmentCode: 'M&SC',
  deptSlug: 'mnc',
  aboutText: [
    'The Department of Mathematics & Scientific Computing at NIT Hamirpur has been fostering rigorous analytical thinking and mathematical foundations since 1986.',
    'The department provides world-class undergraduate, postgraduate (B.Tech in Mathematics & Computing, M.Sc. in Mathematics and Scientific Computing), and doctoral (Ph.D.) degree programmes. The curriculum seamlessly combines pure mathematics, statistical data modeling, financial mathematics, numerical analysis, algorithmic computing, and machine learning.',
    'With a dedicated Scientific Computing and High Performance Analytics Laboratory equipped with MATLAB, Mathematica, Python, and R computing environments, our scholars produce globally cited research in fluid mechanics, fractional calculus, cryptography, and optimization.',
  ],
  hodMessage: {
    name: 'Prof. Yogeshver Dutt Sharma',
    designation: 'Head of Department & Professor',
    quote:
      'Mathematics is the foundational language of modern science and artificial intelligence. We prepare students with deep theoretical rigor and computational skill sets to excel in technology, finance, and advanced scientific research.',
  },
  focusAreas: [
    'Scientific Computing & Numerical Modeling',
    'Financial Mathematics & Algorithmic Trading',
    'Cryptography, Coding Theory & Information Security',
    'Fluid Dynamics & Magnetohydrodynamics (MHD)',
    'Fractional Calculus & Fixed Point Theory',
    'Machine Learning & Statistical Data Analysis',
  ],
  programmes: [
    {
      name: 'B.Tech in Mathematics & Computing',
      level: 'Undergraduate (4 Years)',
      desc: 'High-demand hybrid degree blending rigorous mathematics, algorithms, AI, and computer science.',
    },
    {
      name: 'M.Sc. in Mathematics & Scientific Computing',
      level: 'Postgraduate (2 Years)',
      desc: 'Advanced postgraduate coursework in analysis, algebra, computational methods, and data modeling.',
    },
    {
      name: 'Doctor of Philosophy (Ph.D.)',
      level: 'Doctoral (3-5 Years)',
      desc: 'Specialized doctoral research in thermoelasticity, nonlinear fluid stability, and applied functional analysis.',
    },
  ],
  highlights: [
    {
      stat: '410+',
      title: 'SCI Research Articles',
      desc: 'Published in premier international journals across applied mathematics and computational mechanics.',
    },
    {
      stat: 'M&C',
      title: 'High Tech Placements',
      desc: 'Graduates hired into premier quantitative finance, software architecture, and AI research roles.',
    },
    {
      stat: '6+',
      title: 'Computing Labs',
      desc: 'Equipped with MATLAB server licenses, GPU accelerators, and simulation suites.',
    },
  ],
};

export default function MNCPage() {
  return (
    <DepartmentLayout dept={mncMeta} deptSlug="mnc">
      <DepartmentOverviewView data={mncOverviewData} />
    </DepartmentLayout>
  );
}