'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Loader2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  imageurl: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH GALLERY
  // =====================================================
  useEffect(() => {
    let mounted = true;
    async function fetchGallery() {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')}/v1/homepage/gallery`
        );
        const json = await res.json();
        
        if (mounted && json.success) {
          setImages(json.data || []);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchGallery();
    return () => { mounted = false; };
  }, []);

  // =====================================================
  // LOADING STATE
  // =====================================================
  if (loading) {
    return (
      <section className="py-20 px-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-[#631012] w-12 h-12" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#631012] mb-4">
            Campus Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A beautiful collage of moments, events, and life at our vibrant campus.
          </p>
          <div className="w-24 h-1 bg-[#631012] mx-auto mt-6 rounded-full" />
        </div>

        {/* MASONRY COLLAGE GRID */}
        {images.length === 0 ? (
          <div className="text-center text-gray-500 py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            No images have been uploaded to the gallery yet.
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer break-inside-avoid bg-white"
              >
                <img
                  src={image.imageurl}
                  alt="Gallery Image"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
                
                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white/20 p-4 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                    <ZoomIn className="text-white w-8 h-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIGHTBOX MODAL */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 lg:p-12 animate-in fade-in duration-300"
            onClick={() => setSelectedImage(null)}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-lg border border-white/20 z-50 group"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* FULL SCREEN IMAGE */}
            <div
              className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageurl}
                alt="Enlarged Gallery Image"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}