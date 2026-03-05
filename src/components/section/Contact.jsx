import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import Aurora from './Aurora';
import GalaxyStars from './GalaxyStars'; // Make sure this path is correct

const Contact = () => {
  return (
    // SINGLE PARENT WRAPPER (relative, overflow-hidden)
    <section className="relative min-h-screen py-24 px-6 md:px-12 bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-slate-100 flex items-center justify-center overflow-hidden">
      
      {/* BACKGROUND LAYERS CONTAINER (pointer-events-none ensures users can click through) */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Layer 1: Galaxy Stars (z-[-1] - Deepest) */}
        <div className="absolute inset-0 z-0 opacity-60">
          <GalaxyStars />
        </div>

        {/* Layer 2: Flipped Nebula Aurora (z-0 - Sits above stars) */}
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-50 rotate-180">
          <Aurora 
            colorStops={['#045220', '#795b02', '#711818']} // Green, Gold, Red gradient
            amplitude={2} 
            blend={0.5} 
          />
        </div>
      </div>

      {/* FOREGROUND CONTENT LAYER (relative z-10) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Info & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold font-syne tracking-tighter mb-6">
              Let's Build <br/>
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-[#38bdf8] dark:to-emerald-400 bg-clip-text text-transparent">
                Something.
              </span>
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md leading-relaxed bg-slate-50/50 dark:bg-[#0a0a0f]/50 backdrop-blur-sm p-2 rounded-lg inline-block">
              My inbox is always open. I am actively seeking SDE roles Summer Internships for 2026 or if you just want to talk tech, feel free to drop a message.
            </p>

            {/* Credentials / Location */}
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-[#38bdf8] shadow-sm">
                  <MapPin size={20} />
                </div>
                <span className="font-mono text-sm uppercase tracking-widest bg-slate-50/50 dark:bg-[#0a0a0f]/50 backdrop-blur-sm px-2 py-1 rounded">Delhi, India</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-600 dark:text-[#38bdf8] shadow-sm">
                  <Mail size={20} />
                </div>
                <span className="font-mono text-sm tracking-widest bg-slate-50/50 dark:bg-[#0a0a0f]/50 backdrop-blur-sm px-2 py-1 rounded">abhavthegamer@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="https://github.com/abhav-arora" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-transparent backdrop-blur-md flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/abhavarora26" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-transparent backdrop-blur-md flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#0A66C2] hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0A66C2]/30">
                <FaLinkedin size={20} />
              </a>
              <a href="https://x.com/AroraAbhav?t=MaSQYWmq5nW51s5NdCy-lg&s=09" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-transparent backdrop-blur-md flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <FaXTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/abh.vv_off?igsh=MTUyazdjcGt1b2c0ZQ==" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-transparent backdrop-blur-md flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#dc2743]/30">
                <FaInstagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          {/* RIGHT: Contact Form (Beautiful Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            // Added backdrop-blur-2xl, lowered opacities significantly, refined borders
            className="relative p-8 md:p-10 rounded-2xl overflow-hidden backdrop-blur-2xl border border-slate-300/60 dark:border-white/10 bg-white/30 dark:bg-slate-900/30 shadow-2xl dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Subtle background glow inside the form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-[#38bdf8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <form 
              // Standard Formspree logic remains!
              action="https://formspree.io/f/xykdabqo" 
              method="POST"
              className="flex flex-col gap-6 relative z-10"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    placeholder="John Dough"
                    className="w-full bg-slate-50/50 dark:bg-[#1e1e2e]/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#38bdf8] transition-all text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required
                    placeholder="johnny@example.com"
                    className="w-full bg-slate-50/50 dark:bg-[#1e1e2e]/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#38bdf8] transition-all text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Topic Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="topic" className="text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">Topic</label>
                <input 
                  type="text" 
                  id="topic" 
                  name="topic"
                  required
                  placeholder="Internship Opportunity, Project Collaboration, etc."
                  className="w-full bg-slate-50/50 dark:bg-[#1e1e2e]/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#38bdf8] transition-all text-slate-900 dark:text-white"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  required
                  placeholder="What's on your mind?"
                  className="w-full bg-slate-50/50 dark:bg-[#1e1e2e]/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#38bdf8] transition-all resize-none text-slate-900 dark:text-white"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="group flex items-center justify-center gap-2 w-full md:w-auto self-end bg-blue-600 dark:bg-[#38bdf8] text-white dark:text-gray-900 font-bold px-8 py-3.5 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
              >
                Send Message 
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;