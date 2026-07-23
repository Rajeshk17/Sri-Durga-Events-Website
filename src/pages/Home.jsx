import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import weddingBlueLandscape from '../assets/images/hero/wedding_blue_landscape.jpg';
import weddingPinkLandscape from '../assets/images/hero/wedding_pink_landscape.jpg';
import heroSlide1 from '../assets/images/home/hero_slide_1.jpg';
import heroSlide2 from '../assets/images/home/hero_slide_2.jpg';
import birthdayFeatured from '../assets/images/home/birthday_featured.jpg';
import whyChooseUs1 from '../assets/images/why-choose-us/why-choose-us-1.jpeg';
import whyChooseUs2 from '../assets/images/why-choose-us/why-choose-us-2.jpeg';
import whyChooseUs3 from '../assets/images/why-choose-us/why-choose-us-3.jpeg';
import highlight1 from '../assets/images/gallery/highlight_1.jpeg';
import highlight2 from '../assets/images/gallery/highlight_2.jpeg';
import highlight3 from '../assets/images/gallery/highlight_3.jpeg';
import highlight4 from '../assets/images/gallery/highlight_4.jpeg';
import highlight5 from '../assets/images/gallery/highlight_5.jpeg';
import highlight6 from '../assets/images/gallery/highlight_6.jpeg';
import weddingServiceImg from '../assets/images/services/wedding.jpeg';
import babyShowerServiceImg from '../assets/images/services/baby-shower.jpeg';
import corporateServiceImg from '../assets/images/services/corporate.jpeg';
import cateringServiceImg from '../assets/images/services/Catering.jpg';
import djServiceImg from '../assets/images/services/dj.jpeg';
import SplitText from '../components/SplitText';
import ScrollReveal from '../components/ScrollReveal';
import Masonry from '../components/Masonry';
import SplashCursor from '../components/SplashCursor';
import ChromaGrid from '../components/ChromaGrid';

const SERVICE_IMAGE_MAPPING = {
  'Wedding Events': weddingServiceImg,
  'Birthday Parties': birthdayFeatured,
  'Baby Shower': babyShowerServiceImg,
  'Anniversary Celebrations': weddingServiceImg,
  'Corporate Events': corporateServiceImg,
  'Catering Services': cateringServiceImg,
  'Photography & Videography': weddingServiceImg,
  'DJ & Sound Systems': djServiceImg
};

/* ── FADE UP/IN VIEWPORT HOOK ── */
function useFadeInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const textAnims = {
  h1: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
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
    hidden: { opacity: 0, letterSpacing: "1px" },
    visible: { 
      opacity: 1, 
      letterSpacing: "3px", 
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
    }
  }
};

