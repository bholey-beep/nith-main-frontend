'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  about_title_en: string;
  about_title_hn: string;
  about_desc1_en: string;
  about_desc1_hn: string;
  about_desc2_en: string;
  about_desc2_hn: string;
  about_desc3_en: string;
  about_desc3_hn: string;
  movement_title_en: string;
  movement_title_hn: string;
  movement_intro_en: string;
  movement_intro_hn: string;
  growth_title_en: string;
  growth_title_hn: string;
  growth_desc_en: string;
  growth_desc_hn: string;
}

interface Assertion {
  id: number;
  assertion_en: string;
  assertion_hn: string;
}

interface GalleryItem {
  id: number;
  url: string;
  caption_en: string;
  caption_hn: string;
}

// Solid, comprehensive bilingual fallback data
const FALLBACK_HEADING: HeadingData = {
  title_en: 'About SPIC MACAY',
  title_hn: 'SPIC MACAY के बारे में',
  sub_title_en: 'A movement to bring Indian classical arts to educational institutions and to inspire youth with their cultural heritage.',
  sub_title_hn: 'शैक्षिक संस्थानों तक भारतीय शास्त्रीय कलाओं को पहुँचाने और युवा वर्ग में सांस्कृतिक विरासत के प्रति प्रेरणा जगाने की एक पहल।',
  about_title_en: 'Beginning of SPIC MACAY',
  about_title_hn: 'SPIC MACAY की शुरुआत',
  about_desc1_en: 'An idea originates and finds someone through whom it can manifest itself. That fortunate someone experiences during the birth process a feeling beyond description. Imagine for a moment that you are witnessing the creation of the universe.',
  about_desc1_hn: 'एक विचार उत्पन्न होता है और किसी माध्यम से व्यक्त होने का मार्ग पाता है। जो भाग्यशाली व्यक्ति इसे जन्म देते समय अनुभव करता है, वह अनुभूति अवर्णनीय होती है। कल्पना करें कि आप ब्रह्मांड के निर्माण के साक्षी बन रहे हैं।',
  about_desc2_en: 'The "big bang" of SPIC MACAY came in 1972 at a concert of Ustad Nasir Aminuddin Dagar and Ustad Zia Fariduddin Dagar at the Brooklyn Academy of Music in New York. After a few sporadic concerts (notable amongst them was that of Ustad Ali Akbar Khan) at Columbia University between 1972-76, the idea took a more defined direction in 1977 in India. In 1979, a two-day programme at IIT Delhi featuring Ustad Bismillah Khan, Dagar Bandhu, Ustad Amjad Ali Khan and Ustad Sitahid Parvez was organised by MEFYS (Mechanical Engineering Final Year Students), where the name SPIC MACAY was first launched with the aim to resist deculturisation.',
  about_desc2_hn: 'SPIC MACAY का "बिग बैंग" 1972 में न्यूयॉर्क में ब्रुकलिन एकेडमी ऑफ म्यूजिक में उस्ताद नासिर अमीन उद्दीन डागर और उस्ताद जिया फरीदुद्दीन डागर के संगीत कार्यक्रम में हुआ। 1972-76 के बीच कोलंबिया विश्वविद्यालय में कुछ कार्यक्रमों के बाद, 1977 में भारत में इस विचार को निश्चित दिशा मिली। 1979 में IIT दिल्ली में दो दिवसीय कार्यक्रम का आयोजन मैकेनिकल इंजीनियरिंग अंतिम वर्ष के छात्रों द्वारा किया गया, जहां पश्चिमीकरण के प्रभाव का विरोध करने के उद्देश्य से SPIC MACAY नाम पहली बार शुरू किया गया था।',
  about_desc3_en: "The first lecture-demonstration series LEC-DEM'79 followed the same year with presentations by Pandit Birju Maharaj, Smt. Sonal Mansingh, Ustad Asad Ali Khan, Dagar Bandhu and Ustad Munawwar Ali Khan across colleges in Delhi. FEST was used as the name for the annual festival in 1980, and SPIC MACAY expanded to multiple cities and institutions through the 1980s and 1990s.",
  about_desc3_hn: "उसी वर्ष प्रथम व्याख्यान-प्रदर्शन श्रृंखला LEC-DEM'79 की शुरुआत पंडित बिरजू महाराज, श्रीमती सोनल मानसिंह, उस्ताद असद अली खान, डागर बंधु और उस्ताद मुनव्वर अली खान की प्रस्तुतियों के साथ हुई। 1980 में वार्षिक उत्सव के लिए FEST नाम का उपयोग किया गया और 1980 और 1990 के दशकों में SPIC MACAY का विस्तार कई शहरों और संस्थानों में हुआ।",
  movement_title_en: 'The Movement',
  movement_title_hn: 'आंदोलन',
  movement_intro_en: 'SPIC MACAY is an affirmation of:',
  movement_intro_hn: 'SPIC MACAY निम्न बातों का समर्थन करता है:',
  growth_title_en: 'Its Growth',
  growth_title_hn: 'विकास',
  growth_desc_en: 'The movement caught the imagination of the young and began to grow geographically and numerically. With a combination of careful introductions and enthusiastic demand, SPIC MACAY developed into a network of over 200 centres in India and abroad, conducting about 1000 events yearly.',
  growth_desc_hn: 'यह आंदोलन युवाओं के मन में जगह बनाने लगा और भौगोलिक और संख्यात्मक रूप से विकसित हुआ। संयमित परिचय और उत्साहपूर्ण मांग के संयोजन से, SPIC MACAY ने भारत और विदेशों में 200 से अधिक केंद्र विकसित किए और प्रतिवर्ष लगभग 1000 कार्यक्रम आयोजित किए।',
};

