import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaTrophy, FaDownload } from 'react-icons/fa';
import resumePdf from '../../../assets/Resume-March2026.pdf';
import './Resume.css';

const education = [
  {
    year: '2024 — 2028',
    role: 'B.Tech in Artificial Intelligence & Data Science',
    org: 'Indian Institute of Technology, Patna',
    desc: 'CGPA: 8.48. Coursework includes Data Structures & Algorithms, Machine Learning, Deep Learning, and Database Systems.',
  },
  {
    year: '2024',
    role: 'Senior Secondary Education',
    org: 'Academic Global School, Gorakhpur',
    desc: 'Percentage: 93.6%. JEE Advanced qualified.',
  },
  {
    year: '2022',
    role: 'Secondary Education',
    org: 'Little Flower School, Gorakhpur',
    desc: 'Percentage: 96.2%.',
  },
];

const hackathons = [
  {
    year: 'Winner (1st)',
    role: 'Connect the Dots — Infrastructure Integration Challenge',
    org: 'IIT Patna & Unstop',
    desc: 'Designed the architecture connecting multiple independent infrastructure services. Implemented solutions including reverse proxying, load balancing, and secure service-to-service communication. Ensured system reliability with automated end-to-end integration tests, optimized cloud economics (FinOps), and defended architectural decisions.',
    link: 'https://unstop.com/hackathons/connect-the-dots-the-infrastructure-integration-challenge-indian-institute-of-technology-iit-patna-1659308/case-submissions/783669?d=eyJwYWdlIjoxfQ==',
  },
  {
    year: '2nd Position',
    role: 'AI Hospital Data Management & FHIR Generator',
    org: 'Jilo Hackathon',
    desc: 'Designed and built a full-stack AI-backed system for hospital data management and FHIR format generation, featuring quick access to follow-ups on insurance and other helper documents.',
  },
  {
    year: 'Finalist',
    role: 'DroidRun AI Device Controller',
    org: 'Google Developer Groups (GDG) — IIT Patna',
    desc: 'Developed an Android application using DroidRun and MobileRun AI to control device agents and automate workflows.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function Resume() {
  return (
    <section className="resume" id="resume">
      <div className="resume__header">
        <motion.h2
          className="section-heading section-heading--center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          Resume
        </motion.h2>
      </div>

      <div className="resume__columns">
        {/* Education */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="resume__column-title">
            <FaGraduationCap /> Education
          </div>
          <div className="resume__timeline">
            {education.map((item, i) => (
              <motion.div
                className="resume__item"
                key={item.role}
                variants={fadeUp}
                custom={i}
              >
                <span className="resume__year">{item.year}</span>
                <h4 className="resume__role">{item.role}</h4>
                <p className="resume__org">{item.org}</p>
                <p className="resume__desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hackathons / Extra Curricular */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="resume__column-title">
            <FaTrophy /> Extra-Curricular / Hackathons
          </div>
          <div className="resume__timeline">
            {hackathons.map((item, i) => (
              <motion.div
                className="resume__item"
                key={item.role}
                variants={fadeUp}
                custom={i}
              >
                <span className="resume__year">{item.year}</span>
                <h4 className="resume__role">{item.role}</h4>
                <p className="resume__org">{item.org}</p>
                <p className="resume__desc">{item.desc}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume__link"
                  >
                    View Submission
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="resume__download"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <a href={resumePdf} download className="resume__download-btn">
          <FaDownload /> Download CV
        </a>
      </motion.div>
    </section>
  );
}
