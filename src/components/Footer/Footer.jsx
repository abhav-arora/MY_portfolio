import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';
import { SOCIALS, PROFILE } from '../../constants/profile';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__brand">{PROFILE.name.toUpperCase()}</div>
        <p className="footer__tagline">
          {PROFILE.degree} Student at {PROFILE.institution} — Building the future, one line of code at a time.
        </p>

        <div className="footer__socials">
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={SOCIALS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href={SOCIALS.email}
            className="footer__social-link"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>

        <div className="footer__divider" />

        <p className="footer__copyright">
          © {year} <span>{PROFILE.name}</span>. All rights reserved.
        </p>

        <p className="footer__thanks">
          Thanks for visiting! <FaHeart style={{ color: 'var(--gold)', verticalAlign: 'middle' }} />
        </p>
      </div>
    </footer>
  );
}
