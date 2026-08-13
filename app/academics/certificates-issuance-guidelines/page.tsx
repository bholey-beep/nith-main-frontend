'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              Home
            </Link>
            <span>›</span>
            <span className="text-gray-400">Academics</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              Certificates &amp; Issuance Guidelines
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Certificates &amp; Issuance Guidelines
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Procedures for duplicate certificates, marks cards, migration
            certificates and fee details.
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Procedure for Issue of Duplicate Degree Certificate
          </h2>

          <div className="prose prose-slate text-gray-700">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                A student has to register a F.I.R. on loss of detailed Marks
                Card/Semester Grade Report and Degree.
              </li>
              <li>
                To advertise the loss in a National daily after waiting for 15
                days, apply with a copy of the newspaper cutting to:{' '}
                <a href="mailto:ar-acad@nith.ac.in" className="text-[#800000]">
                  ar-acad@nith.ac.in
                </a>{' '}
                with CC:{' '}
                <a
                  href="mailto:certificate-acad@nith.ac.in"
                  className="text-[#800000]"
                >
                  certificate-acad@nith.ac.in
                </a>
                .
              </li>
              <li>
                Submit an affidavit on Non-Judicial stamp paper of Rs.10/-.
              </li>
              <li>
                Deposit/remit requisite fee in cash to the Cashier or through
                Bank-Draft in favour of Registrar, NIT, Hamirpur (HP).
              </li>
              <li>
                Duplicate Degree certificate will be issued by the Registrar and
                in his/her absence by Director-cum-Chairman, Senate, NIT,
                Hamirpur (HP). The duplicate Degrees will be prepared as such as
                original and in place of signature Sd/- will be written on the
                Degree.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Procedure for Issue of Duplicate Detailed Marks Cards / Semester
            Grade Reports
          </h2>
          <div className="prose prose-slate text-gray-700">
            <p>
              These will be issued by the Academic Section on submission of copy
              of F.I.R. in case of loss of certificate and remittance of payment
              for the purpose by the concerned student. The requester may apply
              to:{' '}
              <a href="mailto:ar-acad@nith.ac.in" className="text-[#800000]">
                ar-acad@nith.ac.in
              </a>{' '}
              with CC:{' '}
              <a
                href="mailto:certificate-acad@nith.ac.in"
                className="text-[#800000]"
              >
                certificate-acad@nith.ac.in
              </a>
              .
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Procedure for Issue of Migration Certificate
          </h2>
          <div className="prose prose-slate text-gray-700">
            <p>
              Migration certificate will be issued by the Academic Section after
              giving an application and requisite fee for the purpose by the
              concerned student. The requester may apply to:{' '}
              <a href="mailto:ar-acad@nith.ac.in" className="text-[#800000]">
                ar-acad@nith.ac.in
              </a>{' '}
              with CC:{' '}
              <a
                href="mailto:certificate-acad@nith.ac.in"
                className="text-[#800000]"
              >
                certificate-acad@nith.ac.in
              </a>
              .
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Charges for Issue of Documents
          </h2>

          <table className="w-full text-left table-fixed border-collapse">
            <colgroup>
              <col style={{ width: '6%' }} />
              <col style={{ width: '64%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>
            <thead>
              <tr className="bg-gray-50 text-sm text-gray-600">
                <th className="py-3 px-4">Sl. No.</th>
                <th className="py-3 px-4">Name of Certificate / Document</th>
                <th className="py-3 px-4">Fee</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">Bonafide Certificate</td>
                <td className="py-3 px-4">Rs. 500</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">Character Certificate</td>
                <td className="py-3 px-4">Rs. 500</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">Migration Certificate</td>
                <td className="py-3 px-4">Rs. 2000</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">4</td>
                <td className="py-3 px-4">Transcript</td>
                <td className="py-3 px-4">
                  Rs. 2000 per copy within India / Rs. 5000 per copy outside
                  India
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">5</td>
                <td className="py-3 px-4">
                  Misc. (Backlog certificate, Rank certificate and
                  verification/attestation of DMC/Degree certificate etc.)
                </td>
                <td className="py-3 px-4">Rs. 500 each certificate/card</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">6</td>
                <td className="py-3 px-4">
                  Duplicate Grade Card / Duplicate Provisional Degree
                  Certificate / Degree Certificate
                </td>
                <td className="py-3 px-4">Rs. 1000 each</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">7</td>
                <td className="py-3 px-4">Medium of Instruction Certificate</td>
                <td className="py-3 px-4">Rs. 500</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">8</td>
                <td className="py-3 px-4">Verification of Degree</td>
                <td className="py-3 px-4">
                  Rs. 1000/- within India &amp; $100 outside India (No Charges
                  for verification through Govt./Govt. Aided Institution/Agency)
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 prose prose-slate text-gray-700">
            <p>
              However, these formalities are not required in case one is
              applying for any of the aforesaid documents on account of
              mutilation of document. Then he/she is required to attach
              mutilated certificate/document with his application and requisite
              fee.
            </p>
          </div>
        </section>
      </main>

      
    </div>
  );
}
