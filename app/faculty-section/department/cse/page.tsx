'use client';

import React from 'react';
import DepartmentLayout from '../_components/DepartmentLayout';
import DepartmentOverviewView from '../_components/DepartmentOverviewView';

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

const cseOverviewData = {
  departmentName: 'Department of Computer Science & Engineering',
  departmentCode: 'CSE',
  deptSlug: 'cse',
  aboutText: [
    'The Department of Computer Science & Engineering at NIT Hamirpur was established in 1989. It is recognized as one of the premier computing departments in Northern India, dedicated to producing top-tier software engineers, system architects, and scientific researchers.',
    'The department offers a robust undergraduate (B.Tech), integrated Dual Degree (B.Tech & M.Tech), postgraduate (M.Tech in CSE and AI), and doctoral (Ph.D.) programs. The curriculum is continuously revised in collaboration with industry leaders and premier global academia to keep pace with advancements in Artificial Intelligence, Cloud Computing, Cyber Security, and High-Performance Systems.',
    'With modern state-of-the-art computational infrastructure, high-speed fiber-optic connectivity, and specialized laboratories, students receive extensive hands-on research and development exposure.',
  ],
  hodMessage: {
    name: 'Dr. Siddhartha Chauhan',
    designation: 'Head of Department & Associate Professor',
    quote:
      'Welcome to the Department of Computer Science & Engineering. Our mission is to foster innovation, analytical rigor, and ethical computing leadership. We empower our students to solve complex societal problems through cutting-edge technology.',
  },
  focusAreas: [
    'Artificial Intelligence & Machine Learning',
    'Cyber Security & Cryptography',
    'Cloud & Distributed Computing',
    'Wireless Sensor Networks & IoT',
    'Computer Vision & Natural Language Processing',
    'Big Data Analytics & High Performance Computing',
  ],
  programmes: [
    {
      name: 'B.Tech in CSE',
      level: 'Undergraduate (4 Years)',
      desc: 'Rigorous foundation in algorithms, computer systems, software design, and emerging paradigms.',
    },
    {
      name: 'Dual Degree (B.Tech + M.Tech)',
      level: 'Integrated (5 Years)',
      desc: 'Accelerated 5-year integrated program combining core foundations with advanced specialization.',
    },
    {
      name: 'M.Tech in CSE / AI',
      level: 'Postgraduate (2 Years)',
      desc: 'Advanced research-driven master program focusing on distributed systems and intelligence.',
    },
    {
      name: 'Doctor of Philosophy (Ph.D.)',
      level: 'Doctoral (3-5 Years)',
      desc: 'Original, peer-reviewed doctoral research in theoretical and applied computational science.',
    },
  ],
  highlights: [
    {
      stat: '98%',
      title: 'Placement Record',
      desc: 'Highest recruitment rate with offers from leading global tech companies and research labs.',
    },
    {
      stat: '12+',
      title: 'Specialized Labs',
      desc: 'Equipped with High Performance GPU clusters, IoT testbeds, and Cloud sandboxes.',
    },
    {
      stat: '₹1.5Cr+',
      title: 'Sponsored Research',
      desc: 'Active funding from DST, MeitY, SERB, and industry collaborators.',
    },
  ],
};

export default function CSEPage() {
  return (
    <DepartmentLayout dept={cseMeta} deptSlug="cse">
      <DepartmentOverviewView data={cseOverviewData} />
    </DepartmentLayout>
  );
}
