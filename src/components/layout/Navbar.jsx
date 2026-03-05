import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

// --- Desktop Magnifying & Magnetic Dock Item ---
const DockItem = ({ link, mouseX, isActive }) => {
  const ref = useRef(null);

  // 1. Magnification Logic
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const scaleSync = useTransform(distance, [-100, 0, 100], [1, 1.4, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  // 2. Magnetic Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={link.href}
      style={{ scale, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block px-4 py-2 font-mono text-xs md:text-sm tracking-widest uppercase transition-colors origin-center ${
        isActive 
          ? 'text-blue-600 dark:text-[#38bdf8] font-bold' 
          : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-[#38bdf8]'
      }`}
    >
      {link.name}
    </motion.a>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hidden, setHidden] = useState(false);
  
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(Infinity);

  // --- Force Dark Mode on Mount ---
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // --- Handle Hide/Show on Scroll ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // --- Active Section Tracking ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 250; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <motion.nav 
        variants={{
          visible: { y: 0, x: "-50%", opacity: 1 },
          hidden: { y: -100, x: "-50%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-1/2 z-50 hidden md:flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-[#13131c]/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl rounded-full"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {/* Brand Logo */}
        <a href="#home" className="font-extrabold text-xl tracking-tighter text-slate-900 dark:text-white mr-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          AA<span className="text-blue-600 dark:text-[#38bdf8]">.</span>
        </a>

        {/* Links Only (Theme Toggle & Divider Removed) */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <DockItem 
              key={link.name} 
              link={link} 
              mouseX={mouseX} 
              isActive={activeSection === link.href.substring(1)} 
            />
          ))}
        </div>
      </motion.nav>


      {/* --- MOBILE NAVBAR --- */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="md:hidden fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10"
      >
        <div className="flex items-center justify-between h-20 px-6">
          <a href="#home" className="font-extrabold text-2xl tracking-tighter text-slate-900 dark:text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
            AA<span className="text-blue-600 dark:text-[#38bdf8]">.</span>
          </a>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-[#38bdf8] p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="bg-white dark:bg-[#0a0a0f] border-b border-slate-200 dark:border-white/10 shadow-2xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-base font-mono tracking-widest uppercase rounded-lg ${
                    activeSection === link.href.substring(1) 
                      ? 'bg-blue-50 dark:bg-[#38bdf8]/10 text-blue-600 dark:text-[#38bdf8]' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </motion.nav>
    </>
  );
};

export default Navbar;