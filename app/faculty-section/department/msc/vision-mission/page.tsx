'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentVisionMissionView from '../../_components/DepartmentVisionMissionView';

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

const mscVisionMission = {
  vision:
    'To achieve excellence in materials education, sustainable metallurgy, and translational materials research for the technological advancement of industry and society.',
  mission: [
    'To impart world-class education in materials science and metallurgical engineering through modern experiential learning curricula.',
    'To advance fundamental and applied research in high-performance structural alloys, energy materials, functional ceramics, and composites.',
    'To nurture skilled materials engineers with strong ethical principles, creative thinking, and sustainability awareness.',
    'To establish collaborative networks with metallurgical industries, defense labs, and international research universities.',
  ],
  peos: [
    {
      title: 'PEO-1: Materials Engineering Expertise',
      desc: 'Graduates will apply core knowledge of materials synthesis, characterization, and processing to solve engineering challenges.',
    },
    {
      title: 'PEO-2: Innovation & Higher Studies',
      desc: 'Graduates will succeed in advanced technical research, product development, and academic pursuits in materials science.',
    },
    {
      title: 'PEO-3: Professional Integrity & Sustainability',
      desc: 'Graduates will practice engineering with ethical responsibility, environmental consciousness, and leadership.',
    },
  ],
  psos: [
    {
      title: 'PSO-1: Structure-Property Correlation',
      desc: 'Ability to analyze and establish relationships between atomic structure, microstructural evolution, processing parameters, and bulk properties.',
    },
    {
      title: 'PSO-2: Material Selection & Failure Analysis',
      desc: 'Proficiency to select optimal engineering materials and apply diagnostic techniques for industrial component life extension and failure prevention.',
    },
  ],
};

export default function MSCVisionMissionPage() {
  return (
    <DepartmentLayout dept={mscMeta} deptSlug="msc">
      <DepartmentVisionMissionView departmentName="Materials Science & Engineering" data={mscVisionMission} />
    </DepartmentLayout>
  );
}
