import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { BrainCircuit } from 'lucide-react';
import Orb from './Orb';
import BlurText from './BlurText';
import { useIsMobile } from './useIsMobile'; 
import { useThemeObserver } from './useThemeObserver'; 

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const isMobile = useIsMobile();
  const isDark = useThemeObserver();
  
  const isInView = useInView(containerRef, { margin: "100px" });

  const inViewRef = useRef(isInView);
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    inViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  // --- Starfield Canvas Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const starCount = window.innerWidth < 768 ? 50 : 150;

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random(),
      alphaChange: (Math.random() * 0.02) + 0.005
    }));

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!inViewRef.current) return; 

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.alpha += star.alphaChange;
        if (star.alpha <= 0 || star.alpha >= 1) {
          star.alphaChange = -star.alphaChange;
        }
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Darker stars in light mode to match the higher contrast
        if (isDarkRef.current) {
          ctx.fillStyle = `rgba(200, 220, 255, ${star.alpha})`; 
        } else {
          ctx.fillStyle = `rgba(15, 23, 42, ${star.alpha + 0.2})`; // Made slightly more opaque for visibility
        }
        ctx.fill();
      });
    };
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

 return (
    <div 
      ref={containerRef}
      id="home"
      className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-slate-50 dark:bg-[#0a0a0f] transition-colors duration-500"
    >
      
      {/* 1. Starfield Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 opacity-40 dark:opacity-70"
      />

      {/* 2. 3D Orb */}
      <div className={`absolute inset-0 z-10 pointer-events-auto transition-opacity duration-1000 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <Orb
          hoverIntensity={5}
          rotateOnHover={false}
          hue={isDark ? 220 : 35} // Dark: Cyan, Light: Golden Amber
          forceHoverState={false}
          backgroundColor={isDark ? "#0a0a0f" : "#f8fafc"} 
        />
      </div>

      {/* 3. Content Layer */}
      <div className="relative z-20 flex flex-col items-center px-4 text-center select-none pointer-events-none mt-16 md:mt-0">
        
        {/* Open to Work Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 px-4 py-1.5 mb-6 border rounded-full backdrop-blur-md shadow-sm transition-all duration-500 ${
            isDark 
              ? 'border-slate-700/50 bg-gray-900/40 text-gray-300' 
              : 'border-amber-200 bg-white/80 text-slate-900'
          }`}
        >
          <span className="relative flex w-2.5 h-2.5">
            <span className={`absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping ${isDark ? 'bg-green-400' : 'bg-amber-500'}`}></span>
            <span className={`relative inline-flex w-2.5 h-2.5 rounded-full ${isDark ? 'bg-green-500' : 'bg-amber-600'}`}></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wide">
            Available for Internships
          </span>
        </motion.div>

        {/* Floating Subtitle */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`mb-2 text-sm font-bold tracking-widest uppercase md:text-base transition-colors duration-500 ${
            isDark ? 'text-gray-400' : 'text-slate-800'
          }`}
        >
          AI & DS Student @ IIT Patna
        </motion.div>

        {/* Name */}
        <BlurText
          text="ABHAV ARORA"
          delay={50}
          animateBy="letters" 
          direction="top"
          className={`justify-center mb-4 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl transition-all duration-500 ${
            isDark 
              ? 'text-white' 
              : 'text-[#1e293b] drop-shadow-[0_2px_8px_rgba(30,41,59,0.2)]'
          }`}
        />

        {/* Professional One-Liner Box */}
        <motion.div 
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
  className="relative max-w-2xl mt-4 md:mt-6 cursor-default group pointer-events-auto mx-auto"
>
  {/* Background Glow - Subtle & Tight */}
  <div className={`absolute inset-0 transition-opacity duration-500 opacity-20 dark:opacity-40 blur-xl group-hover:opacity-60 rounded-2xl bg-gradient-to-r ${
    isDark ? 'from-blue-500/30 to-purple-600/30' : 'from-orange-400/40 to-amber-600/40'
  }`} />

  {/* Main Box Container - Compact Padding */}
  <div className={`relative flex flex-col md:flex-row items-center gap-4 px-5 py-4 transition-all duration-500 border rounded-2xl backdrop-blur-xl shadow-lg dark:shadow-none ${
    isDark 
      ? 'border-gray-600/50 bg-black/60 hover:border-cyan-500/50' 
      : 'border-amber-200 bg-white/90 hover:border-amber-500'
  }`}>
    
    {/* Icon Box - Scaled Down */}
    <div className={`flex-shrink-0 p-2 border rounded-xl transition-all duration-500 ${
      isDark 
        ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
        : 'bg-amber-50 border-amber-300 text-amber-600 shadow-sm'
    }`}>
      <BrainCircuit className="w-5 h-5" />
    </div>
    
    {/* Text Content - No more giant centering divs */}
    <div className="flex flex-col text-center md:text-left">
      <h1 className={`text-lg md:text-2xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Building{" "}
        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
          GenAI Systems
        </span>{" "}
        &{" "}
        <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          Full-Stack Applications
        </span>
      </h1>

      <p className={`mt-1 text-xs md:text-sm font-medium leading-relaxed ${
        isDark ? 'text-gray-400' : 'text-slate-600'
      }`}>
        Full stack Engineer  
        <span className="hidden md:inline"> exploring scalable software , practical ML and GenAI systems.</span>
      </p>
    </div>
  </div>
</motion.div>

      </div>
    </div>
  );
};

export default Hero;