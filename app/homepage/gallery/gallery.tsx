'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface GalleryImage {
  title_en: string;
  title_hi: string;
  category_en: string;
  category_hi: string;
  altText_en: string;
  altText_hi: string;
  imageUrl: string;
}

interface GalleryData {
  heading_en: string;
  heading_hi: string;
  description_en: string;
  description_hi: string;
  images: GalleryImage[];
}

function Gallery() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi' || language === 'hn';

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryData, setGalleryData] = useState<GalleryData>({
    heading_en: 'Gallery',
    heading_hi: 'गैलरी',
    description_en: 'Explore moments from our campus events, achievements, and vibrant community.',
    description_hi: 'हमारे परिसर के कार्यक्रमों, उपलब्धियों और जीवंत समुदाय के क्षणों का अन्वेषण करें।',
    images: [],
  });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${API_URL}${url}`;
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_URL}/v1/homepage/gallery`);
        if (res.ok) {
          const data = await res.json();
          setGalleryData({
            heading_en: data.heading_en || '',
            heading_hi: data.heading_hi || '',
            description_en: data.description_en || '',
            description_hi: data.description_hi || '',
            images: data.images || [],
          });
        }
      } catch (err) {
        console.error('Error fetching homepage gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [API_URL]);

  const defaultImages: GalleryImage[] = Array.from({ length: 12 }).map((_, i) => ({
    title_en: `Gallery Image ${i + 1}`,
    title_hi: `गैलरी इमेज ${i + 1}`,
    category_en: ['Event', 'Achievement', 'Campus'][i % 3],
    category_hi: ['कार्यक्रम', 'उपलब्धि', 'परिसर'][i % 3],
    altText_en: `Gallery Image ${i + 1}`,
    altText_hi: `गैलरी इमेज ${i + 1}`,
    imageUrl:
      i % 3 === 0
        ? '/award.jpg'
        : i % 2 === 0
          ? '/direct.jpg'
          : '/workshop.jpg',
  }));

  const activeImages = galleryData.images && galleryData.images.length > 0 ? galleryData.images : defaultImages;
  const activeHeading = (isHindi ? galleryData.heading_hi : galleryData.heading_en) || (isHindi ? 'गैलरी' : 'Gallery');
  const activeDescription = (isHindi ? galleryData.description_hi : galleryData.description_en) || (isHindi 
    ? 'हमारे परिसर के कार्यक्रमों, उपलब्धियों और जीवंत समुदाय के क्षणों का अन्वेषण करें।' 
    : 'Explore moments from our campus events, achievements, and vibrant community.');

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#631012] mb-3 border-b-4 border-[#631012] pb-2 inline-block">
            {activeHeading}
          </h2>
          <p className="text-gray-600 mt-4">
            {activeDescription}
          </p>
        </div>

        {/* Masonry Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeImages.map((image, idx) => {
            return (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-xl hover:border-[#631012] transition-all duration-300 cursor-pointer h-72 w-full"
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={getImageUrl(image.imageUrl)}
                    alt={isHindi ? image.altText_hi : image.altText_en}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#631012]/80 via-[#631012]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {/* Category badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">
                      {isHindi ? image.category_hi : image.category_en}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg">
                    {isHindi ? image.title_hi : image.title_en}
                  </h3>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-12 border-l-transparent border-t-12 border-t-[#631012] group-hover:border-l-12 group-hover:border-l-[#631012] transition-all duration-300"></div>

                {/* Icon - appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-2-13h4v6h-4z" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal/Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-96 bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image display */}
              <div className="relative w-full h-96">
                <Image
                  src={getImageUrl(activeImages[selectedImage].imageUrl)}
                  alt={isHindi ? activeImages[selectedImage].altText_hi : activeImages[selectedImage].altText_en}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#631012] text-white flex items-center justify-center hover:bg-red-900 transition-colors shadow-lg"
              >
                ✕
              </button>

              {/* Info */}
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-bold text-[#631012] mb-2">
                  {isHindi ? activeImages[selectedImage].title_hi : activeImages[selectedImage].title_en}
                </h2>
                <p className="text-gray-600">
                  {isHindi ? activeImages[selectedImage].category_hi : activeImages[selectedImage].category_en}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
