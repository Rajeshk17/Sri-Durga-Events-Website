import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Separate imports of each service image
import weddingImg from '../assets/images/services/wedding.jpeg';
import birthdayImg from '../assets/images/services/birthday.jpeg';
import babyShowerImg from '../assets/images/services/baby-shower.jpeg';
import cateringImg from '../assets/images/services/Catering.jpg';
import corporateImg from '../assets/images/services/corporate.jpeg';
import djImg from '../assets/images/services/dj.jpeg';

const SERVICES_DATA = [
  {
    id: '1',
    title: 'Wedding Events',
    description: 'Complete luxury wedding planning, from floral design and layout to stage setup, catering coordination, and scheduling.',
    image: weddingImg,
    link: 'https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20book%20the%20Wedding%20Events%20service.%20Please%20share%20the%20details.'
  },
  {
    id: '2',
    title: 'Birthday Parties',
    description: 'Magical themes, customized decor, activities planning, and vibrant lighting designs to make birthdays unforgettable.',
    image: birthdayImg,
    link: 'https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20book%20the%20Birthday%20Parties%20service.%20Please%20share%20the%20details.'
  },
  {
    id: '3',
    title: 'Baby Shower',
    description: 'Charming, elegant designs with subtle pastel palettes, custom photo booths, and heartwarming arrangements for expecting parents.',
    image: babyShowerImg,
    link: 'https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20book%20the%20Baby%20Shower%20service.%20Please%20share%20the%20details.'
  },
  {
    id: '4',
    title: 'Corporate Events',
    description: 'Premium stage decoration, high-end audiovisual arrays, and smooth organization for gala nights, product launches, and conferences.',
    image: corporateImg,
    link: 'https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20book%20the%20Corporate%20Events%20service.%20Please%20share%20the%20details.'
  },
  {
    id: '5',
    title: 'Catering Services',
    description: 'Gourmet menu selections from worldwide cuisines, premium buffet stations, professional fine-dining staff, and custom beverage bars.',
    image: cateringImg,
    link: 'https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20book%20the%20Catering%20Services%20service.%20Please%20share%20the%20details.'
  },
  {
    id: '6',
    title: 'DJ & Sound Systems',
    description: 'Advanced audio consoles, club-grade sound outputs, intelligent strobe beam light coordinators, and dynamic master hosts.',
    image: djImg,
    link: 'https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20book%20the%20DJ%20%26%20Sound%20Systems%20service.%20Please%20share%20the%20details.'
  }
];

const cleanTitle = (raw = '') =>
  raw
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
    .replace(/[^\x00-\x7F\u00C0-\u024F&]/g, '')
    .replace(/^[\s\W]+/, '')
    .trim();

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

