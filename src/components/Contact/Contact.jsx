import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { SOCIALS, CONTACT, PROFILE, EMAILJS } from '../../constants/profile';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.init({
      publicKey: EMAILJS.publicKey,
    });

    emailjs
      .sendForm(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        formRef.current
      )
      .then(() => {
        setStatus('sent');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 4000);
      })
      .catch((error) => {
        console.error('EmailJS Error Status:', error.status);
        console.error('EmailJS Error Text:', error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      });
  };

  const buttonContent = {
    idle:    <><FaPaperPlane /> Send Message</>,
    sending: <><span className="contact__spinner" /> Sending…</>,
    sent:    <><FaCheck /> Message Sent!</>,
    error:   <><FaExclamationTriangle /> Failed — Try Again</>,
  };

  return (
    <section className="contact" id="contact">
      <div className="contact__header">
        <motion.h2
          className="section-heading section-heading--center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          Contact
        </motion.h2>
      </div>

      <motion.p
        className="contact__subtitle"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        Feel <span>free</span> to contact me!
      </motion.p>

      <motion.div
        className="contact__content"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        {/* Form */}
        <form className="contact__form" ref={formRef} onSubmit={handleSubmit}>
          <div className="contact__form-row">
            <input
              className="contact__input"
              type="text"
              name="name"
              placeholder="Your Name"
              required
              id="contact-name"
            />
            <input
              className="contact__input"
              type="email"
              name="from_email"
              placeholder="Your Email"
              required
              id="contact-email"
            />
          </div>
          <input
            className="contact__input"
            type="text"
            name="subject"
            placeholder="Subject"
            required
            id="contact-subject"
          />
          <textarea
            className="contact__textarea"
            name="message"
            placeholder="Your Message"
            required
            id="contact-message"
          />
          <button
            type="submit"
            className={`contact__submit contact__submit--${status}`}
            disabled={status === 'sending'}
          >
            {buttonContent[status]}
          </button>
        </form>

        {/* Contact Info */}
        <div className="contact__info">
          <div className="contact__info-item">
            <div className="contact__info-icon">
              <FaEnvelope />
            </div>
            <div>
              <div className="contact__info-label">Email</div>
              <div className="contact__info-value">
                <a href={SOCIALS.email}>{CONTACT.email}</a>
              </div>
            </div>
          </div>

          <div className="contact__info-item">
            <div className="contact__info-icon">
              <FaPhone />
            </div>
            <div>
              <div className="contact__info-label">Phone</div>
              <div className="contact__info-value">{CONTACT.phone}</div>
            </div>
          </div>

          <div className="contact__info-item">
            <div className="contact__info-icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <div className="contact__info-label">Location</div>
              <div className="contact__info-value">{PROFILE.location}</div>
            </div>
          </div>

          <div className="contact__socials">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={SOCIALS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href={SOCIALS.email}
              className="contact__social-link"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