const FALLBACK_ASSERTIONS: Assertion[] = [
  { id: 1, assertion_en: 'a priceless cultural heritage rooted in what is essentially Indian.', assertion_hn: 'भारतीय जड़ों पर आधारित अमूल्य सांस्कृतिक विरासत की पहचान।' },
  { id: 2, assertion_en: 'the pulsating and dynamic vitality of the young person.', assertion_hn: 'युवा वर्ग की जीवंत ऊर्जा और उनकी सांस्कृतिक जिम्मेदारी।' },
  { id: 3, assertion_en: 'a solid value-based education that includes aesthetics and spirituality.', assertion_hn: 'सौंदर्य और आध्यात्मिकता वाले मूल्य-आधारित शिक्षा का महत्व।' },
  { id: 4, assertion_en: 'the effectiveness of voluntary work in inculcating a spirit of service.', assertion_hn: 'स्वयंसेवा के माध्यम से सेवा भावना का विकास।' },
  { id: 5, assertion_en: 'the need for an inspired perspective in a world bombarded by information.', assertion_hn: 'जानकारी के सागर में प्रेरित दृष्टिकोण की आवश्यकता।' },
  { id: 6, assertion_en: 'all that is beautiful, lofty and wholesome in the human spirit.', assertion_hn: 'मानव भावना में जो कुछ भी सुंदर, उदात्त और स्वास्थ्यप्रद है उसका समर्थन।' },
];

const FALLBACK_GALLERY: GalleryItem[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60',
    caption_en: 'Classical Musical Evening featuring campus artists',
    caption_hn: 'परिसर के कलाकारों की शास्त्रीय संगीत संध्या'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=60',
    caption_en: 'Kathak Performance Workshop by visiting exponent',
    caption_hn: 'आगंतुक गुरु द्वारा कथक प्रदर्शन कार्यशाला'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=60',
    caption_en: 'Sitar Lecture Demonstration at Main Auditorium',
    caption_hn: 'मुख्य सभागार में सितार व्याख्यान प्रदर्शन'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60',
    caption_en: 'Inspirational Vocal Arts Session with NIT Hamirpur Youth',
    caption_hn: 'एनआईटी हमीरपुर के युवाओं के साथ प्रेरणादायक गायन कला सत्र'
  }
];

