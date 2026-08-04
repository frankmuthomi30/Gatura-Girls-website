import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  CloudSun,
  RefreshCw,
  Wind,
  Droplets,
  MapPin
} from 'lucide-react';

import { HeroSlide } from '../types';
import { INITIAL_HERO_SLIDES } from '../data/initialData';

interface HeroProps {
  onExplorePrograms: () => void;
  onOpenAdmissions: () => void;
  slides?: HeroSlide[];
}

export const Hero: React.FC<HeroProps> = ({ onExplorePrograms, onOpenAdmissions, slides }) => {
  // Respect admin slides: if slides prop is passed, use it (even if empty array). Only fallback to initial if slides prop is undefined.
  const activeSlides = slides !== undefined ? slides : INITIAL_HERO_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);

  // Real-time Weather state for Gatura, Murang'a County (-0.835, 36.953)
  const [heroWeather, setHeroWeather] = useState<{
    temp: number;
    cond: string;
    humidity: number;
    wind: number;
    rainProb: number;
    loading: boolean;
  }>({
    temp: 21,
    cond: 'Pleasant Mountain Climate',
    humidity: 68,
    wind: 12,
    rainProb: 15,
    loading: false
  });

  const fetchGaturaHeroWeather = async () => {
    setHeroWeather(prev => ({ ...prev, loading: true }));
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-0.835&longitude=36.953&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=precipitation_probability'
      );
      if (res.ok) {
        const data = await res.json();
        const curr = data.current;
        const code = curr.weather_code;
        let cond = 'Pleasant Mountain Climate';
        if (code === 0) cond = 'Sunny & Clear';
        else if (code >= 1 && code <= 3) cond = 'Partly Cloudy';
        else if (code >= 45 && code <= 48) cond = 'Foggy & Misty';
        else if (code >= 51 && code <= 67) cond = 'Light Rain Shower';
        else if (code >= 80) cond = 'Rain Showers';

        setHeroWeather({
          temp: Math.round(curr.temperature_2m),
          humidity: Math.round(curr.relative_humidity_2m),
          wind: Math.round(curr.wind_speed_10m),
          rainProb: data.hourly?.precipitation_probability?.[0] || 10,
          cond,
          loading: false
        });
      }
    } catch (err) {
      console.log('Using default hero weather:', err);
      setHeroWeather(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchGaturaHeroWeather();
  }, []);

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
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Parallax / Ambient Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-slate-950 to-emerald-900/40 z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Tag & Live Weather Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin-slow" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  St. Teresa Gatura Girls Senior School • Murang'a County
                </span>
              </div>

              {/* Real Live Weather Update Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 backdrop-blur-md text-xs">
                <CloudSun className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="font-extrabold text-white">{heroWeather.temp}°C</span>
                <span className="text-emerald-300 font-semibold">{heroWeather.cond}</span>
                <span className="text-slate-400 hidden sm:inline">| Gatura Live</span>
                <button 
                  onClick={fetchGaturaHeroWeather} 
                  title="Refresh weather" 
                  disabled={heroWeather.loading}
                  className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${heroWeather.loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Empowering Young Women For <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">Global Leadership</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
              Offering both the <strong className="text-emerald-400 font-semibold">8-4-4 System</strong> and the <strong className="text-emerald-400 font-semibold">Competency-Based Curriculum (CBC)</strong> Senior Secondary Pathways (Grade 10–12) with state-of-the-art STEM, Humanities, and Creative Arts facilities.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center space-x-2 text-sm text-slate-200 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>STEM & ICT Pathways</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-200 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Transition Rate</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-200 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Christian Character & Discipline</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                onClick={onOpenAdmissions}
                className="flex items-center justify-center space-x-3 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-base shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:scale-[1.02] transition-all"
              >
                <span>2027 Admissions Open</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExplorePrograms}
                className="flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-md transition-all hover:border-emerald-400/50"
              >
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>Explore Academic Pathways</span>
              </button>
            </div>

          </div>

          {/* Right Column - Rotating Card Stack or Admin Photos */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Glass Card Container */}
              <div className="relative rounded-3xl p-3 bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 shadow-2xl shadow-emerald-950/50 overflow-hidden group">
                
                {/* Image Holder */}
                <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-slate-900">
                  {activeSlides.length > 0 ? (
                    <>
                      <img 
                        src={activeSlides[currentSlide]?.image} 
                        alt={activeSlides[currentSlide]?.title || 'St. Teresa Gatura Girls'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                      
                      {/* Category Tag on Image */}
                      <div className="absolute top-4 left-4 bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                        {activeSlides[currentSlide]?.tag || 'Senior School'}
                      </div>

                      {/* Glassmorphic Overlay Box at Bottom of Slide */}
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white space-y-1.5">
                        <h3 className="font-bold text-lg text-white">
                          {activeSlides[currentSlide]?.title}
                        </h3>
                        <p className="text-xs text-slate-300 line-clamp-2">
                          {activeSlides[currentSlide]?.subtitle}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-900">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Award className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-xl text-white">St. Teresa Gatura Girls</h3>
                      <p className="text-xs text-slate-400 max-w-xs">
                        Empowering young women through academic excellence, moral integrity, and leadership.
                      </p>
                    </div>
                  )}
                </div>

                {/* Slider Navigation Buttons */}
                {activeSlides.length > 1 && (
                  <>
                    <button 
                      onClick={prevSlide}
                      className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 text-white border border-white/20 hover:bg-emerald-500 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/70 text-white border border-white/20 hover:bg-emerald-500 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dots indicator */}
                {activeSlides.length > 1 && (
                  <div className="flex justify-center space-x-2 py-3">
                    {activeSlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all ${
                          currentSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                )}

              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -bottom-5 -left-5 bg-slate-900/90 border border-emerald-500/40 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl hidden sm:flex items-center space-x-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Exam Performance</p>
                  <p className="text-sm font-bold text-white">Top Girls Senior School</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

