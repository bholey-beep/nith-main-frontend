'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentFacultyView from '../../_components/DepartmentFacultyView';

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

const eceFallbackFaculty = [
  {
    title: 'Professors',
    featured: true,
    members: [
      {
        name: 'Prof. (Mrs.) Rajeevan Chandel',
        designation: 'Professor',
        interests: 'Low Power VLSI Design, Modeling & Simulation, Semiconductor Devices',
        email: 'rchandel@nith.ac.in',
        qualification: 'Ph.D. (IIT Roorkee)',
      },
    ],
  },
  {
    title: 'Associate Professors',
    members: [
      {
        name: 'Dr. Gargi Khanna',
        designation: 'HoD & Associate Professor',
        interests: 'Low Power VLSI Design, MEMS Design, Carbon Nanotube Interconnects',
        email: 'gargi@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Surender Soni',
        designation: 'Associate Professor',
        interests: 'Communication Systems, Wireless Sensor Networks, MIMO Systems',
        email: 'soni@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Ashok Kumar',
        designation: 'Associate Professor',
        interests: 'Wireless Communication and Networking, Cooperative Communications',
        email: 'ashok@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Ashwani Rana',
        designation: 'Associate Professor',
        interests: 'VLSI Design, Nano-electronics, Microstrip Patch Antennas',
        email: 'ashwani@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Philemon Daniel',
        designation: 'Associate Professor',
        interests: 'Signal Processing, Biomedical Instrumentation, Deep Learning',
        email: 'philemon@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
  {
    title: 'Assistant Professors',
    members: [
      {
        name: 'Dr. G.R. Begh',
        designation: 'Assistant Professor',
        interests: 'Optical Communication, Photonics, Quantum Electronics',
        email: 'grbegh@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Sandeep Kumar Soni',
        designation: 'Assistant Professor',
        interests: 'Wireless Communication, Massive MIMO, Cognitive Radio',
        email: 'sksoni@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Amit Kaushik',
        designation: 'Assistant Professor',
        interests: 'Digital System Design, FPGA Prototyping, Embedded Machine Learning',
        email: 'amitk@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
];

export default function ECEFacultyPage() {
  return (
    <DepartmentLayout dept={eceMeta} deptSlug="ece">
      <DepartmentFacultyView departmentCode="ece" fallbackGroups={eceFallbackFaculty} />
    </DepartmentLayout>
  );
}