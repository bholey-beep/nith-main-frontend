'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TrainIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0h-.01M15 17a2 2 0 104 0m-4 0h-.01M9 17h6"
    />
  </svg>
);

const PlaneIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const BusIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const fadeInScale = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

interface ConnectivityInfo {
  icon: React.ReactNode;
  title: string;
  nearestPoint: string;
  distance: string;
  travelTime?: string;
  services: string;
  additionalInfo?: string;
}

export default function ConnectivityPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [connectivityModes, setConnectivityModes] = useState<ConnectivityInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConnectivity() {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/connectivity`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success) {
          const iconMap: Record<string, any> = { TrainIcon: <TrainIcon />, PlaneIcon: <PlaneIcon />, BusIcon: <BusIcon /> };
          const mapped = json.data.map((item: any) => ({
            icon: iconMap[item.icon] || <BusIcon />,
            title: language === 'hi' && item.title_hi ? item.title_hi : item.title_en,
            nearestPoint: language === 'hi' && item.nearest_point_hi ? item.nearest_point_hi : item.nearest_point_en,
            distance: language === 'hi' && item.distance_hi ? item.distance_hi : item.distance_en,
            travelTime: language === 'hi' && item.travel_time_hi ? item.travel_time_hi : item.travel_time_en,
            services: language === 'hi' && item.services_hi ? item.services_hi : item.services_en,
            additionalInfo: language === 'hi' && item.additional_info_hi ? item.additional_info_hi : item.additional_info_en
          }));
          setConnectivityModes(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchConnectivity();
  }, [language]);

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
            <span className="text-gray-400">About</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">Connectivity</span>
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
            {language === 'en' ? 'Getting Here' : 'यहाँ कैसे पहुँचें'}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {language === 'en' ? 'Find out how to reach us' : 'हमारे पास पहुँचने के तरीके खोजें'}
          </p>
        </motion.div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#800000]/5 text-[#800000] text-sm font-semibold rounded-full mb-4">
              Modes
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Travel Options
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Select your preferred route
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {connectivityModes.map((mode, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInScale}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#800000] to-[#631012] rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-white">{mode.icon}</div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#800000] transition-colors">
                    {mode.title}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-500">Nearest Point</span>
                      <span className="font-semibold text-gray-900 text-right">
                        {mode.nearestPoint}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-500">Distance</span>
                      <span className="font-semibold text-[#800000]">
                        {mode.distance}
                      </span>
                    </div>

                    {mode.travelTime && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-500">Travel Time</span>
                        <span className="font-semibold text-gray-900">
                          {mode.travelTime}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                      Services
                    </p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {mode.services}
                    </p>
                  </div>

                  {mode.additionalInfo && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-600 italic">
                        {mode.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#800000]/5 text-[#800000] text-sm font-semibold rounded-full mb-4">
              Find Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Campus Location Map
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Navigate to our campus with ease
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-200">
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.8919045449387!2d76.52076631515635!3d31.456267681398645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391adb4924f6f56b%3A0x2e7c3c1c6ea930c5!2sNational%20Institute%20of%20Technology%2C%20Hamirpur!5e0!3m2!1sen!2sin!4v1635847891234!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NIT Hamirpur Location Map"
                ></iframe>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm mb-3">
                  National Institute of Technology Hamirpur, Anu, Hamirpur,
                  Himachal Pradesh — 177005
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=National+Institute+of+Technology+Hamirpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#800000] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#631012] transition-colors shadow-md hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-[#800000]/5 text-[#800000] text-sm font-semibold rounded-full mb-4">
              Quick Reference
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Quick Travel Guide
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Essential travel information from major cities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#800000]"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#800000]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                From Delhi
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#800000] mt-1">•</span>
                  <span>Distance: ~450 km</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#800000] mt-1">•</span>
                  <span>By Road: 8-9 hours via NH-44 & NH-3</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#800000] mt-1">•</span>
                  <span>By Train: Delhi to Una, then road to Hamirpur</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-[#800000]"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-[#800000]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                From Chandigarh
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#800000] mt-1">•</span>
                  <span>Distance: ~200 km</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#800000] mt-1">•</span>
                  <span>By Road: 4-5 hours via NH-3</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#800000] mt-1">•</span>
                  <span>Regular HRTC buses available</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
