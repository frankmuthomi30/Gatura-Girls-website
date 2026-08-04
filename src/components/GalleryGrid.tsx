import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Image as ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface GalleryGridProps {
  gallery: GalleryItem[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Academics', 'Facilities', 'Sports', 'Events', 'Student Life'];

  const filteredItems = activeCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-4 h-4" />
            <span>Visual Tour & Campus Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Life at St. Teresa Gatura Girls
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light">
            Explore our state-of-the-art facilities, academic laboratories, athletic triumphs, and vibrant school events.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/50"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                  {item.category}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-emerald-500 text-slate-950 shadow-lg">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Caption & Title */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1 font-light">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl animate-fade-in">
          
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 text-white border border-slate-700 hover:bg-emerald-500 hover:text-slate-950 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev / Next Buttons */}
          <button
            onClick={prevLightbox}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white border border-slate-700 hover:bg-emerald-500 hover:text-slate-950 transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextLightbox}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white border border-slate-700 hover:bg-emerald-500 hover:text-slate-950 transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Box */}
          <div className="max-w-4xl w-full space-y-4 text-center">
            <div className="relative max-h-[75vh] overflow-hidden rounded-2xl border border-emerald-500/30 shadow-2xl bg-black">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] w-auto mx-auto object-contain"
              />
            </div>
            
            <div className="space-y-1 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="text-xl font-bold text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-sm text-slate-300 font-light">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
