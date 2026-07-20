import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import aboutStage from '../assets/images/about/about_stage.png';
import teamMariyappan from '../assets/images/about/team_mariyappan.jpg';
import teamVelmani from '../assets/images/about/team_velmani.jpg';
import teamKannan from '../assets/images/about/team_kannan.jpg';

/* ── Count-up hook ── */
function useCountUp(target, duration = 1800, suffix = '') {
  const [display, setDisplay] = useState('0' + suffix);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numeric);
            setDisplay(target.replace(/\d+/, current));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { display, ref };
}

/* ── Individual animated stat ── */
const AnimatedStat = ({ value, label }) => {
  const { display, ref } = useCountUp(value);
  return (
    <div ref={ref} className="col-md-3 col-6">
      <h1
        className="display-4 fw-bold mb-1"
        style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37' }}
      >
        {display}
      </h1>
      <motion.small
        initial={{ opacity: 0, letterSpacing: "0.5px" }}
        whileInView={{ opacity: 1, letterSpacing: "1px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-uppercase fw-bold d-block"
        style={{ fontSize: '0.8rem', color: '#FFFFFF' }}
      >
        {label}
      </motion.small>
    </div>
  );
};

const textAnims = {
  h1: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  },
  h2: {
    hidden: { opacity: 0, y: 35, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  },
  h3: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  },
  p: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 0.9, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  },
  label: {
    hidden: { opacity: 0, letterSpacing: "0.5px" },
    visible: { 
      opacity: 1, 
      letterSpacing: "2px", 
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } 
    }
  }
};

