import React, { useState } from 'react';
import { Youtube, Play, Film, ExternalLink, Radio } from 'lucide-react';

const YOUTUBE_VIDEOS = [
  {
    id: 'anthem-2025',
    youtubeId: 'L_LUpnjgPso', // Sample educational/choir embed
    title: 'St. Teresa Gatura Girls Senior School Anthem & Morning Devotion',
    duration: '4:15',
    category: 'School Anthem',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'The school choir performs the official St. Teresa Gatura Girls Anthem during assembly.'
  },
  {
    id: 'cbc-science-fair',
    youtubeId: '3JZ_D3ELwOQ',
    title: '2026 CBC Senior Secondary Science & Robotics Exhibition',
    duration: '8:40',
    category: 'Innovation',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Grade 10 STEM students showcase solar water purification and coding projects.'
  },
  {
    id: 'drama-gala',
    youtubeId: 'fJ9rUzIMcZQ',
    title: 'National Drama Festival 2025 — St. Teresa Drama Club Winners',
    duration: '12:10',
    category: 'Arts & Culture',
    thumbnail: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80',
    description: 'Stage performance by our award-winning drama team at the Kenya National Theatre.'
  },
  {
    id: 'principal-speech',
    youtubeId: 'kJQP7kiw5Fk',
    title: 'Principal\'s Address: Welcome to St. Teresa Gatura Girls Senior School',
    duration: '6:30',
    category: 'Address',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'Sr. Beatrice Mwangi outlines the school values, 8-4-4 and CBC pathway opportunities.'
  }
];

export const YouTubeFeed: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(YOUTUBE_VIDEOS[0]);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-90" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>Official YouTube Channel • @STTERESAGATURAGIRLSHIGHSCHOOL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              ST TERESA GATURA GIRLS HIGH SCHOOL Channel
            </h2>
            <p className="text-slate-300 text-base max-w-2xl font-light">
              Watch recent assemblies, music festivals, Grade 10 CBC STEM exhibitions, and campus life videos straight from our official YouTube media channel.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.youtube.com/@STTERESAGATURAGIRLSHIGHSCHOOL"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Subscribe @STTERESAGATURAGIRLSHIGHSCHOOL</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Channel Details Banner Box */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-lg shrink-0 shadow-md">
              ST
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">ST TERESA GATURA GIRLS HIGH SCHOOL</p>
              <p className="text-red-400 font-mono text-[11px]">Handle: @STTERESAGATURAGIRLSHIGHSCHOOL</p>
              <p className="text-slate-400 text-[11px] truncate max-w-md">Channel ID: UC-kMsQwdGF2pawrfT6xixTg</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-slate-300 text-[11px]">
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700">
              Banner: 2048 x 1152px
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700">
              Profile Pic: 98 x 98px
            </span>
            <a
              href="https://www.youtube.com/channel/UC-kMsQwdGF2pawrfT6xixTg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold transition-colors"
            >
              Open Channel URL ↗
            </a>
          </div>
        </div>

        {/* Video Player + Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Embedded Player */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                  {activeVideo.category}
                </span>
                <span className="text-slate-400 font-mono">Duration: {activeVideo.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                {activeVideo.description}
              </p>
            </div>
          </div>

          {/* Video Playlist Cards */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center space-x-2">
              <Film className="w-4 h-4 text-emerald-400" />
              <span>Up Next in Playlist ({YOUTUBE_VIDEOS.length})</span>
            </h4>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {YOUTUBE_VIDEOS.map((video) => {
                const isSelected = activeVideo.id === video.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <div className={`p-1.5 rounded-full ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-red-600 text-white'}`}>
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <p className="text-xs font-bold truncate text-white leading-tight">
                        {video.title}
                      </p>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                        <span>{video.category}</span>
                        <span>•</span>
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
