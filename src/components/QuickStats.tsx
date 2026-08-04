import React from 'react';
import { Users, Award, BookOpenCheck, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export const QuickStats: React.FC = () => {
  const stats = [
    {
      label: 'Enrolled Students',
      value: '1,200+',
      description: 'Bright young women across 8-4-4 & CBC pathways',
      icon: Users,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      label: 'University Transition',
      value: '100%',
      description: 'Graduates joining top public & global universities',
      icon: Award,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      label: 'Curriculum Systems',
      value: '8-4-4 & CBC',
      description: 'Fully equipped for Senior Secondary Pathways',
      icon: BookOpenCheck,
      color: 'from-emerald-600 to-emerald-400'
    },
    {
      label: 'Co-Curricular Clubs',
      value: '25+',
      description: 'Robotics, Drama, Music, Sports & Journalism',
      icon: Sparkles,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="relative p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-lg shadow-slate-200/50 dark:shadow-none backdrop-blur-md hover:border-emerald-500/40 hover:scale-[1.02] transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    Gatura Girls
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
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
