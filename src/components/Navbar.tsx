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
      setScrolled(window.scrollY > 30);
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

  // --- Shared style helpers (extracted to remove repeated / conflicting Tailwind strings) ---

  // Desktop pill nav link. Exactly one light-mode + one dark-mode text color per state.
  const getDesktopNavLinkClasses = (isActive: boolean) => {
    const base =
      'flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200';

    if (isActive) {
      return `${base} bg-emerald-500 text-white shadow-md shadow-emerald-500/30`;
    }

    return `${base} text-slate-700 hover:text-emerald-600 hover:bg-black/5 dark:text-slate-200 dark:hover:text-emerald-400 dark:hover:bg-white/10`;
  };

  // Round icon-only utility button (theme toggle, admin login)
  const getIconButtonClasses = () =>
    `p-2.5 rounded-xl border transition-all text-slate-700 hover:text-emerald-600 hover:bg-black/5 border-slate-200 dark:text-slate-200 dark:hover:text-emerald-400 dark:hover:bg-white/10 dark:border-slate-700 ${
      scrolled ? 'bg-slate-100 dark:bg-slate-800' : 'bg-black/5 dark:bg-white/10'
    }`;

  const mobileNavLinkClasses =
    'flex items-center justify-between w-full px-4 py-3 rounded-xl transition-colors text-left font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-500/10 dark:text-slate-200 dark:hover:text-emerald-400';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${
        scrolled
          ? 'backdrop-blur-xl bg-white/85 dark:bg-slate-900/85 shadow-sm border-b border-emerald-500/20 py-3'
          : 'bg-gradient-to-b from-white/90 dark:from-slate-900/80 to-transparent py-4 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo & School Name */}
          <div
            onClick={() => handleNavClick('hero')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavClick('hero');
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="St. Teresa Gatura Girls - go to home section"
            className="flex items-center space-x-3 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              {/* FIX: was missing a text color entirely, so it inherited an invisible color in desktop light mode */}
              <span className="font-bold text-lg leading-snug tracking-tight transition-colors text-slate-900 dark:text-white">
                St. Teresa Gatura Girls
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold uppercase tracking-wider">
                Senior School • 8-4-4 & CBC
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center space-x-1 bg-white/10 dark:bg-slate-800/40 backdrop-blur-md p-1.5 rounded-full border border-white/20 dark:border-slate-700/50 shadow-inner"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={getDesktopNavLinkClasses(isActive)}
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
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={getIconButtonClasses()}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Admin Portal Key */}
            <button
              onClick={onOpenAdmin}
              aria-label="Admin portal login"
              title="Admin Portal Login"
              className={getIconButtonClasses()}
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg bg-white/10 dark:bg-slate-800/80 border border-white/20 text-amber-600 dark:text-amber-300"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="p-2 rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Glassmorphic Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden mt-3 px-4 pb-6 pt-2">
          <div className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/98 rounded-2xl p-5 border border-slate-200 dark:border-emerald-500/30 shadow-md text-slate-900 dark:text-white space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider">
                Navigation Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="grid grid-cols-1 gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={mobileNavLinkClasses}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
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
                aria-label="Admin portal login"
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