/* ── MAIN HOME COMPONENT ── */
const Home = () => {
  const heroBgs = [
    heroSlide1,
    heroSlide2
  ];

  const [currentBgIdx, setCurrentBgIdx] = useState(0);
  const [prevBgIdx, setPrevBgIdx] = useState(null);

  // Preload all images on mount
  useEffect(() => {
    heroBgs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Interval autoplay timer
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevBgIdx(currentBgIdx);
      setCurrentBgIdx((prev) => (prev + 1) % heroBgs.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentBgIdx]);

    const serviceCards = [
      {
        title: 'Wedding Decorations',
        subtitle: 'Luxury Wedding Decorations',
        image: weddingServiceImg,
        borderColor: '#D4AF37',
        gradient: 'linear-gradient(145deg, #D4AF37, #1A1A1A)',
        url: '/services'
      },
      {
        title: 'Birthday Celebrations',
        subtitle: 'Memorable Birthday Events',
        image: birthdayFeatured,
        borderColor: '#8B5CF6',
        gradient: 'linear-gradient(145deg, #8B5CF6, #1A1A1A)',
        url: '/services'
      },
      {
        title: 'Corporate Events',
        subtitle: 'Professional Event Management',
        image: corporateServiceImg,
        borderColor: '#2563EB',
        gradient: 'linear-gradient(145deg, #2563EB, #1A1A1A)',
        url: '/services'
      }
    ];

  const testimonials = [
    {
      name: 'Arjun & Priya',
      role: 'Bride & Groom',
      feedback: 'Sri Durga Events made our wedding truly unforgettable. The grand stage decoration, floral arrangements and professional planning exceeded our expectations. Every guest appreciated the beautiful setup.'
    },
    {
      name: 'Karthik Raj',
      role: 'Birthday Celebration',
      feedback: "Our son's birthday celebration was organized perfectly. The balloon decorations, lighting and entertainment created wonderful memories for our family."
    },
    {
      name: 'Ramesh Kumar',
      role: 'Corporate Client',
      feedback: 'Sri Durga Events managed our company event with excellent planning and flawless execution. The stage, sound system and hospitality were outstanding.'
    },
    {
      name: 'Suresh & Lakshmi',
      role: 'Parents',
      feedback: 'The baby shower decoration was elegant and traditional. The floral designs, seating arrangements and photography made the event very special.'
    }
  ];

  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const redesignedGallery = [
    {
      title: 'Royal Wedding Decoration',
      description: 'Exquisite mandap and banquet designs with fresh exotic floral arches.',
      image: highlight1
    },
    {
      title: 'Bride & Groom Stage',
      description: 'Elegant golden themed couple stages with crystal chandelier arrays.',
      image: highlight2
    },
    {
      title: 'Corporate Conference',
      description: 'Professional high-end sound coordinates and executive layouts.',
      image: highlight3
    },
    {
      title: 'Birthday Celebration',
      description: 'Sophisticated balloon structures and neon photobooths.',
      image: highlight4
    },
    {
      title: 'Premium Catering Setup',
      description: 'Delectable multi-cuisine presentation served with fine dining setups.',
      image: highlight5
    },
    {
      title: 'DJ & Stage Lighting',
      description: 'Club acoustics, smoke effects, and intelligent strobe light systems.',
      image: highlight6
    }
  ];

  // Observers for scroll reveal stagger animation
  const servicesReveal = useFadeInView();
  const testimonialsReveal = useFadeInView();
  const galleryReveal = useFadeInView();
  const containerRef = useRef(null);

  const [frontIdx, setFrontIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 575);
      setIsDesktop(window.innerWidth >= 992);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Scroll Parallax Hooks for the Stacked Cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxYBack = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const parallaxYMiddle = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const parallaxYFront = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  // Auto rotating interval
  useEffect(() => {
    if (isHovered || isMobile) return;
    const interval = setInterval(() => {
      setFrontIdx(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, isMobile]);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="hero-section position-relative overflow-hidden">
        {/* Background Slideshow */}
        <div className="hero-bg-container">
          {heroBgs.map((bgUrl, idx) => {
            const isActive = idx === currentBgIdx;
            const isPrev = idx === prevBgIdx;
            return (
              <div
                key={idx}
                className={`hero-bg-slide ${isActive ? 'active' : ''} ${isPrev ? 'previous' : ''}`}
                style={{ backgroundImage: `url('${bgUrl}')` }}
              />
            );
          })}
        </div>

        {/* Animated Dark Overlay with Soft Luxury Glow */}
        <div className="hero-overlay-animated"></div>

        {isDesktop && (
          <SplashCursor
            position="absolute"
            zIndex={3}
            TRANSPARENT={true}
            SHADING={true}
            RAINBOW_MODE={false}
            COLOR="#D4AF37"
            SIM_RESOLUTION={128}
            DYE_RESOLUTION={1024}
            SPLAT_RADIUS={0.15}
            SPLAT_FORCE={5000}
            COLOR_UPDATE_SPEED={8}
          />
        )}

        <div className="container hero-content-wrapper">
          <div className="row">
            <div className="col-lg-8 text-start">
              <div className="hero-anim-title">
                <motion.span 
                  variants={textAnims.label}
                  initial="hidden"
                  animate="visible"
                  className="text-white text-uppercase fw-bold mb-3 d-inline-block" 
                  style={{ fontSize: '0.85rem' }}
                >
                  Exquisite Event Planners
                </motion.span>
                 <h1 
                  className="display-3 text-white fw-bold mb-3 shimmer-gold-text" 
                  style={{ lineHeight: 1.15 }}
                >
                  <SplitText text="Make Every Event" delay={0.25} /> <br />
                  <span className="text-gold">
                    <SplitText text="Unforgettable" delay={0.8} />
                  </span>
                </h1>
              </div>
              <div className="hero-anim-desc">
                <motion.p 
                  variants={textAnims.p}
                  initial="hidden"
                  animate="visible"
                  className="lead text-white mb-5" 
                  style={{ fontSize: '1.1rem', maxWidth: '600px', opacity: 0.9 }}
                >
                  Sri Durga Events curates and designs premium, luxury events tailored to your finest desires. Our dedication under Mariyappan translates your visions into legendary celebrations.
                </motion.p>
              </div>
              <div className="hero-anim-btns">
                <div className="d-flex flex-wrap gap-3">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    href="tel:+917358951381" 
                    className="btn btn-gold px-4 py-3"
                  >
                    Book Now
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link to="/services" className="btn btn-luxury-outline px-4 py-3">View Services</Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Services Section */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-5">
          <div className="text-center mb-5">
            <motion.span 
              variants={textAnims.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white text-uppercase fw-bold d-block" 
              style={{ fontSize: '0.8rem', letterSpacing: '2px' }}
            >
              Our Specialities
            </motion.span>
            <motion.h2 
              variants={textAnims.h2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="display-5 text-gold mt-2 shimmer-gold-text"
            >
              Featured Services
            </motion.h2>
            <div className="gold-divider"></div>
          </div>

          <ChromaGrid
            items={serviceCards}
            columns={3}
            rows={1}
            radius={250}
            damping={0.4}
            fadeOut={0.5}
            ease="power3.out"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={containerRef} className="py-5 bg-luxury-navy-light position-relative">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            {/* LEFT SIDE (Stacked Overlapping Photo Cards) */}
            <div className="col-lg-6">
              {isMobile ? (
                /* Mobile: Stacked vertically with scroll reveal animations */
                <div 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    padding: '1rem 0',
                    width: '100%',
                    maxWidth: '320px',
                    margin: '0 auto'
                  }}
                >
                  {[
                   {
  title: 'Corporate Event',
  img: whyChooseUs3
},
{
  title: 'Birthday Event',
  img: whyChooseUs2
},
{
  title: 'Wedding Event',
  img: whyChooseUs1
}
                  ].map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        borderRadius: "20px",
                        overflow: "hidden",
                        border: "1px solid rgba(212, 175, 55, 0.35)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.45)"
                      }}
                    >
                      <img src={card.img} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div className="stacked-card-overlay">
                        <span className="stacked-card-title">{card.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Desktop & Tablet: Dynamic absolute overlapping stacked loop using Framer Motion */
                <motion.div 
                  className="stacked-cards-container"
                  animate={{ y: [-6, 6] }}
                  transition={{
                    y: {
                      duration: 5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {[
                    {
                      title: 'Corporate Event',
                      img: whyChooseUs3
                    },
                    {
                      title: 'Birthday Event',
                      img: whyChooseUs2
                    },
                    {
                      title: 'Wedding Event',
                      img: whyChooseUs1
                    }
                  ].map((card, idx) => {
                    let position = 'back';
                    if (idx === frontIdx) {
                      position = 'front';
                    } else if (idx === (frontIdx + 1) % 3) {
                      position = 'middle';
                    }
                    const cardParallaxY = position === 'front' ? parallaxYFront : (position === 'middle' ? parallaxYMiddle : parallaxYBack);
                    return (
                      <motion.div
                        key={idx}
                        style={{
                          y: cardParallaxY,
                          position: "absolute",
                          width: "440px",
                          height: "290px",
                          zIndex: position === 'front' ? 30 : (position === 'middle' ? 20 : 10)
                        }}
                      >
                        <motion.div
                          custom={isHovered}
                          variants={{
                            back: (hovered) => ({
                              x: hovered ? -120 : -50,
                              y: hovered ? -70 : -45,
                              scale: 0.88,
                              rotate: hovered ? -14 : -7,
                              opacity: 0.65,
                              borderColor: "rgba(212, 175, 55, 0.25)",
                              boxShadow: "0 12px 35px rgba(0,0,0,0.45)"
                            }),
                            middle: (hovered) => ({
                              x: hovered ? 0 : 0,
                              y: hovered ? -20 : 0,
                              scale: 0.95,
                              rotate: hovered ? 0 : 3,
                              opacity: 0.85,
                              borderColor: "rgba(212, 175, 55, 0.25)",
                              boxShadow: "0 12px 35px rgba(0,0,0,0.45)"
                            }),
                            front: (hovered) => ({
                              x: hovered ? 120 : 50,
                              y: hovered ? 50 : 45,
                              scale: hovered ? 1.05 : 1,
                              rotate: hovered ? 6 : -3,
                              opacity: 1,
                              borderColor: hovered ? "rgba(212, 175, 55, 0.9)" : "rgba(212, 175, 55, 0.35)",
                              boxShadow: hovered 
                                ? "0 20px 45px rgba(212,175,55,0.22), 0 0 20px rgba(212,175,55,0.15)"
                                : "0 15px 40px rgba(0,0,0,0.5)"
                            })
                          }}
                          animate={position}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut"
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "20px",
                            overflow: "hidden",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            position: "relative"
                          }}
                        >
                          <motion.img 
                            src={card.img} 
                            alt={card.title} 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            animate={{ scale: isHovered && position === 'front' ? 1.05 : 1 }}
                            transition={{ duration: 0.4 }}
                          />
                          <div className="stacked-card-overlay">
                            <span className="stacked-card-title">{card.title}</span>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* RIGHT SIDE (Content with Framer Motion timeline choreography) */}
            <motion.div 
              className="col-lg-6"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.span 
                className="text-gold text-uppercase fw-bold" 
                variants={textAnims.label}
                style={{ 
                  fontSize: '0.8rem', 
                  display: 'inline-block'
                }}
              >
                Signature Standards
              </motion.span>
              <motion.h2 
                className="display-5 text-white mt-2 mb-4"
                variants={textAnims.h2}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Choose Sri Durga
              </motion.h2>
              <motion.div 
                variants={{
                  hidden: { scaleX: 0 },
                  visible: { scaleX: 1, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                style={{
                  width: '80px',
                  height: '3px',
                  background: 'var(--luxury-gold)',
                  transformOrigin: 'left',
                  boxShadow: '0 0 8px var(--luxury-gold)',
                  marginBottom: '2rem'
                }}
              />
              
              <div className="d-flex flex-column gap-4">
                {[
                  {
                    title: 'Bespoke Concept Designs',
                    desc: "We don't repeat layouts. Every event receives an exclusive design concept customized exactly to your vision.",
                    icon: 'bi-palette-fill'
                  },
                  {
                    title: 'Meticulous Implementation',
                    desc: 'Timelines, lighting transitions, vendor communications—we micromanage details so you can enjoy your event.',
                    icon: 'bi-calendar-check-fill'
                  },
                  {
                    title: 'Elite Coordination Networks',
                    desc: 'We source only five-star caterers, high-end production crews, and premier entertainers across the industry.',
                    icon: 'bi-people-fill'
                  }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="feature-luxury-card p-4"
                    variants={{
                      hidden: { opacity: 0, y: 35 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { 
                          duration: 0.8, 
                          ease: [0.16, 1, 0.3, 1]
                        } 
                      }
                    }}
                    whileHover={{ y: -6, borderColor: 'rgba(212, 175, 55, 0.8)', boxShadow: '0 10px 30px rgba(212, 175, 55, 0.12)' }}
                    style={{ 
                      background: 'rgba(28, 37, 65, 0.25)', 
                      border: '1px solid rgba(212, 175, 55, 0.15)', 
                      borderRadius: '16px',
                      transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                    }}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <motion.div 
                        className="feature-icon-wrapper text-gold d-flex align-items-center justify-content-center"
                        style={{ fontSize: '1.5rem', width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)', flexShrink: 0 }}
                        whileHover={{ scale: 1.25, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <i className={`bi ${item.icon}`}></i>
                      </motion.div>
                      <div>
                        <h4 
                          className="text-gold mb-2" 
                          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: '1.2rem' }}
                        >
                          {item.title}
                        </h4>
                        <p 
                          className="mb-0 text-white" 
                          style={{ 
                            fontSize: '0.88rem',
                            lineHeight: '1.75',
                            opacity: 0.9
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsReveal.ref} className="py-5 bg-luxury-navy testimonials-section-container">
        <div className="container py-5 position-relative">
          <div className="text-center mb-5">
            <motion.span 
              variants={textAnims.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-gold text-uppercase fw-bold d-block" 
              style={{ fontSize: '0.8rem' }}
            >
              Client Praise
            </motion.span>
            <motion.h2 
              variants={textAnims.h2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="display-5 text-gold mt-2"
            >
              Testimonials
            </motion.h2>
            <div className="gold-divider mx-auto"></div>
          </div>

          <div className="testimonials-slider-wrapper position-relative mx-auto" style={{ maxWidth: '800px' }}>
            <div className="testimonial-slides-container overflow-hidden" style={{ minHeight: '260px', position: 'relative' }}>
              {testimonials.map((t, idx) => {
                const isActive = idx === activeTestimonialIdx;
                return (
                  <div
                    key={idx}
                    className={`testimonial-slide-card ${isActive ? 'active' : ''}`}
                    style={{
                      position: isActive ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                      visibility: isActive ? 'visible' : 'hidden',
                      transition: 'opacity 1.6s ease-in-out, transform 1.6s ease-in-out, visibility 1.6s ease-in-out'
                    }}
                  >
                    <div className="card h-100 testimonial-glass-card p-4 p-md-5 text-center">
                      <div className="quote-icon mb-4">
                        <i className="bi bi-quote text-gold fs-1 opacity-50"></i>
                      </div>
                      <ScrollReveal
                        baseOpacity={0.15}
                        enableBlur={true}
                        baseRotation={0}
                        blurStrength={8}
                        containerClassName="mb-4"
                        textClassName="card-text text-white fs-5 italic"
                        style={{ fontStyle: 'italic', lineHeight: '1.7' }}
                        wordAnimationEnd="bottom+=10% bottom"
                      >
                        {t.feedback}
                      </ScrollReveal>
                      <div className="mt-4">
                        <motion.h4 
                          variants={textAnims.h3}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="text-gold mb-1" 
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {t.name}
                        </motion.h4>
                        <motion.small 
                          variants={textAnims.label}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="text-white-50 text-uppercase fw-bold d-block" 
                          style={{ fontSize: '0.8rem' }}
                        >
                          {t.role}
                        </motion.small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Gallery Preview Section (Gallery Highlights) */}
      <section ref={galleryReveal.ref} className="py-5 bg-luxury-navy-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <motion.span 
              variants={textAnims.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-gold text-uppercase fw-bold d-block" 
              style={{ fontSize: '0.8rem' }}
            >
              Visual Inspiration
            </motion.span>
            <motion.h2 
              variants={textAnims.h2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="display-5 text-gold mt-2"
            >
              Gallery Highlights
            </motion.h2>
            <div className="gold-divider"></div>
          </div>

          <Masonry
            items={redesignedGallery}
            animateFrom="bottom"
            duration={2.2}
            ease="expo.out"
            stagger={0.18}
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            colorShiftOnHover={false}
          />

          <div className="text-center mt-5">
            <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
              <Link to="/gallery" className="btn btn-luxury-outline px-4 py-3">Explore Full Gallery</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-5 text-center bg-luxury-navy position-relative border-top border-gold" style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important' }}>
        <div className="container py-5">
          <h2 className="display-4 text-gold mb-3">
            <SplitText
              text="Plan Your Masterpiece"
              delay={0.04}
              stagger={0.04}
              duration={1}
            />
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.95, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-white mx-auto mb-5" 
            style={{ maxWidth: '600px', fontSize: '1.05rem' }}
          >
            Ready to design an elite celebration? Contact our planning consultants and receive a pre-event blueprint draft.
          </motion.p>
          <motion.div 
            className="d-flex justify-content-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events!%20I%20am%20interested%20in%20booking%20an%20event.%20Please%20share%20the%20details%20and%20pricing." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-luxury-outline px-4 py-3"
            >
              Book Consultation
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/contact" className="btn btn-gold px-4 py-3">Send Message</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
