import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';

const FALLBACK_PACKAGES = [
  {
    id: '1',
    name: 'Silver Celebration',
    price: '₹3,999',
    subtitle: 'Perfect for Small Celebrations',
    features: [
      'Elegant Stage Decoration',
      'Balloon Decoration',
      'Basic Floral Decoration',
      'Decorative LED Lighting',
      'Premium Sound System',
      'Wireless Microphone Setup',
      'Seating Arrangement (Up to 100 Guests)',
      'Cake Table Decoration',
      'Welcome Entrance Decoration',
      'Event Coordinator Support'
    ]
  },
  {
    id: '2',
    name: 'Golden Celebration',
    price: '₹6,999',
    subtitle: 'Ideal for Family Functions & Special Events',
    features: [
      'Premium Stage Decoration',
      'Floral Entrance Arch',
      'Theme-Based Decoration',
      'Decorative LED Lighting',
      'Professional Sound System',
      'Wireless Microphone Setup',
      'Smoke Effect Entry',
      'Premium Cake Table Setup',
      'Seating Arrangement (Up to 250 Guests)',
      'Event Planner + Support Staff',
      'Welcome Counter Decoration',
      'Complete Venue Decoration'
    ]
  },
  {
    id: '3',
    name: 'Royal Signature',
    price: '₹9,999',
    subtitle: 'Luxury Event Experience',
    features: [
      'Luxury Stage Decoration',
      'Premium Floral Decoration',
      'Grand Entrance Walkway',
      'Intelligent LED Lighting',
      'LED Wall Arrangement',
      'Cold Pyro Entry Effect',
      'Smoke Effect',
      'Premium DJ & Sound System',
      'Professional Stage Setup',
      'Dedicated Event Management Team',
      'VIP Seating Arrangement',
      'Premium Welcome Lounge',
      'Customized Theme Decoration',
      'Complete Venue Decoration',
      'End-to-End Event Coordination'
    ]
  }
];

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

/* ── COUNT UP PRICE COMPONENT ── */
const CountUpPrice = ({ priceStr }) => {
  const [displayPrice, setDisplayPrice] = useState('₹0');

  useEffect(() => {
    const numericStr = priceStr.replace(/[^0-9]/g, '');
    const target = parseInt(numericStr, 10) || 0;
    const prefix = priceStr.includes('₹') ? '₹' : (priceStr.includes('$') ? '$' : '');

    const duration = 1200; // 1.2s count up
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const current = Math.round(easedProgress * target);

      setDisplayPrice(`${prefix}${current.toLocaleString('en-IN')}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [priceStr]);

  return (
    <span 
      className="display-4 text-white fw-bold" 
      style={{ 
        fontFamily: "'Playfair Display', serif",
        textShadow: '0 0 12px rgba(212, 175, 55, 0.4)' // soft price glow
      }}
    >
      {displayPrice}
    </span>
  );
};

/* ── FLOATING PARTICLES BACKGROUND ── */
const Particles = () => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="particle-container">
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 3; // 3px to 9px
        const left = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * 8; // 0s to 8s
        const duration = Math.random() * 8 + 6; // 6s to 14s
        return (
          <div
            key={i}
            className="particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`
            }}
          />
        );
      })}
    </div>
  );
};

