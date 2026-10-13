import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { HeroSlide } from '../types';
import { INITIAL_HERO_SLIDES } from '../data/initialData';

interface HeroProps {
  onExplorePrograms: () => void;
  slides?: HeroSlide[];
}

const CREDENTIALS = [
  { label: 'STEM & Social Sciences Pathways' },
  { label: '100% Transition Rate' },
  { label: 'Christian Character & Discipline' }
];

export const Hero: React.FC<HeroProps> = ({ onExplorePrograms, slides }) => {
  // Respect admin slides: if slides prop is passed, use it (even if empty array). Only fallback to initial if slides prop is undefined.
  const activeSlides = slides !== undefined ? slides : INITIAL_HERO_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (activeSlides.length > 0 && currentSlide >= activeSlides.length) {
      setCurrentSlide(0);
    }
  }, [activeSlides.length, currentSlide]);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const nextSlide = () => {
    if (activeSlides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }
  };

  const prevSlide = () => {
    if (activeSlides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-28 pb-20 flex items-center overflow-hidden bg-[#FAF7F2] dark:bg-[#080D0B] text-[#161311] dark:text-[#F3F0E9]"
    >
      {/* Paper grain + faint rule lines, like a prospectus page */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(90,110,95,0.2) 1px, transparent 0)',
          backgroundSize: '26px 26px'
        }}
      />
      <div className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/[0.08] blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Column — Editorial Text Block */}
          <div className="lg:col-span-7 space-y-8 text-left">

            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-emerald-600 dark:bg-emerald-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-400">
                St. Teresa Gatura Girls Senior School — Murang'a County
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black tracking-tight leading-[1.05]">
              Empowering young
              <br />
              women for{' '}
              <span className="italic font-serif font-medium text-emerald-700 dark:text-emerald-400">
                global
              </span>{' '}
              leadership.
            </h1>

            <p className="text-base sm:text-lg text-[#5B5346] dark:text-[#A8A196] font-light max-w-xl leading-relaxed">
              Dedicated Senior Secondary School offering the approved{' '}
              <strong className="text-[#161311] dark:text-[#F3F0E9] font-semibold">Competency-Based Curriculum (CBC)</strong> Senior
              Secondary Pathways, Grade 10–12, with state-of-the-art STEM, Humanities, and
              Creative Arts facilities.
            </p>

            {/* Credentials — set like a transcript, not pills */}
            <div className="border-t border-[#D8D0C2] dark:border-[#1E2A24] divide-y divide-[#D8D0C2] dark:divide-[#1E2A24] max-w-md">
              {CREDENTIALS.map((c, i) => (
                <div key={c.label} className="flex items-center gap-4 py-2.5">
                  <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-500 tabular-nums w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-sm text-[#161311] dark:text-[#F3F0E9] font-medium">{c.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExplorePrograms}
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5 text-white" />
                <span>Explore CBC Pathways</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-[#D8D0C2] dark:border-[#232839] text-[#161311] dark:text-[#F3F0E9] font-semibold text-base hover:border-emerald-600 dark:hover:border-emerald-500 transition-all"
              >
                <span>Contact School Administration</span>
              </a>
            </div>
          </div>

          {/* Right Column — Pinned Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none pt-6 pb-8">

              {/* Photograph card, slightly rotated like a print pinned to a board */}
              <div className="relative rotate-[-2.5deg] hover:rotate-0 transition-transform duration-500 bg-white dark:bg-[#0F1811] p-3 pb-5 rounded-sm shadow-[0_18px_40px_-12px_rgba(0,0,0,0.25)] border border-[#E5DFD2] dark:border-[#1E2A24] group">

                {/* Tape accent */}
                <div className="absolute -top-3 left-8 w-16 h-6 bg-emerald-100/80 dark:bg-emerald-500/10 border border-emerald-500/20 rotate-[-4deg] shadow-sm backdrop-blur-sm" />

                <div className="relative h-80 sm:h-[400px] overflow-hidden bg-[#F0EBE0] dark:bg-[#0A120E]">
                  {activeSlides.length > 0 ? (
                    <>
                      <img
                        loading="lazy"
                        src={activeSlides[currentSlide]?.image}
                        alt={activeSlides[currentSlide]?.title || 'St. Teresa Gatura Girls'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />

                      <div className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                        {activeSlides[currentSlide]?.tag || 'Senior School'}
                      </div>

                      {activeSlides.length > 1 && (
                        <span className="absolute top-3 right-3 font-mono text-[10px] text-white/80 tabular-nums bg-black/30 px-1.5 py-0.5 rounded-sm">
                          {String(currentSlide + 1).padStart(2, '0')}/{String(activeSlides.length).padStart(2, '0')}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                        <Award className="w-7 h-7" />
                      </div>
                      <h3 className="font-bold text-lg">St. Teresa Gatura Girls</h3>
                      <p className="text-xs text-[#5B5346] dark:text-[#A8A196] max-w-xs">
                        Empowering young women through academic excellence, moral integrity, and leadership.
                      </p>
                    </div>
                  )}

                  {activeSlides.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/85 dark:bg-black/50 text-[#161311] dark:text-white hover:bg-emerald-600 hover:text-white transition-colors"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/85 dark:bg-black/50 text-[#161311] dark:text-white hover:bg-emerald-600 hover:text-white transition-colors"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* Caption, like handwriting under a printed photo */}
                <div className="px-1 pt-3 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <p className="font-semibold text-sm truncate">
                      {activeSlides[currentSlide]?.title || 'Life at St. Teresa Gatura'}
                    </p>
                    <p className="text-[11px] text-[#8A8478] dark:text-[#6B7280] line-clamp-1">
                      {activeSlides[currentSlide]?.subtitle}
                    </p>
                  </div>
                  {activeSlides.length > 1 && (
                    <div className="flex items-center gap-1 shrink-0">
                      {activeSlides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`rounded-full transition-all ${
                            currentSlide === idx
                              ? 'w-4 h-1.5 bg-emerald-600'
                              : 'w-1.5 h-1.5 bg-[#D8D0C2] dark:bg-[#232839]'
                          }`}
                          aria-label={`Go to photo ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Rubber-stamp style badge */}
              <div className="absolute -bottom-2 -left-6 hidden sm:flex items-center justify-center w-24 h-24 rounded-full bg-[#FAF7F2] dark:bg-[#080D0B] border-2 border-emerald-700/70 dark:border-emerald-500/60 rotate-[-12deg] shadow-md">
                <div className="text-center leading-none">
                  <Award className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mx-auto mb-1" />
                  <p className="text-[8px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                    Top Exam
                  </p>
                  <p className="text-[8px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                    Performance
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};