const ServiceCard = ({ service, idx, activeCardId, setActiveCardId, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = isMobile ? activeCardId === service.id : isHovered;

  const handleCardClick = (e) => {
    if (isMobile) {
      setActiveCardId(activeCardId === service.id ? null : service.id);
    }
  };

  const title = cleanTitle(service.title);

  return (
    <motion.div
      custom={idx}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: i * 0.15
          }
        })
      }}
      className="service-card-wrapper"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <motion.div
        animate={isExpanded ? "hover" : "normal"}
        variants={{
          normal: {
            y: 0,
            borderColor: "rgba(212, 175, 55, 0.15)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            transition: { duration: 0.4, ease: "easeInOut" }
          },
          hover: {
            y: -12,
            borderColor: "rgba(212, 175, 55, 0.8)",
            boxShadow: "0 20px 40px rgba(212, 175, 55, 0.22), 0 0 15px rgba(212, 175, 55, 0.1)",
            transition: { duration: 0.4, ease: "easeInOut" }
          }
        }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        onClick={handleCardClick}
        style={{
          height: '420px',
          borderRadius: '18px',
          overflow: 'hidden',
          position: 'relative',
          borderWidth: '1px',
          borderStyle: 'solid',
          cursor: 'pointer',
          background: 'var(--luxury-navy-deep)'
        }}
      >
        {/* Service Image */}
        <motion.div
          variants={{
            normal: { scale: 1, filter: "brightness(1)", transition: { duration: 0.5, ease: "easeInOut" } },
            hover: { scale: 1.08, filter: "brightness(0.7)", transition: { duration: 0.5, ease: "easeInOut" } }
          }}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          <img
            src={service.image}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = weddingImg;
            }}
          />
        </motion.div>

        {/* Dark Luxury Overlay */}
        <motion.div
          variants={{
            normal: { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
            hover: { opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 19, 43, 0.98) 35%, rgba(11, 19, 43, 0.5) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            zIndex: 2
          }}
        >
          {/* Service Title */}
          <motion.h4
            variants={{
              normal: { y: 25, transition: { duration: 0.4, ease: "easeInOut" } },
              hover: { y: 0, transition: { duration: 0.4, ease: "easeInOut" } }
            }}
            style={{
              color: '#D4AF37',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: '1.45rem',
              marginBottom: '1rem'
            }}
          >
            {title}
          </motion.h4>

          {/* Description */}
          <motion.p
            variants={{
              normal: { opacity: 0, y: 15, transition: { duration: 0.35, ease: "easeInOut" } },
              hover: { opacity: 0.9, y: 0, transition: { duration: 0.35, ease: "easeInOut" } }
            }}
            style={{
              color: '#FFFFFF',
              fontSize: '0.85rem',
              lineHeight: '1.65',
              marginBottom: '1.8rem',
              maxWidth: '280px'
            }}
          >
            {service.description}
          </motion.p>

          {/* Booking Button */}
          <motion.div
            variants={{
              normal: { opacity: 0, y: 25, transition: { duration: 0.35, ease: "easeInOut" } },
              hover: { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 0.35, ease: "easeInOut" } 
              }
            }}
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn service-book-btn-framer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                fontSize: '0.75rem',
                padding: '10px 28px',
                borderRadius: '50px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              Book Service
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const [services, setServices] = useState(SERVICES_DATA);
  const [activeCardId, setActiveCardId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${apiUrl}/services`);
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.length > 0) {
          const filtered = data.filter(s => {
            const title = cleanTitle(s.title);
            return title !== 'Anniversary Celebrations' && title !== 'Photography & Videography';
          });
          // Merge description & title from API, keeping local imported image & links intact
          const merged = SERVICES_DATA.map(localItem => {
            const apiItem = filtered.find(s => cleanTitle(s.title) === cleanTitle(localItem.title));
            if (apiItem) {
              return {
                ...localItem,
                title: apiItem.title,
                description: apiItem.description
              };
            }
            return localItem;
          });
          setServices(merged);
        }
      } catch {
        // fallback to SERVICES_DATA
      }
    };
    if (apiUrl) {
      fetchServices();
    } else {
      setServices(SERVICES_DATA);
    }
  }, [apiUrl]);

  return (
    <div className="animate-fade-in">

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
            What We Offer
          </motion.span>
          <motion.h1 
            variants={textAnims.h1}
            initial="hidden"
            animate="visible"
            className="display-4 text-white mt-2 shimmer-gold-text"
          >
            Premium Event Services
          </motion.h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Service Cards Grid */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-4">
          <div className="services-grid">
            {services.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                idx={idx}
                activeCardId={activeCardId}
                setActiveCardId={setActiveCardId}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-luxury-navy-light text-center border-top border-gold" style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important' }}>
        <div className="container py-4">
          <motion.h3 
            variants={textAnims.h3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gold mb-3" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Looking for a custom event package?
          </motion.h3>
          <motion.p 
            variants={textAnims.p}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white mx-auto mb-4" 
            style={{ maxWidth: '600px', fontSize: '0.9rem' }}
          >
            Get in touch with our event design director for tailored setups, custom lighting blueprints, and multi-cuisine buffet menus.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
            <a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20customize%20a%20package%20for%20an%20event.%20Please%20share%20the%20details." target="_blank" rel="noopener noreferrer" className="btn btn-luxury-outline">Customize Event</a>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Services;
