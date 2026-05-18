import React, { useState, useMemo } from 'react';
import { 
  Search, BookOpen, Clock, Award, CheckCircle, 
  Download, ArrowRight, User, Mail, Phone, 
  Calendar, Shield, ChevronRight, AlertCircle, FileText
} from 'lucide-react';

// Dynamic Multi-Intake System Configuration
export const INTAKE_CYCLES = [
  { id: "july-2026", name: "July 2026 Intake" },
  { id: "sept-2026", name: "September 2026 Intake" },
  { id: "nov-2026", name: "November 2026 Intake" },
  { id: "jan-2027", name: "January 2027 Intake (Next Year)" }
];

// Academic Program Velocity Settings
export const COURSE_DURATIONS = [
  { id: "6w", name: "6 Weeks Fast-Track" },
  { id: "3m", name: "3 Months Professional" },
  { id: "6m", name: "6 Months Elite Mastery" }
];

// Core Frontend Navigation Filter Tabs
const categories = ["All", "Web", "Data", "Security", "Networking", "Mobile", "Engineering"];
// =================================================================
// 2. ELITE ACADEMIC COURSES DATASET DEFINITION
// =================================================================

export const COURSES_DATA = [
  {
    id: "cisco-ccna",
    title: "Cisco Certified Network Associate (CCNA 200-301)",
    category: "Networking",
    description: "Master enterprise routing and switching protocols, IPv4/IPv6 subnetting, VLAN management, and core network security infrastructures.",
    duration: "Full Curriculum Track",
    level: "Professional Certification",
    modules: ["Network Fundamentals", "IP Connectivity (OSPFv2)", "Security Fundamentals", "Automation & Programmability"],
    badge: "Most Popular",
    icon: Shield
  },
  {
    id: "react-firebase-dev",
    title: "Full-Stack Web Architecture (React 19 & Firebase)",
    category: "Web",
    description: "Build premium, lightning-fast integrated online learning systems and digital streaming dashboards using React hooks and real-time cloud sync.",
    duration: "Advanced Track",
    level: "Elite Engineering",
    modules: ["React Hooks & Context API", "Tailwind CSS v4 Layouts", "Firebase Security Rules", "Vite Production Optimization"],
    badge: "Highly Demanded",
    icon: BookOpen
  },
  {
    id: "cyber-threat-mgmt",
    title: "Advanced Cybersecurity & Threat Management",
    category: "Security",
    description: "Architect proactive defense structures against enterprise network attacks. Covers threat mitigation, cryptographic integrity, and access control.",
    duration: "Intensive Track",
    level: "Expert Level",
    modules: ["Ethical Hacking Frameworks", "Cisco IOS Secure Configuration", "Network Automation Scripts", "Incident Response Protocols"],
    badge: "Elite Security",
    icon: Award
  },
  {
    id: "python-data-science",
    title: "Python Data Engineering & AI Automation",
    category: "Data",
    description: "Process complex datasets and construct algorithmic analytics models. Learn to build intelligent context engines and automated workflows.",
    duration: "Core Specialization",
    level: "Advanced Technical",
    modules: ["Data Architecture & Structuring", "Algorithmic Analysis models", "Automated Script Pipelines", "AI Interface Integration"],
    badge: "New Track",
    icon: Clock
  }
];
// =================================================================
// 3. MAIN COURSES INTERACTIVE COMPONENT AND STATE TRACKING
// =================================================================

