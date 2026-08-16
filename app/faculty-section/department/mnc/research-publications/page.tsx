'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentPublicationsView from '../../_components/DepartmentPublicationsView';

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

const mncPublications = [
  {
    title: 'Nonlinear Thermal Convection in a Rotating Ferrofluid Layer Saturating a Porous Medium with Magnetic Field Dependent Viscosity',
    authors: 'Prof. Sunil, et al.',
    journal: 'Physics of Fluids (AIP Publishing)',
    year: '2024',
    doi: '10.1063/5.0182910',
    type: 'Journal',
    impactFactor: '4.6',
  },
  {
    title: 'Generalized Common Fixed Point Theorems in Extended b-Metric Spaces with Applications to Nonlinear Integral Equations',
    authors: 'Dr. Ramesh Kumar Vats, Dr. Suket Kumar',
    journal: 'Journal of Applied Mathematics and Computing (Springer)',
    year: '2024',
    doi: '10.1007/s12190-024-02019-1',
    type: 'Journal',
    impactFactor: '2.4',
  },
  {
    title: 'Wave Propagation Analysis in Microstretch Thermoelastic Medium under Dual-Phase-Lag Heat Transfer Model',
    authors: 'Dr. Pawan Kumar Sharma, Prof. Yogeshver Dutt Sharma',
    journal: 'Applied Mathematical Modelling (Elsevier)',
    year: '2023',
    doi: '10.1016/j.apm.2023.09.045',
    type: 'Journal',
    impactFactor: '5.0',
  },
  {
    title: 'Numerical Simulation of Double-Diffusive Convection in Viscoelastic Nanofluids under Variable Gravitational Fields',
    authors: 'Prof. Yogeshver Dutt Sharma, Dr. Rifaqat Ali',
    journal: 'International Journal of Heat and Mass Transfer',
    year: '2023',
    doi: '10.1016/j.ijheatmasstransfer.2023.124801',
    type: 'Journal',
    impactFactor: '5.2',
  },
];

export default function MNCResearchPage() {
  return (
    <DepartmentLayout dept={mncMeta} deptSlug="mnc">
      <DepartmentPublicationsView departmentName="Mathematics & Scientific Computing" publications={mncPublications} />
    </DepartmentLayout>
  );
}
