import React from 'react';
import { motion } from 'framer-motion';

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

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: 'bi-person-badge-fill',
      title: '1. Information We Collect',
      items: [
        'Name',
        'Phone Number',
        'Email Address',
        'Event Details',
        'Event Location',
        'Booking Information'
      ]
    },
    {
      icon: 'bi-gear-wide-connected',
      title: '2. How We Use Your Information',
      items: [
        'To confirm bookings',
        'To communicate with customers',
        'To plan and manage events',
        'To improve our services',
        'To provide customer support'
      ]
    },
    {
      icon: 'bi-shield-lock-fill',
      title: '3. Information Security',
      content: 'Your personal information is securely stored and will never be sold or shared with third parties without your permission except where required by law.'
    },
    {
      icon: 'bi-chat-left-quote-fill',
      title: '4. Customer Communication',
      content: 'By contacting Sri Durga Events, you agree to receive phone calls, WhatsApp messages, or emails regarding your booking.'
    },
    {
      icon: 'bi-arrow-repeat',
      title: '5. Policy Updates',
      content: 'This Privacy Policy may be updated periodically without prior notice.'
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
            variants={textAnims.label}
            initial="hidden"
            animate="visible"
            className="text-uppercase fw-bold d-block" 
            style={{ fontSize: '0.8rem', color: '#FFFFFF' }}
          >
            Legal Documents
          </motion.span>
          <motion.h1 
            variants={textAnims.h1}
            initial="hidden"
            animate="visible"
            className="display-4 text-white mt-2 shimmer-gold-text"
          >
            Privacy Policy
          </motion.h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Content Section */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-4" style={{ maxWidth: '900px' }}>
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
              variants={textAnims.p}
              initial="hidden"
              animate="visible"
              className="lead text-gold mb-4" 
              style={{ fontFamily: "'Playfair Display', serif", lineHeight: '1.8' }}
            >
              At Sri Durga Events, we value your privacy and are committed to protecting your personal information. Any information shared with us is used only for booking, communication, and providing our event management services.
            </motion.p>

            <motion.div
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
              className="d-flex flex-column gap-5 mt-5"
            >
              {sections.map((section, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="legal-section d-flex gap-4 align-items-start"
                >
                  <div 
                    className="icon-wrapper d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      background: 'rgba(20, 32, 67, 0.5)',
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.1)'
                    }}
                  >
                    <i className={`bi ${section.icon} text-gold fs-4`}></i>
                  </div>
                  <div>
                    <motion.h3 
                      variants={textAnims.h2}
                      className="h5 text-gold mb-3" 
                      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, letterSpacing: '0.5px' }}
                    >
                      {section.title}
                    </motion.h3>
                    {section.items ? (
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0" style={{ fontSize: '0.92rem', color: '#FFFFFF', opacity: 0.9 }}>
                        {section.items.map((item, i) => (
                          <li key={i} className="d-flex align-items-center gap-2">
                            <i className="bi bi-check2 text-gold"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <motion.p 
                        variants={textAnims.p}
                        className="mb-0 text-white" 
                        style={{ fontSize: '0.92rem', lineHeight: '1.75', opacity: 0.9 }}
                      >
                        {section.content}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

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

export default PrivacyPolicy;
