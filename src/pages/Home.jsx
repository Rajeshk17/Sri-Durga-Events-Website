import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import weddingBlueLandscape from '../assets/images/wedding_blue_landscape.jpg';
import weddingPinkLandscape from '../assets/images/wedding_pink_landscape.jpg';

const SERVICE_IMAGE_MAPPING = {
  'Wedding Events': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
  'Birthday Parties': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800',
  'Baby Shower': 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
  'Anniversary Celebrations': 'https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?auto=format&fit=crop&q=80&w=800',
  'Corporate Events': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
  'Catering Services': 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
  'Photography & Videography': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
  'DJ & Sound Systems': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
};

/* ────────────────────────────────────────────────────────────────────────
   FADE UP/IN VIEWPORT HOOK
   ──────────────────────────────────────────────────────────────────────── */
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

/* ────────────────────────────────────────────────────────────────────────
   MAIN HOME COMPONENT
   ──────────────────────────────────────────────────────────────────────── */
const Home = () => {
  // 3 premium landscape (16:9) luxury event images for slideshow
  const heroBgs = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920', // Grand floral wedding stage setup
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920'  // Premium luxury wedding hall setup with chandeliers
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

  // Interval autoplay timer resetting whenever slide index changes
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevBgIdx(currentBgIdx);
      setCurrentBgIdx((prev) => (prev + 1) % heroBgs.length);
    }, 6000); // 6 seconds visible duration

    return () => clearInterval(interval);
  }, [currentBgIdx]);



  // Preview items matching the updated list of services (plain titles, no emojis)
  const featuredServices = [
    {
      title: 'Wedding Events',
      description: 'Bespoke luxury wedding planning, stage designs, and complete coordination for your magical day.',
      image: SERVICE_IMAGE_MAPPING['Wedding Events']
    },
    {
      title: 'Birthday Events',
      description: 'Premium birthday event planning for kids and adults, featuring custom themes, elegant balloon and floral decoration, cake setups, entertainment, and complete event management.',
      image: SERVICE_IMAGE_MAPPING['Birthday Parties']
    },
    {
      title: 'DJ & Sound Systems',
      description: 'State-of-the-art acoustics, custom soundtracks, moving beam lasers, and professional disc jockey setups.',
      image: SERVICE_IMAGE_MAPPING['DJ & Sound Systems']
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

  // Auto-slide testimonials every 7.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 7500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Redesigned premium gallery cards with high-quality luxury event images (6 equal size items)
  const redesignedGallery = [
    {
      title: 'Royal Wedding Decoration',
      description: 'Exquisite mandap and banquet designs with fresh exotic floral arches.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Bride & Groom Stage',
      description: 'Elegant golden themed couple stages with crystal chandelier arrays.',
      image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Corporate Conference',
      description: 'Professional high-end sound coordinates and executive layouts.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Birthday Celebration',
      description: 'Sophisticated balloon structures and neon photobooths.',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'Premium Catering Setup',
      description: 'Delectable multi-cuisine presentation served with fine dining setups.',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: 'DJ & Stage Lighting',
      description: 'Club acoustics, smoke effects, and intelligent strobe light systems.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
    }
  ];

  // Observers for scroll reveal stagger animation
  const servicesReveal = useFadeInView();
  const whyChooseReveal = useFadeInView();
  const testimonialsReveal = useFadeInView();
  const galleryReveal = useFadeInView();

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



        <div className="container hero-content-wrapper">
          <div className="row">
            <div className="col-lg-8 text-start">
              <div className="hero-anim-title">
                <span className="text-white text-uppercase fw-bold mb-3 d-inline-block" style={{ fontSize: '0.85rem', letterSpacing: '3px' }}>
                  Exquisite Event Planners
                </span>
                <h1 className="display-3 text-white fw-bold mb-3" style={{ lineHeight: 1.15 }}>
                  Make Every Event <br />
                  <span className="text-gold">Unforgettable</span>
                </h1>
              </div>
              <div className="hero-anim-desc">
                <p className="lead text-white mb-5" style={{ fontSize: '1.1rem', maxWidth: '600px', opacity: 0.9 }}>
                  Sri Durga Events curates and designs premium, luxury events tailored to your finest desires. Our dedication under Mariyappan translates your visions into legendary celebrations.
                </p>
              </div>
              <div className="hero-anim-btns">
                <div className="d-flex flex-wrap gap-3">
                  <a href="tel:+917358951381" className="btn btn-gold px-4 py-3">Book Now</a>
                  <Link to="/services" className="btn btn-luxury-outline px-4 py-3">View Services</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Services Section */}
      <section ref={servicesReveal.ref} className="py-5 bg-luxury-navy">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="text-white text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
              Our Specialities
            </span>
            <h2 className="display-5 text-gold mt-2">Featured Services</h2>
            <div className="gold-divider"></div>
          </div>

          <div className="row g-4">
            {featuredServices.map((service, index) => (
              <div key={index} className="col-md-4">
                <div 
                  className="card h-100 luxury-card featured-service-card"
                  style={{
                    opacity: servicesReveal.visible ? 1 : 0,
                    transform: servicesReveal.visible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
                    transitionDelay: servicesReveal.visible ? `${index * 150}ms` : '0ms',
                    borderColor: 'rgba(212, 175, 55, 0.15)'
                  }}
                >
                  <div className="luxury-card-img-wrapper" style={{ height: '220px' }}>
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="card-img-top w-100 h-100 object-fit-cover luxury-card-img" 
                      onError={(e) => {
                        e.target.src = SERVICE_IMAGE_MAPPING[service.title];
                      }}
                    />
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    <h4 className="card-title mb-3 text-gold">{service.title}</h4>
                    <p className="card-text mb-4" style={{ fontSize: '0.9rem', color: '#FFFFFF' }}>{service.description}</p>
                    <a href={`https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(service.title)}.%20Please%20share%20the%20details.`} target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none mt-auto fw-bold hover-gold" style={{ fontSize: '0.85rem', transition: 'color 0.2s' }}>
                      INQUIRE SERVICE <i className="bi bi-arrow-right ms-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyChooseReveal.ref} className="py-5 bg-luxury-navy-light position-relative">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="position-relative overflow-hidden rounded">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
                  alt="Luxury planning"
                  className="img-fluid rounded shadow-lg border border-gold why-choose-img"
                  style={{ 
                    borderColor: 'rgba(212, 175, 55, 0.2) !important',
                    transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <span 
                className="text-gold text-uppercase fw-bold" 
                style={{ 
                  fontSize: '0.8rem', 
                  letterSpacing: '2px',
                  opacity: whyChooseReveal.visible ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                  display: 'inline-block'
                }}
              >
                Signature Standards
              </span>
              <h2 
                className="display-5 text-white mt-2 mb-4"
                style={{
                  opacity: whyChooseReveal.visible ? 1 : 0,
                  transform: whyChooseReveal.visible ? 'scale(1)' : 'scale(0.98)',
                  transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
                  transitionDelay: '100ms'
                }}
              >
                Why Choose Sri Durga
              </h2>
              <div 
                className="gold-divider-start"
                style={{
                  width: whyChooseReveal.visible ? '80px' : '0px',
                  boxShadow: whyChooseReveal.visible ? '0 0 8px var(--luxury-gold)' : 'none',
                  transition: 'width 0.8s ease-in-out, box-shadow 0.8s ease-in-out',
                  transitionDelay: '200ms'
                }}
              />
              
              <div className="d-flex flex-column gap-4 mt-4">
                {[
                  {
                    title: 'Bespoke Concept Designs',
                    desc: "We don't repeat layouts. Every event receives an exclusive design concept customized exactly to your vision."
                  },
                  {
                    title: 'Meticulous Implementation',
                    desc: 'Timelines, lighting transitions, vendor communications—we micromanage details so you can enjoy your event.'
                  },
                  {
                    title: 'Elite Coordination Networks',
                    desc: 'We source only five-star caterers, high-end production crews, and premier entertainers across the industry.'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="stat-box"
                    style={{
                      opacity: whyChooseReveal.visible ? 1 : 0,
                      transition: 'opacity 0.8s ease-in-out',
                      transitionDelay: whyChooseReveal.visible ? `${idx * 300}ms` : '0ms'
                    }}
                  >
                    <h4 
                      className="text-gold"
                      style={{
                        opacity: whyChooseReveal.visible ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        transitionDelay: whyChooseReveal.visible ? `${idx * 300}ms` : '0ms'
                      }}
                    >
                      {item.title}
                    </h4>
                    <p 
                      className="mb-0 text-white" 
                      style={{ 
                        fontSize: '0.9rem',
                        opacity: whyChooseReveal.visible ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        transitionDelay: whyChooseReveal.visible ? `${(idx * 300) + 200}ms` : '0ms'
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsReveal.ref} className="py-5 bg-luxury-navy testimonials-section-container">
        <div className="container py-5 position-relative">
          <div className="text-center mb-5">
            <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Client Praise</span>
            <h2 className="display-5 text-gold mt-2">Testimonials</h2>
            <div className="gold-divider mx-auto"></div>
          </div>

          <div className="testimonials-slider-wrapper position-relative mx-auto" style={{ maxWidth: '800px' }}>

            {/* Testimonials Slides Container */}
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
                      <p className="card-text text-white mb-4 fs-5 italic" style={{ fontStyle: 'italic', lineHeight: '1.7' }}>
                        "{t.feedback}"
                      </p>
                      <div className="mt-4">
                        <h4 className="text-gold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{t.name}</h4>
                        <small className="text-white-50 text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>{t.role}</small>
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
            <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
              Visual Inspiration
            </span>
            <h2 className="display-5 text-gold mt-2">Gallery Highlights</h2>
            <div className="gold-divider"></div>
          </div>

          <div className="gallery-highlights-grid">
            {redesignedGallery.map((item, idx) => (
              <div 
                key={idx} 
                className={`gallery-highlight-card ${galleryReveal.visible ? 'visible' : ''}`}
                style={{
                  transitionDelay: galleryReveal.visible ? `${idx * 150}ms` : '0ms'
                }}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="gallery-highlight-overlay">
                  <h5 className="gallery-highlight-title">{item.title}</h5>
                  <p className="gallery-highlight-desc">{item.description}</p>
                  <div className="gallery-highlight-arrow">
                    <i className="bi bi-arrow-right-circle"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/gallery" className="btn btn-luxury-outline px-4 py-3">Explore Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-5 text-center bg-luxury-navy position-relative border-top border-gold" style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important' }}>
        <div className="container py-5">
          <h2 className="display-4 text-gold mb-3">Plan Your Masterpiece</h2>
          <p className="text-white mx-auto mb-5" style={{ maxWidth: '600px', fontSize: '1.05rem', opacity: 0.95 }}>
            Ready to design an elite celebration? Contact our planning consultants and receive a pre-event blueprint draft.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="https://wa.me/917358951381?text=Hello%20Sri%20Durga%20Events!%20I%20am%20interested%20in%20booking%20an%20event.%20Please%20share%20the%20details%20and%20pricing." target="_blank" rel="noopener noreferrer" className="btn btn-luxury-outline px-4 py-3">Book Consultation</a>
            <Link to="/contact" className="btn btn-gold px-4 py-3">Send Message</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
