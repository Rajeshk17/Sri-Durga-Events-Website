import React, { useEffect, useRef, useState } from 'react';

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
      <small
        className="text-uppercase fw-bold"
        style={{ letterSpacing: '1px', fontSize: '0.8rem', color: '#FFFFFF' }}
      >
        {label}
      </small>
    </div>
  );
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
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      description: 'Mariyappan is the visionary founder of Sri Durga Events. With decades of experience in luxury event management, he built the company on the pillars of excellence, creativity, and flawless execution.'
    },
    {
      name: 'Velmani Kandan',
      role: 'Event Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      description: 'Velmani Kandan oversees all event operations, ensuring every detail from logistics to live execution meets the highest standards. His precision and dedication make every event an unforgettable experience.'
    },
    {
      name: 'Kannan',
      role: 'Creative Event Designer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      description: 'Kannan leads creative direction for all event designs — from floral architecture and stage layouts to lighting concepts and thematic décor — bringing each client\'s unique vision to life.'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <div className="container">
          <span className="text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#FFFFFF' }}>
            Who We Are
          </span>
          <h1 className="display-4 text-white mt-2">About Sri Durga Events</h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Introduction */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="text-gold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Redefining Luxury Events
              </h2>
              <p className="text-white" style={{ lineHeight: '1.8' }}>
                Sri Durga Events is a premium event management company based in Kalakad, dedicated to creating elegant and unforgettable celebrations. We specialize in luxury weddings, birthdays, baby showers, anniversaries, corporate events, photography, catering, stage decoration, DJ &amp; sound systems, and customized event experiences.
              </p>
              <p className="text-white" style={{ lineHeight: '1.8' }}>
                Our experienced team carefully plans every detail—from creative concepts and venue styling to flawless execution—ensuring every celebration becomes a memorable experience.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
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
                <h3 className="text-gold mb-3">Our Vision</h3>
                <p className="text-white mb-0" style={{ lineHeight: '1.7' }}>
                  To be the global benchmark of luxury event management, recognized for injecting high fashion, architectural design principles, and modern production standards into every celebration.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="luxury-card p-5 h-100">
                <i className="bi bi-award-fill text-white fs-1 mb-3"></i>
                <h3 className="text-gold mb-3">Our Mission</h3>
                <p className="text-white mb-0" style={{ lineHeight: '1.7' }}>
                  To design and execute bespoke event concepts that align with our clients' dreams. We seek to minimize client stress through robust logistics planning, detail-oriented operations, and premium hospitality networks.
                </p>
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
            <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>The Artisans</span>
            <h2 className="display-5 text-gold mt-2">Our Executive Team</h2>
            <div className="gold-divider"></div>
          </div>

          <div className="row g-4">
            {team.map((member, idx) => {
              const isOpen = expandedIdx === idx;
              return (
                <div key={idx} className="col-lg-4 col-md-6">
                  <div
                    className="card luxury-card"
                    style={{
                      transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                      borderColor: isOpen ? 'rgba(212, 175, 55, 0.45)' : undefined,
                      boxShadow: isOpen ? '0 10px 35px rgba(212, 175, 55, 0.18)' : undefined
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
                      <h4 className="text-gold mb-1">{member.name}</h4>
                      <span className="text-uppercase fw-bold d-block" style={{ fontSize: '0.75rem', letterSpacing: '1.5px', color: '#FFFFFF' }}>
                        {member.role}
                      </span>

                      {/* Read / Hide Profile Button */}
                      <button
                        onClick={() => setExpandedIdx(isOpen ? null : idx)}
                        className="team-profile-btn"
                      >
                        <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                        {isOpen ? 'Hide Profile' : 'Read Profile'}
                      </button>
                    </div>

                    {/* Expandable Biography */}
                    <div
                      style={{
                        maxHeight: isOpen ? '300px' : '0',
                        opacity: isOpen ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.45s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.35s ease'
                      }}
                    >
                      <div className="px-4 pb-4 text-center">
                        <hr className="mx-auto mt-0 mb-3" style={{ width: '40px', height: '1.5px', backgroundColor: '#D4AF37', opacity: 0.4, border: 'none' }} />
                        <p className="text-white mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.7' }}>
                          {member.description}
                        </p>
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
