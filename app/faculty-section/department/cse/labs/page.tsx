'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentLabsView from '../../_components/DepartmentLabsView';

const cseMeta = {
  code: 'CSE',
  name: 'Department of Computer Science & Engineering',
  nameHindi: 'कंप्यूटर विज्ञान एवं इंजीनियरिंग विभाग',
  established: '1989',
  stats: {
    facultyCount: '24+',
    labsCount: '12+',
    programmesCount: '4',
    publicationsCount: '520+',
  },
};

const cseLabs = [
  {
    name: 'Artificial Intelligence & Deep Learning Lab',
    incharge: 'Dr. Kamlesh Dutta',
    location: 'CSE Block, 2nd Floor, Room 204',
    capacity: 45,
    description:
      'High-performance GPU computing facility dedicated to research in Deep Neural Networks, Natural Language Processing, and Computer Vision.',
    equipment: [
      'NVIDIA A100 / RTX 4090 GPU Workstations',
      'CUDA Development Toolkit',
      'TensorFlow & PyTorch Server Clusters',
      'High-Resolution Vision Sensors',
    ],
  },
  {
    name: 'Network Security & Cryptography Lab',
    incharge: 'Dr. Basant Subba',
    location: 'CSE Block, 1st Floor, Room 108',
    capacity: 40,
    description:
      'Advanced testbed for investigating intrusion detection systems, malware analysis, blockchain protocols, and network resilience.',
    equipment: [
      'Cisco Enterprise Routing & Switching Racks',
      'Network Packet Analyzers & Sniffers',
      'Hardware Security Modules (HSMs)',
      'Isolated Cyber Sandbox Environments',
    ],
  },
  {
    name: 'Cloud Computing & Distributed Systems Lab',
    incharge: 'Dr. Pardeep Singh',
    location: 'CSE Block, Ground Floor, Room 012',
    capacity: 50,
    description:
      'Scalable cloud infrastructure supporting containerized virtualization, microservices orchestration, and edge computing experiments.',
    equipment: [
      'Dell PowerEdge Rack Servers',
      'Kubernetes & OpenStack Testbed',
      'High-Throughput Storage Area Network (SAN)',
      'Fiber Optic 10Gbps Uplinks',
    ],
  },
  {
    name: 'Internet of Things (IoT) & Embedded Systems Lab',
    incharge: 'Dr. Naveen Chauhan',
    location: 'CSE Block, 2nd Floor, Room 210',
    capacity: 35,
    description:
      'Hardware prototyping lab equipped with microcontroller development boards, sensor kits, wireless transceivers, and smart city test units.',
    equipment: [
      'Raspberry Pi 4 & Jetson Nano Units',
      'ESP32 / Arduino Sensing Modules',
      'Zigbee / LoRaWAN Gateways',
      'Logic Analyzers & Digital Oscilloscopes',
    ],
  },
  {
    name: 'Software Engineering & Database Systems Lab',
    incharge: 'Dr. Siddhartha Chauhan',
    location: 'CSE Block, 1st Floor, Room 102',
    capacity: 60,
    description:
      'General purpose and advanced computing laboratory for undergraduate software lifecycle development, database management, and web engineering.',
    equipment: [
      '60x Intel Core i7 Desktop Terminals',
      'Oracle & PostgreSQL Enterprise Database Servers',
      'Automated Testing Frameworks',
      'Gigabit Ethernet LAN',
    ],
  },
  {
    name: 'High Performance Computing (HPC) Center',
    incharge: 'Prof. Lalit Kumar Awasthi',
    location: 'Central Computer Center, Annex-1',
    capacity: 30,
    description:
      'Supercomputing and multi-node cluster resource for computational physics, simulation modeling, and large-scale parallel processing.',
    equipment: [
      'Multi-Core Xeon Server Nodes',
      'Infiniband Low-Latency Interconnects',
      'OpenMPI & OpenMP Parallel Environments',
      'Central Climate Control & Redundant UPS',
    ],
  },
];

export default function CSELabsPage() {
  return (
    <DepartmentLayout dept={cseMeta} deptSlug="cse">
      <DepartmentLabsView departmentName="Computer Science & Engineering" labs={cseLabs} />
    </DepartmentLayout>
  );
}
