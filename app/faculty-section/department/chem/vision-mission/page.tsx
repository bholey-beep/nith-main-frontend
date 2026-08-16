'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentVisionMissionView from '../../_components/DepartmentVisionMissionView';

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

const chemVisionMission = {
  vision:
    'To emerge as a prominent hub for education and research in chemical sciences, green synthesis, and functional materials capable of addressing sustainable energy and environmental challenges.',
  mission: [
    'To provide quality education in fundamental and applied chemical sciences to undergraduate, postgraduate, and doctoral students.',
    'To conduct high-impact interdisciplinary research in clean energy materials, polymer composites, and biophysical chemistry.',
    'To establish state-of-the-art analytical infrastructure and promote collaborative partnerships with leading research institutions and chemical industries.',
    'To foster scientific curiosity, environmental responsibility, and societal engagement among students.',
  ],
  peos: [
    {
      title: 'PEO-1: Molecular & Materials Mastery',
      desc: 'Graduates will demonstrate comprehensive knowledge of synthetic, analytical, and applied chemistry.',
    },
    {
      title: 'PEO-2: Sustainable Research Innovations',
      desc: 'Graduates will contribute to green chemical processes, energy storage, and environmental solutions.',
    },
    {
      title: 'PEO-3: Scientific Integrity & Leadership',
      desc: 'Graduates will adhere to rigorous laboratory safety, environmental ethics, and effective communication.',
    },
  ],
  psos: [
    {
      title: 'PSO-1: Chemical Synthesis & Characterization',
      desc: 'Ability to design and synthesize novel chemical entities and characterize their structural and functional properties using modern spectroscopic techniques.',
    },
    {
      title: 'PSO-2: Energy & Environmental Applications',
      desc: 'Capacity to apply chemical principles to develop sustainable catalysts, energy materials, and environmental remediation technologies.',
    },
  ],
};

export default function ChemVisionMissionPage() {
  return (
    <DepartmentLayout dept={chemMeta} deptSlug="chem">
      <DepartmentVisionMissionView departmentName="Chemical Sciences & Engineering" data={chemVisionMission} />
    </DepartmentLayout>
  );
}