export const Courses: React.FC = () => {
  // Active search query and category tab filtering parameters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Registration modal and layout selection triggers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES_DATA[0] | null>(null);
  
  // Explicit enrollment form collection state parameters
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [targetIntake, setTargetIntake] = useState("july-2026");
  const [preferredDuration, setPreferredDuration] = useState("3m");
  
  // Processing execution states for the acceptance generation workflow
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptanceLetter, setAcceptanceLetter] = useState<{
    studentId: string;
    issueDate: string;
    validationCode: string;
  } | null>(null);

  // Live filtering engine matching search bars and tab selections simultaneously
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(course => {
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.modules.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Utility shortcut to open entry form configuration matching the course selection
  const handleEnrollClick = (course: typeof COURSES_DATA[0]) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    // Flush any leftover letter documentation from a previous form submit
    setAcceptanceLetter(null);
  };
  return (
    <section id="courses" className="py-24 bg-linear-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Layout Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/20">
            Elite Technical Curriculums
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-white">
            World-Class Programs, Built for <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-500 to-[#D4AF37]">Practical Mastery</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Select an engineering track, pick your target intake cycle, and secure structural hands-on competence using live Cisco terminal configurations.
          </p>
        </div>

        {/* Live Filter Controls Workspace */}
        <div className="space-y-6 mb-12">
          {/* Active Search Input Bar Container */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, modules, or network specializations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/60 backdrop-blur-md rounded-xl border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
            />
          </div>

          {/* Functional Category Filter Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                    : "bg-slate-900 text-slate-400 hover:bg-slate-850 hover:text-white border border-slate-800/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Live Filtered Course Grid Output */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/40 rounded-2xl border border-slate-900 max-w-md mx-auto">
            <AlertCircle className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No Programs Matched</h3>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your search keywords or switching tabs.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCourses.map((course) => {
              const IconComponent = course.icon;
              return (
                <div 
                  key={course.id}
                  className="group relative bg-slate-950/40 backdrop-blur-md p-8 rounded-3xl border border-slate-800/80 hover:border-blue-500/50 hover:bg-slate-900/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Badge and Icon Section Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                        {course.badge}
                      </span>
                    </div>

                    {/* Content Texts */}
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                      {course.description}
                    </p>

                    {/* Program Meta Indicators */}
                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> {course.level}</span>
                    </div>

                    {/* Operational Target Curriculums Track */}
                    <div className="mt-6 pt-6 border-t border-slate-900">
                      <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-3">Core Modules Matrix:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.modules.map((mod, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-slate-400">
                            <CheckCircle className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                            <span>{mod}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submission Interaction Button Link */}
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => handleEnrollClick(course)}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-blue-600 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-all duration-300 group-hover:translate-y-[-2px]"
                    >
                      <span>Secure Enrollment Access</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* ================================================================= */}
        {/* 5. INTERACTIVE ENROLLMENT MODAL & ACCEPTANCE GENERATOR PIPELINE */}
        {/* ================================================================= */}
        {isModalOpen && selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-h-[90vh] flex flex-col">
              
              {/* Modal Header Tab */}
              <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Institutional Enrollment Desk</h3>
                  <p className="text-xs text-slate-400 mt-1">Program: {selectedCourse.title}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Form Body Container */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                {!acceptanceLetter ? (
                  /* INTAKE FORM VIEW MODULE */
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      
                      // Simulate automated institutional record verification compiler processing
                      setTimeout(() => {
                        const compiledId = `ITA-2026-${Math.floor(100000 + Math.random() * 900000)}`;
                        const verificationCode = `VERIFY-NX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
                        
                        setAcceptanceLetter({
                          studentId: compiledId,
                          issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                          validationCode: verificationCode
                        });
                        setIsSubmitting(false);
                      }, 1500);
                    }}
                    className="space-y-4"
                  >
                    {/* Full Name Credentials Input */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">Applicant Full Name:</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="e.g. Felix Chisenga"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Contact Details Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Official Email Channel:</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                          <input
                            type="email"
                            required
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                        />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Mobile Phone Vector:</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                          <input
                            type="tel"
                            required
                            value={studentPhone}
                            onChange={(e) => setStudentPhone(e.target.value)}
                            placeholder="e.g. 0779417675"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* UPGRADED MULTI-INTAKE SELECTOR MENU */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2">Target Academic Cohort Intake:</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-[#D4AF37]" />
                        <select
                          value={targetIntake}
                          onChange={(e) => setTargetIntake(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                        >
                          {INTAKE_CYCLES.map(cycle => (
                            <option key={cycle.id} value={cycle.id} className="bg-slate-950 text-white">{cycle.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* UPGRADED ACADEMIC VELOCITY SWITCH toggles */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Preferred Program Track Duration Length:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {COURSE_DURATIONS.map(dur => (
                          <button
                            type="button"
                            key={dur.id}
                            onClick={() => setPreferredDuration(dur.id)}
                            className={`p-3 rounded-xl border text-xs font-medium transition-all text-center cursor-pointer ${
                              preferredDuration === dur.id
                                ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10"
                                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                            }`}
                          >
                            {dur.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Registration Desk Button Trigger */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-850 text-white rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer shadow-lg shadow-blue-600/10"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Compiling Acceptance Matrix...</span>
                        </div>
                      ) : (
                        <>
                          <span>Submit Application & Generate Acceptance</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* ========================================================= */
                  /* PREMIUM AUTOMATED ACCEPTANCE DOCUMENT GENERATOR LAYOUT */
                  /* ========================================================= */
                  <div className="space-y-6 animate-scaleIn">
                    <div className="p-8 bg-white text-slate-900 rounded-2xl border-4 border-double border-slate-300 shadow-2xl relative overflow-hidden font-serif">
                      
                      {/* Premium Security Document Watermark Grids */}
                      <div className="absolute right-[-20px] top-[-20px] p-8 bg-slate-100 rounded-full border border-slate-200 text-slate-300 transform rotate-12 select-none pointer-events-none">
                        <FileText className="h-24 w-24 opacity-10" />
                      </div>

                      {/* Letterhead Header Shield */}
                      <div className="text-center border-b-2 border-slate-900 pb-4 mb-6 font-sans">
                        <h4 className="text-2xl font-black tracking-tight text-[#1E3A8A] uppercase">IT International Academy</h4>
                        <p className="text-[10px] tracking-widest text-slate-500 uppercase font-bold mt-1">Zambia's Premier Hub for Elite Practical Technology Education</p>
                        <p className="text-[9px] text-slate-400 mt-0.5">Contact Vector: +260 779417675 | Lusaka Digital Synergy Hub HQ</p>
                      </div>

                      {/* Meta Tracking Credentials row */}
                      <div className="grid grid-cols-2 gap-4 text-[11px] font-sans text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-6">
                        <div>
                          <p><strong className="text-slate-900">Student Record Tracker ID:</strong> {acceptanceLetter.studentId}</p>
                          <p><strong className="text-slate-900">Cohort Execution Loop:</strong> <span className="font-bold text-blue-800">{INTAKE_CYCLES.find(c => c.id === targetIntake)?.name}</span></p>
                        </div>
                        <div className="text-right">
                          <p><strong className="text-slate-900">Issue Timestamp:</strong> {acceptanceLetter.issueDate}</p>
                          <p><strong className="text-slate-900">Program Velocity Track:</strong> <span className="font-bold text-slate-800">{COURSE_DURATIONS.find(d => d.id === preferredDuration)?.name}</span></p>
                        </div>
                      </div>

                      {/* Official Notification Wording Context Blocks */}
                      <div className="text-sm space-y-4 leading-relaxed text-slate-800 px-1 text-justify">
                        <p>Dear <strong className="text-slate-950 font-sans text-base">{studentName}</strong>,</p>
                        <p>
                          Following an automated algorithmic review of your institutional qualification matrices, we are pleased to confirm your official admission into the **{selectedCourse.title}** program at IT International Academy.
                        </p>
                        <p>
                          Your chosen selection parameters indicate enrollment for the highly selective **{INTAKE_CYCLES.find(c => c.id === targetIntake)?.name}**, running on a **{COURSE_DURATIONS.find(d => d.id === preferredDuration)?.name}** instructional layout blueprint. Practical runtime environment access and specialized Cisco router command line sandbox parameters will initialize precisely on cohort start dates.
                        </p>
                        <p>
                          As an elite candidate, a partial scholarship verification block has been generated for your assigned record framework, validating your system access protocols for our virtual campus grid.
                        </p>
                      </div>

                      {/* Signature block and official registry stamp */}
                      <div className="mt-8 pt-6 border-t border-slate-200 flex items-end justify-between font-sans">
                        <div className="text-xs text-slate-500">
                          <p className="font-mono text-[9px] text-slate-400">Security Ledger Validation Token Hash:</p>
                          <p className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block mt-0.5">{acceptanceLetter.validationCode}</p>
                        </div>
                        <div className="text-center w-40 border-t border-slate-400 pt-1">
                          <p className="text-xs font-bold text-slate-900">Office of the Registrar</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-wider">ITA Validation Matrix</p>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Printable Action Utilities */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => window.print()}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-white rounded-xl text-sm font-semibold cursor-pointer transition-colors"
                      >
                        <Download className="h-4 w-4 text-[#D4AF37]" />
                        <span>Print Official Document</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          setAcceptanceLetter(null);
                        }}
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold tracking-wide cursor-pointer transition-colors"
                      >
                        Proceed to Portal Gateway
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Courses;
