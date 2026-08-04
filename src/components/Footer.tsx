import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  UserCheck, 
  ArrowUp,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenAdmissions: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenAdmissions }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: School Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white tracking-tight">St. Teresa Gatura Girls</h3>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Senior Secondary School • 8-4-4 & CBC</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 font-light leading-relaxed max-w-md">
              Empowering young women through academic excellence, moral integrity, Christian faith, and holistic talent development in Gatanga Sub-County, Murang'a County, Kenya.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <button
                onClick={onOpenAdmissions}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
              >
                Apply For Admission
              </button>
              <button
                onClick={onOpenAdmin}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-white text-xs font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Home & Highlights</a></li>
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">8-4-4 & CBC Senior Pathways</a></li>
              <li><a href="#location" className="hover:text-emerald-400 transition-colors">Location, Map & Live Weather</a></li>
              <li><a href="#gallery" className="hover:text-emerald-400 transition-colors">Campus Photo Gallery</a></li>
              <li><a href="#news" className="hover:text-emerald-400 transition-colors">News Noticeboard & Career Vacancies</a></li>
              <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact Administration</a></li>
            </ul>
          </div>

          {/* Col 3: Direct Contacts */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">School Contacts</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Gatura, Gatanga Sub-County, P.O. Box 30-01013 Gatura, Murang'a County, Kenya{' '}
                  <a 
                    href="https://maps.app.goo.gl/oq7iHDB4f6vS2P868" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold hover:underline inline-flex items-center space-x-0.5 ml-1"
                  >
                    <span>(Google Map)</span>
                  </a>
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>+254 793328863</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>gaturagirls@gmail.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} St. Teresa Gatura Girls Senior School. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">8-4-4 & CBC Accredited</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
