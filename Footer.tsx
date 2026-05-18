import React, { useState, useEffect } from 'react';
import { Terminal, Mail, Phone, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  // DYNAMIC ARCHITECTURE: Pulls the latest portal URL configuration from memory or fallback
  const [portalUrl, setPortalUrl] = useState("https://your-existing-student-portal-url.com/dashboard");

  useEffect(() => {
    const savedUrl = localStorage.getItem('ita_global_student_portal_url');
    if (savedUrl) {
      setPortalUrl(savedUrl);
    }
  }, []);

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-900">
          
          {/* Column 1: Academy Summary & Contact Coordinates */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                <Terminal className="h-4 w-4" />
              </div>
              <span className="text-sm font-black tracking-wider uppercase text-white">IT INTERNATIONAL ACADEMY</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing premium technical training and high-standard engineering certifications. Practical simulation is our top priority.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>10 Miles Hub, Lusaka, Zambia</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-blue-400" />
                <span>+260 779417675</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                <span>admissions@itinternationalacademy.edu</span>
              </div>
            </div>
          </div>

          {/* Column 2: Institutional Gateway Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">Portal Gateways</h4>
            <ul className="space-y-2 text-xs font-medium uppercase tracking-wider">
              <li>
                {/* Linked straight to the dynamic URL parameter set by the Administrator */}
                <a 
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Student Portal Dashboard</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="#login" className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                  <span>Staff Administrative Desk</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="#courses" className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                  <span>Track Intake Schedules</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Structural Integrity & Compliance Badging */}
          <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center gap-3 text-blue-400 mb-3">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">System Security Status</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
              This institutional web frame runs an optimized client-side React infrastructure hosted via secure edge network nodes.
            </p>
            <div className="text-[10px] font-bold text-emerald-400 mt-4 flex items-center gap-1.5 font-mono">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>SECURE COMPLIANCE LEDGER: VERIFIED</span>
            </div>
          </div>

        </div>

        {/* System Copyright Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} IT International Academy. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Engineered with React 19 & Tailwind v4</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
