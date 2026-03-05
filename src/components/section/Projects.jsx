import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Trophy, Database, ArrowRight } from 'lucide-react';
import FerromagneticBg from './FerroMagneticBg';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 12 } }
  };

  const projects = [
    {
      id: 1,
      title: "Context-Aware RAG Video Model",
      type: "AI / ML Architecture",
      icon: <Database className="text-emerald-400 mb-4" size={32} />,
      description: "An intelligent Retrieval-Augmented Generation pipeline designed to process and synthesize contextual answers directly from video data. Built to handle complex, multimodal querying without relying on standard managed hosting.",
      stack: ["Python", "LangChain", "HuggingFace", "PyTorch"],
      links: { github: "https://github.com/abhav-arora/video-RAG-app", live: "#" },
      // FIX: Changed 'group-hover' to direct 'hover' for the card's outer layer
      glowClass: "hover:border-emerald-400 hover:shadow-[0_0_30px_#34d39980,inset_0_0_20px_#34d39940]",
      textHover: "group-hover:text-emerald-400",
      bgHover: "group-hover:from-emerald-500/10 group-hover:to-transparent"
    },
    {
      id: 2,
      title: "MindGuard",
      type: "Hackathon Winner - DroidRun",
      icon: <Trophy className="text-red-400 mb-4" size={32} />,
      description: "A full-stack application engineered to combat doomscrolling and promote digital well-being through smart interventions. Secured 3rd Place overall at the February 2026 DroidRun DevSprint.",
      stack: ["React", "Node.js", "PostgreSQL", "Tailwind"],
      links: { github: "https://github.com/Ayushman404/droidrun_devsprint", live: "#" },
      // FIX: Changed 'group-hover' to direct 'hover' for the card's outer layer
      glowClass: "hover:border-red-400 hover:shadow-[0_0_30px_#f8717180,inset_0_0_20px_#f8717140]",
      textHover: "group-hover:text-red-400",
      bgHover: "group-hover:from-red-500/10 group-hover:to-transparent"
    }
  ];

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 bg-white dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 flex flex-col justify-center overflow-hidden">
      
      {/* Ferromagnetic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-[#0a0a0f] z-10 pointer-events-none dark:opacity-80 opacity-0"></div>
        <FerromagneticBg />
      </div>

      {/* Main Content Layer (z-10) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pointer-events-none">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12 pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold font-syne tracking-tight">
            Featured <span className="text-[#38bdf8]">Work</span>.
          </h2>
          <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Main Project Cards */}
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              variants={cardVariants}
              className={`pointer-events-auto group relative bg-white/20 dark:bg-[#13131c]/40 backdrop-blur-2xl rounded-2xl border border-slate-200/50 dark:border-white/10 p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full ${project.glowClass}`}
            >
              {/* Dynamic Hover Background Tint */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent transition-colors duration-500 pointer-events-none ${project.bgHover}`}></div>

              <div className="relative z-10">
                {project.icon}
                
                <span className="text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-2 block">
                  {project.type}
                </span>
                
                <h3 className={`text-2xl font-bold font-syne mb-4 transition-colors ${project.textHover}`}>
                  {project.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="mt-auto relative z-10">
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 backdrop-blur-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-200/50 dark:border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <a href={project.links.github} className={`flex items-center gap-2 text-sm font-medium transition-colors ${project.textHover}`}>
                    <Github size={18} /> Code
                  </a>
                  <a href={project.links.live} className={`flex items-center gap-2 text-sm font-medium transition-colors ml-auto group/link ${project.textHover}`}>
                    Demo <ExternalLink size={18} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Card 3: GitHub / Open Source CTA (CYAN GLOW) */}
          <motion.div 
            variants={cardVariants}
            className="pointer-events-auto group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 border border-slate-800 dark:border-white/10 group-hover:border-[#38bdf8] hover:shadow-[0_0_30px_#38bdf880,inset_0_0_20px_#38bdf840] flex flex-col justify-center items-center text-center h-full min-h-[350px] bg-white/20 dark:bg-[#13131c]/40 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-transparent group-hover:from-[#38bdf8]/10 group-hover:to-transparent transition-colors duration-500 z-0 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#38bdf8]/20 transition-all duration-300">
                <Github size={32} className="text-slate-900 dark:text-[#38bdf8]" />
              </div>
              
              <h3 className="text-2xl font-bold font-syne text-slate-900 dark:text-white mb-4 group-hover:text-[#38bdf8] transition-colors">
                Explore More Work
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 px-4">
                 Explore more projects, open-source contributions and repos I am working on.
              </p>
              
              <a 
                href="https://github.com/abhav-arora" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white dark:bg-[#38bdf8] dark:text-gray-900 font-bold rounded-full hover:bg-slate-800 dark:hover:bg-blue-400 transition-colors shadow-lg"
              >
                View GitHub <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Projects;