export default function SpicMacayPage() {
  const language = useSelector((state: RootState) => state.language.value);

  const [headingData, setHeadingData] = useState<HeadingData>(FALLBACK_HEADING);
  const [assertions, setAssertions] = useState<Assertion[]>(FALLBACK_ASSERTIONS);
  const [gallery, setGallery] = useState<GalleryItem[]>(FALLBACK_GALLERY);
  const [loading, setLoading] = useState(true);

  // Lightbox overlay state
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${API_URL}${url}`;
  };

  useEffect(() => {
    async function loadData() {
      try {
        const headRes = await fetch(`${API_URL}/api/student-spicmacay`);
        if (headRes.ok) {
          const hData = await headRes.json();
          setHeadingData({
            title_en: hData.title_en || FALLBACK_HEADING.title_en,
            title_hn: hData.title_hn || FALLBACK_HEADING.title_hn,
            sub_title_en: hData.sub_title_en || FALLBACK_HEADING.sub_title_en,
            sub_title_hn: hData.sub_title_hn || FALLBACK_HEADING.sub_title_hn,
            about_title_en: hData.about_title_en || FALLBACK_HEADING.about_title_en,
            about_title_hn: hData.about_title_hn || FALLBACK_HEADING.about_title_hn,
            about_desc1_en: hData.about_desc1_en || FALLBACK_HEADING.about_desc1_en,
            about_desc1_hn: hData.about_desc1_hn || FALLBACK_HEADING.about_desc1_hn,
            about_desc2_en: hData.about_desc2_en || FALLBACK_HEADING.about_desc2_en,
            about_desc2_hn: hData.about_desc2_hn || FALLBACK_HEADING.about_desc2_hn,
            about_desc3_en: hData.about_desc3_en || FALLBACK_HEADING.about_desc3_en,
            about_desc3_hn: hData.about_desc3_hn || FALLBACK_HEADING.about_desc3_hn,
            movement_title_en: hData.movement_title_en || FALLBACK_HEADING.movement_title_en,
            movement_title_hn: hData.movement_title_hn || FALLBACK_HEADING.movement_title_hn,
            movement_intro_en: hData.movement_intro_en || FALLBACK_HEADING.movement_intro_en,
            movement_intro_hn: hData.movement_intro_hn || FALLBACK_HEADING.movement_intro_hn,
            growth_title_en: hData.growth_title_en || FALLBACK_HEADING.growth_title_en,
            growth_title_hn: hData.growth_title_hn || FALLBACK_HEADING.growth_title_hn,
            growth_desc_en: hData.growth_desc_en || FALLBACK_HEADING.growth_desc_en,
            growth_desc_hn: hData.growth_desc_hn || FALLBACK_HEADING.growth_desc_hn,
          });
        }

        const assertRes = await fetch(`${API_URL}/api/student-spicmacay/assertions`);
        if (assertRes.ok) {
          const aData = await assertRes.json();
          if (aData && aData.length > 0) {
            setAssertions(aData);
          }
        }

        const galleryRes = await fetch(`${API_URL}/api/student-spicmacay/gallery`);
        if (galleryRes.ok) {
          const gData = await galleryRes.json();
          if (gData && gData.length > 0) {
            setGallery(gData);
          }
        }
      } catch (error) {
        console.error('Error fetching SPIC MACAY page data, using bilingual fallbacks:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [API_URL]);

  const handlePrevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const handleNextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev !== null && prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumbs Navigation */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language === 'en' ? 'Home' : 'होम'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {language === 'en' ? 'Student' : 'छात्र'}
            </span>
            <span>›</span>
            <Link
              href="/student/cultural"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language === 'en' ? 'Cultural' : 'सांस्कृतिक'}
            </Link>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              SPIC MACAY
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 text-center py-20 px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
              {language === 'en' ? headingData.title_en : headingData.title_hn}
            </h1>
            <p className="text-white/85 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              {language === 'en' ? headingData.sub_title_en : headingData.sub_title_hn}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Main Content Blocks */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Beginning of SPIC MACAY Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fadeIn">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2 border-gray-100">
            {language === 'en' ? headingData.about_title_en : headingData.about_title_hn}
          </h2>

          <div className="prose prose-slate text-gray-700 space-y-4 max-w-none leading-relaxed">
            <p>
              {language === 'en' ? headingData.about_desc1_en : headingData.about_desc1_hn}
            </p>
            {((language === 'en' && headingData.about_desc2_en) || (language === 'hn' && headingData.about_desc2_hn)) && (
              <p>
                {language === 'en' ? headingData.about_desc2_en : headingData.about_desc2_hn}
              </p>
            )}
            {((language === 'en' && headingData.about_desc3_en) || (language === 'hn' && headingData.about_desc3_hn)) && (
              <p>
                {language === 'en' ? headingData.about_desc3_en : headingData.about_desc3_hn}
              </p>
            )}
          </div>
        </section>

        {/* The Movement Section (with Bullet Assertions) */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fadeIn">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-2 border-gray-100">
            {language === 'en' ? headingData.movement_title_en : headingData.movement_title_hn}
          </h3>

          <div className="prose prose-slate text-gray-700 max-w-none leading-relaxed">
            <p className="mb-4">
              {language === 'en' ? headingData.movement_intro_en : headingData.movement_intro_hn}
            </p>
            <ul className="list-disc list-inside space-y-2.5 pl-2">
              {assertions.map((assert) => (
                <li key={assert.id} className="text-gray-700">
                  <span className="font-medium">
                    {language === 'en' ? assert.assertion_en : assert.assertion_hn}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Its Growth Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fadeIn">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-2 border-gray-100">
            {language === 'en' ? headingData.growth_title_en : headingData.growth_title_hn}
          </h3>

          <div className="prose prose-slate text-gray-700 max-w-none leading-relaxed">
            <p>
              {language === 'en' ? headingData.growth_desc_en : headingData.growth_desc_hn}
            </p>
          </div>
        </section>

        {/* Dynamic Photo Gallery Grid */}
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-fadeIn">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-2 border-gray-100">
            {language === 'en' ? 'SPIC MACAY Gallery' : 'SPIC MACAY गैलरी'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map((image, index) => (
              <motion.div
                key={image.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveImageIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-xs hover:shadow-md aspect-[4/3] flex flex-col"
              >
                <div className="w-full h-full relative overflow-hidden">
                  <img
                    src={getImageUrl(image.url)}
                    alt={language === 'en' ? image.caption_en : image.caption_hn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Glassmorphic Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-xs p-1.5 rounded-full hover:bg-white/35 transition-colors">
                      <Maximize2 size={14} className="text-white" />
                    </span>
                    <p className="text-xs font-semibold tracking-wide uppercase text-[#FFD700]">SPIC MACAY Recital</p>
                    <p className="text-xs font-medium text-white/90 line-clamp-2 mt-1">
                      {language === 'en' ? image.caption_en : image.caption_hn}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {gallery.length === 0 && (
            <div className="text-center py-12 text-gray-400 border border-dashed rounded-xl">
              No photos uploaded to this page yet.
            </div>
          )}
        </section>
      </main>

      {/* Lightbox Screen Overlay Viewer */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 select-none backdrop-blur-xs"
          >
            {/* Overlay Header action bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-50">
              <div>
                <p className="text-xs uppercase font-extrabold tracking-widest text-[#FFD700]">SPIC MACAY Live Gallery</p>
                <p className="text-sm font-light mt-0.5">Image {activeImageIndex + 1} of {gallery.length}</p>
              </div>
              <button
                onClick={() => setActiveImageIndex(null)}
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all active:scale-90"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Left Nav Button */}
            <button
              onClick={handlePrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full z-50 transition-all active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Core Image Slide Display */}
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[75vh] w-full h-full flex items-center justify-center p-2"
            >
              <img
                src={getImageUrl(gallery[activeImageIndex].url)}
                alt="Selected Lightbox Artwork"
                className="max-w-full max-h-full object-contain rounded-lg border border-white/10 shadow-2xl"
              />
            </motion.div>

            {/* Right Nav Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full z-50 transition-all active:scale-90"
            >
              <ChevronRight size={24} />
            </button>

            {/* Caption Footer Overlay */}
            <div className="absolute bottom-8 left-6 right-6 text-center text-white bg-black/40 backdrop-blur-md p-4 rounded-xl max-w-2xl mx-auto border border-white/5">
              <p className="text-sm md:text-base font-semibold leading-relaxed">
                {language === 'en'
                  ? gallery[activeImageIndex].caption_en
                  : gallery[activeImageIndex].caption_hn}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
