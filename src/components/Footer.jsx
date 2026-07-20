import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo/logo.png';

/* ── fires once when the footer row enters the viewport ── */
function useFooterAnimation(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cols = el.querySelectorAll('.footer-col');
          cols.forEach((col) => {
            const cls = col.dataset.anim;
            if (cls) col.classList.add(cls);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

const Footer = () => {
  const rowRef = useRef(null);
  useFooterAnimation(rowRef);

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
      className="bg-luxury-navy-deep border-top border-gold py-5 mt-auto"
      style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2) !important' }}
    >
      <div className="container py-4">

        {/* ── Main 4-column row ── */}
        <div className="row g-4 align-items-stretch" ref={rowRef}>

          {/* Brand Column */}
          <div
            className="col-lg-4 col-md-6 footer-col footer-col-left"
            data-anim="animate-left"
          >
            <div className="d-flex flex-column align-items-center text-center h-100">
              {/* Logo */}
              <img
                src={logo}
                alt="Sri Durga Logo"
                style={{
                  height: '75px',
                  width: '75px',
                  objectFit: 'contain',
                  marginBottom: '6px'
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
          </div>

          {/* Quick Links */}
          <div
            className="col-lg-2 col-md-6 col-6 footer-col footer-col-up"
            data-anim="animate-up-1"
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
              <motion.li variants={footerLinkVariants}><Link to="/" className="text-decoration-none text-white hover-gold d-inline-block">Home</Link></motion.li>
              <motion.li variants={footerLinkVariants}><Link to="/about" className="text-decoration-none text-white hover-gold d-inline-block">About Us</Link></motion.li>
              <motion.li variants={footerLinkVariants}><Link to="/services" className="text-decoration-none text-white hover-gold d-inline-block">Our Services</Link></motion.li>
              <motion.li variants={footerLinkVariants}><Link to="/gallery" className="text-decoration-none text-white hover-gold d-inline-block">Gallery</Link></motion.li>
              <motion.li variants={footerLinkVariants}><Link to="/packages" className="text-decoration-none text-white hover-gold d-inline-block">Packages</Link></motion.li>
            </motion.ul>
          </div>

          {/* Services */}
          <div
            className="col-lg-3 col-md-6 col-6 footer-col footer-col-up"
            data-anim="animate-up-2"
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
              <motion.li variants={footerLinkVariants}><a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20Luxury%20Weddings.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block">Luxury Weddings</a></motion.li>
              <motion.li variants={footerLinkVariants}><a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20Corporate%20Galas.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block">Corporate Galas</a></motion.li>
              <motion.li variants={footerLinkVariants}><a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20Anniversaries.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block">Anniversaries</a></motion.li>
              <motion.li variants={footerLinkVariants}><a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20DJ%20and%20Sound%20Systems.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block">DJ &amp; Sound Systems</a></motion.li>
              <motion.li variants={footerLinkVariants}><a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20Fine%20Dining%20Catering.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white hover-gold d-inline-block">Fine Dining Catering</a></motion.li>
            </motion.ul>
          </div>

          {/* Get in Touch */}
          <div
            className="col-lg-3 col-md-6 footer-col footer-col-right"
            data-anim="animate-right"
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
                <i className="bi bi-geo-alt-fill text-white mt-1"></i>
                <span className="text-white">52, West Street, Kovilpathu, Kalakad - 627501</span>
              </motion.li>
              <motion.li variants={footerLinkVariants} className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill text-white"></i>
                <span className="text-white">+91 73589 51381</span>
              </motion.li>
              <motion.li variants={footerLinkVariants} className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill text-white"></i>
                <span className="text-white">sridurgaevents@gmail.com</span>
              </motion.li>
            </motion.ul>
          </div>

        </div>{/* /row */}

        {/* ── Connect With Us Section ── */}
        <div className="row mt-5 mb-4">
          <div className="col-12 text-center mb-4">
            <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>Stay Connected</span>
            <motion.h5 
              variants={footerHeadingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white mt-1" 
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem' }}
            >
              Connect With Us
            </motion.h5>
            <div className="gold-divider mx-auto" style={{ width: '40px' }}></div>
          </div>
          <div className="col-12">
            <div className="row g-3 justify-content-center">
              {contactCards.map((card, idx) => (
                <div key={idx} className="col-lg-3 col-sm-6 col-12">
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-contact-card py-3 px-3"
                    style={{ minHeight: '100px' }}
                  >
                    <div className="d-flex align-items-center gap-3 text-start w-100">
                      <div className="contact-icon-wrapper mb-0" style={{ width: '45px', height: '45px', flexShrink: 0 }}>
                        <i className={`${card.icon} fs-5`}></i>
                      </div>
                      <div>
                        <h6 className="contact-title mb-0" style={{ fontSize: '1.05rem', color: 'var(--luxury-gold)' }}>{card.title}</h6>
                        <p className="contact-detail mb-0" style={{ fontSize: '0.8rem' }}>{card.detail}</p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-divider my-4"></div>

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <p className="text-white mb-0" style={{ fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} Sri Durga Events. All Rights Reserved. Crafted for Ultimate Luxury.
          </p>
          <div className="d-flex gap-3" style={{ fontSize: '0.8rem' }}>
            <Link to="/privacy-policy" className="text-decoration-none text-white hover-gold">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-decoration-none text-white hover-gold">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
