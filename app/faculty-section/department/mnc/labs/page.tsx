'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentLabsView from '../../_components/DepartmentLabsView';

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

const mncLabs = [
  {
    name: 'Scientific Computing & Numerical Simulation Lab',
    incharge: 'Prof. Sunil / Dr. Rifaqat Ali',
    location: 'M&SC Block, 1st Floor, Room 102',
    capacity: 45,
    description:
      'Advanced computing facility dedicated to computational fluid dynamics (CFD), magnetohydrodynamics simulation, nonlinear differential systems, and financial risk models.',
    equipment: [
      'Intel Xeon Multicore Computational Nodes',
      'MATLAB with Optimization, PDE & Wavelet Toolboxes',
      'Wolfram Mathematica Campus Edition',
      'COMSOL Multiphysics Modeling Suites',
    ],
  },
  {
    name: 'High Performance Data Analytics & Machine Learning Lab',
    incharge: 'Dr. Ramesh Kumar Vats',
    location: 'M&SC Block, 2nd Floor, Room 204',
    capacity: 40,
    description:
      'High-throughput analytics facility for statistical learning, financial algorithmic testing, graph theory analytics, and scientific computing in Python/R.',
    equipment: [
      'GPU Accelerated Desktop Workstations',
      'RStudio Server Pro Enterprise Setup',
      'Python Anaconda Scientific Toolchains',
      'JupyterHub Multi-User Server',
    ],
  },
  {
    name: 'Mathematical Modeling & Applied Optimization Lab',
    incharge: 'Prof. Yogeshver Dutt Sharma',
    location: 'M&SC Block, Ground Floor, Room 004',
    capacity: 35,
    description:
      'Laboratory for research in continuum mechanics, thermal convection modeling, thermoelastic wave propagation, and operations research.',
    equipment: [
      'High-End Desktop Workstations',
      'GAMS & CPLEX Mathematical Solvers',
      'LaTeX Scientific Typesetting Cluster',
      'High-Speed Network Uplinks',
    ],
  },
];

export default function MNCLabsPage() {
  return (
    <DepartmentLayout dept={mncMeta} deptSlug="mnc">
      <DepartmentLabsView departmentName="Mathematics & Scientific Computing" labs={mncLabs} />
    </DepartmentLayout>
  );
}