/* ── INDIVIDUAL PACKAGE CARD WITH FRAMER MOTION ── */
const PackageCard = ({ pkg, idx, activeCardId, setActiveCardId, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isMobile ? activeCardId === pkg.id : isHovered;

  const handleCardClick = (e) => {
    if (isMobile) {
      setActiveCardId(activeCardId === pkg.id ? null : pkg.id);
    }
  };

  const isPremium = idx === 2;

  const getLoadVariant = () => {
    if (idx === 0) {
      return {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } }
      };
    }
    if (idx === 1) {
      return {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } }
      };
    }
    return {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } }
    };
  };

  const loadVariants = getLoadVariant();

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 0.85,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={loadVariants}
      className="col-lg-4 col-md-6 d-flex align-items-stretch"
    >
      <motion.div
        animate={isExpanded ? "hover" : "normal"}
        variants={{
          normal: {
            y: 0,
            scale: 1,
            backgroundColor: "rgba(11, 19, 43, 0.45)",
            borderColor: isPremium ? "var(--luxury-gold)" : "rgba(212, 175, 55, 0.15)",
            boxShadow: isPremium 
              ? "0 10px 30px rgba(212, 175, 55, 0.22), 0 0 15px rgba(212, 175, 55, 0.12)" 
              : "0 10px 30px rgba(0, 0, 0, 0.4)",
            transition: { duration: 0.4, ease: "easeInOut" }
          },
          hover: {
            y: -12,
            scale: 1.03,
            backgroundColor: "rgba(20, 32, 67, 0.65)",
            borderColor: "rgba(212, 175, 55, 0.85)",
            boxShadow: "0 20px 45px rgba(212, 175, 55, 0.35), 0 0 20px rgba(212, 175, 55, 0.2)",
            transition: { duration: 0.4, ease: "easeInOut" }
          }
        }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleCardClick}
        style={{
          borderRadius: '18px',
          borderWidth: '1px',
          borderStyle: 'solid',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
        className="card package-card w-100"
      >
        {isPremium && (
          <span 
            className="position-absolute top-0 start-50 translate-middle badge bg-gold text-dark text-uppercase py-2 px-3 fw-bold"
            style={{ letterSpacing: '2px', fontSize: '0.65rem', zIndex: 10 }}
          >
            The Masterpiece
          </span>
        )}

        <div className="card-body p-5 d-flex flex-column h-100">
          {/* Package Name with Shimmer text effect */}
          <h3 className="mb-1 shimmer-gold-text text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
            {pkg.name}
          </h3>

          {/* Subtitle */}
          <motion.span 
            variants={textAnims.label}
            initial="hidden"
            animate="visible"
            className="text-white d-block mb-3 small text-center" 
            style={{ opacity: 0.6, fontSize: '0.8rem', fontStyle: 'italic' }}
          >
            {pkg.subtitle}
          </motion.span>
          
          {/* Price */}
          <div className="my-3 text-center">
            <CountUpPrice priceStr={pkg.price} />
            <span className="text-white d-block mt-2 small" style={{ opacity: 0.7 }}>Starting Price</span>
          </div>

          <hr className="bg-gold my-4" style={{ opacity: 0.15, height: '1px', border: 'none' }} />

          {/* Features List with Staggered Entrance */}
          <motion.ul 
            variants={listVariants}
            className="list-unstyled text-start d-flex flex-column gap-3 flex-grow-1" 
            style={{ fontSize: '0.88rem', marginBottom: '2.5rem' }}
          >
            {pkg.features.map((feature, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="d-flex align-items-start gap-2"
              >
                <i className="bi bi-check2 text-gold mt-1"></i>
                <span style={{ color: '#FFFFFF' }}>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* INQUIRE PACKAGE Button */}
          <div className="mt-auto pt-2">
            <motion.a 
              whileHover={{ scale: 1.04 }}
              href={`https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20the%20${encodeURIComponent(pkg.name)}.%20Please%20share%20the%20details.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn package-inquire-btn-framer w-100 py-3 fw-bold"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                borderRadius: '50px',
                fontSize: '0.8rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              Inquire Package
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── MAIN PACKAGES PAGE ── */
const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCardId, setActiveCardId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPackages(FALLBACK_PACKAGES);
    setLoading(false);
  }, []);

  return (
    <div className="animate-fade-in position-relative">
      <Particles />

      {/* Header */}
      <header className="page-header position-relative" style={{ zIndex: 1 }}>
        <div className="container">
          <motion.span 
            variants={textAnims.label}
            initial="hidden"
            animate="visible"
            className="text-gold text-uppercase fw-bold d-block" 
            style={{ fontSize: '0.8rem', letterSpacing: '2px' }}
          >
            Investment Plans
          </motion.span>
          <motion.h1 
            variants={textAnims.h1}
            initial="hidden"
            animate="visible"
            className="display-4 text-gold mt-2"
          >
            <span className="shimmer-title shimmer-gold-text">Curated Packages</span>
          </motion.h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Pricing Cards */}
      <section className="py-5 bg-luxury-navy position-relative" style={{ zIndex: 1 }}>
        <div className="container py-4">
          {loading ? (
            <LoadingSpinner text="Retrieving Curated Pricing..." />
          ) : (
            <div className="row g-4 justify-content-center align-items-stretch">
              {packages.map((pkg, idx) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  idx={idx}
                  activeCardId={activeCardId}
                  setActiveCardId={setActiveCardId}
                  isMobile={isMobile}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Package Disclaimer */}
      <section 
        className="py-5 bg-luxury-navy-light text-center border-top border-gold position-relative" 
        style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important', zIndex: 1 }}
      >
        <div className="container py-4">
          <motion.h4 
            variants={textAnims.h3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gold mb-3" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Need a Tailor-made Blueprint?
          </motion.h4>
          <motion.p 
            variants={textAnims.p}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white mx-auto mb-4" 
            style={{ maxWidth: '600px', fontSize: '0.9rem' }}
          >
            All standard event sizes can be extended. Contact our sales department to include custom setups, floral modifications, and guest list count extensions.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
            <Link to="/contact" className="btn btn-luxury-outline packages-btn">Contact Planners</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
