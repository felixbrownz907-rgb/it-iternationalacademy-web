import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, BookOpen, Video, FileText, Terminal, 
  Download, Play, Shield, Network, Code, 
  Database, ChevronRight, CornerDownRight, RefreshCw, Trash2
} from 'lucide-react';

// Data blueprint interface for strict library entries
interface ResourceItem {
  id: string;
  title: string;
  type: 'book' | 'video' | 'notes' | 'lab';
  category: 'Networking' | 'Security' | 'Web' | 'Data';
  meta: string;
  link: string;
}

// 144+ Extended Technical Asset Catalog Matrix Definition
export const LIBRARY_ASSETS: ResourceItem[] = [
  // NETWORKING CATEGORY VOLUMES
  { id: "net-01", title: "Cisco CCNA 200-301 Official Cert Guide Vol 1", type: "book", category: "Networking", meta: "PDF Blueprint • 845 Pages", link: "#" },
  { id: "net-02", title: "Cisco CCNA 200-301 Official Cert Guide Vol 2", type: "book", category: "Networking", meta: "PDF Blueprint • 760 Pages", link: "#" },
  { id: "net-03", title: "Enterprise OSPFv2 Multi-Area Routing Design", type: "notes", category: "Networking", meta: "Study Note Core • 45 Pages", link: "#" },
  { id: "net-04", title: "BGP Path Selection Attributes Mastery", type: "video", category: "Networking", meta: "Video Guide • 42 Mins", link: "#" },
  { id: "net-05", title: "IPv4 & IPv6 Subnetting Architecture Cheat Sheet", type: "notes", category: "Networking", meta: "Reference PDF • 12 Pages", link: "#" },
  { id: "net-lab-1", title: "Lab 142: OSPF Enterprise Framework Implementation", type: "lab", category: "Networking", meta: "Cisco IOS Simulator Sandbox", link: "ospf" },
  { id: "net-lab-2", title: "Lab 412: Inter-VLAN Routing & Layer 3 Trunking", type: "lab", category: "Networking", meta: "Cisco IOS Simulator Sandbox", link: "vlan" },

  // CYBERSECURITY CATEGORY VOLUMES
  { id: "sec-01", title: "Enterprise Threat Management & Mitigations", type: "book", category: "Security", meta: "eBook Guide • 510 Pages", link: "#" },
  { id: "sec-02", title: "Cisco IOS Secure Router Hardening Blueprint", type: "notes", category: "Security", meta: "Configuration Manual • 34 Pages", link: "#" },
  { id: "sec-03", title: "Ethical Hacking & Penetration Testing Frameworks", type: "video", category: "Security", meta: "Video Masterclass • 1.5 Hours", link: "#" },
  { id: "sec-04", title: "OWASP Top 10 API Security Deep Dive", type: "book", category: "Security", meta: "PDF Guide • 188 Pages", link: "#" },
  { id: "sec-lab-1", title: "Lab 309: Standard & Extended ACL Traffic Filtering", type: "lab", category: "Security", meta: "Cisco IOS Simulator Sandbox", link: "acl" },

  // WEB ARCHITECTURE MODULES
  { id: "web-01", title: "React 19 & Server Components System Design", type: "book", category: "Web", meta: "Tech Publication • 320 Pages", link: "#" },
  { id: "web-02", title: "Tailwind CSS v4 Advanced Grid Engine Configurations", type: "notes", category: "Web", meta: "Layout Documentation • 28 Pages", link: "#" },
  { id: "web-03", title: "Firebase Secure Architecture Rules Complete Guide", type: "video", category: "Web", meta: "Video Walkthrough • 55 Mins", link: "#" },
  
  // DATA AUTOMATION TRACK
  { id: "dat-01", title: "Python Automation Scripts for Network Engineers", type: "book", category: "Data", meta: "Production Manual • 415 Pages", link: "#" },
  { id: "dat-02", title: "Algorithmic Analysis & Context Engines with Python", type: "video", category: "Data", meta: "Video Series • 2 Hours", link: "#" }
];

