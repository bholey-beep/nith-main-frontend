'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentLabsView from '../../_components/DepartmentLabsView';

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

const mscLabs = [
  {
    name: 'Materials Characterization & Microscopy Lab',
    incharge: 'Prof. Ravi Kumar / Dr. Vishal Singh',
    location: 'MSE Block, 1st Floor, Room 102',
    capacity: 35,
    description:
      'State-of-the-art facility for microstructure examination, phase identification, sample polishing, and optical metallography.',
    equipment: [
      'Advanced Inverted Metallurgical Microscopes',
      'Automated Precision Diamond Saw Cutters',
      'Pneumatic Mounting Press & Disc Polishers',
      'Image Analysis & Grain Size Quantification Software',
    ],
  },
  {
    name: 'Mechanical Metallurgy & Testing Lab',
    incharge: 'Dr. Rita Maurya',
    location: 'MSE Block, Ground Floor, Room 004',
    capacity: 40,
    description:
      'Destructive and non-destructive mechanical evaluation laboratory for measuring tensile, compressive, fatigue, and hardness properties of structural alloys.',
    equipment: [
      'Computerized Universal Testing Machine (UTM - 100 kN)',
      'Vickers Microhardness & Rockwell Hardness Testers',
      'Charpy / Izod Impact Testing Machine',
      'Pin-on-Disc High-Temperature Tribometer',
    ],
  },
  {
    name: 'Corrosion & Surface Engineering Lab',
    incharge: 'Dr. Raj Bahadur Singh',
    location: 'MSE Block, 2nd Floor, Room 205',
    capacity: 30,
    description:
      'Electrochemical corrosion kinetics analysis, salt spray environmental testing, and functional protective coating evaluations.',
    equipment: [
      'Electrochemical Impedance Spectroscopy (EIS) Workstation',
      'Potentiostat / Galvanostat Multi-Channel System',
      'Salt Spray Corrosion Chamber',
      'Electroless & Electroplating Deposition Units',
    ],
  },
  {
    name: 'Advanced Sintering & Heat Treatment Lab',
    incharge: 'Dr. Vikram Verma',
    location: 'MSE Block, Ground Floor, Room 008',
    capacity: 30,
    description:
      'Controlled atmosphere furnaces for annealing, quenching, sintering of ceramic components, and thermal barrier processing.',
    equipment: [
      'High-Temperature Muffle Furnaces (up to 1600°C)',
      'Vacuum Tubular Annealing Furnace with Inert Gas Purging',
      'Spark Plasma Sintering Access Units',
      'Precision Electronic Analytical Balances',
    ],
  },
];

export default function MSCLabsPage() {
  return (
    <DepartmentLayout dept={mscMeta} deptSlug="msc">
      <DepartmentLabsView departmentName="Materials Science & Engineering" labs={mscLabs} />
    </DepartmentLayout>
  );
}
