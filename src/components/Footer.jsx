import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo/logo.png';
import FadeContent from './FadeContent';
import SplitText from './SplitText';

/* ── INDIVIDUAL CONTACT CARD WITH spotlight tracking & specific icon wiggles ── */
const FooterContactCard = ({ card, idx, isMobile }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const cardEl = cardRef.current;
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardEl.style.setProperty('--mouse-x', `${x}px`);
    cardEl.style.setProperty('--mouse-y', `${y}px`);
  };

  // Define icon-specific animation configurations
  const getIconProps = () => {
    if (card.title === 'WhatsApp') {
      return {
        animate: isHovered ? { scale: 1.15, rotate: 8, boxShadow: '0 0 18px rgba(37, 211, 102, 0.7)' } : { scale: 1, rotate: 0 },
        style: { 
          backgroundColor: isHovered ? '#25D366' : 'rgba(37, 211, 102, 0.1)',
          color: isHovered ? '#FFFFFF' : '#25D366'
        }
      };
    }
    if (card.title === 'Phone Call') {
      return {
        animate: isHovered ? { 
          rotate: [0, -10, 10, -10, 10, -10, 10, 0],
          boxShadow: '0 0 18px rgba(212, 175, 55, 0.7)'
        } : { rotate: 0 },
        style: {
          backgroundColor: isHovered ? 'var(--luxury-gold)' : 'rgba(212, 175, 55, 0.1)',
          color: isHovered ? '#FFFFFF' : 'var(--luxury-gold)'
        },
        transition: isHovered ? { duration: 0.6, repeat: Infinity, repeatDelay: 0.4 } : {}
      };
    }
    if (card.title === 'Instagram') {
      return {
        animate: isHovered ? {
          y: [-2, 2, -2],
          rotate: [0, 5, -5, 0],
          boxShadow: '0 0 18px rgba(225, 48, 108, 0.7)'
        } : { y: 0, rotate: 0 },
        style: {
          background: isHovered 
            ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' 
            : 'rgba(225, 48, 108, 0.1)',
          color: isHovered ? '#FFFFFF' : '#E1306C'
        },
        transition: isHovered ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : {}
      };
    }
    // Email card
    return {
      animate: isHovered ? {
        rotateX: [0, 45, 0],
        boxShadow: '0 0 18px rgba(212, 175, 55, 0.7)'
      } : { rotateX: 0 },
      style: {
        backgroundColor: isHovered ? 'var(--luxury-gold)' : 'rgba(212, 175, 55, 0.1)',
        color: isHovered ? '#FFFFFF' : 'var(--luxury-gold)'
      },
      transition: isHovered ? { duration: 1, repeat: Infinity } : {}
    };
  };

  const iconProps = getIconProps();

  const cardVariants = {
    hidden: { opacity: 0, y: 70, scale: 0.92 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div 
      className="col-lg-3 col-sm-6 col-12"
      variants={cardVariants}
    >
      <motion.a
        ref={cardRef}
        href={card.link}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-contact-card py-3 px-3 d-block text-decoration-none shine-button-luxury"
        style={{ 
          minHeight: '100px', 
          display: 'block',
          position: 'relative',
          overflow: 'hidden',
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={isMobile ? {} : { 
          y: -10, 
          scale: 1.03,
          borderColor: 'rgba(212, 175, 55, 0.85)',
          boxShadow: '0 15px 35px rgba(212, 175, 55, 0.15)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* Spotlight overlay inside card */}
        {!isMobile && (
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle 100px at var(--mouse-x) var(--mouse-y), rgba(212, 175, 55, 0.12), transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}

        <div className="d-flex align-items-center gap-3 text-start w-100 position-relative" style={{ zIndex: 2 }}>
          {/* Icon Wrapper */}
          <motion.div 
            className="contact-icon-wrapper mb-0 d-flex align-items-center justify-content-center" 
            style={{ 
              width: '45px', 
              height: '45px', 
              flexShrink: 0, 
              borderRadius: '50%',
              transition: 'background-color 0.4s ease, color 0.4s ease, background 0.4s ease',
              ...iconProps.style
            }}
            animate={iconProps.animate}
            transition={iconProps.transition}
          >
            <i className={`${card.icon.replace(/icon-\w+/g, '')} fs-5`}></i>
          </motion.div>
          <div>
            <h6 className="contact-title mb-0" style={{ fontSize: '1.05rem', color: 'var(--luxury-gold)', fontWeight: 600 }}>{card.title}</h6>
            <p className="contact-detail mb-0" style={{ fontSize: '0.8rem', color: '#FFFFFF', opacity: 0.85 }}>{card.detail}</p>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

/* ── MAIN FOOTER COMPONENT ── */
const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contactCards = [
    {
      title: 'WhatsApp',
      detail: '+91 73589 51381',
      link: 'https://wa.me/917358951381',
      icon: 'bi bi-whatsapp icon-whatsapp'
    },
    {
      title: 'Phone Call',
      detail: '+91 73589 51381',
      link: 'tel:+917358951381',
      icon: 'bi bi-telephone-fill icon-phone'
    },
    {
      title: 'Instagram',
      detail: '@sridurga_events2',
      link: 'https://instagram.com/sridurga_events2',
      icon: 'bi bi-instagram icon-instagram'
    },
    {
      title: 'Email',
      detail: 'sridurgaevents@gmail.com',
      link: 'mailto:sridurgaevents@gmail.com',
      icon: 'bi bi-envelope-fill icon-email'
    }
  ];

  const footerHeadingVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const footerLinkVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <footer
      className="bg-luxury-navy-deep py-5 mt-auto position-relative overflow-hidden"
      style={{ borderTop: 'none' }}
    >
      {/* Thin animated gold gradient line above footer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', backgroundSize: '200% 100%', overflow: 'hidden', zIndex: 5 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            zIndex: 1
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Subtle floating particles, sparkle effects & slow moving light rays (< 10% opacity) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        {/* Floating particles */}
        {Array.from({ length: isMobile ? 4 : 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-circle"
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              backgroundColor: '#D4AF37',
              opacity: Math.random() * 0.12 + 0.03,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            animate={{
              y: [0, -40 - Math.random() * 40, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.03, 0.2, 0.03]
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Slow moving light ray rotating */}
        {!isMobile && (
          <motion.div
            style={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              top: '-25%',
              left: '-25%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 60%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Tiny sparkle stars */}
        {Array.from({ length: isMobile ? 2 : 5 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              backgroundColor: '#D4AF37',
              borderRadius: '50%',
              left: Math.random() * 90 + 5 + '%',
              top: Math.random() * 90 + 5 + '%',
              opacity: 0,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 0.75, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* FadeContent wraps the entire footer container, triggers only once */}
      <div className="container py-4 position-relative" style={{ zIndex: 2 }}>
        <FadeContent threshold={0.1} duration={1}>
          {/* ── Main 4-column row ── */}
          <div className="row g-4 align-items-stretch">

            {/* Brand Column */}
            <motion.div 
              className="col-lg-4 col-md-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="d-flex flex-column align-items-center text-center h-100">
                {/* Gently floating Logo */}
                <motion.img
                  src={logo}
                  alt="Sri Durga Logo"
                  style={{
                    height: '75px',
                    width: '75px',
                    objectFit: 'contain',
                    marginBottom: '6px'
                  }}
                  animate={{
                    y: [0, -6, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Stacked Brand Name */}
                <div style={{ lineHeight: 1.15, marginBottom: '12px' }}>
                  <span
                    className="d-block fw-bold text-gold"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.5rem',
                      letterSpacing: '2.5px'
                    }}
                  >
                    SRI DURGA
                  </span>
                  <span
                    className="d-block text-uppercase text-white fw-semibold"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.7rem',
                      letterSpacing: '6px'
                    }}
                  >
                    EVENTS
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-white mx-auto mb-0"
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: '1.75',
                    maxWidth: '300px',
                    opacity: 0.85
                  }}
                >
                  Creating exquisite experiences and unforgettably luxurious events. Managed by Mariyappan, our detail-oriented execution turns dreams into legendary moments.
                </p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="col-lg-2 col-md-6 col-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h5 
                variants={footerHeadingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gold mb-3" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Quick Links
              </motion.h5>
              <motion.ul 
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="list-unstyled d-flex flex-column gap-2" 
                style={{ fontSize: '0.9rem' }}
              >
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link to="/" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Home</Link>
                </motion.li>
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link to="/about" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>About Us</Link>
                </motion.li>
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link to="/services" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Our Services</Link>
                </motion.li>
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link to="/gallery" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Gallery</Link>
                </motion.li>
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <Link to="/packages" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Packages</Link>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Services */}
            <motion.div 
              className="col-lg-3 col-md-6 col-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h5 
                variants={footerHeadingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gold mb-3" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Services
              </motion.h5>
              <motion.ul 
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="list-unstyled d-flex flex-column gap-2" 
                style={{ fontSize: '0.9rem' }}
              >
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20Luxury%20Weddings.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Luxury Weddings</a>
                </motion.li>
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20Corporate%20Galas.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Corporate Galas</a>
                </motion.li>
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20Anniversaries.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Anniversaries</a>
                </motion.li>
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20DJ%20and%20Sound%20Systems.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>DJ &amp; Sound Systems</a>
                </motion.li>
                <motion.li variants={footerLinkVariants} whileHover={{ x: 5, y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20Fine%20Dining%20Catering.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Fine Dining Catering</a>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Get in Touch */}
            <motion.div 
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h5 
                variants={footerHeadingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gold mb-3" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Get in Touch
              </motion.h5>
              <motion.ul 
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="list-unstyled d-flex flex-column gap-3" 
                style={{ fontSize: '0.9rem', lineHeight: '1.7' }}
              >
                <motion.li variants={footerLinkVariants} className="d-flex align-items-start gap-2">
                  <i className="bi bi-geo-alt-fill text-gold mt-1"></i>
                  <span className="text-white">52, West Street, Kovilpathu, Kalakad - 627501</span>
                </motion.li>
                <motion.li variants={footerLinkVariants} className="d-flex align-items-center gap-2">
                  <i className="bi bi-telephone-fill text-gold"></i>
                  <span className="text-white">+91 73589 51381</span>
                </motion.li>
                <motion.li variants={footerLinkVariants} className="d-flex align-items-center gap-2">
                  <i className="bi bi-envelope-fill text-gold"></i>
                  <span className="text-white">sridurgaevents@gmail.com</span>
                </motion.li>
              </motion.ul>
            </motion.div>

          </div>{/* /row */}

          {/* ── Connect With Us Section ── */}
          <div className="row mt-5 mb-4">
            <div className="col-12 text-center mb-4">
              {/* STAY CONNECTED: letter spacing & gold glow */}
              <motion.span 
                initial={{ letterSpacing: '2px', opacity: 0.7 }}
                whileInView={{ 
                  letterSpacing: '5px', 
                  opacity: 1,
                  textShadow: '0 0 10px rgba(212, 175, 55, 0.6)'
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="text-gold text-uppercase fw-bold d-block" 
                style={{ fontSize: '0.75rem' }}
              >
                Stay Connected
              </motion.span>

              {/* CONNECT WITH US: SplitText word animation */}
              <h5 
                className="text-white mt-1" 
                style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem' }}
              >
                <SplitText
                  text="Connect With Us"
                  by="words"
                  delay={0.2}
                  stagger={0.12}
                  duration={0.8}
                />
              </h5>

              {/* Animated center-expanding gold divider with traveling shine */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="mx-auto" 
                style={{ 
                  position: 'relative', 
                  width: '60px', 
                  height: '3px', 
                  margin: '12px auto', 
                  overflow: 'hidden', 
                  borderRadius: '4px', 
                  boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)'
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #D4AF37 0%, #FFFFFF 50%, #D4AF37 100%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['100% 0%', '-100% 0%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>

            <div className="col-12">
              <motion.div 
                className="row g-3 justify-content-center"
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
                viewport={{ once: true }}
              >
                {contactCards.map((card, idx) => (
                  <FooterContactCard 
                    key={idx}
                    card={card}
                    idx={idx}
                    isMobile={isMobile}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <div className="gold-divider my-4"></div>

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
            {/* Copyright with slow gold shimmer sweep every 8 seconds */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mb-0" 
              style={{ fontSize: '0.8rem' }}
            >
              <span 
                className="shimmer-text-copyright"
                style={{
                  background: 'linear-gradient(90deg, #ffffff 0%, var(--luxury-gold) 50%, #ffffff 100%)',
                  backgroundSize: '200% auto',
                  color: 'transparent',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  animation: 'shine-gold 8s linear infinite'
                }}
              >
                &copy; {new Date().getFullYear()} Sri Durga Events. All Rights Reserved. Crafted for Ultimate Luxury.
              </span>
            </motion.p>
            <div className="d-flex gap-3" style={{ fontSize: '0.8rem' }}>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link to="/privacy-policy" className="text-decoration-none text-white hover-gold position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Privacy Policy</Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link to="/terms-of-service" className="text-decoration-none text-white hover-gold position-relative footer-quick-link" style={{ transition: 'color 0.3s ease' }}>Terms of Service</Link>
              </motion.div>
            </div>
          </div>
        </FadeContent>
      </div>
    </footer>
  );
};

export default Footer;
