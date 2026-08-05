import React, { useState } from 'react';
import { LeadershipProfile } from '../types';
import { Quote, ChevronLeft, ChevronRight, Award, ShieldCheck, UserCheck } from 'lucide-react';

interface LeadershipProps {
  profiles: LeadershipProfile[];
}

export const Leadership: React.FC<LeadershipProps> = ({ profiles }) => {
  const sortedProfiles = [...profiles].sort((a, b) => a.order - b.order);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (sortedProfiles.length === 0) return null;

  const currentLeader = sortedProfiles[selectedIndex];

  return (
    <section id="leadership" className="py-20 relative bg-white dark:bg-slate-950 transition-colors overflow-hidden">
      
      {/* Background Subtle Highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-slate-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>School Administration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Visionary School Leadership
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Guiding St. Teresa Gatura Girls with faith, integrity, academic rigour, and a steadfast devotion to student success.
          </p>
        </div>

        {/* Featured Leader Card */}
        <div className="relative rounded-3xl bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white p-6 sm:p-10 lg:p-12 border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Leader Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-md group">
                <img loading="lazy" 
                  src={currentLeader.imageUrl} 
                  alt={currentLeader.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-center text-slate-900 dark:text-white">
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    {currentLeader.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Leader Bio & Quote */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                  {currentLeader.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentLeader.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {currentLeader.title}
                </p>
              </div>

              {/* Quote box */}
              <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
                <Quote className="w-8 h-8 text-emerald-700 dark:text-emerald-400 opacity-80" />
                <p className="text-base sm:text-lg italic text-slate-200 leading-relaxed">
                  "{currentLeader.quote}"
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {currentLeader.bio}
              </p>

            </div>

          </div>

          {/* Navigation Arrows for Leaders */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Profile {selectedIndex + 1} of {sortedProfiles.length}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedIndex((prev) => (prev - 1 + sortedProfiles.length) % sortedProfiles.length)}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 text-slate-900 dark:text-white transition-colors"
                aria-label="Previous leadership profile"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedIndex((prev) => (prev + 1) % sortedProfiles.length)}
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 text-slate-900 dark:text-white transition-colors"
                aria-label="Next leadership profile"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

        {/* Thumbnail Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sortedProfiles.map((leader, idx) => (
            <button
              key={leader.id}
              onClick={() => setSelectedIndex(idx)}
              className={`p-4 rounded-2xl text-left border transition-all ${
                selectedIndex === idx 
                  ? 'bg-white dark:bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 shadow-sm hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img loading="lazy" 
                  src={leader.imageUrl} 
                  alt={leader.name} 
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-emerald-500/30"
                />
                <div className="truncate">
                  <p className="text-xs font-bold truncate text-slate-900 dark:text-white">{leader.name}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-500 dark:text-slate-400 truncate">{leader.role}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
