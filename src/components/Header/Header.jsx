import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { SOCIALS, PROFILE } from '../../constants/profile';
import './Header.css';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Me' },
  { id: 'resume', label: 'Resume' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Side Nav */}
      <nav className="header-side-nav" aria-label="Main navigation">
        <span className="header-side-nav__logo">{PROFILE.initials}</span>

        <div className="header-side-nav__links">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`header-side-nav__dot ${activeSection === section.id ? 'header-side-nav__dot--active' : ''}`}
              onClick={() => scrollTo(section.id)}
              aria-label={`Navigate to ${section.label}`}
            >
              <span className="header-side-nav__tooltip">{section.label}</span>
            </button>
          ))}
        </div>

        <div className="header-side-nav__social">
          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href={SOCIALS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="header-mobile">
        <span className="header-mobile__logo">{PROFILE.name.toUpperCase()}</span>
        <button
          className={`header-mobile__hamburger ${mobileOpen ? 'header-mobile__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="header-overlay header-overlay--open">
          <nav className="header-overlay__links">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`header-overlay__link ${activeSection === section.id ? 'header-overlay__link--active' : ''}`}
                onClick={() => scrollTo(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
