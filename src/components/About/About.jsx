import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaTrophy, FaPalette } from 'react-icons/fa';
import profileImg from '../../../assets/20260523_160201.jpg.jpeg';
import './About.css';

const stats = [
  { number: '5', label: 'Projects Completed' },
  { number: '3+', label: 'Years Coding' },
  { number: '3', label: 'Hackathons Won' },
  { number: '1200+', label: 'DSA Problems Solved' },
];

const skills = [
  {
    icon: <FaBrain />,
    name: 'Artificial Intelligence & ML',
    desc: 'Developing advanced AI systems, optimizing Small Language Models, and building intelligent RAG applications.',
  },
  {
    icon: <FaCode />,
    name: 'Full-Stack Web Engineering',
    desc: 'Crafting robust, scalable web platforms using FastAPI, React, Node.js, and modern database architectures.',
  },
  {
    icon: <FaTrophy />,
    name: 'Algorithmic Foundations',
    desc: 'Solving complex data structure problems and optimizing graph-based routing and search algorithms.',
  },
  {
    icon: <FaPalette />,
    name: 'UI/UX & Product Design',
    desc: 'Prototyping intuitive user interfaces and crafting clean component layouts in Figma before production.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__header">
        <motion.h2
          className="section-heading section-heading--center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          About Me
        </motion.h2>
      </div>

      <motion.div
        className="about__content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="about__photo-wrapper">
          <img
            className="about__photo"
            src={profileImg}
            alt="Abhav Arora"
          />
        </div>
        <div className="about__info">
          <h3 className="about__intro">
            I'm <span>Abhav Arora</span>, Computer Science Student / Full-Stack Developer
          </h3>
          <p className="about__text">
            I'm a pre-final year B.Tech student in Computer Science & Engineering at IIT Patna.
            My passion lies at the intersection of software engineering and artificial intelligence.
            I love building products that solve real problems — from scalable web platforms to
            intelligent ML systems. When I'm not coding, you'll find me competing in hackathons,
            contributing to open-source projects, or grinding DSA problems to sharpen my
            problem-solving skills.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="about__stats"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {stats.map((stat, i) => (
          <motion.div
            className="about__stat-card"
            key={stat.label}
            variants={fadeUp}
            custom={i}
          >
            <div className="about__stat-number">{stat.number}</div>
            <div className="about__stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.h3
        className="about__skills-title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        What I Do?
      </motion.h3>

      <motion.div
        className="about__skills-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skill, i) => (
          <motion.div
            className="about__skill-card"
            key={skill.name}
            variants={fadeUp}
            custom={i}
          >
            <div className="about__skill-icon">{skill.icon}</div>
            <div className="about__skill-name">{skill.name}</div>
            <div className="about__skill-desc">{skill.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
