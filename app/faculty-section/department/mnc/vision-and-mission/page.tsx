'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentVisionMissionView from '../../_components/DepartmentVisionMissionView';

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

const mncVisionMission = {
  vision:
    'To achieve global recognition in mathematical education, computational science, and interdisciplinary research, developing scholars with deep mathematical intuition and high computational capability.',
  mission: [
    'To deliver world-class curricula in pure, applied, and computational mathematics across undergraduate, postgraduate, and doctoral levels.',
    'To pioneer impactful research in fluid mechanics, mathematical modeling, scientific computing, optimization, and data analytics.',
    'To train students with solid analytical reasoning, problem formulation skills, and ethical scientific values.',
    'To foster collaborative research with premier science and engineering institutions nationally and internationally.',
  ],
  peos: [
    {
      title: 'PEO-1: Mathematical Foundations',
      desc: 'Graduates will formulate and solve complex scientific, engineering, and financial problems using advanced mathematical frameworks.',
    },
    {
      title: 'PEO-2: Computational Leadership',
      desc: 'Graduates will design and implement robust numerical algorithms, software tools, and data-driven models.',
    },
    {
      title: 'PEO-3: Continuous Learning & Ethics',
      desc: 'Graduates will pursue academic excellence, research contributions, and professional ethics across interdisciplinary careers.',
    },
  ],
  psos: [
    {
      title: 'PSO-1: Algorithmic & Numerical Competence',
      desc: 'Capability to develop, analyze, and optimize algorithms for high-dimensional scientific simulations and data modeling.',
    },
    {
      title: 'PSO-2: Mathematical Applications',
      desc: 'Proficiency to apply mathematical theory to machine learning, fluid systems, cryptography, and quantitative finance.',
    },
  ],
};

export default function MNCVisionMissionPage() {
  return (
    <DepartmentLayout dept={mncMeta} deptSlug="mnc">
      <DepartmentVisionMissionView departmentName="Mathematics & Scientific Computing" data={mncVisionMission} />
    </DepartmentLayout>
  );
}