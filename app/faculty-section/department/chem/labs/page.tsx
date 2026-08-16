'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentLabsView from '../../_components/DepartmentLabsView';

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

const chemLabs = [
  {
    name: 'Advanced Materials & Nanotechnology Research Lab',
    incharge: 'Dr. Jai Prakash',
    location: 'Chemistry Block, 1st Floor, Room 104',
    capacity: 30,
    description:
      'Synthesis and characterization of nanostructured metal oxides, quantum dots, and hybrid functional materials for battery storage and green hydrogen production.',
    equipment: [
      'Hydrothermal Autoclave Reactors',
      'High-Temperature Tubular Furnace (1400°C)',
      'UV-Visible NIR Spectrophotometer',
      'Electrochemical Workstation with Impedance Analyzer',
    ],
  },
  {
    name: 'Bioorganic & Biophysical Chemistry Lab',
    incharge: 'Dr. Kalyan Sundar Ghosh',
    location: 'Chemistry Block, 2nd Floor, Room 202',
    capacity: 25,
    description:
      'Investigation of biological macromolecules, protein folding dynamics, drug-protein interactions, and targeted fluorophores.',
    equipment: [
      'Fluorescence Spectrofluorometer',
      'Circular Dichroism (CD) Spectrometer',
      'Refrigerated Centrifuges & Incubators',
      'Gel Electrophoresis Units',
    ],
  },
  {
    name: 'Polymer & Organic Synthesis Lab',
    incharge: 'Dr. Bharti Gaur / Dr. Pamita Awasthi',
    location: 'Chemistry Block, Ground Floor, Room 003',
    capacity: 40,
    description:
      'Synthetic organic transformations, green polymerization techniques, biodegradable composite fabrication, and solvent extraction.',
    equipment: [
      'Rotary Evaporators with Vacuum Controllers',
      'FT-IR Spectrometer (Attenuated Total Reflectance)',
      'Digital Melting Point & Refractometer Units',
      'Fume Hoods with Gas Scrubber Systems',
    ],
  },
  {
    name: 'Analytical & Environmental Chemistry Lab',
    incharge: 'Dr. Raj Kaushal',
    location: 'Chemistry Block, 1st Floor, Room 108',
    capacity: 45,
    description:
      'Water quality assessment, heavy metal remediation, flame atomic absorption spectroscopy, and chromatographic separation.',
    equipment: [
      'Atomic Absorption Spectrophotometer (AAS)',
      'High-Performance Liquid Chromatograph (HPLC)',
      'Digital Conductivity & pH Metrology Stations',
      'COD/BOD Digestion Apparatus',
    ],
  },
];

export default function ChemLabsPage() {
  return (
    <DepartmentLayout dept={chemMeta} deptSlug="chem">
      <DepartmentLabsView departmentName="Chemical Sciences & Engineering" labs={chemLabs} />
    </DepartmentLayout>
  );
}
