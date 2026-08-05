import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ShieldCheck, 
  MapPin, 
  Newspaper, 
  Image as ImageIcon, 
  PhoneCall, 
  Info,
  BookOpen,
  UserCheck,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenAdmin: () => void;
  onOpenAdmissions: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  activeSection,
  setActiveSection,
  onOpenAdmin,
  onOpenAdmissions
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home', icon: BookOpen },
    { id: 'about', label: 'About & Programs', icon: Info },
    { id: 'location', label: 'Location & Weather', icon: MapPin },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'news', label: 'News & Jobs', icon: Newspaper },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${scrolled 
        ? 'backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 shadow-sm border-b border-emerald-500/20 py-3' 
        : 'bg-gradient-to-b from-white/90 dark:from-slate-900/80 to-transparent py-4 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & School Name */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-snug tracking-tight transition-colors 
                
              }`}>
                St. Teresa Gatura Girls
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                Senior School • 8-4-4 & CBC
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/10 dark:bg-slate-800/40 backdrop-blur-md p-1.5 rounded-full border border-white/20 dark:border-slate-700/50 shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 
                    isActive 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30' 
                      : scrolled
                        ? 'text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-700 dark:text-emerald-400 hover:bg-white/40 dark:hover:bg-slate-800/60'
                        : 'text-slate-700/90 dark:text-white/90 hover:text-emerald-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Admissions Button */}
            <button
              onClick={onOpenAdmissions}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-500/25 hover:shadow-sm hover:scale-105 transition-all"
            >
              <UserCheck className="w-4 h-4" />
              <span>Admissions Portal</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              aria-label="Toggle theme"
              className={`p-2.5 rounded-xl border transition-all 
                ${scrolled
                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  : 'bg-black/5 dark:bg-white/10 border-slate-200 dark:border-white/20 text-slate-800 dark:text-amber-300 hover:bg-black/10 dark:hover:bg-white/20'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Admin Portal Key */}
            <button
              onClick={onOpenAdmin}
              title="Admin Portal Login"
              className={`p-2.5 rounded-xl border transition-all 
                ${scrolled
                  ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                  : 'bg-black/5 dark:bg-white/10 border-slate-200 dark:border-white/20 text-slate-600 dark:text-white/80 hover:text-emerald-600 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="p-2 rounded-lg bg-white/10 dark:bg-slate-800/80 border border-white/20 text-amber-400"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-800 dark:text-amber-300" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/30 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Glassmorphic Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pb-6 pt-2">
          <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/98 rounded-2xl p-5 border border-slate-200 dark:border-emerald-500/30 shadow-md text-slate-900 dark:text-white space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">Navigation Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-600 hover:text-slate-900 dark:text-slate-500 dark:text-slate-400 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-emerald-500/20 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-700 dark:text-emerald-400 transition-colors text-left font-medium"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmissions();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-emerald-500 text-white font-semibold shadow-sm shadow-emerald-500/30"
              >
                <UserCheck className="w-5 h-5" />
                <span>Online Admissions Portal</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 text-sm"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Admin Portal Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
