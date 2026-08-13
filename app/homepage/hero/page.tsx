'use client';

import { useEffect, useState } from 'react';

type HeroImage = {
  id: string;
  herourl: string;
};

type Hotlink = {
  id: string;
  name: string;
  links: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getHeroImages(): Promise<HeroImage[]> {
  const res = await fetch(`${API_BASE}/hero/hero`, { cache: 'no-store' });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch (err) { throw new Error('Invalid JSON from /hero API'); }
  if (!data.success) throw new Error(data.error || 'Failed to load hero images');
  return data.data || [];
}

async function getHotlinks(): Promise<Hotlink[]> {
  const res = await fetch(`${API_BASE}/hero/hotlinks`, { cache: 'no-store' });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch (err) { throw new Error('Invalid JSON from /hotlinks API'); }
  if (!data.success) throw new Error(data.error || 'Failed to load hotlinks');
  return data.data || [];
}

export default function Hero() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [hotlinks, setHotlinks] = useState<Hotlink[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [images, links] = await Promise.all([getHeroImages(), getHotlinks()]);
        setHeroImages(images);
        setHotlinks(links);
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

  const currentImage = heroImages[currentImageIndex]?.herourl || '';

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <section className="relative w-full h-[83vh] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        {currentImage ? (
          <img
            src={currentImage}
            alt="NIT Hamirpur Hero"
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000"
          />
        ) : (
          <div className="absolute inset-0 bg-[#631012]" />
        )}

        {/* HOTLINKS CAROUSEL SECTION */}
        <section className="absolute bottom-0 w-full min-h-[20px] bg-white flex items-center overflow-hidden border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="w-full flex overflow-hidden">
            <div className="animate-marquee flex flex-row flex-nowrap items-center w-max">
              {hotlinks.length > 0 ? (
                hotlinks.map((link) => (
                  <a href={link.links} key={link.id} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#631012] mx-8 text-base font-semibold tracking-wide flex items-center gap-3 transition-colors whitespace-nowrap shrink-0">
                    <span className="w-2 h-2 bg-[#631012] rounded-full animate-pulse shadow-sm shrink-0"></span>
                    {link.name}
                  </a>
                ))
              ) : (
                <span className="text-gray-500 mx-8 text-base font-medium italic whitespace-nowrap shrink-0">
                  No new announcements at this time.
                </span>
              )}
            </div>
          </div>
        </section>

      </section>
    </>
  );
}