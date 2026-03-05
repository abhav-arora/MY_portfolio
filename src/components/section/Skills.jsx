import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Terminal } from 'lucide-react';
import FloatingLines from './FloatingLines'; 
import { useIsMobile } from './useIsMobile';
import { useThemeObserver } from './useThemeObserver';

import { 
  SiCplusplus, SiPython, SiJavascript, SiReact, SiTensorflow, 
  SiPytorch, SiHuggingface, SiPostgresql, SiMongodb, SiDocker, 
  SiGit, SiNodedotjs, SiExpress
} from 'react-icons/si';
import { FaLink, FaChartLine } from 'react-icons/fa6';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeQuery, setActiveQuery] = useState(0);
  const containerRef = useRef(null);
  
  // Custom Hooks
  const isMobile = useIsMobile();
  const isDark = useThemeObserver();
  const isInView = useInView(containerRef, { margin: "-100px" });

  const categories = ['All', 'Web Dev & Tools', 'AI & ML', 'Database & Core'];

  const skills = [
    { name: 'C++', category: 'Database & Core', icon: <SiCplusplus className="text-[#00599C] text-lg" /> },
    { name: 'Python', category: 'AI & ML', icon: <SiPython className="text-[#3776AB] text-lg" /> },
    { name: 'JavaScript', category: 'Web Dev & Tools', icon: <SiJavascript className="text-[#F7DF1E] bg-black rounded-sm text-lg" /> },
    { name: 'React', category: 'Web Dev & Tools', icon: <SiReact className="text-[#61DAFB] text-lg" /> },
    { name: 'Node.js', category: 'Web Dev & Tools', icon: <SiNodedotjs className="text-[#339933] text-lg" /> },
    { name: 'Express', category: 'Web Dev & Tools', icon: <SiExpress className={`${isDark ? 'text-slate-200' : 'text-slate-800'} text-lg`} /> },
    { name: 'TensorFlow', category: 'AI & ML', icon: <SiTensorflow className="text-[#FF6F00] text-lg" /> },
    { name: 'PyTorch', category: 'AI & ML', icon: <SiPytorch className="text-[#EE4C2C] text-lg" /> },
    { name: 'HuggingFace', category: 'AI & ML', icon: <SiHuggingface className="text-[#FFD21E] text-lg" /> },
    { name: 'LangChain', category: 'AI & ML', icon: <FaLink className="text-slate-400 dark:text-slate-300 text-lg" /> },
    { name: 'Seaborn', category: 'AI & ML', icon: <FaChartLine className="text-[#4C72B0] text-lg" /> },
    { name: 'PostgreSQL', category: 'Database & Core', icon: <SiPostgresql className="text-[#4169E1] text-lg" /> },
    { name: 'MongoDB', category: 'Database & Core', icon: <SiMongodb className="text-[#47A248] text-lg" /> },
    { name: 'Docker', category: 'Web Dev & Tools', icon: <SiDocker className="text-[#2496ED] text-lg" /> },
    { name: 'Git', category: 'Web Dev & Tools', icon: <SiGit className="text-[#F05032] text-lg" /> }
  ];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const terminalQueries = [
    {
      id: 0,
      command: "./status --topic 'DSA'",
      output: (
        <div className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          <p>Grinding Data Structures and Algorithms primarily in <span className="text-blue-500 font-bold">C++</span>.</p>
          <p>Focusing on advanced problem-solving, graph algorithms and dynamic programming.</p>
          <p className={`mt-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600 font-bold'}`}>
            &gt; Link: <a href="https://leetcode.com/u/Abhav-arora/" target="_blank" rel="noreferrer" className="underline hover:opacity-80 transition-opacity">leetcode.com/u/Abhav-arora/</a>
          </p>
        </div>
      )
    },
    {
      id: 1,
      command: "./status --topic 'AI & ML'",
      output: (
        <div className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          <p>Deep diving into generative architectures right now.</p>
          <p>- <span className={isDark ? "text-yellow-400" : "text-amber-600 font-bold"}>Diffusion Models:</span> Exploring image generation math.</p>
          <p>- <span className={isDark ? "text-yellow-400" : "text-amber-600 font-bold"}>RAG Models:</span> Building context-aware pipelines with LangChain.</p>
        </div>
      )
    },
    {
      id: 2,
      command: "./status --topic 'Other interests'",
      output: (
        <ul className={`list-none space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
          <li><span className="text-blue-500 font-bold">~</span> Mastering <span className="font-bold">Linux commands</span> for productivity.</li>
          <li><span className="text-blue-500 font-bold">~</span> Exploring <span className="font-bold">PostgreSQL</span> optimizations.</li>
          <li><span className="text-blue-500 font-bold">~</span> Playing with bleeding-edge libraries to see how they break.</li>
        </ul>
      )
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="skills"
      // FIX: Added explicit !isDark && 'bg-slate-50' to force the background color even if the dark mode class isn't syncing properly.
      className={`relative min-h-screen py-16 md:py-24 px-6 md:px-12 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 flex items-center overflow-hidden transition-colors duration-500 ${!isDark && 'bg-slate-50'}`}
    >
      
      {/* 3D Floating Lines Background (Managed for performance) */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isInView ? 'opacity-40' : 'opacity-0'}`}>
        {!isMobile && (
          <FloatingLines
            linesGradient={isDark ? ['#38bdf8', '#818cf8', '#c084fc'] : ['#0284c7', '#4f46e5', '#a855f7']} 
            animationSpeed={0.8}
            interactive={true} 
          />
        )}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight">
            My Tech <span className="text-blue-600 dark:text-[#38bdf8]">Stack</span>.
          </h2>
          <div className={`flex-1 h-[1px] ${isDark ? 'bg-white/10' : 'bg-slate-300'}`}></div>
        </div>
        
        <p className={`font-mono text-sm md:text-base mb-12 max-w-2xl p-2 rounded-lg inline-block backdrop-blur-sm ${isDark ? 'text-slate-400 bg-[#0a0a0f]/50' : 'text-slate-600 bg-white/50 border border-slate-200'}`}>
          // A list of languages, frameworks and tools I am building with...
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Skills Bubbles */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs md:text-sm transition-all border backdrop-blur-md ${
                    activeCategory === cat 
                      ? 'bg-blue-600 border-blue-600 text-white dark:bg-[#38bdf8] dark:border-[#38bdf8] dark:text-slate-900 shadow-lg' 
                      : 'bg-white/50 border-slate-300 text-slate-600 hover:border-blue-600 dark:bg-[#13131c]/50 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div layout className="flex flex-wrap gap-3">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map(skill => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`flex items-center gap-2.5 px-5 py-2.5 backdrop-blur-md border rounded-full transition-all group ${isDark ? 'bg-[#13131c]/80 border-white/10 text-slate-200' : 'bg-white/90 border-slate-200 text-slate-700 shadow-sm'}`}
                  >
                    <div className="flex items-center justify-center transition-transform group-hover:scale-110">
                      {skill.icon}
                    </div>
                    <span className="font-medium text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* RIGHT: Focus Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`flex flex-col h-auto md:h-[450px] rounded-xl border shadow-2xl overflow-hidden font-mono text-sm transition-colors duration-500 ${isDark ? 'bg-[#1e1e2e]/90 border-slate-700' : 'bg-white/95 border-slate-300'}`}
          >
            {/* Terminal Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${isDark ? 'bg-[#181825] border-slate-700' : 'bg-slate-100 border-slate-300'}`}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className={`text-xs flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <Terminal size={14} /> current_focus.sh
              </div>
              <div className="w-12"></div>
            </div>

            <div className="flex flex-col md:flex-row h-full">
              {/* Terminal Sidebar */}
              <div className={`w-full md:w-1/3 border-b md:border-b-0 md:border-r p-4 flex flex-col gap-2 ${isDark ? 'bg-[#11111b]/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest font-bold">Execute Script</span>
                {terminalQueries.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuery(idx)}
                    className={`text-left px-3 py-2 rounded text-xs transition-all ${
                      activeQuery === idx 
                        ? (isDark ? 'bg-[#1e1e2e] text-[#38bdf8] border-slate-600' : 'bg-white text-blue-600 border-slate-300 shadow-sm') 
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                  >
                    <span className="text-emerald-500 mr-2">$</span>
                    {q.command.split("'")[1] || "Query"}
                  </button>
                ))}
              </div>

              {/* Terminal Output */}
              <div className={`w-full md:w-2/3 p-6 overflow-y-auto ${isDark ? 'bg-[#1e1e2e]/50' : 'bg-white'}`}>
                <div className="mb-4">
                  <span className={isDark ? "text-emerald-400" : "text-emerald-600 font-bold"}>abhav@ubuntu:~/focus$</span>{' '}
                  <span className={isDark ? "text-slate-200" : "text-slate-900"}>{terminalQueries[activeQuery].command}</span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeQuery}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`pl-2 border-l-2 ${isDark ? 'border-slate-600' : 'border-slate-300'}`}
                  >
                    {terminalQueries[activeQuery].output}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex items-center">
                  <span className={isDark ? "text-emerald-400" : "text-emerald-600 font-bold"}>abhav@ubuntu:~/focus$</span>
                  <motion.div 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className={`w-2 h-4 ${isDark ? 'bg-slate-400' : 'bg-slate-900'}`}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Skills;