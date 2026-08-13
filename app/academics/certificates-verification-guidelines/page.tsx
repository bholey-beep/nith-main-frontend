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
              Certificates Verification Guidelines
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
            Certificates Verification &amp; Transcript Procedures
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            How to request verification and transcripts, timelines and
            applicable charges.
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Procedure for Verification of Educational Certificate
          </h2>

          <div className="prose prose-slate text-gray-700">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Requester shall send a request for verification of educational
                certificate to the Assistant Registrar (EEC), NIT, Hamirpur (HP)
                through letter/by fax on Nos: 01972-223834 / 222584 or by email
                to{' '}
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
                Photostat copies of the educational certificates should be
                attached with the request.
              </li>
              <li>
                The verification will be intimated to the requester within three
                to five days from the receipt of the request.
              </li>
              <li>
                The verification can also be faxed to requester if a fax number
                is provided.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Charges for Issue of Verification Certificate
          </h2>

          <table className="w-full text-left table-fixed border-collapse">
            <colgroup>
              <col style={{ width: '60%' }} />
              <col style={{ width: '40%' }} />
            </colgroup>
            <thead>
              <tr className="bg-gray-50 text-sm text-gray-600">
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Charge</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3 px-4">
                  Verification Certificate to be sent within India
                </td>
                <td className="py-3 px-4">Rs. 1000/-</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">
                  Verification Certificate to be sent abroad / outside India
                </td>
                <td className="py-3 px-4">$100/-</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">
                  No Charges for verification through Govt./Govt. Aided
                  Institution/Agency
                </td>
                <td className="py-3 px-4">-</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Procedure for Issue of Transcript Certificate
          </h2>

          <div className="prose prose-slate text-gray-700">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Requester shall send a request for issue of Transcript
                Certificate to the Assistant Registrar (EEC), NIT, Hamirpur (HP)
                through letter/by fax on Nos: 01972-223834 / 222584 or by email
                to{' '}
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
                Photostat copies of all the semester grade sheets should be
                attached with the request.
              </li>
              <li>
                The Transcript will be issued to the requester within seven to
                ten days from the receipt of the request.
              </li>
              <li>
                The Transcript can also be faxed to requester if a fax number is
                provided.
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Charges for Issue of Transcript Certificate
          </h2>

          <table className="w-full text-left table-fixed border-collapse">
            <colgroup>
              <col style={{ width: '60%' }} />
              <col style={{ width: '40%' }} />
            </colgroup>
            <thead>
              <tr className="bg-gray-50 text-sm text-gray-600">
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Charge</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3 px-4">
                  Transcript Certificate to be sent within India
                </td>
                <td className="py-3 px-4">Rs. 2000/- per copy</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">
                  Transcript Certificate to be sent abroad / outside India
                </td>
                <td className="py-3 px-4">Rs. 5000/- per copy</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900">Office Order</h3>
          <p className="mt-2 text-gray-700 text-sm">
            (Office order / administrative note placeholder.)
          </p>
        </section>
      </main>

      
    </div>
  );
}
