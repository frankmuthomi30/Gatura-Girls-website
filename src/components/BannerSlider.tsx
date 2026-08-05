import React, { useState, useEffect } from 'react';
import { BannerAd } from '../types';
import { Megaphone, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface BannerSliderProps {
  banners: BannerAd[];
  onOpenAdmissions: () => void;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({ banners, onOpenAdmissions }) => {
  const activeBanners = (banners || []).filter(b => b.active);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  const handleCtaClick = () => {
    if (currentBanner.ctaLink === '#admissions') {
      onOpenAdmissions();
    } else if (currentBanner.ctaLink) {
      const elem = document.querySelector(currentBanner.ctaLink);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onOpenAdmissions();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 p-1 border border-slate-200 dark:border-emerald-500/30 shadow-md">
        
        {/* Banner Card Content */}
        <div className="relative h-[220px] sm:h-[260px] md:h-[280px] rounded-[22px] overflow-hidden flex items-center">
          
          {/* Background Image with Dark Vignette */}
          <img loading="lazy" 
            src={currentBanner.imageUrl} 
            alt={currentBanner.title}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />

          {/* Text Content overlay */}
          <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-6 space-y-3 text-white">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Announcement & Notice</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-md">
              {currentBanner.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-200 line-clamp-2 font-light">
              {currentBanner.subtitle}
            </p>

            {currentBanner.ctaText && (
              <div className="pt-2">
                <button
                  onClick={handleCtaClick}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm shadow-emerald-500/30 transition-all transform hover:scale-105"
                >
                  <span>{currentBanner.ctaText}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

          {/* Navigation Controls */}
          {activeBanners.length > 1 && (
            <div className="absolute right-6 bottom-6 flex items-center space-x-2 z-20">
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)}
                className="p-2 rounded-full bg-slate-900/80 hover:bg-emerald-500 text-white border border-white/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-3 py-1 rounded-full bg-slate-900/80 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-white/10">
                {currentIndex + 1} / {activeBanners.length}
              </div>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % activeBanners.length)}
                className="p-2 rounded-full bg-slate-900/80 hover:bg-emerald-500 text-white border border-white/20 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
