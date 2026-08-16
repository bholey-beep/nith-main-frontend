'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentLabsView from '../../_components/DepartmentLabsView';

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

const phyLabs = [
  {
    name: 'Advanced Condensed Matter & Nanotechnology Research Lab',
    incharge: 'Dr. Subhash Chand / Dr. Sandeep Sharma',
    location: 'Physics Block, 1st Floor, Room 104',
    capacity: 35,
    description:
      'Cryogenic and room temperature electrical transport characterization, Schottky diode barrier height studies, and metal-oxide semiconductor sensors.',
    equipment: [
      'Closed-Cycle Liquid Helium Cryostat (10K - 400K)',
      'Keithley 4200-SCS Semiconductor Characterization System',
      'High Vacuum Thermal Evaporation Coater',
      'Precision Gas Sensing Chamber with Mass Flow Controllers',
    ],
  },
  {
    name: 'Laser Optics & Photonics Research Lab',
    incharge: 'Dr. Arvind K. Gathania',
    location: 'Physics Block, Ground Floor, Room 006',
    capacity: 30,
    description:
      'Optical spectroscopy, laser interferometry, refractive index profiling, and nonlinear optical properties of liquid crystal nanocomposites.',
    equipment: [
      'He-Ne & Diode-Pumped Solid-State (DPSS) Lasers',
      'Polarizing Optical Microscope (POM) with Hot-Stage',
      'Fiber Optic Spectrometer & Power Meters',
      'Optical Breadboards with Vibration Isolation',
    ],
  },
  {
    name: 'Thin Film & Sputtering Deposition Lab',
    incharge: 'Dr. Ashok Kumar',
    location: 'Physics Block, 2nd Floor, Room 202',
    capacity: 30,
    description:
      'Preparation of 2D layered materials, transparent conducting oxides, and magnetic multilayer thin films via physical vapor deposition.',
    equipment: [
      'Dual-Target RF/DC Magnetron Sputtering Unit',
      'Spin Coater & Dip Coating Systems',
      'Four-Probe Resistivity Measurement Rig',
      'Spectroscopic Ellipsometer',
    ],
  },
  {
    name: 'Nuclear & High Energy Physics Simulation Lab',
    incharge: 'Dr. Kuldeep Kumar Sharma / Dr. Rajesh Kumar',
    location: 'Physics Block, 1st Floor, Room 108',
    capacity: 40,
    description:
      'Computational modeling of relativistic heavy-ion collisions, nuclear fusion-fission dynamics, and particle detector event simulations.',
    equipment: [
      'ROOT / GEANT4 Nuclear Simulation Toolkit Clusters',
      'Gamma-Ray & Alpha Spectrometers with MCA',
      'GM Counter & Scintillation Detector Rigs',
      'High Performance Linux Compute Workstations',
    ],
  },
];

export default function PHYLabsPage() {
  return (
    <DepartmentLayout dept={phyMeta} deptSlug="phy">
      <DepartmentLabsView departmentName="Physics & Photonics Science" labs={phyLabs} />
    </DepartmentLayout>
  );
}