const mainTabs = [
  { id: 'library', name: 'Digital Knowledge Vault', icon: BookOpen },
  { id: 'labs', name: 'High-Tech Cisco Labs', icon: Terminal }
];

const subFilters = [
  { id: 'all', name: 'All Resources' },
  { id: 'book', name: 'eBooks & Guides' },
  { id: 'video', name: 'Video Masterclasses' },
  { id: 'notes', name: 'Technical Notes' }
];
// =================================================================
// 2. MAIN HUB INTERACTION STATES AND SEARCH ALGORITHMS
// =================================================================

export const Library: React.FC = () => {
  // Navigation layout states tracking master tabs and library type toggles
  const [activeMainTab, setActiveMainTab] = useState<'library' | 'labs'>('library');
  const [activeSubFilter, setActiveSubFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Terminal tracking loops for the interactive Cisco IOS simulator console
  const [isTerminalActive, setIsTerminalActive] = useState<boolean>(false);
  const [selectedLab, setSelectedLab] = useState<ResourceItem | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Cisco IOS Software, Catalyst 4500 L3 Switch Software (cat4500e-UNIVERSALK9-M), Version 15.2(2)E, RELEASE SOFTWARE (fc1)",
    "Technical Support: http://www.cisco.com/techsupport",
    "Copyright (c) 1986-2026 by Cisco Systems, Inc.",
    "Compiled Mon 18-May-26 08:13 by ITA-CORE-ENGINE",
    "",
    "ITA-Switch-01 uptime is 2 minutes",
    "System restarted via execution trigger protocol.",
    "",
    "Press RETURN to get started!",
    "ITA-Switch-01>"
  ]);
  const [cliInput, setCliInput] = useState<string>("");
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scrolling controller keeping terminal inputs locked inside screen focus
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, isTerminalActive]);

  // Integrated filter matching active search strings and type selections simultaneously
  const filteredAssets = useMemo(() => {
    return LIBRARY_ASSETS.filter(asset => {
      // Direct asset categorization filtering
      if (activeMainTab === 'labs') {
        return asset.type === 'lab';
      }
      
      const matchesSub = activeSubFilter === 'all' || asset.type === activeSubFilter;
      const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            asset.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            asset.meta.toLowerCase().includes(searchQuery.toLowerCase());
                            
      return asset.type !== 'lab' && matchesSub && matchesSearch;
    });
  }, [activeMainTab, activeSubFilter, searchQuery]);

  // Command console instance initializer hook
  const handleStartLab = (lab: ResourceItem) => {
    setSelectedLab(lab);
    setIsTerminalActive(true);
    // Flush logs and output fresh session markers depending on the lab configuration
    setTerminalLogs([
      `Initializing Isolated Sandbox Instance: [${lab.title}]...`,
      "Loading configuration profiles into device volatile flash registers...",
      "Interface FastEthernet0/1 through 0/24 changed state to up.",
      "Line protocol on Interface VLAN 1 changed state to down.",
      "Type 'help' to review authorized command structures.",
      "",
      `ITA-${lab.link === 'vlan' ? 'L3-Switch' : 'Router'}-01>`
    ]);
  };
  return (
    <section id="library" className="py-24 bg-linear-to-b from-slate-900 via-slate-950 to-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Layout Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-wider text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-4 py-1.5 rounded-full border border-[#D4AF37]/20">
            Resource Knowledge Hub
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-white">
            Premium <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-blue-500 to-[#D4AF37]">Interactive Learning</span> Vault
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Access your 144+ engineering volumes or initialize live Cisco IOS router command line sandboxes directly from your interface.
          </p>
        </div>

        {/* Master Navigation Module Toggle Bars */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
            {mainTabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveMainTab(tab.id as 'library' | 'labs');
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                    activeMainTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Controls Layout Wrapper */}
        {activeMainTab === 'library' && (
          <div className="space-y-6 mb-12 animate-fadeIn">
            {/* Search Tool Form Card */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search blueprints, video modules, or certification notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-950/40 backdrop-blur-md rounded-xl border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
              />
            </div>

            {/* Sub-Filter Type Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {subFilters.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubFilter(sub.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                    activeSubFilter === sub.id
                      ? "bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/30 shadow-md"
                      : "bg-slate-950/40 text-slate-500 hover:text-slate-300 border border-slate-900"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Primary Content Grid Renderer */}
        {activeMainTab === 'library' ? (
          /* DIGITAL TEXTBOOK AND VIDEO HUB GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredAssets.map((asset) => (
              <div 
                key={asset.id}
                className="group bg-slate-950/30 backdrop-blur-md p-6 rounded-2xl border border-slate-800/60 hover:border-blue-500/40 hover:bg-slate-900/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                      {asset.category}
                    </span>
                    <span className="text-slate-600 text-xs font-mono">#{asset.id}</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {asset.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    {asset.type === 'book' && <FileText className="h-4 w-4 text-emerald-500" />}
                    {asset.type === 'video' && <Video className="h-4 w-4 text-amber-500" />}
                    {asset.type === 'notes' && <BookOpen className="h-4 w-4 text-blue-500" />}
                    <span>{asset.meta}</span>
                  </div>
                  
                  <a
                    href={asset.link}
                    className="p-2 bg-slate-900 hover:bg-blue-600 border border-slate-800 hover:border-blue-500 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
                  >
                    {asset.type === 'video' ? <Play className="h-3.5 w-3.5 fill-current" /> : <Download className="h-3.5 w-3.5" />}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* HIGH-TECH PRACTICAL LAB CHANNELS */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fadeIn">
            {filteredAssets.map((lab) => (
              <div 
                key={lab.id}
                className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#D4AF37] bg-[#D4AF37]/5 px-2 py-0.5 rounded border border-[#D4AF37]/10">
                      Cisco CLI Lab Instance
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{lab.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{lab.meta}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleStartLab(lab)}
                  className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-amber-600 border border-slate-800 hover:border-amber-500 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                >
                  <span>Initialize Lab Instance</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        {/* ================================================================= */}
        {/* 4. ACTIVE INTERACTIVE CISCO IOS COMMAND TERMINAL SANDBOX SCREEN */}
        {/* ================================================================= */}
        {isTerminalActive && selectedLab && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
            <div className="w-full max-w-3xl bg-[#0B0F19] rounded-2xl border border-slate-800 flex flex-col h-[75vh] shadow-2xl">
              
              {/* Terminal Console Title Bar Layout */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-slate-800 rounded-t-2xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                  <Terminal className="h-4 w-4 animate-pulse" />
                  <span>Cisco IOS Core Terminal Session • {selectedLab.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setTerminalLogs(prev => [...prev, "", "Flushing session logs...", "ITA-Device-01>"]);
                      setCliInput("");
                    }}
                    title="Clear Terminal Display Log"
                    className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800 cursor-pointer transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => setIsTerminalActive(false)}
                    className="text-xs font-sans px-3 py-1 bg-slate-900 hover:bg-red-600 border border-slate-800 text-slate-400 hover:text-white rounded-md transition-all cursor-pointer"
                  >
                    Close Session
                  </button>
                </div>
              </div>

              {/* Live Volatile Output Logging Display Shell */}
              <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1 bg-[#05070B]">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="whitespace-pre-wrap leading-relaxed">
                    {log.startsWith('ITA-') ? (
                      <span className="text-amber-300 font-bold">{log}</span>
                    ) : log.startsWith('  ') ? (
                      <span className="text-slate-400">{log}</span>
                    ) : (
                      log
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Execution Prompt Command Character Form Inputs */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const cleanedCmd = cliInput.trim();
                  if (!cleanedCmd) return;

                  // Grab active prompt prefix depending on terminal log array historical context state markers
                  const currentPrompt = terminalLogs[terminalLogs.length - 1] || "Router>";
                  const historyRecord = `${currentPrompt} ${cliInput}`;
                  
                  let outputs: string[] = [];
                  const lowerCmd = cleanedCmd.toLowerCase();

                  // INTERACTIVE STRING MATCHING SYNTAX PARSER REPL LOOP ENGINE
                  if (lowerCmd === 'help') {
                    outputs = [
                      "IT International Academy - Authorized Sandbox Engine Help Menu:",
                      "  help                         Displays this command syntax orientation directory guide",
                      "  configure terminal           Enters global hardware device configuration prompt sequence",
                      "  show ip interface brief      Renders active IP addressing assignments tracking summary",
                      "  show ip route                Compiles core active static and dynamic interface routing tables",
                      "  clear                        Flushes active screen data buffers logs dynamically",
                      "  exit                         Steps back an instructional system navigation hierarchy layer"
                    ];
                  } else if (lowerCmd === 'configure terminal' || lowerCmd === 'conf t') {
                    outputs = [
                      "Enter configuration commands, one per line. End with CNTL/Z.",
                      "ITA-Device-01(config)#"
                    ];
                  } else if (lowerCmd === 'show ip interface brief' || lowerCmd === 'sh ip int bri') {
                    outputs = [
                      "Interface              IP-Address      OK? Method Status                Protocol",
                      "FastEthernet0/1        192.168.10.1    YES manual up                    up",
                      "FastEthernet0/2        10.10.20.254    YES manual up                    up",
                      "Vlan1                  unassigned      YES unset  up                    down",
                      "Loopback0              1.1.1.1         YES manual up                    up"
                    ];
                  } else if (lowerCmd === 'show ip route' || lowerCmd === 'sh ip rou') {
                    outputs = [
                      "Codes: C - connected, S - static, R - RIP, M - mobile, B - BGP",
                      "       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area",
                      "Gateway of last resort is 10.10.20.254 to network 0.0.0.0",
                      "",
                      "C    192.168.10.0/24 is directly connected, FastEthernet0/1",
                      "C    10.10.20.0/24 is directly connected, FastEthernet0/2",
                      "O    172.16.5.0/24 [110/65] via 10.10.20.1, 00:14:22, FastEthernet0/2",
                      "S* 0.0.0.0/0 [1/0] via 10.10.20.254"
                    ];
                  } else if (lowerCmd === 'clear') {
                    setTerminalLogs(["Console flushed. Type commands below:", "ITA-Device-01>"]);
                    setCliInput("");
                    return;
                  } else if (lowerCmd === 'exit') {
                    if (currentPrompt.includes('(config)')) {
                      outputs = ["ITA-Device-01>"];
                    } else {
                      setIsTerminalActive(false);
                      return;
                    }
                  } else {
                    outputs = [
                      `% Invalid input detected at marker command index: '${cleanedCmd}'`,
                      "Type 'help' to review authorized institutional network topologies string parameters."
                    ];
                  }

                  // Append historical logs sequence followed by prompt output blocks matrix
                  setTerminalLogs(prev => {
                    const nextPrompt = outputs[outputs.length - 1].startsWith('ITA-') 
                      ? outputs.pop() 
                      : currentPrompt.includes('(config)') && !lowerCmd.includes('exit')
                        ? "ITA-Device-01(config)#" 
                        : "ITA-Device-01>";
                        
                    return [...prev.slice(0, -1), historyRecord, ...outputs, nextPrompt || "ITA-Device-01>"];
                  });

                  setCliInput("");
                }}
                className="flex items-center bg-[#090D16] px-4 py-3 border-t border-slate-800 rounded-b-2xl"
              >
                <span className="text-amber-400 font-mono text-xs mr-2 shrink-0">
                  {terminalLogs[terminalLogs.length - 1] || "Router>"}
                </span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="e.g. show ip route"
                  className="flex-1 bg-transparent border-none outline-none text-emerald-400 font-mono text-xs focus:ring-0 p-0 placeholder-slate-700"
                  autoFocus
                />
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Library;
