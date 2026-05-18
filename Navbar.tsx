import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, BookOpen, User, LogIn, ChevronRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // DYNAMIC ARCHITECTURE: Pulls the latest portal URL configuration from memory or fallback
  const [portalUrl, setPortalUrl] = useState("https://your-existing-student-portal-url.com/dashboard");

  useEffect(() => {
    // Check if the administrator has modified the global portal reference
    const savedUrl = localStorage.getItem('ita_global_student_portal_url');
    if (savedUrl) {
      setPortalUrl(savedUrl);
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Programs', href: '#courses' },
    { name: 'Knowledge Hub', href: '#library' },
    { name: 'Academic Schedule', href: '#calendar' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 backdrop-blur-md ${
      scrolled ? 'bg-slate-950/90 border-b border-slate-900 py-3 shadow-lg' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Institutional Branding Logo Group */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="p-2 bg-blue-600 rounded-xl border border-blue-500/30 group-hover:scale-105 transition-transform">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wider text-white uppercase font-sans">IT INTERNATIONAL</span>
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase mt-[-2px]">ACADEMY</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Premium Portal Action Gateways */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dynamic Student Portal Link Routing */}
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-all"
            >
              <User className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Student Portal</span>
            </a>
            
            {/* Admin Internal Staff Route Dashboard Access */}
            <a
              href="#login"
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-blue-600/10"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Staff Desk</span>
            </a>
          </div>

          {/* Mobile Drawer Trigger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-950/40 border border-slate-900 cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Responsive Mobile Navigation Overlay Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 border-b border-slate-900 backdrop-blur-xl px-4 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-bold uppercase tracking-wide text-slate-400 hover:text-white p-3 bg-slate-900/40 rounded-xl border border-slate-900"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="pt-4 border-t border-slate-900 flex flex-col gap-2">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold uppercase text-slate-200"
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#D4AF37]" />
                <span>Access Student Portal</span>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-600" />
            </a>
            <a
              href="#login"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl text-sm font-bold uppercase tracking-wide"
            >
              <LogIn className="h-4 w-4" />
              <span>Secure Staff Login</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
