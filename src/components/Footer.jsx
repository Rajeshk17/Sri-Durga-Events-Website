import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <footer
      className="bg-luxury-navy-deep border-top border-gold py-5 mt-auto"
      style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2) !important' }}
    >
      <div className="container py-4">

        {/* ── Animated columns ── */}
        <div className="row g-4" ref={rowRef}>

          {/* Brand — slides in from LEFT */}
          <div
            className="col-lg-4 col-md-6 footer-col footer-col-left"
            data-anim="animate-left"
          >
            <h4 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px' }}>
              SRI DURGA EVENTS
            </h4>
            <p className="text-white pe-lg-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Creating exquisite experiences and unforgettably luxurious events. Managed by Mariyappan, our detail-oriented execution turns dreams into legendary moments.
            </p>
            {/* Social icons */}
            <div className="d-flex gap-3 mt-3">
              <a href="https://wa.me/917358951381" target="_blank" rel="noopener noreferrer"
                className="text-white fs-5 hover-scale" title="WhatsApp Chat">
                <i className="bi bi-whatsapp" style={{ color: '#25D366' }}></i>
              </a>
              <a href="https://instagram.com/sridurgaevents" target="_blank" rel="noopener noreferrer"
                className="text-white fs-5 hover-scale" title="Instagram Profile">
                <i className="bi bi-instagram" style={{ color: '#E1306C' }}></i>
              </a>
              <a href="mailto:sridurgaevents@gmail.com"
                className="text-white fs-5 hover-scale" title="Send Email">
                <i className="bi bi-envelope-fill text-white"></i>
              </a>
            </div>
          </div>

          {/* Quick Links — fade up, delay 150ms */}
          <div
            className="col-lg-2 col-md-6 col-6 footer-col footer-col-up"
            data-anim="animate-up-1"
          >
            <h5 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Links</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
              <li><Link to="/" className="text-decoration-none text-white hover-gold">Home</Link></li>
              <li><Link to="/about" className="text-decoration-none text-white hover-gold">About Us</Link></li>
              <li><Link to="/services" className="text-decoration-none text-white hover-gold">Our Services</Link></li>
              <li><Link to="/gallery" className="text-decoration-none text-white hover-gold">Gallery</Link></li>
              <li><Link to="/packages" className="text-decoration-none text-white hover-gold">Packages</Link></li>
            </ul>
          </div>

          {/* Services — fade up, delay 300ms */}
          <div
            className="col-lg-3 col-md-6 col-6 footer-col footer-col-up"
            data-anim="animate-up-2"
          >
            <h5 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Services</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
              <li><Link to="/booking?type=Wedding%20Events" className="text-decoration-none text-white hover-gold">Luxury Weddings</Link></li>
              <li><Link to="/booking?type=Corporate%20Events" className="text-decoration-none text-white hover-gold">Corporate Galas</Link></li>
              <li><Link to="/booking?type=Anniversary%20Celebrations" className="text-decoration-none text-white hover-gold">Anniversaries</Link></li>
              <li><Link to="/booking?type=DJ%20%26%20Sound%20Systems" className="text-decoration-none text-white hover-gold">DJ &amp; Sound Systems</Link></li>
              <li><Link to="/booking?type=Catering%20Services" className="text-decoration-none text-white hover-gold">Fine Dining Catering</Link></li>
            </ul>
          </div>

          {/* Get in Touch — slides in from RIGHT, delay 450ms */}
          <div
            className="col-lg-3 col-md-6 footer-col footer-col-right"
            data-anim="animate-right"
          >
            <h5 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Get in Touch</h5>
            <ul className="list-unstyled d-flex flex-column gap-3" style={{ fontSize: '0.9rem' }}>
              <li className="d-flex align-items-start gap-2">
                <i className="bi bi-geo-alt-fill text-white mt-1"></i>
                <span className="text-white">52, West Street, Kovilpathu, Kalakad - 627501</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-fill text-white"></i>
                <span className="text-white">+91 73589 51381</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill text-white"></i>
                <span className="text-white">sridurgaevents@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>{/* /row */}

        {/* ── Connect With Us Section ── */}
        <div className="row mt-5 mb-4">
          <div className="col-12 text-center mb-4">
            <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '2px' }}>Stay Connected</span>
            <h5 className="text-white mt-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem' }}>Connect With Us</h5>
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
            <a href="#" className="text-decoration-none text-white hover-gold">Privacy Policy</a>
            <a href="#" className="text-decoration-none text-white hover-gold">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
