import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Toast from '../components/Toast';
import emailjs from '@emailjs/browser';

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
      await emailjs.send(
  "service_l5tse6d",
  "template_lv76ooh",
  {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    message: formData.message,
    to_email: "sridurgaevents@gmail.com"
  },
 "GW9IIyKo4jrxL7tDp"
);

handleShowToast(
  "✅ Thank you! Your enquiry has been sent successfully. We'll contact you within 12 hours.",
  "success"
);

setFormData({
  name: "",
  email: "",
  phone: "",
  message: ""
});

return;

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
          <motion.span 
            variants={textAnims.label}
            initial="hidden"
            animate="visible"
            className="text-uppercase fw-bold d-block" 
            style={{ fontSize: '0.8rem', color: '#FFFFFF' }}
          >
            Get in Touch
          </motion.span>
          <motion.h1 
            variants={textAnims.h1}
            initial="hidden"
            animate="visible"
            className="display-4 text-white mt-2 shimmer-gold-text"
          >
            Contact Planners
          </motion.h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Info & Form Section */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-4">
          <div className="row g-5">
            
            {/* Contact Information & Map */}
            <div className="col-lg-5">
              <motion.span 
                variants={textAnims.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-uppercase fw-bold d-block" 
                style={{ fontSize: '0.8rem', color: '#FFFFFF' }}
              >
                Office Desk
              </motion.span>
              <motion.h2 
                variants={textAnims.h2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-white mt-2 mb-4" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Headquarters
              </motion.h2>
              <div className="gold-divider-start mb-4"></div>

              {/* Contact Info Items Fading in Sequentially */}
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
                className="d-flex flex-column gap-4 mb-5"
              >
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="d-flex align-items-start gap-3"
                >
                  <div className="bg-luxury-navy-light p-3 border border-gold rounded" style={{ color: 'var(--luxury-gold)' }}>
                    <i className="bi bi-geo-alt-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="text-white mb-1">Corporate Address</h5>
                    <p className="text-white-50 small mb-0">52, West Street, Kovilpathu, Kalakad - 627501</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="d-flex align-items-start gap-3"
                >
                  <div className="bg-luxury-navy-light p-3 border border-gold rounded" style={{ color: 'var(--luxury-gold)' }}>
                    <i className="bi bi-telephone-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="text-white mb-1">Phone Line</h5>
                    <p className="text-white-50 small mb-0">+91 73589 51381</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="d-flex align-items-start gap-3"
                >
                  <div className="bg-luxury-navy-light p-3 border border-gold rounded" style={{ color: 'var(--luxury-gold)' }}>
                    <i className="bi bi-envelope-fill fs-4"></i>
                  </div>
                  <div>
                    <h5 className="text-white mb-1">Electronic Mail</h5>
                    <p className="text-white-50 small mb-0">sridurgaevents@gmail.com</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Embedded Google Map */}
              <div
                style={{
                  borderRadius: '16px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.08)',
                  overflow: 'hidden',
                  height: '240px',
                  width: '100%'
                }}
              >
                <iframe
                  title="Sri Durga Events Location"
                  src="https://www.google.com/maps?q=52,West+Street,Kovilpathu,Kalakad,Tamil+Nadu+627501&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', filter: 'contrast(1.05) brightness(0.85)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="luxury-card p-5">
                <motion.h3 
                  variants={textAnims.h3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-white mb-4" 
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Send a Message
                </motion.h3>
                <motion.p 
                  variants={textAnims.p}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-white mb-5 small"
                >
                  Inquire about dates, ask specific planning questions, or submit feedback. Our concierge desk will respond within 12 hours.
                </motion.p>

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

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    type="submit"
                    disabled={loading}
                    className="btn btn-gold w-100 py-3 text-uppercase tracking-widest fw-bold"
                  >
                    {loading ? 'Sending Message...' : 'Submit Message'}
                  </motion.button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section className="py-5 bg-luxury-navy-light border-top border-gold" style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <motion.span 
              variants={textAnims.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-gold text-uppercase fw-bold d-block" 
              style={{ fontSize: '0.8rem' }}
            >
              Stay Connected
            </motion.span>
            <motion.h2 
              variants={textAnims.h2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-white mt-2" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Connect With Us
            </motion.h2>
            <div className="gold-divider mx-auto"></div>
          </div>

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
            className="row g-4 justify-content-center"
          >
            {contactCards.map((card, idx) => (
              <motion.div 
                key={idx} 
                className="col-lg-3 col-sm-6"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
              </motion.div>
            ))}
          </motion.div>
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
    </div>
  );
};

export default Contact;
