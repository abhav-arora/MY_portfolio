import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import ProfilePhoto from './assets/20260125_203818.jpg';
import { Terminal, User, BookOpen, Download, Award, Gamepad2, Github, Linkedin, Code2 } from 'lucide-react';
import { useIsMobile } from './useIsMobile';
import { useThemeObserver } from './useThemeObserver';

const About = () => {
  const [activeCommand, setActiveCommand] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  const isMobile = useIsMobile();
  const isDark = useThemeObserver();
  const isInView = useInView(containerRef, { margin: "-100px" });

  const isDarkRef = useRef(isDark);
  const isInViewRef = useRef(isInView);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);
  useEffect(() => { isInViewRef.current = isInView; }, [isInView]);

  // --- Cybernetic Interactive Background Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    const spacing = isMobile ? 60 : 45; // Wider spacing for mobile performance

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          nodes.push({ baseX: x, baseY: y, x: x, y: y });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      if (!isInViewRef.current) return; // PAUSE ANIMATION IF OFF-SCREEN

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dynamic Colors for Grid
      const rgbColor = isDarkRef.current ? '56, 189, 248' : '30, 41, 59'; 

      nodes.forEach(node => {
        const dx = mousePos.current.x - node.baseX;
        const dy = mousePos.current.y - node.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const hoverRadius = isMobile ? 80 : 120; 
        let opacity = isDarkRef.current ? 0.15 : 0.08; 
        let radius = 1.2; 

        if (dist < hoverRadius) {
          const pull = (hoverRadius - dist) / hoverRadius;
          node.x = node.baseX + (dx * pull * 0.15); 
          node.y = node.baseY + (dy * pull * 0.15);
          opacity = (isDarkRef.current ? 0.15 : 0.08) + (pull * 0.5); 
          radius = 1.2 + (pull * 1.5); 
        } else {
          node.x += (node.baseX - node.x) * 0.1;
          node.y += (node.baseY - node.y) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbColor}, ${opacity})`;
        ctx.fill();
      });
    };

    draw();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => { mousePos.current = { x: -1000, y: -1000 }; };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  const commands = [
    {
      id: 0,
      icon: <User size={16} />,
      title: "Whoami",
      content: (
        <div className="space-y-4">
          <p><span className={isDark ? "text-emerald-400" : "text-emerald-600 font-bold"}>abhav@ubuntu:~$</span> cat identity.txt</p>
          <p className={isDark ? "text-slate-300" : "text-slate-800"}>
            I’m an AI and Data Science undergraduate at IIT Patna interested in building intelligent and scalable software systems.
            My interests include full-stack web development, machine learning, and applying AI concepts to practical projects.
            I enjoy turning ideas into real applications while focusing on clean code, good design, and efficient solutions.
          </p>
          <p className={isDark ? "text-slate-300" : "text-slate-800"}>
            When I'm not writing C++ for grinding DSA, I'm deep-diving into Agentic AI architectures and full stack applications.
          </p>
        </div>
      )
    },
    {
      id: 1,
      icon: <BookOpen size={16} />,
      title: "Academics",
      content: (
        <div className="space-y-4">
          <p><span className={isDark ? "text-emerald-400" : "text-emerald-600 font-bold"}>abhav@ubuntu:~$</span> ./fetch_records.sh</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {[
              { label: "Institution", val: "IIT Patna" },
              { label: "Major", val: "Artificial Intelligence & Data Science" },
              { label: "Status", val: "B.Tech Undergraduate (4th sem)" },
              { label: "Grades", val: "8.34 CGPA" }
            ].map((item, i) => (
              <div key={i} className={`border p-3 rounded transition-colors ${isDark ? 'border-slate-700 bg-slate-800/50 hover:border-blue-500/50' : 'border-slate-200 bg-slate-100 hover:border-blue-500 text-slate-900'}`}>
                <span className="text-blue-500 dark:text-blue-400 block text-xs uppercase tracking-wider mb-1 font-bold">{item.label}</span>
                <span className="font-medium">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: <Award size={16} />,
      title: "Leadership",
      content: (
        <div className="space-y-4">
          <p><span className={isDark ? "text-emerald-400" : "text-emerald-600 font-bold"}>abhav@ubuntu:~$</span> ls -la ./leadership</p>
          <div className="space-y-4 mt-2">
            <div className={`border-l-4 pl-4 py-1 ${isDark ? 'border-purple-500' : 'border-purple-600'}`}>
              <span className={`font-bold block text-base ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Design Subcoordinator</span>
              <span className={isDark ? 'text-slate-400 text-sm' : 'text-slate-600 text-sm'}>Inter IIT Tech Meet 14.0</span>
            </div>
            <div className={`border-l-4 pl-4 py-1 ${isDark ? 'border-blue-500' : 'border-blue-600'}`}>
              <span className={`font-bold block text-base ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>Flagship Events Subcoordinator</span>
              <span className={isDark ? 'text-slate-400 text-sm' : 'text-slate-600 text-sm'}>Celesta 2025</span>
            </div>
            <div className={`border-l-4 pl-4 py-1 ${isDark ? 'border-red-500' : 'border-red-600'}`}>
              <span className={`font-bold block text-base ${isDark ? 'text-red-400' : 'text-red-700'}`}>Design Subcoordinator</span>
              <span className={isDark ? 'text-slate-400 text-sm' : 'text-slate-600 text-sm'}>TEDx IITPatna 7.0</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: <Gamepad2 size={16} />,
      title: "Hobbies",
      content: (
        <div className="space-y-4">
          <p><span className={isDark ? "text-emerald-400" : "text-emerald-600 font-bold"}>abhav@ubuntu:~$</span> cat downtime_logs.txt</p>
          <ul className={`list-none space-y-3 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
            <li><span className="text-pink-500 font-bold">🎮 Gaming:</span> Valorant & Minecraft.</li>
            <li><span className="text-pink-500 font-bold">🎨 UI/UX:</span> Figma Aesthetic Interfaces.</li>
            <li><span className="text-pink-500 font-bold">💻 DSA:</span> Competitive Programming grinding.</li>
          </ul>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveCommand((prev) => (prev + 1) % commands.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, commands.length]);

  return (
    <section ref={containerRef} id="about" className={`relative min-h-screen py-16 md:py-24 px-6 md:px-12 flex items-center overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
      
      {/* BACKGROUND LAYER */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold font-syne tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            About <span className="text-blue-600 dark:text-[#38bdf8]">Me</span>.
          </h2>
          <div className={`flex-1 h-[1px] ${isDark ? 'bg-white/10' : 'bg-slate-300'}`}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Profile Photo */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-5 relative group">
            <div className={`absolute -inset-2 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500 bg-gradient-to-r ${isDark ? 'from-blue-600 to-emerald-500' : 'from-blue-400 to-amber-500'}`}></div>
            <div className={`relative aspect-[4/5] rounded-2xl border overflow-hidden flex flex-col items-center justify-center ${isDark ? 'bg-[#13131c] border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
              <img src={ProfilePhoto} alt="Abhav Arora" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <a href="/Abhav_Arora_Resume.pdf" download className={`absolute -bottom-6 -right-4 md:-right-8 flex items-center gap-2 px-6 py-4 rounded-xl shadow-lg transition-all z-10 font-bold ${isDark ? 'bg-white text-slate-900 hover:shadow-blue-500/50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              <Download size={20} /> Resume
            </a>
          </motion.div>

          {/* Terminal Interface */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7 flex flex-col">
            <div className={`min-h-[400px] md:h-[500px] flex flex-col rounded-xl border shadow-2xl overflow-hidden font-mono text-sm transition-all duration-500 ${isDark ? 'bg-[#1e1e2e] border-slate-700' : 'bg-white border-slate-300'}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              
              {/* Title Bar */}
              <div className={`px-4 py-3 border-b flex items-center justify-between ${isDark ? 'bg-[#181825] border-slate-700' : 'bg-slate-200 border-slate-300'}`}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className={`text-xs flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <Terminal size={14} /> abhav@ubuntu: ~
                </div>
                <div className="w-12"></div>
              </div>

              {/* Tabs */}
              <div className={`flex overflow-x-auto border-b hide-scrollbar ${isDark ? 'bg-[#11111b] border-slate-700' : 'bg-slate-100 border-slate-300'}`}>
                {commands.map((cmd, idx) => (
                  <button key={cmd.id} onClick={() => setActiveCommand(idx)} className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all ${activeCommand === idx ? (isDark ? 'bg-[#1e1e2e] text-[#38bdf8] border-t-2 border-[#38bdf8]' : 'bg-white text-blue-600 border-t-2 border-blue-600 shadow-inner') : (isDark ? 'text-slate-500 hover:bg-[#181825]' : 'text-slate-500 hover:bg-slate-200')}`}>
                    {cmd.icon} {cmd.title}
                  </button>
                ))}
              </div>

              {/* Output */}
              <div className="p-6 flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div key={activeCommand} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                    {commands[activeCommand].content}
                  </motion.div>
                </AnimatePresence>
                <div className="mt-4 flex items-center">
                  <span className={`mr-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600 font-bold'}`}>abhav@ubuntu:~$</span>
                  <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className={`w-2 h-4 ${isDark ? 'bg-slate-400' : 'bg-slate-900'}`}></motion.div>
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className={`mt-6 flex items-center justify-center gap-8 border p-4 rounded-xl shadow-lg transition-all duration-500 ${isDark ? 'bg-[#1e1e2e]/60 border-slate-700/50 backdrop-blur-sm' : 'bg-white border-slate-300'}`}>
              {[
                { Icon: Github, color: 'hover:text-black dark:hover:text-white', label: 'GitHub', link: 'https://github.com/abhav-arora' },
                { Icon: Linkedin, color: 'hover:text-[#0a66c2]', label: 'LinkedIn', link: 'https://www.linkedin.com/in/abhavarora26/' },
                { Icon: Code2, color: 'hover:text-[#ffa116]', label: 'LeetCode', link: 'https://leetcode.com/u/Abhav-arora/' }
              ].map((social, i) => (
                <a key={i} href={social.link} target="_blank" rel="noreferrer" className={`text-slate-400 transition-all duration-300 hover:-translate-y-1 group relative ${social.color}`}>
                  <social.Icon size={24} />
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs bg-slate-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">{social.label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;