import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Silk from '../components/Silk';
import SplitText from '../components/SplitText';
import FadeContent from '../components/FadeContent';

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

const TermsOfService = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    {
      icon: 'bi-calendar2-check-fill',
      title: '1. Booking Confirmation',
      items: [
        'Booking is confirmed only after advance payment.',
        'Dates are reserved only after confirmation.'
      ]
    },
    {
      icon: 'bi-palette-fill',
      title: '2. Decoration Services',
      items: [
        'Decorations will be provided according to the selected package.',
        'Minor design variations may occur depending on venue conditions and material availability.',
        'Customized decorations may require additional charges.'
      ]
    },
    {
      icon: 'bi-alarm-fill',
      title: '3. Event Timing',
      items: [
        'Customers must provide accurate event timing.',
        'Delays caused by customers may affect decoration setup.'
      ]
    },
    {
      icon: 'bi-building-fill',
      title: '4. Venue Responsibility',
      items: [
        'Customers are responsible for obtaining venue permissions.',
        'Sri Durga Events is not responsible for venue restrictions.'
      ]
    },
    {
      icon: 'bi-wallet2',
      title: '5. Payments',
      items: [
        'Advance payment is mandatory.',
        'Remaining balance must be paid before event completion.'
      ]
    },
    {
      icon: 'bi-x-circle-fill',
      title: '6. Cancellation Policy',
      items: [
        'Advance payments are non-refundable after preparation has begun.',
        'Date changes are subject to availability.'
      ]
    },
    {
      icon: 'bi-clipboard-check-fill',
      title: '7. Customer Responsibilities',
      items: [
        'Provide correct event details.',
        'Inform us of special decoration requirements in advance.',
        'Ensure venue access during setup.'
      ]
    },
    {
      icon: 'bi-exclamation-triangle-fill',
      title: '8. Liability',
      content: 'Sri Durga Events is not responsible for delays caused by weather, power failures, natural disasters, government restrictions, or circumstances beyond our control.'
    },
    {
      icon: 'bi-award-fill',
      title: '9. Service Guarantee',
      content: 'We strive to deliver decorations and event setup exactly as promised in your selected package while maintaining high-quality standards.'
    },
    {
      icon: 'bi-telephone-outbound-fill',
      title: '10. Contact',
      content: 'For any questions regarding these policies, customers may contact Sri Durga Events via phone, WhatsApp, or email.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="position-relative"
    >
      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-uppercase fw-bold d-block" 
            style={{ fontSize: '0.8rem', color: '#FFFFFF', letterSpacing: '2px' }}
          >
            Legal Documents
          </motion.span>
          <h1 className="display-4 text-white mt-2 shimmer-gold-text">
            <SplitText
              text="Terms of Service"
              delay={0.2}
              stagger={0.03}
              duration={0.7}
            />
          </h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Content Section */}
      <section className="py-5 bg-luxury-navy position-relative overflow-hidden">
        {/* Subtle Silk Backdrop */}
        <div className="terms-background" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden', opacity: 0.08 }}>
          <Silk
            speed={2}
            scale={1.2}
            color="#D4AF37"
            noiseIntensity={0.8}
            rotation={15}
            dpr={isMobileOrTablet ? 1 : [1, 2]}
          />
        </div>

        <div className="container py-4 position-relative" style={{ maxWidth: '900px', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-card p-5 mb-5"
            style={{
              background: 'rgba(11, 19, 43, 0.45)',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '18px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
            }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.95, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lead text-gold mb-4" 
              style={{ fontFamily: "'Playfair Display', serif", lineHeight: '1.8' }}
            >
              By booking Sri Durga Events, you agree to the following terms and conditions.
            </motion.p>

            <div className="d-flex flex-column gap-4 mt-5">
              {sections.map((section, idx) => {
                const isNotice = idx === 5 || idx === 7; // Cancellation and Liability sections
                return (
                  <div key={idx}>
                    <FadeContent threshold={0.1} delay={isMobileOrTablet ? 0 : idx * 0.06}>
                      <motion.div
                        whileHover={{ 
                          y: -4, 
                          borderColor: isNotice ? 'rgba(239, 68, 68, 0.5)' : 'rgba(212, 175, 55, 0.5)', 
                          boxShadow: isNotice ? '0 10px 25px rgba(239, 68, 68, 0.15)' : '0 10px 25px rgba(0,0,0,0.3)' 
                        }}
                        className="legal-section d-flex gap-4 align-items-start p-4"
                        style={{
                          background: 'rgba(11, 19, 43, 0.25)',
                          border: isNotice ? '1px solid rgba(239, 68, 68, 0.25)' : '1px solid rgba(212, 175, 55, 0.15)',
                          borderRadius: '16px',
                          transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                        }}
                      >
                        <motion.div 
                          className="icon-wrapper d-flex align-items-center justify-content-center flex-shrink-0"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            border: isNotice ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(212, 175, 55, 0.3)',
                            background: isNotice ? 'rgba(239, 68, 68, 0.1)' : 'rgba(20, 32, 67, 0.5)',
                            boxShadow: isNotice ? '0 0 10px rgba(239, 68, 68, 0.1)' : '0 0 10px rgba(212, 175, 55, 0.1)'
                          }}
                        >
                          <i className={`bi ${section.icon} ${isNotice ? 'text-danger' : 'text-gold'} fs-4`}></i>
                        </motion.div>
                        <div>
                          <h3 
                            className={`h5 mb-3 ${isNotice ? 'text-danger' : 'text-gold'}`} 
                            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, letterSpacing: '0.5px' }}
                          >
                            {section.title}
                          </h3>
                          {section.items ? (
                            <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.92rem', color: '#FFFFFF', opacity: 0.9 }}>
                              {section.items.map((item, i) => (
                                <motion.li 
                                  key={i} 
                                  className="d-flex align-items-start gap-2"
                                  initial={{ opacity: 0, y: 5 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: i * 0.05 }}
                                >
                                  <i className={`bi bi-check2 ${isNotice ? 'text-danger' : 'text-gold'} mt-1`}></i>
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          ) : (
                            <motion.p 
                              className="mb-0 text-white" 
                              initial={{ opacity: 0, y: 8 }}
                              whileInView={{ opacity: 0.9, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                              style={{ fontSize: '0.92rem', lineHeight: '1.75' }}
                            >
                              {section.content}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </FadeContent>

                    {/* Animated Gold Divider between sections */}
                    {idx < sections.length - 1 && (
                      <div style={{ position: 'relative', width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)', margin: '1.5rem 0', overflow: 'hidden' }}>
                        <motion.div
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <hr className="bg-gold my-5" style={{ opacity: 0.15, height: '1px', border: 'none' }} />

            <div className="text-center text-white-50" style={{ fontSize: '0.85rem' }}>
              <span className="d-block mb-1">Last Updated</span>
              <strong className="text-gold">July 20, 2026</strong>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default TermsOfService;