const About = () => {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const stats = [
    { value: '500+', label: 'Events Executed' },
    { value: '12+',  label: 'Years of Experience' },
    { value: '98%',  label: 'Satisfied Couples' },
    { value: '25+',  label: 'Industry Awards' }
  ];

  const team = [
    {
      name: 'Mariyappan',
      role: 'Founder & Managing Director',
      image: teamMariyappan,
      description: 'Mariyappan is the visionary founder of Sri Durga Events. With decades of experience in luxury event management, he built the company on the pillars of excellence, creativity, and flawless execution.'
    },
    {
      name: 'Velmani Kandan',
      role: 'Event Operations Manager',
      image: teamVelmani,
      description: 'Velmani Kandan oversees all event operations, ensuring every detail from logistics to live execution meets the highest standards. His precision and dedication make every event an unforgettable experience.'
    },
    {
      name: 'Kannan',
      role: 'Creative Event Designer',
      image: teamKannan,
      description: 'Kannan leads creative direction for all event designs — from floral architecture and stage layouts to lighting concepts and thematic décor — bringing each client\'s unique vision to life.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <div className="container">
          <motion.span 
            variants={textAnims.label}
            initial="hidden"
            animate="visible"
            className="text-uppercase fw-bold d-block" 
            style={{ fontSize: '0.8rem', color: '#FFFFFF' }}
          >
            Who We Are
          </motion.span>
          <motion.h1 
            variants={textAnims.h1}
            initial="hidden"
            animate="visible"
            className="display-4 text-white mt-2 shimmer-gold-text"
          >
            About Sri Durga Events
          </motion.h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Introduction */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.h2 
                variants={textAnims.h2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-gold mb-4" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Redefining Luxury Events
              </motion.h2>
              <motion.p 
                variants={textAnims.p}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-white" 
                style={{ lineHeight: '1.8' }}
              >
                Sri Durga Events is a premium event management company based in Kalakad, dedicated to creating elegant and unforgettable celebrations. We specialize in luxury weddings, birthdays, baby showers, anniversaries, corporate events, photography, catering, stage decoration, DJ &amp; sound systems, and customized event experiences.
              </motion.p>
              <motion.p 
                variants={textAnims.p}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-white" 
                style={{ lineHeight: '1.8' }}
              >
                Our experienced team carefully plans every detail—from creative concepts and venue styling to flawless execution—ensuring every celebration becomes a memorable experience.
              </motion.p>
            </div>
            <div className="col-lg-6">
              <img
                src={aboutStage}
                alt="Premium luxury wedding stage with golden floral decorations and elegant lighting"
                className="img-fluid rounded border border-gold w-100"
                style={{ borderColor: 'rgba(212, 175, 55, 0.3) !important', objectFit: 'cover', maxHeight: '480px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5 bg-luxury-navy-light">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="luxury-card p-5 h-100">
                <i className="bi bi-eye-fill text-white fs-1 mb-3"></i>
                <motion.h3 
                  variants={textAnims.h3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-gold mb-3"
                >
                  Our Vision
                </motion.h3>
                <motion.p 
                  variants={textAnims.p}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-white mb-0" 
                  style={{ lineHeight: '1.7' }}
                >
                  To be the global benchmark of luxury event management, recognized for injecting high fashion, architectural design principles, and modern production standards into every celebration.
                </motion.p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="luxury-card p-5 h-100">
                <i className="bi bi-award-fill text-white fs-1 mb-3"></i>
                <motion.h3 
                  variants={textAnims.h3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-gold mb-3"
                >
                  Our Mission
                </motion.h3>
                <motion.p 
                  variants={textAnims.p}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-white mb-0" 
                  style={{ lineHeight: '1.7' }}
                >
                  To design and execute bespoke event concepts that align with our clients' dreams. We seek to minimize client stress through robust logistics planning, detail-oriented operations, and premium hospitality networks.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section — animated count-up */}
      <section className="py-5 bg-luxury-navy border-top border-bottom border-gold" style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important' }}>
        <div className="container py-4">
          <div className="row g-4 text-center">
            {stats.map((s, idx) => (
              <AnimatedStat key={idx} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section — Premium Interactive Showcase */}
      <section className="py-5 bg-luxury-navy-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <motion.span 
              variants={textAnims.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-gold text-uppercase fw-bold d-block" 
              style={{ fontSize: '0.8rem' }}
            >
              The Artisans
            </motion.span>
            <motion.h2 
              variants={textAnims.h2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="display-5 text-gold mt-2"
            >
              Our Executive Team
            </motion.h2>
            <div className="gold-divider"></div>
          </div>

          <div className="row g-4 align-items-start">
            {team.map((member, idx) => {
              const isOpen = expandedIdx === idx;
              return (
                <div key={idx} className="col-lg-4 col-md-6">
                  <div
                    className={`card luxury-card team-luxury-card ${isOpen ? 'active' : ''}`}
                    onMouseEnter={() => setExpandedIdx(idx)}
                    onMouseLeave={() => setExpandedIdx(null)}
                    onClick={() => setExpandedIdx(isOpen ? null : idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Image */}
                    <div className="luxury-card-img-wrapper" style={{ height: '300px' }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="card-img-top w-100 h-100 object-fit-cover luxury-card-img"
                      />
                    </div>

                    {/* Name + Role (always visible) */}
                    <div className="p-4 text-center">
                      <motion.h4 
                        variants={textAnims.h3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-gold mb-1"
                      >
                        {member.name}
                      </motion.h4>
                      <motion.span 
                        variants={textAnims.label}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-uppercase fw-bold d-block" 
                        style={{ fontSize: '0.75rem', color: '#FFFFFF' }}
                      >
                        {member.role}
                      </motion.span>
                    </div>

                    {/* Expandable Biography */}
                    <div className="team-bio-collapse">
                      <div className="px-4 pb-4 text-center">
                        <hr className="mx-auto mt-0 mb-3" style={{ width: '40px', height: '1.5px', backgroundColor: '#D4AF37', opacity: 0.4, border: 'none' }} />
                        <motion.p 
                          variants={textAnims.p}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="text-white mb-0" 
                          style={{ fontSize: '0.85rem', lineHeight: '1.7' }}
                        >
                          {member.description}
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
