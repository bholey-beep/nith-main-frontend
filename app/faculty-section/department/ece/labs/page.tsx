'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentLabsView from '../../_components/DepartmentLabsView';

const eceMeta = {
  code: 'ECE',
  name: 'Department of Electronics & Communication Engineering',
  nameHindi: 'इलेक्ट्रॉनिक्स एवं संचार इंजीनियरिंग विभाग',
  established: '1988',
  stats: {
    facultyCount: '22+',
    labsCount: '10+',
    programmesCount: '4',
    publicationsCount: '480+',
  },
};

const eceLabs = [
  {
    name: 'VLSI Design & CAD Automation Lab',
    incharge: 'Prof. Rajeevan Chandel / Dr. Gargi Khanna',
    location: 'ECE Block, 2nd Floor, Room 201',
    capacity: 40,
    description:
      'Premier electronic design automation center equipped with Cadence Virtuoso, Synopsys Custom Compiler, and Mentor Graphics for sub-micron ASIC design.',
    equipment: [
      'Cadence EDA Suite (Full University Bundle)',
      'Synopsys Design Compiler & IC Compiler',
      'Xilinx Vivado & Altera Quartus Toolchains',
      'High-End 64-bit Linux Workstation Grid',
    ],
  },
  {
    name: 'Advanced Wireless Communication & 5G Testbed Lab',
    incharge: 'Dr. Surender Soni',
    location: 'ECE Block, 1st Floor, Room 105',
    capacity: 35,
    description:
      'Research facility for next-generation baseband processing, MIMO antennas, software-defined radio (SDR) platforms, and channel sounding.',
    equipment: [
      'USRP B210 / X310 Software Defined Radio Units',
      'Rohde & Schwarz Spectrum Analyzers (up to 26.5 GHz)',
      'Vector Signal Generators (VSG)',
      'Ansys HFSS & CST Microwave Studio',
    ],
  },
  {
    name: 'Embedded Systems & Robotics Lab',
    incharge: 'Dr. Amit Kaushik',
    location: 'ECE Block, Ground Floor, Room 004',
    capacity: 40,
    description:
      'Hands-on experimental facility for ARM Cortex microcontrollers, FPGA prototyping, automotive ECUs, and real-time operating systems (RTOS).',
    equipment: [
      'ARM Keil & STM32 Discovery Boards',
      'Xilinx Zynq-7000 SoC Evaluation Kits',
      'Mixed Signal Digital Storage Oscilloscopes (MSO)',
      'Logic State Analyzers & Function Generators',
    ],
  },
  {
    name: 'Fiber Optics & Photonics Research Lab',
    incharge: 'Dr. G.R. Begh',
    location: 'ECE Block, 3rd Floor, Room 302',
    capacity: 30,
    description:
      'Experimental optical communications facility focusing on DWDM optical links, optical time-domain reflectometry, and photonic crystal fibers.',
    equipment: [
      'Optical Spectrum Analyzer (OSA)',
      'Tunable Laser Source & Power Meters',
      'Fusion Splicing Machine & OTDR Sets',
      'OptiSystem & RSoft Photonics CAD Software',
    ],
  },
  {
    name: 'Analog & Digital Signal Processing Lab',
    incharge: 'Dr. Philemon Daniel',
    location: 'ECE Block, 1st Floor, Room 102',
    capacity: 50,
    description:
      'Undergraduate and postgraduate laboratory for filter design, spectral estimation, biomedical ECG/EEG processing, and voice codecs.',
    equipment: [
      'Texas Instruments TMS320C6713 DSP Starter Kits',
      'MATLAB with Signal Processing & Image Toolboxes',
      'Arbitrary Waveform Synthesizers',
      'Digital LCR Meters & Power Supplies',
    ],
  },
];

export default function ECELabsPage() {
  return (
    <DepartmentLayout dept={eceMeta} deptSlug="ece">
      <DepartmentLabsView departmentName="Electronics & Communication Engineering" labs={eceLabs} />
    </DepartmentLayout>
  );
}