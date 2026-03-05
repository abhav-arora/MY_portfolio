import React from 'react';
import { FileText, ArrowUpRight, ArrowUp, ChevronRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    // Added relative here so the absolute button aligns to the footer bounds
    <footer className="bg-white dark:bg-[#0a0a0f] border-t border-slate-200 dark:border-white/10 pt-16 pb-8 px-6 md:px-12 relative z-10">
      
      {/* BIG, VISIBLE BACK TO TOP BUTTON - Right Aligned Center */}
      <a 
        href="#home"
        title="Back to Top"
        className="absolute right-6 md:right-12 top-[40%] md:top-1/2 -translate-y-1/2 group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-600 dark:bg-[#38bdf8] text-white dark:text-gray-900 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] hover:-mt-2 transition-all duration-300 z-50"
      >
        <ArrowUp size={28} className="group-hover:animate-bounce" />
      </a>

      <div className="max-w-7xl mx-auto pr-16 md:pr-24"> {/* Added right padding so text doesn't hide behind the big button */}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-2 flex flex-col items-start">
            <a href="#home" className="font-extrabold text-3xl tracking-tighter text-slate-900 dark:text-white mb-4 transition-transform hover:scale-105" style={{ fontFamily: "'Syne', sans-serif" }}>
              AA<span className="text-blue-600 dark:text-[#38bdf8]">.</span>
            </a>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
              Building intelligent, full-stack applications and exploring the bleeding edge of agentic AI. 
            </p>
            {/* Resume Button */}
            <a 
              href="/Abhav_Arora_Resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-[#38bdf8]/10 hover:border-blue-500 dark:hover:border-[#38bdf8] hover:text-blue-600 dark:hover:text-[#38bdf8] transition-all group shadow-sm hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            >
              <FileText size={16} className="text-slate-400 group-hover:text-blue-500 dark:group-hover:text-[#38bdf8] transition-colors" />
              View Resume
              <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-mono text-xs tracking-widest uppercase text-slate-900 dark:text-white mb-6">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="group flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-[#38bdf8] transition-colors"
                  >
                    <ChevronRight size={14} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-600 dark:text-[#38bdf8] mr-1" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col">
            <h4 className="font-mono text-xs tracking-widest uppercase text-slate-900 dark:text-white mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/abhav-arora" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:-translate-y-1 hover:scale-110 duration-200">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/abhavarora26" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0A66C2] transition-all hover:-translate-y-1 hover:scale-110 duration-200">
                <FaLinkedin size={20} />
              </a>
              <a href="https://x.com/AroraAbhav?t=MaSQYWmq5nW51s5NdCy-lg&s=09" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:-translate-y-1 hover:scale-110 duration-200">
                <FaXTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/abh.vv_off?igsh=MTUyazdjcGt1b2c0ZQ==" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#E1306C] transition-all hover:-translate-y-1 hover:scale-110 duration-200">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} Abhav Arora. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">
            Designed & Built by ABHAV ARORA 💗
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;