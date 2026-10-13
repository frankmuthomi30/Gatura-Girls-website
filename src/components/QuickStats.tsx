import React from 'react';
import { Users, Award, BookOpenCheck, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { APPROVED_COMBINATIONS } from '../data/approvedPathways';

export const QuickStats: React.FC = () => {
  const stats = [
    {
      label: 'Enrolled Students',
      value: '850+',
      description: 'Bright young girls across approved CBC Senior Pathways',
      icon: Users,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      label: 'University/College Transition',
      value: '100%',
      description: 'Graduates joining top public & global universities',
      icon: Award,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      label: 'Approved CBC Combinations',
      value: `${APPROVED_COMBINATIONS.length} Approved`,
      description: 'Across STEM, Social Sciences & Sports tracks',
      icon: BookOpenCheck,
      color: 'from-emerald-600 to-emerald-400'
    },
    {
      label: 'Co-Curricular Clubs',
      value: '25+',
      description: 'Drama, Music, Sports & Journalism',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section className="py-12 bg-[#FAF7F2] dark:bg-[#080D0B] border-y border-[#E5DFD2] dark:border-[#1E2A24] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="relative p-6 rounded-2xl bg-white dark:bg-[#0F1811] border border-[#E5DFD2] dark:border-[#1E2A24] shadow-sm dark:shadow-none backdrop-blur-md hover:border-emerald-500/40 hover:scale-[1.02] transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    Gatura Girls
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-[#161311] dark:text-[#F3F0E9] tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-semibold text-[#161311] dark:text-[#F3F0E9]">
                    {stat.label}
                  </p>
                  <p className="text-xs text-[#5B5346] dark:text-[#A8A196] leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
