import React, { useState, useEffect, useRef } from 'react';
import Toast from '../components/Toast';

/* ────────────────────────────────────────────────────────────────────────
   SCROLL REVEAL VIEWPORT HOOK
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
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const Contact = () => {
  const contactCards = [
    {
      title: 'WhatsApp',
      name: 'Mariyappan',
      detail: '+91 73589 51381',
      link: 'https://wa.me/917358951381',
      icon: 'bi bi-whatsapp icon-whatsapp'
    },
    {
      title: 'Phone Call',
      name: 'Mariyappan',
      detail: '+91 73589 51381',
      link: 'tel:+917358951381',
      icon: 'bi bi-telephone-fill icon-phone'
    },
    {
      title: 'Instagram',
      name: 'Mariyappan',
      detail: '@sridurga_events2',
      link: 'https://instagram.com/sridurga_events2',
      icon: 'bi bi-instagram icon-instagram'
    },
    {
      title: 'Email',
      name: 'Mariyappan',
      detail: 'sridurgaevents@gmail.com',
      link: 'mailto:sridurgaevents@gmail.com',
      icon: 'bi bi-envelope-fill icon-email'
    }
  ];

  const cardsReveal = useFadeInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      handleShowToast('Please fill out all required fields.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      handleShowToast(data.message || 'Message submitted successfully!', 'success');
      setFormData({ name: '', email: '', phone: '', message: '' });

    } catch (err) {
      console.error(err);
      handleShowToast(err.message || 'Internal server error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <header className="page-header">
        <div className="container">
          <span className="text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#FFFFFF' }}>
            Get in Touch
          </span>
          <h1 className="display-4 text-white mt-2">Contact Planners</h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Info & Form Section */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-4">
          <div className="row g-5">
            
            {/* Contact Information & Map */}
            <div className="col-lg-5">
              <span className="text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#FFFFFF' }}>Office Desk</span>
              <h2 className="text-white mt-2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Headquarters</h2>
              <div className="gold-divider-start mb-4"></div>

              <div className="d-flex flex-column gap-4 mb-5">
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-luxury-navy-light p-3 border border-gold rounded" style={{ color: 'var(--luxury-gold)' }}>
                    <i className="bi bi-geo-alt-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="text-white mb-1">Corporate Address</h5>
                    <p className="text-white-50 small mb-0">52, West Street, Kovilpathu, Kalakad - 627501</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-luxury-navy-light p-3 border border-gold rounded" style={{ color: 'var(--luxury-gold)' }}>
                    <i className="bi bi-telephone-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="text-white mb-1">Phone Line</h5>
                    <p className="text-white-50 small mb-0">+91 73589 51381</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-luxury-navy-light p-3 border border-gold rounded" style={{ color: 'var(--luxury-gold)' }}>
                    <i className="bi bi-envelope-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="text-white mb-1">Electronic Mail</h5>
                    <p className="text-white-50 small mb-0">sridurgaevents@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Styled Mock Vector Map (re-centered at Kalakad, Tamil Nadu) */}
              <div className="border border-gold rounded p-2 bg-luxury-navy-light overflow-hidden" style={{ height: '240px', borderColor: 'rgba(212, 175, 55, 0.2) !important' }}>
                <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center position-relative" style={{ backgroundColor: 'var(--luxury-navy-deep)' }}>
                  <div className="position-absolute w-100 h-100 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <i className="bi bi-geo-alt-fill text-gold fs-1 z-1 animate-bounce" style={{ animation: 'bounce 2s infinite' }}></i>
                  <h6 className="text-white mt-3 mb-1 z-1">Sri Durga Events HQ</h6>
                  <small className="text-white-50 z-1 text-uppercase tracking-wider" style={{ fontSize: '0.65rem' }}>Kalakad, Tamil Nadu</small>
                  <p className="text-white px-4 mt-2 small z-1" style={{ fontSize: '0.75rem' }}>Kovilpathu, West Street</p>
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="luxury-card p-5">
                <h3 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Send a Message</h3>
                <p className="text-white mb-5 small">
                  Inquire about dates, ask specific planning questions, or submit feedback. Our concierge desk will respond within 12 hours.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <label className="form-label text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#FFFFFF' }}>Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="form-control luxury-input"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#FFFFFF' }}>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="form-control luxury-input"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#FFFFFF' }}>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="form-control luxury-input"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="form-label text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#FFFFFF' }}>Your Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                      placeholder="Describe your event parameters, date preferences, or queries..."
                      className="form-control luxury-input"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-gold w-100 py-3 text-uppercase tracking-widest fw-bold"
                  >
                    {loading ? 'Sending Message...' : 'Submit Message'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section ref={cardsReveal.ref} className="py-5 bg-luxury-navy-light border-top border-gold" style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>Stay Connected</span>
            <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>Connect With Us</h2>
            <div className="gold-divider mx-auto"></div>
          </div>

          <div className="row g-4 justify-content-center">
            {contactCards.map((card, idx) => (
              <div 
                key={idx} 
                className="col-lg-3 col-sm-6"
                style={{
                  opacity: cardsReveal.visible ? 1 : 0,
                  transform: cardsReveal.visible ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  transitionDelay: cardsReveal.visible ? `${idx * 120}ms` : '0ms'
                }}
              >
                <a 
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-contact-card"
                >
                  <div className="contact-icon-wrapper">
                    <i className={`${card.icon} fs-3`}></i>
                  </div>
                  <h4 className="contact-title">{card.title}</h4>
                  <p className="contact-detail">{card.detail}</p>
                  <span className="contact-name">{card.name}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/917358951381?text=Hi%20Sri%20Durga%20Events,%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20event%20planning."
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        title="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>

      {/* Toast Alert */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Contact;

