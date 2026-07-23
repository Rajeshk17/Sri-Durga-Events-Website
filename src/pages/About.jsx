import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import aboutStage from '../assets/images/about/about_stage.png';
import teamMariyappan from '../assets/images/about/team_mariyappan.jpg';
import teamVelmani from '../assets/images/about/team_velmani.jpg';
import teamKannan from '../assets/images/about/team_kannan.jpg';
import weddingBlueLandscape from '../assets/images/hero/wedding_blue_landscape.jpg';
import Silk from '../components/Silk';
import SplitText from '../components/SplitText';
import FadeContent from '../components/FadeContent';

/* ── Count-up hook with pop finished trigger ── */
function useCountUp(target, duration = 1800, suffix = '') {
  const [display, setDisplay] = useState('0' + suffix);
  const [isCompleted, setIsCompleted] = useState(false);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const numeric = parseInt(target.replace(/\D/g, ''), 10);
    const hasPlus = target.includes('+');
    const hasPercent = target.includes('%');
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
            let formatted = current.toString();
            if (hasPlus) formatted += '+';
            if (hasPercent) formatted += '%';
            setDisplay(formatted);
            
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setIsCompleted(true);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { display, ref, isCompleted };
}

/* ── Individual animated stat with Completed Pop ── */
const AnimatedStat = ({ value, label }) => {
  const { display, ref, isCompleted } = useCountUp(value);
  return (
    <div ref={ref} className="col-md-3 col-6">
      <motion.h1
        className="display-4 fw-bold mb-1"
        style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37' }}
        animate={isCompleted ? { scale: [1, 1.12, 1], y: [0, -4, 0] } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      >
        {display}
      </motion.h1>
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
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const headerRef = useRef(null);

  // Scroll parallax logic for banner background image
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stats = [
    { value: '500+', label: 'Events Executed' },
    { value: '250+', label: 'Luxury Venues' },
    { value: '8+',   label: 'Industry Awards' },
    { value: '100%', label: 'Satisfied Clients' }
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
      {/* Header Banner - Parallax zoom effect & SplitText */}
      <header 
        ref={headerRef}
        className="page-header py-5 text-center position-relative overflow-hidden"
        style={{ padding: '6rem 0 3rem 0', background: 'transparent' }}
      >
        <motion.div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(5, 10, 24, 0.7), rgba(5, 10, 24, 0.7)), url(${weddingBlueLandscape})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            scale: bgScale,
            y: bgY
          }}
        />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="text-gold text-uppercase fw-bold d-block" 
            style={{ fontSize: '0.85rem', letterSpacing: '3px' }}
          >
            Who We Are
          </motion.span>
          
          <h1 className="display-4 text-white mt-2 shimmer-gold-text">
            <SplitText
              text="About Sri Durga Events"
              delay={0.2}
              stagger={0.03}
              duration={0.7}
            />
          </h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Introduction with Silk Background & Column Slide-ins */}
      <section className="py-5 bg-luxury-navy position-relative overflow-hidden">
        {/* Subtle Silk Backdrop (Opacity 15%) */}
        <div className="about-background" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden', opacity: 0.15 }}>
          <Silk
            speed={2.5}
            scale={1}
            color="#D4AF37"
            noiseIntensity={isMobileOrTablet ? 0.3 : 1}
            rotation={15}
            dpr={isMobileOrTablet ? 1 : [1, 2]}
          />
        </div>
        {/* Reading Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(5, 10, 24, 0.25)', pointerEvents: 'none', zIndex: 1 }}></div>

        {/* Floating background decorative circles */}
        <motion.div
          className="d-none d-md-block"
          style={{ position: 'absolute', top: '15%', left: '5%', width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.2)', pointerEvents: 'none', zIndex: 1 }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="d-none d-md-block"
          style={{ position: 'absolute', bottom: '15%', right: '5%', width: '80px', height: '80px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.15)', pointerEvents: 'none', zIndex: 1 }}
          animate={{
            y: [0, 15, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container py-4 position-relative" style={{ zIndex: 2 }}>
          <FadeContent threshold={0.15}>
            <div className="row align-items-center g-5">
              {/* Text: slides in from left */}
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 
                  className="text-gold mb-4" 
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Redefining Luxury Events
                </h2>
                <p 
                  className="text-white" 
                  style={{ lineHeight: '1.8' }}
                >
                  Sri Durga Events is a premium event management company based in Kalakad, dedicated to creating elegant and unforgettable celebrations. We specialize in luxury weddings, birthdays, baby showers, anniversaries, corporate events, photography, catering, stage decoration, DJ &amp; sound systems, and customized event experiences.
                </p>
                <p 
                  className="text-white" 
                  style={{ lineHeight: '1.8' }}
                >
                  Our experienced team carefully plans every detail—from creative concepts and venue styling to flawless execution—ensuring every celebration becomes a memorable experience.
                </p>
              </motion.div>
              
              {/* Image: slides in from right */}
              <motion.div 
                className="col-lg-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={aboutStage}
                  alt="Premium luxury wedding stage with golden floral decorations and elegant lighting"
                  className="img-fluid rounded border border-gold w-100"
                  style={{ borderColor: 'rgba(212, 175, 55, 0.3) !important', objectFit: 'cover', maxHeight: '480px' }}
                />
              </motion.div>
            </div>
          </FadeContent>
        </div>
      </section>

      {/* Mission & Vision - Glassmorphism, Bouncing icons, particles & independent reveals */}
      <section className="py-5 bg-luxury-navy-light">
        <div className="container py-4">
          <div className="row g-4">
            {/* Vision Card */}
            <div className="col-md-6">
              <FadeContent y={40} delay={0.1}>
                <motion.div 
                  className="glass-mission-vision-card p-5 h-100 position-relative overflow-hidden"
                  whileHover={{ y: -10, scale: 1.02 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                  style={{
                    background: 'rgba(28, 37, 65, 0.4)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.8)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  {/* Icon with bounce */}
                  <motion.div
                    className="card-icon-wrapper mb-3"
                    style={{ display: 'inline-block' }}
                    whileHover={{ y: -8, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <i className="bi bi-eye-fill text-gold fs-1"></i>
                  </motion.div>

                  <h3 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Our Vision
                  </h3>
                  <p className="text-white mb-0" style={{ lineHeight: '1.7' }}>
                    To be the global benchmark of luxury event management, recognized for injecting high fashion, architectural design principles, and modern production standards into every celebration.
                  </p>
                </motion.div>
              </FadeContent>
            </div>

            {/* Mission Card */}
            <div className="col-md-6">
              <FadeContent y={40} delay={0.25}>
                <motion.div 
                  className="glass-mission-vision-card p-5 h-100 position-relative overflow-hidden"
                  whileHover={{ y: -10, scale: 1.02 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }}
                  style={{
                    background: 'rgba(28, 37, 65, 0.4)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.8)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.15)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                  }}
                >
                  {/* Floating gold particles (simplified on mobile) */}
                  {Array.from({ length: isMobileOrTablet ? 3 : 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="position-absolute rounded-circle"
                      style={{
                        width: Math.random() * 4 + 2 + 'px',
                        height: Math.random() * 4 + 2 + 'px',
                        backgroundColor: '#D4AF37',
                        opacity: Math.random() * 0.4 + 0.2,
                        left: Math.random() * 80 + 10 + '%',
                        top: Math.random() * 80 + 10 + '%',
                        pointerEvents: 'none',
                        zIndex: 0
                      }}
                      animate={{
                        y: [0, -20 - Math.random() * 20, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.2, 0.8, 0.2]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}

                  {/* Icon with bounce */}
                  <motion.div
                    className="card-icon-wrapper mb-3"
                    style={{ display: 'inline-block' }}
                    whileHover={{ y: -8, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <i className="bi bi-rocket-takeoff-fill text-gold fs-1"></i>
                  </motion.div>

                  <h3 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Our Mission
                  </h3>
                  <p className="text-white mb-0" style={{ lineHeight: '1.7', position: 'relative', zIndex: 1 }}>
                    To design and execute bespoke event concepts that align with our clients' dreams. We seek to minimize client stress through robust logistics planning, detail-oriented operations, and premium hospitality networks.
                  </p>
                </motion.div>
              </FadeContent>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section — pop counters on complete */}
      <section className="py-5 bg-luxury-navy border-top border-bottom border-gold" style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important' }}>
        <div className="container py-4">
          <div className="row g-4 text-center">
            {stats.map((s, idx) => (
              <AnimatedStat key={idx} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section — Staggered reveal & hover scales/borders */}
      <section className="py-5 bg-luxury-navy-light">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span 
              className="text-gold text-uppercase fw-bold d-block" 
              style={{ fontSize: '0.8rem', letterSpacing: '2px' }}
            >
              The Artisans
            </span>
            <h2 
              className="display-5 text-gold mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Executive Team
            </h2>
            <div className="gold-divider"></div>
          </div>

          <motion.div 
            className="row g-4 align-items-start"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {team.map((member, idx) => {
              const isOpen = expandedIdx === idx;
              return (
                <motion.div 
                  key={idx} 
                  className="col-lg-4 col-md-6"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  <motion.div
                    className={`card luxury-card team-luxury-card ${isOpen ? 'active' : ''}`}
                    whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)', borderColor: 'rgba(212, 175, 55, 0.8)' }}
                    onMouseEnter={() => setExpandedIdx(idx)}
                    onMouseLeave={() => setExpandedIdx(null)}
                    onClick={() => setExpandedIdx(isOpen ? null : idx)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
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
                      <h4 
                        className="text-gold mb-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {member.name}
                      </h4>
                      <span 
                        className="text-uppercase fw-bold d-block" 
                        style={{ fontSize: '0.75rem', color: '#FFFFFF', letterSpacing: '1px' }}
                      >
                        {member.role}
                      </span>
                    </div>

                    {/* Expandable Biography */}
                    <div className="team-bio-collapse">
                      <div className="px-4 pb-4 text-center">
                        <hr className="mx-auto mt-0 mb-3" style={{ width: '40px', height: '1.5px', backgroundColor: '#D4AF37', opacity: 0.4, border: 'none' }} />
                        <p 
                          className="text-white mb-0" 
                          style={{ fontSize: '0.85rem', lineHeight: '1.7' }}
                        >
                          {member.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
