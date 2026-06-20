import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaArrowRight } from 'react-icons/fa';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Connect the Dots',
    subtitle: '🏆 Winner (1st) — IIT Patna & Unstop',
    desc: 'A fully containerized, highly scaled, enterprise-ready infrastructure boilerplate built to handle high-concurrency production workloads (10,000+ simultaneous requests). Features dynamic load balancing (Traefik v3), scaled backend replicas, multi-tier caching (Redis), MongoDB, and MinIO storage.',
    tags: ['Docker', 'Traefik v3', 'Nginx', 'Node.js', 'Redis', 'MongoDB', 'MinIO', 'React'],
    category: 'web',
    color: 'linear-gradient(135deg, #F5C518 0%, #f0c110 100%)',
    icon: '🔗',
    githubUrl: 'https://github.com/abhav-arora/connect-the-dots',
  },
  {
    id: 2,
    title: 'Smart Allocator',
    subtitle: '🏆 Winner (2nd) — Jilo Hackathon',
    desc: 'A data-driven, geo-aware resource optimization and management platform built specifically for NGOs to manage supply chain logistics and emergency distribution in real time. Integrates OCR with Gemini API to automatically structure field data, and tracks demand hotspots with geo-mapping.',
    tags: ['Node.js', 'FastAPI', 'Prisma', 'MongoDB', 'PostgreSQL', 'Gemini API'],
    category: 'ml',
    color: 'linear-gradient(135deg, #2a2a2a 0%, #474747 100%)',
    icon: '📦',
    githubUrl: 'https://github.com/abhav-arora/smart-allocator',
  },
  {
    id: 3,
    title: 'CampusConnect',
    subtitle: 'Real time gps based bus tracker and marketplace',
    desc: 'A multi-functional campus micro-ecosystem web application designed to consolidate student utilities, administrative logistics, and peer-to-peer commerce. Implements WebSockets and geolocation streaming for real-time bus tracking with low latency.',
    tags: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'WebSockets'],
    category: 'web',
    color: 'linear-gradient(135deg, #131313 0%, #353535 100%)',
    icon: '🎓',
    githubUrl: 'https://github.com/abhav-arora/campus-connect',
  },
  {
    id: 4,
    title: 'MindGuard',
    subtitle: '🏆 Winner — University Hackathon',
    desc: 'An innovative Android automation system engineered during a hackathon to counter digital fatigue and impulsive doomscrolling. Employs deep behavioral triggers using Accessibility APIs, heuristic habits analysis, and behavioral redirection overlays.',
    tags: ['Android SDK', 'Java', 'Kotlin', 'Accessibility APIs', 'Heuristics'],
    category: 'ml',
    color: 'linear-gradient(135deg, #9a9078 0%, #4e4633 100%)',
    icon: '🛡️',
    githubUrl: 'https://github.com/abhav-arora/mind-guard',
  },
  {
    id: 5,
    title: 'Portfolio & Analytics',
    subtitle: 'Personal Engineering Portfolio',
    desc: 'A high-performance single-page professional application designed to showcase technical capabilities and case studies. Utilizes Framer Motion for declarative micro-interactions, optimized bundling for near-perfect Lighthouse scores, and Vercel CI/CD.',
    tags: ['React', 'Vite', 'Framer Motion', 'Tailwind CSS', 'Vercel CI/CD'],
    category: 'web',
    color: 'linear-gradient(135deg, #F5C518 0%, #9a9078 100%)',
    icon: '⚡',
    githubUrl: 'https://github.com/abhav-arora/portfolio',
  },
  {
    id: 6,
    title: 'Video RAG Assistant',
    subtitle: 'Intelligent Playlist Q&A System',
    desc: 'A context-aware Q&A system for YouTube videos and playlists, similar to Google NotebookLM. Implements video processing, transcription retrieval, ChromaDB vector storage, and the Gemini API for semantic search and follow-up questions.',
    tags: ['Python', 'Gemini API', 'ChromaDB', 'RAG', 'LangChain', 'Streamlit'],
    category: 'ml',
    color: 'linear-gradient(135deg, #353535 0%, #131313 100%)',
    icon: '📹',
    githubUrl: 'https://github.com/abhav-arora/video-rag',
  },
];

const filters = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web Dev' },
  { key: 'ml', label: 'ML / AI' },
  { key: 'opensource', label: 'Open Source' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Portfolio() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__header">
        <motion.h2
          className="section-heading section-heading--center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.h2>
      </div>

      <motion.div
        className="portfolio__filters"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {filters.map((f) => (
          <button
            key={f.key}
            className={`portfolio__filter-btn ${active === f.key ? 'portfolio__filter-btn--active' : ''}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      <motion.div className="portfolio__grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio__card"
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <div className="portfolio__card-thumb">
                <div
                  className="portfolio__card-thumb-bg"
                  style={{ background: project.color }}
                >
                  {project.icon}
                </div>
                <div className="portfolio__card-overlay">
                  <div className="portfolio__card-overlay-btn" aria-label="View on GitHub">
                    <FaGithub />
                  </div>
                </div>
              </div>
              <div className="portfolio__card-body">
                <h3 className="portfolio__card-title">{project.title}</h3>
                {project.subtitle && (
                  <h4 className="portfolio__card-subtitle" style={{ fontSize: '0.8rem', color: 'var(--gold)', marginBottom: '8px', fontWeight: 600 }}>
                    {project.subtitle}
                  </h4>
                )}
                <p className="portfolio__card-desc">{project.desc}</p>
                <div className="portfolio__card-tags">
                  {project.tags.map((tag) => (
                    <span className="portfolio__card-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="portfolio__more"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a
          href="https://github.com/abhav-arora"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio__more-btn"
        >
          View More on GitHub <FaArrowRight />
        </a>
      </motion.div>
    </section>
  );
}
