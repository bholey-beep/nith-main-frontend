'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentPublicationsView from '../../_components/DepartmentPublicationsView';

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

const phyPublications = [
  {
    title: 'Temperature-Dependent Barrier Inhomogeneities and Current Transport Mechanisms in Metal/Semiconductor Schottky Diodes',
    authors: 'Dr. Subhash Chand, et al.',
    journal: 'Journal of Applied Physics (AIP Publishing)',
    year: '2024',
    doi: '10.1063/5.0191820',
    type: 'Journal',
    impactFactor: '3.2',
  },
  {
    title: 'Electrochemical Hydrogen Evolution Activity of 2D Transition Metal Dichalcogenide Heterostructures',
    authors: 'Dr. Sandeep Sharma, et al.',
    journal: 'ACS Applied Energy Materials',
    year: '2024',
    doi: '10.1021/acsaem.3c02910',
    type: 'Journal',
    impactFactor: '6.4',
  },
  {
    title: 'Enhanced Electro-Optic Response and Dielectric Properties in Ferroelectric Liquid Crystals Doped with Quantum Dots',
    authors: 'Dr. Arvind K. Gathania, Dr. V.S. Rangra',
    journal: 'Liquid Crystals (Taylor & Francis)',
    year: '2023',
    doi: '10.1080/02678292.2023.2201948',
    type: 'Journal',
    impactFactor: '3.5',
  },
  {
    title: 'Relativistic Heavy-Ion Collisions and Quark-Gluon Plasma Signatures at LHC and RHIC Energies',
    authors: 'Dr. Kuldeep Kumar Sharma, Dr. Rajesh Kumar',
    journal: 'Physical Review C (American Physical Society)',
    year: '2023',
    doi: '10.1103/PhysRevC.107.054908',
    type: 'Journal',
    impactFactor: '3.8',
  },
];

export default function PHYResearchPage() {
  return (
    <DepartmentLayout dept={phyMeta} deptSlug="phy">
      <DepartmentPublicationsView departmentName="Physics & Photonics Science" publications={phyPublications} />
    </DepartmentLayout>
  );
}
