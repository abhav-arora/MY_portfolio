import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import profileImg from '../../../assets/20260523_160201.jpg.jpeg';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <motion.div
        className="hero__left"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="hero__greeting">Hi There!</span>
        <h1 className="hero__name">
          I'm <span>Abhav Arora</span>
        </h1>
        <p className="hero__title">Computer Science Student / Full-Stack Developer</p>
        <p className="hero__description">
          Passionate about building scalable web applications and solving complex algorithmic
          challenges. Currently pursuing B.Tech in Computer Science & Engineering at IIT Patna,
          with a keen interest in full-stack development, machine learning, and competitive programming.
        </p>
        <a href="#about" className="hero__cta">
          More About Me →
        </a>
      </motion.div>

      <motion.div
        className="hero__right"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      >
        <div className="hero__image-wrapper">
          <img
            className="hero__image"
            src={profileImg}
            alt="Abhav Arora - Computer Science Student at IIT Patna"
          />
          <div className="hero__image-overlay" />
        </div>
      </motion.div>
    </section>
  );
}
