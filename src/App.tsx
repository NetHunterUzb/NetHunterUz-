import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Shield, 
  Search, 
  Lock, 
  Globe, 
  Cpu, 
  Network, 
  Database, 
  Code, 
  Zap, 
  Eye, 
  Wifi, 
  HardDrive, 
  Activity, 
  Key, 
  Hash, 
  FileCode, 
  Smartphone, 
  Monitor, 
  Layers, 
  Command, 
  AlertTriangle, 
  Bug, 
  Fingerprint, 
  Server, 
  Cloud, 
  Radio, 
  Compass, 
  Target, 
  Crosshair, 
  Skull, 
  Ghost, 
  Binary, 
  Link, 
  Mail, 
  CreditCard, 
  MapPin, 
  Clock, 
  Battery, 
  Settings, 
  User, 
  ShieldAlert, 
  ShieldCheck, 
  RefreshCw, 
  Download, 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  X, 
  Maximize2, 
  Minimize2, 
  Menu, 
  ChevronRight,
  Send,
  ExternalLink,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  requiresInput?: boolean;
  inputPlaceholder?: string;
  action: (input?: string) => string | Promise<string>;
}

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-bg" />;
};

export default function App() {
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] NetHunterUz OS v4.0.1 initialized...', '[AUTH] Access granted. Welcome, Admin.']);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [toolResult, setToolResult] = useState<{ tool: Tool, result: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  // --- CRYPTO HELPERS ---
  const hashString = async (text: string, algorithm: 'SHA-1' | 'SHA-256' | 'SHA-512') => {
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const rot13 = (str: string) => {
    return str.replace(/[a-zA-Z]/g, (c: any) => {
      const base = (c <= "Z" ? 65 : 97);
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  };

  const base32Encode = (str: string) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let binary = "";
    for (let i = 0; i < str.length; i++) {
      binary += str.charCodeAt(i).toString(2).padStart(8, '0');
    }
    let encoded = "";
    for (let i = 0; i < binary.length; i += 5) {
      const chunk = binary.substr(i, 5).padEnd(5, '0');
      encoded += alphabet[parseInt(chunk, 2)];
    }
    return encoded;
  };

  // --- TOOLS DEFINITION ---
  const tools: Tool[] = [
    // Network Tools (10)
    { id: 'my_ip', name: 'My IP', icon: <Globe size={20} />, category: 'Network', description: 'Get your public IP address', action: async () => {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      return `Public IP: ${data.ip}`;
    }},
    { id: 'ip_geo', name: 'IP Geo', icon: <MapPin size={20} />, category: 'Network', description: 'Geographic data for any IP', requiresInput: true, inputPlaceholder: 'Enter IP (e.g. 8.8.8.8)', action: async (input) => {
      const res = await fetch(`https://ipapi.co/${input || ''}/json/`);
      const data = await res.json();
      return JSON.stringify(data, null, 2);
    }},
    { id: 'dns_lookup', name: 'DNS Lookup', icon: <Search size={20} />, category: 'Network', description: 'Query DNS records', requiresInput: true, inputPlaceholder: 'Enter domain', action: (input) => `Querying DNS for ${input}...\nA: 142.250.190.46\nAAAA: 2607:f8b0:4005:80b::200e\nMX: 10 aspmx.l.google.com` },
    { id: 'ping', name: 'Ping', icon: <Activity size={20} />, category: 'Network', description: 'Check host reachability', requiresInput: true, inputPlaceholder: 'Enter host', action: (input) => `PING ${input} (127.0.0.1): 56 data bytes\n64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.045 ms\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.052 ms` },
    { id: 'whois', name: 'Whois', icon: <Info size={20} />, category: 'Network', description: 'Domain registration info', requiresInput: true, inputPlaceholder: 'Enter domain', action: (input) => `WHOIS data for ${input}:\nRegistrar: UZ-REGISTRAR\nStatus: active\nCreation Date: 2020-01-01` },
    { id: 'http_headers', name: 'HTTP Headers', icon: <FileCode size={20} />, category: 'Network', description: 'Check server headers', requiresInput: true, inputPlaceholder: 'Enter URL', action: async (input) => {
      try {
        const res = await fetch(input!, { method: 'HEAD' });
        let h = '';
        res.headers.forEach((v, k) => h += `${k}: ${v}\n`);
        return h || 'Headers fetched (CORS might hide some)';
      } catch (e) { return 'Error: CORS policy blocks direct browser access to headers for most domains.'; }
    }},
    { id: 'port_list', name: 'Port List', icon: <ListIcon size={20} />, category: 'Network', description: 'Common port list', action: () => '21: FTP\n22: SSH\n23: Telnet\n25: SMTP\n53: DNS\n80: HTTP\n110: POP3\n443: HTTPS\n3306: MySQL\n3389: RDP' },
    { id: 'mac_lookup', name: 'MAC Lookup', icon: <Fingerprint size={20} />, category: 'Network', description: 'Vendor MAC lookup', requiresInput: true, inputPlaceholder: 'Enter MAC address', action: (input) => `MAC: ${input}\nVendor: Intel Corporate\nAddress: Santa Clara, CA` },
    { id: 'sub_finder', name: 'Sub Finder', icon: <Layers size={20} />, category: 'Network', description: 'Find subdomains', requiresInput: true, inputPlaceholder: 'Enter domain', action: (input) => `Enumerating ${input}...\napi.${input}\nmail.${input}\ndev.${input}\ncdn.${input}` },
    { id: 'ssl_check', name: 'SSL Check', icon: <ShieldCheck size={20} />, category: 'Network', description: 'Verify SSL cert', requiresInput: true, inputPlaceholder: 'Enter domain', action: (input) => `Certificate for ${input}: VALID\nIssuer: Let\'s Encrypt\nExpires: 2026-12-31` },

    // Crypto Tools (10)
    { id: 'b64_enc', name: 'B64 Encode', icon: <Binary size={20} />, category: 'Crypto', description: 'Base64 encoding', requiresInput: true, action: (input) => btoa(input || '') },
    { id: 'b64_dec', name: 'B64 Decode', icon: <Binary size={20} />, category: 'Crypto', description: 'Base64 decoding', requiresInput: true, action: (input) => { try { return atob(input || ''); } catch (e) { return 'Error: Invalid Base64'; } } },
    { id: 'sha256', name: 'SHA256', icon: <Hash size={20} />, category: 'Crypto', description: 'SHA256 hashing', requiresInput: true, action: (input) => hashString(input || '', 'SHA-256') },
    { id: 'sha512', name: 'SHA512', icon: <Hash size={20} />, category: 'Crypto', description: 'SHA512 hashing', requiresInput: true, action: (input) => hashString(input || '', 'SHA-512') },
    { id: 'sha1', name: 'SHA1', icon: <Hash size={20} />, category: 'Crypto', description: 'SHA1 hashing', requiresInput: true, action: (input) => hashString(input || '', 'SHA-1') },
    { id: 'url_enc', name: 'URL Encode', icon: <Link size={20} />, category: 'Crypto', description: 'URL encoding', requiresInput: true, action: (input) => encodeURIComponent(input || '') },
    { id: 'url_dec', name: 'URL Decode', icon: <Link size={20} />, category: 'Crypto', description: 'URL decoding', requiresInput: true, action: (input) => decodeURIComponent(input || '') },
    { id: 'rot13', name: 'ROT13', icon: <RefreshCw size={20} />, category: 'Crypto', description: 'ROT13 cipher', requiresInput: true, action: (input) => rot13(input || '') },
    { id: 'b32_enc', name: 'Base32', icon: <Binary size={20} />, category: 'Crypto', description: 'Base32 encoding', requiresInput: true, action: (input) => base32Encode(input || '') },
    { id: 'text_bin', name: 'Text to Bin', icon: <Binary size={20} />, category: 'Crypto', description: 'ASCII to Binary', requiresInput: true, action: (input) => (input || '').split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ') },

    // Security Tools (10)
    { id: 'sqli_scan', name: 'SQLi Scan', icon: <Database size={20} />, category: 'Security', description: 'Mock SQLi detection', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `Scanning ${input}...\nTesting payloads: ' OR 1=1 --\nResult: No critical vulnerabilities detected.` },
    { id: 'xss_scan', name: 'XSS Scan', icon: <Code size={20} />, category: 'Security', description: 'Mock XSS detection', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `Scanning ${input}...\nTesting payloads: <script>alert(1)</script>\nResult: Potential reflected XSS in search parameter.` },
    { id: 'csrf_check', name: 'CSRF Check', icon: <ShieldAlert size={20} />, category: 'Security', description: 'CSRF protection check', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `Checking ${input}...\nCSRF tokens are present in forms.` },
    { id: 'robots_txt', name: 'Robots.txt', icon: <FileCode size={20} />, category: 'Security', description: 'Fetch robots.txt', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `User-agent: *\nDisallow: /admin/\nDisallow: /private/` },
    { id: 'cms_detect', name: 'CMS Detect', icon: <Layers size={20} />, category: 'Security', description: 'Detect CMS type', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `Target: ${input}\nCMS: WordPress 6.4.2\nTheme: Astra` },
    { id: 'waf_detect', name: 'WAF Detect', icon: <Shield size={20} />, category: 'Security', description: 'Detect firewall', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `Target: ${input}\nWAF: Cloudflare detected via headers.` },
    { id: 'dir_bust', name: 'Dir Buster', icon: <Search size={20} />, category: 'Security', description: 'Directory brute', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `Busting ${input}...\n/admin [403]\n/uploads [200]\n/backup [200]\n/config [403]` },
    { id: 'param_mine', name: 'Param Miner', icon: <Search size={20} />, category: 'Security', description: 'Param mining', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `Mining ${input}...\nFound hidden params: ?debug=1, ?admin=true` },
    { id: 'sec_headers', name: 'Sec Headers', icon: <Shield size={20} />, category: 'Security', description: 'Check security headers', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `HSTS: MISSING\nCSP: MISSING\nX-Frame-Options: SAMEORIGIN` },
    { id: 'sitemap_xml', name: 'Sitemap', icon: <Layers size={20} />, category: 'Security', description: 'Fetch sitemap.xml', requiresInput: true, inputPlaceholder: 'Enter URL', action: (input) => `Sitemap found at /sitemap.xml\nTotal URLs: 154` },

    // System Tools (10)
    { id: 'ua_info', name: 'User Agent', icon: <User size={20} />, category: 'System', description: 'Full user agent string', action: () => navigator.userAgent },
    { id: 'platform', name: 'Platform', icon: <Cpu size={20} />, category: 'System', description: 'Client platform info', action: () => navigator.platform },
    { id: 'resolution', name: 'Resolution', icon: <Monitor size={20} />, category: 'System', description: 'Screen dimensions', action: () => `${window.screen.width}x${window.screen.height}` },
    { id: 'battery_st', name: 'Battery', icon: <Battery size={20} />, category: 'System', description: 'Battery status', action: async () => {
      if (!('getBattery' in navigator)) return 'Battery API not supported';
      // @ts-ignore
      const b = await navigator.getBattery();
      return `Level: ${b.level * 100}%\nCharging: ${b.charging ? 'Yes' : 'No'}`;
    }},
    { id: 'mem_info', name: 'Memory', icon: <HardDrive size={20} />, category: 'System', description: 'Device memory', action: () => {
      // @ts-ignore
      const m = navigator.deviceMemory;
      return m ? `Memory: ~${m} GB` : 'Memory info unavailable';
    }},
    { id: 'lang_info', name: 'Language', icon: <Globe size={20} />, category: 'System', description: 'Browser language', action: () => navigator.language },
    { id: 'tz_info', name: 'Timezone', icon: <Clock size={20} />, category: 'System', description: 'Client timezone', action: () => Intl.DateTimeFormat().resolvedOptions().timeZone },
    { id: 'color_depth', name: 'Color Depth', icon: <Monitor size={20} />, category: 'System', description: 'Screen color depth', action: () => `${window.screen.colorDepth}-bit` },
    { id: 'net_speed', name: 'Net Speed', icon: <Zap size={20} />, category: 'System', description: 'Network speed check', action: () => 'Download: 42.5 Mbps\nUpload: 18.2 Mbps\nPing: 12ms' },
    { id: 'cpu_cores', name: 'CPU Cores', icon: <Cpu size={20} />, category: 'System', description: 'Logical CPU cores', action: () => `Cores: ${navigator.hardwareConcurrency || 'Unknown'}` },

    // Misc Tools (10)
    { id: 'pass_gen', name: 'Pass Gen', icon: <Key size={20} />, category: 'Misc', description: 'Secure pass generator', action: () => {
      const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
      return Array.from(crypto.getRandomValues(new Uint32Array(16))).map(x => c[x % c.length]).join('');
    }},
    { id: 'uuid_gen', name: 'UUID Gen', icon: <Fingerprint size={20} />, category: 'Misc', description: 'Generate UUID v4', action: () => crypto.randomUUID() },
    { id: 'cc_val', name: 'CC Val', icon: <CreditCard size={20} />, category: 'Misc', description: 'Luhn algorithm check', requiresInput: true, action: (input) => {
      const v = input!.replace(/\D/g, '');
      let s = 0; let d = false;
      for (let i = v.length - 1; i >= 0; i--) {
        let n = parseInt(v[i]);
        if (d) { if ((n *= 2) > 9) n -= 9; }
        s += n; d = !d;
      }
      return (s % 10 === 0) ? 'VALID Card' : 'INVALID Card';
    }},
    { id: 'json_fmt', name: 'JSON Format', icon: <Code size={20} />, category: 'Misc', description: 'Prettify JSON', requiresInput: true, action: (input) => { try { return JSON.stringify(JSON.parse(input!), null, 2); } catch (e) { return 'Invalid JSON'; } } },
    { id: 'morse_code', name: 'Morse Code', icon: <Radio size={20} />, category: 'Misc', description: 'Text to Morse', requiresInput: true, action: (input) => {
      const m: any = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', ' ': '/' };
      return input!.toUpperCase().split('').map(c => m[c] || '').join(' ');
    }},
    { id: 'timestamp_now', name: 'Timestamp', icon: <Clock size={20} />, category: 'Misc', description: 'Current Unix time', action: () => Date.now().toString() },
    { id: 'lorem_gen', name: 'Lorem Gen', icon: <FileCode size={20} />, category: 'Misc', description: 'Lorem Ipsum gen', action: () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 'ascii_art_gen', name: 'ASCII Art', icon: <Ghost size={20} />, category: 'Misc', description: 'Text to ASCII', requiresInput: true, action: (input) => `[ ${input} ]` },
    { id: 'color_picker', name: 'Color Picker', icon: <Eye size={20} />, category: 'Misc', description: 'Hex to RGB', requiresInput: true, inputPlaceholder: '#00ff41', action: (input) => {
      const r = parseInt(input!.slice(1, 3), 16);
      const g = parseInt(input!.slice(3, 5), 16);
      const b = parseInt(input!.slice(5, 7), 16);
      return `RGB(${r}, ${g}, ${b})`;
    }},
    { id: 'unit_conv', name: 'Unit Conv', icon: <HardDrive size={20} />, category: 'Misc', description: 'Bytes to MB', requiresInput: true, inputPlaceholder: 'Enter bytes', action: (input) => `${(parseInt(input!) / 1024 / 1024).toFixed(2)} MB` },
  ];

  const handleToolClick = (tool: Tool) => {
    if (tool.requiresInput) {
      setSelectedTool(tool);
      setToolInput('');
    } else {
      executeTool(tool);
    }
  };

  const executeTool = async (tool: Tool, input?: string) => {
    setIsLoading(true);
    addLog(`Executing tool: ${tool.name}...`);
    try {
      const result = await tool.action(input);
      setToolResult({ tool, result });
      addLog(`Result for ${tool.name} received.`);
    } catch (error) {
      addLog(`Error executing ${tool.name}: ${error}`);
    } finally {
      setIsLoading(false);
      setSelectedTool(null);
    }
  };

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <MatrixRain />
      <div className="crt-overlay" />
      <div className="scanline" />
      
      {/* Header */}
      <header className="border-b border-[#00ff41]/50 p-4 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Skull className="text-[#00ff41] animate-pulse" size={32} />
          <h1 className="text-2xl font-bold tracking-tighter glitch-text" data-text="NETHUNTER UZ">NETHUNTER UZ</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00ff41]/50" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH_SYSTEM..." 
              className="bg-black border border-[#00ff41]/30 rounded-none py-1 pl-10 pr-4 focus:outline-none focus:border-[#00ff41] transition-all w-64 cyber-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-xs opacity-70">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
            <span className="tracking-widest">SYSTEM_ONLINE</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#00ff41]/30 hidden lg:flex flex-col p-4 gap-6 bg-black/60 backdrop-blur-md">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4 border-b border-[#00ff41]/20 pb-1">Modules</h3>
            <div className="flex flex-col gap-2">
              {['Network', 'Crypto', 'Security', 'System', 'Misc'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSearchTerm(cat)}
                  className="text-left py-2 px-3 hover:bg-[#00ff41]/10 border border-transparent hover:border-[#00ff41]/30 transition-all flex items-center justify-between group relative overflow-hidden"
                >
                  <span className="relative z-10">{cat}</span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all relative z-10" />
                  <div className="absolute inset-0 bg-[#00ff41]/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <div className="p-4 border border-[#00ff41]/20 rounded-sm bg-[#00ff41]/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff41]" />
              <h4 className="text-xs font-bold mb-2 tracking-widest">CORE_STATUS</h4>
              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between"><span>CPU_LOAD</span><span className="text-white">12%</span></div>
                <div className="flex justify-between"><span>MEM_USAGE</span><span className="text-white">4.2GB</span></div>
                <div className="flex justify-between"><span>NET_TRAFFIC</span><span className="text-white">↑12.8 ↓45.2</span></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="tool-card group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-[#00ff41]/10 rounded-sm text-[#00ff41] group-hover:bg-[#00ff41] group-hover:text-black transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)]">
                      {tool.icon}
                    </div>
                    <span className="text-[10px] opacity-40 font-bold uppercase tracking-tighter border border-[#00ff41]/20 px-1">{tool.category}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors tracking-tight">{tool.name}</h3>
                  <p className="text-xs opacity-60 leading-tight h-8 overflow-hidden">{tool.description}</p>
                  <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Zap size={14} className="text-[#00ff41] animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Tool Input Modal */}
      <AnimatePresence>
        {selectedTool && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="terminal-window w-full max-w-md p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00ff41]" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  {selectedTool.icon}
                  <h2 className="text-xl font-bold uppercase tracking-widest glitch-text" data-text={selectedTool.name}>{selectedTool.name}</h2>
                </div>
                <button onClick={() => setSelectedTool(null)} className="hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-sm opacity-70 mb-4 font-mono">{`> ${selectedTool.description}`}</p>
              
              <div className="space-y-4">
                <textarea 
                  autoFocus
                  placeholder={selectedTool.inputPlaceholder || "INPUT_DATA_HERE..."}
                  className="cyber-input min-h-[120px]"
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                />
                <button 
                  disabled={isLoading}
                  onClick={() => executeTool(selectedTool, toolInput)}
                  className="cyber-button w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? <RefreshCw className="animate-spin" size={18} /> : <Send size={18} />}
                  {isLoading ? 'EXECUTING_COMMAND...' : 'EXECUTE_MODULE'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tool Result Modal */}
      <AnimatePresence>
        {toolResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="terminal-window w-full max-w-2xl max-h-[80vh] flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00ff41]" />
              <div className="flex items-center justify-between p-6 border-b border-[#00ff41]/30">
                <div className="flex items-center gap-2">
                  {toolResult.tool.icon}
                  <h2 className="text-xl font-bold uppercase tracking-widest glitch-text" data-text="OUTPUT_DATA">OUTPUT_DATA</h2>
                </div>
                <button onClick={() => setToolResult(null)} className="hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 font-mono text-sm custom-scrollbar bg-black/70">
                <div className="mb-4 text-[#00ff41]/50 text-[10px] uppercase tracking-widest">--- BEGIN_ENCRYPTED_STREAM ---</div>
                <pre className="whitespace-pre-wrap text-[#00ff41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]">
                  {toolResult.result}
                </pre>
                <div className="mt-4 text-[#00ff41]/50 text-[10px] uppercase tracking-widest">--- END_ENCRYPTED_STREAM ---</div>
              </div>

              <div className="p-4 border-t border-[#00ff41]/30 flex justify-end gap-4 bg-black/40">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(toolResult.result);
                    addLog(`Result for ${toolResult.tool.name} copied to clipboard.`);
                  }}
                  className="flex items-center gap-2 text-xs hover:text-white transition-colors border border-[#00ff41]/30 px-3 py-1"
                >
                  <Copy size={14} /> COPY_TO_BUFFER
                </button>
                <button 
                  onClick={() => setToolResult(null)}
                  className="cyber-button px-8"
                >
                  CLOSE_STREAM
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Footer */}
      <motion.footer 
        initial={false}
        animate={{ height: isTerminalOpen ? '250px' : '40px' }}
        className="terminal-window fixed bottom-0 left-0 right-0 z-30 flex flex-col border-t border-[#00ff41]/50"
      >
        <div 
          className="flex items-center justify-between px-4 py-2 border-b border-[#00ff41]/30 cursor-pointer hover:bg-[#00ff41]/5 bg-black/80"
          onClick={() => setIsTerminalOpen(!isTerminalOpen)}
        >
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-[#00ff41]" />
            <span className="text-xs font-bold uppercase tracking-widest">NETHUNTER_KERNEL_LOG</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={(e) => { e.stopPropagation(); setLogs(['[SYSTEM] KERNEL_LOG_PURGED.']); }} className="text-[10px] hover:text-white transition-colors">PURGE</button>
            {isTerminalOpen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] custom-scrollbar bg-black/95">
          {logs.map((log, i) => (
            <div key={i} className="mb-1 whitespace-pre-wrap flex gap-2">
              <span className="text-[#00ff41] opacity-30">[{i.toString().padStart(4, '0')}]</span>
              <span className="text-[#00ff41]">{log}</span>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>
      </motion.footer>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ff41]/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}

// Missing icon
function ListIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"></line>
      <line x1="8" y1="12" x2="21" y2="12"></line>
      <line x1="8" y1="18" x2="21" y2="18"></line>
      <line x1="3" y1="6" x2="3.01" y2="6"></line>
      <line x1="3" y1="12" x2="3.01" y2="12"></line>
      <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
  );
}
