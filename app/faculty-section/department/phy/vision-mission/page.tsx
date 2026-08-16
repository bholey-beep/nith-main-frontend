'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentVisionMissionView from '../../_components/DepartmentVisionMissionView';

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

const phyVisionMission = {
  vision:
    'To be recognized internationally for excellence in fundamental physics, photonics innovations, quantum materials research, and pedagogical distinction.',
  mission: [
    'To impart profound conceptual understanding and experimental mastery in physical sciences across undergraduate, postgraduate, and doctoral studies.',
    'To advance frontier research in condensed matter physics, photonics, nuclear science, and functional nanodevices.',
    'To inspire scientific temperament, critical inquiry, and ethical professionalism in aspiring physicists and engineers.',
    'To foster collaborative research partnerships with national laboratories (DAE, ISRO, DRDO) and international academic bodies.',
  ],
  peos: [
    {
      title: 'PEO-1: Core Physical Science Knowledge',
      desc: 'Graduates will apply deep principles of quantum mechanics, electrodynamics, and solid-state physics to solve complex scientific challenges.',
    },
    {
      title: 'PEO-2: Research & Experimental Rigor',
      desc: 'Graduates will demonstrate competence in sophisticated experimental instrumentation, optical characterization, and computational physics.',
    },
    {
      title: 'PEO-3: Scientific Integrity & Leadership',
      desc: 'Graduates will practice science with high ethical standards, intellectual honesty, and leadership in academic and research settings.',
    },
  ],
  psos: [
    {
      title: 'PSO-1: Experimental & Characterization Proficiency',
      desc: 'Ability to operate cryogenic, optical, and semiconductor characterization tools to investigate physical properties of novel materials.',
    },
    {
      title: 'PSO-2: Theoretical & Computational Physics',
      desc: 'Capability to formulate mathematical models and execute computational simulations for condensed matter, photonics, and nuclear systems.',
    },
  ],
};

export default function PHYVisionMissionPage() {
  return (
    <DepartmentLayout dept={phyMeta} deptSlug="phy">
      <DepartmentVisionMissionView departmentName="Physics & Photonics Science" data={phyVisionMission} />
    </DepartmentLayout>
  );
}
