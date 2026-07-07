'use client';

import { useEffect, useState } from 'react';

type Homepage = {
  heromaintext_en: string;
  heromaintext_hi: string;
  herosubheading_en: string;
  herosubheading_hi: string;
  herodescheading_en: string;
  herodescheading_hi: string;
};

type HeroImage = {
  id: number;
  image: string;
  image_url: string;
};

const API_BASE = 'http://localhost:4000';

async function getHomepageData(): Promise<Homepage> {
  const res = await fetch(`${API_BASE}/v1/homepage/hero`, {
    cache: 'no-store',
  });

  // FIX: prevent HTML crash (your "Unexpected token <" error)
  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new Error('Invalid JSON from /hero API (check backend route)');
  }

  if (!data.success) {
    throw new Error(data.error || 'Failed to load hero data');
  }

  return data.data;
}

async function getHeroImages(): Promise<HeroImage[]> {
  const res = await fetch(`${API_BASE}/v1/homepage/hero/hero-image`, {
    cache: 'no-store',
  });

  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch (err) {
    throw new Error('Invalid JSON from /hero-image API');
  }

  if (!data.success) {
    throw new Error(data.error || 'Failed to load hero images');
  }

  return data.images || [];
}

export default function Hero() {
  const [homepage, setHomepage] = useState<Homepage | null>(null);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeData, images] = await Promise.all([
          getHomepageData(),
          getHeroImages(),
        ]);

        setHomepage(homeData);
        setHeroImages(images);
      } catch (err) {
        console.error('Hero load error:', err);
      }
    };

    fetchData();
  }, []);

  // AUTO SLIDER
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  const currentImage =
    heroImages[currentImageIndex]?.image_url || '';

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND IMAGE (FIXED - NO next/image ISSUE) */}
      {currentImage ? (
        <img
          src={currentImage}
          alt="NIT Hamirpur Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-900" />
      )}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />

      {/* LANGUAGE TOGGLE */}
      <div className="absolute top-8 right-8 z-20">
        <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1">
          
          <button
            onClick={() => setLanguage('en')}
            className={`px-5 py-2 rounded-full text-sm font-semibold ${
              language === 'en'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white/10'
            }`}
          >
            English
          </button>

          <button
            onClick={() => setLanguage('hi')}
            className={`px-5 py-2 rounded-full text-sm font-semibold ${
              language === 'hi'
                ? 'bg-white text-black'
                : 'text-white hover:bg-white/10'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">

          <p className="text-white/80 tracking-[0.25em] uppercase mb-6">
            {language === 'en'
              ? homepage?.heromaintext_en
              : homepage?.heromaintext_hi}
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {language === 'en'
              ? homepage?.herosubheading_en
              : homepage?.herosubheading_hi}
          </h1>

          <p className="text-lg text-white/90 max-w-2xl">
            {language === 'en'
              ? homepage?.herodescheading_en
              : homepage?.herodescheading_hi}
          </p>

        </div>
      </div>

      {/* DOTS */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentImageIndex === index
                  ? 'bg-white scale-125'
                  : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}