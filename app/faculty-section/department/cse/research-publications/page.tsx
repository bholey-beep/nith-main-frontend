'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentPublicationsView from '../../_components/DepartmentPublicationsView';

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

const csePublications = [
  {
    title: 'Adaptive Resource Scheduling in Edge-Cloud Computing Environments Using Deep Reinforcement Learning',
    authors: 'Dr. Pardeep Singh, Dr. Basant Subba, et al.',
    journal: 'IEEE Transactions on Cloud Computing',
    year: '2025',
    doi: '10.1109/TCC.2025.1048291',
    type: 'Journal',
    impactFactor: '6.5',
  },
  {
    title: 'Robust Intrusion Detection in Industrial IoT via Hybrid Convolutional-Transformer Architectures',
    authors: 'Dr. Basant Subba, Dr. Naveen Chauhan',
    journal: 'ACM Transactions on Cyber-Physical Systems',
    year: '2024',
    doi: '10.1145/3648201',
    type: 'Journal',
    impactFactor: '4.8',
  },
  {
    title: 'Privacy-Preserving Federated Learning Framework for Cross-Silo Healthcare Data Collaboration',
    authors: 'Dr. Kamlesh Dutta, Dr. Divakar Yadav',
    journal: 'IEEE Internet of Things Journal',
    year: '2024',
    doi: '10.1109/JIOT.2024.3391024',
    type: 'Journal',
    impactFactor: '10.6',
  },
  {
    title: 'Energy-Efficient Clustering and Routing Protocols for Ultra-Dense Wireless Sensor Testbeds',
    authors: 'Dr. T. P. Sharma, Prof. Lalit Kumar Awasthi',
    journal: 'Ad Hoc Networks (Elsevier)',
    year: '2023',
    doi: '10.1016/j.adhoc.2023.103192',
    type: 'Journal',
    impactFactor: '4.4',
  },
  {
    title: 'Secure Blockchain-Enabled Verification System for Academic Credential Repositories',
    authors: 'Dr. Siddhartha Chauhan, et al.',
    journal: 'IEEE International Conference on Computer Communications (INFOCOM)',
    year: '2024',
    type: 'Conference',
  },
  {
    title: 'Intelligent Traffic Signal Coordination Using Distributed Multi-Agent Graph Neural Networks',
    authors: 'Dr. Naveen Chauhan, Dr. Vijay Kumar',
    journal: 'IEEE International Conference on Smart Grid Communications',
    year: '2023',
    type: 'Conference',
  },
  {
    title: 'System and Method for Tamper-Proof Cryptographic Storage on Decentralized Peer-to-Peer Networks',
    authors: 'Prof. Lalit Kumar Awasthi, Dr. Basant Subba',
    journal: 'Indian Patent Office (Application No. 202311048291 A)',
    year: '2023',
    type: 'Patent',
  },
];

export default function CSEResearchPage() {
  return (
    <DepartmentLayout dept={cseMeta} deptSlug="cse">
      <DepartmentPublicationsView departmentName="Computer Science & Engineering" publications={csePublications} />
    </DepartmentLayout>
  );
}