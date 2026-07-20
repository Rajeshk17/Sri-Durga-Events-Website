import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';

// Weddings
import wedding1 from '../assets/images/gallery/weddings/wedding_1.jpeg';
import wedding2 from '../assets/images/gallery/weddings/wedding_2.jpeg';
import wedding3 from '../assets/images/gallery/weddings/wedding_3.jpeg';
import wedding4 from '../assets/images/gallery/weddings/wedding_4.jpeg';
import wedding5 from '../assets/images/gallery/weddings/wedding_5.jpeg';
import wedding6 from '../assets/images/gallery/weddings/wedding_6.jpeg';

// Corporate
import corporate1 from '../assets/images/gallery/corporate/corporate_1.jpeg';
import corporate2 from '../assets/images/gallery/corporate/corporate_2.jpeg';
import corporate3 from '../assets/images/gallery/corporate/corporate_3.jpeg';
import corporate4 from '../assets/images/gallery/corporate/corporate_4.jpeg';
import corporate5 from '../assets/images/gallery/corporate/corporate_5.jpeg';
import corporate6 from '../assets/images/gallery/corporate/corporate_6.jpeg';

// Birthdays
import birthday1 from '../assets/images/gallery/birthday/birthday_1.jpeg';
import birthday2 from '../assets/images/gallery/birthday/birthday_2.jpeg';
import birthday3 from '../assets/images/gallery/birthday/birthday_3.jpeg';
import birthday4 from '../assets/images/gallery/birthday/birthday_4.jpeg';
import birthday5 from '../assets/images/gallery/birthday/birthday_5.jpeg';
import birthday6 from '../assets/images/gallery/birthday/birthday_6.jpeg';

// Catering
import catering1 from '../assets/images/gallery/catering/catering_1.jpeg';
import catering2 from '../assets/images/gallery/catering/catering_2.jpeg';
import catering3 from '../assets/images/gallery/catering/catering_3.jpeg';
import catering4 from '../assets/images/gallery/catering/catering_4.jpeg';
import catering5 from '../assets/images/gallery/catering/catering_5.jpeg';
import catering6 from '../assets/images/gallery/catering/catering_6.jpeg';

// Sound & Stage
import sound1 from '../assets/images/gallery/sound-stage/sound_1.jpeg';
import sound2 from '../assets/images/gallery/sound-stage/sound_2.jpeg';
import sound3 from '../assets/images/gallery/sound-stage/sound_3.jpeg';
import sound4 from '../assets/images/gallery/sound-stage/sound_4.jpeg';
import sound5 from '../assets/images/gallery/sound-stage/sound_5.jpeg';
import sound6 from '../assets/images/gallery/sound-stage/sound_6.jpeg';

/* ── FALLBACK DATA  (Exactly 6 local images for every gallery category) ── */
const FALLBACK_ITEMS = [
  /* WEDDINGS */
  {
    id: 'w1',
    category: 'weddings',
    title: 'Luxury Wedding Stage',
    description: 'Bespoke stage with floral arrangements and golden lights',
    image: wedding1
  },
  {
    id: 'w2',
    category: 'weddings',
    title: 'Bride & Groom Portrait',
    description: 'Romantic couples portrait captured in cinematic style',
    image: wedding2
  },
  {
    id: 'w3',
    category: 'weddings',
    title: 'Floral Mandap Decor',
    description: 'Traditional mandap decor with fresh exotic flowers',
    image: wedding3
  },
  {
    id: 'w4',
    category: 'weddings',
    title: 'Reception Decoration',
    description: 'Grand reception hall design with crystal chandeliers',
    image: wedding4
  },
  {
    id: 'w5',
    category: 'weddings',
    title: 'Wedding Entrance Arch',
    description: 'Elegant entrance walkway with candles and drapery',
    image: wedding5
  },
  {
    id: 'w6',
    category: 'weddings',
    title: 'Candle Pathway Aisle',
    description: 'Charming candle-lit path leading to the wedding stage',
    image: wedding6
  },

  /* CORPORATE */
  {
    id: 'c1',
    category: 'corporate',
    title: 'Corporate Conference',
    description: 'Professional executive summit layout and seating',
    image: corporate1
  },
  {
    id: 'c2',
    category: 'corporate',
    title: 'Business Seminar',
    description: 'Interactive seminar hall setup with advanced projector screen',
    image: corporate2
  },
  {
    id: 'c3',
    category: 'corporate',
    title: 'Product Launch Event',
    description: 'High-impact stage design for premium product launches',
    image: corporate3
  },
  {
    id: 'c4',
    category: 'corporate',
    title: 'Award Ceremony Night',
    description: 'Elegant banquet setup for corporate recognition nights',
    image: corporate4
  },
  {
    id: 'c5',
    category: 'corporate',
    title: 'Luxury Meeting Hall',
    description: 'Boardroom configuration with high-end furniture',
    image: corporate5
  },
  {
    id: 'c6',
    category: 'corporate',
    title: 'Conference Audience',
    description: 'Flawless crowd management and audience view',
    image: corporate6
  },

  /* BIRTHDAYS */
  {
    id: 'b1',
    category: 'birthday',
    title: 'Balloon Decoration Setup',
    description: 'Whimsical arches and pillars of premium colored balloons',
    image: birthday1
  },
  {
    id: 'b2',
    category: 'birthday',
    title: 'Kids Birthday Party',
    description: 'Fun character-themed party setup with games area',
    image: birthday2
  },
  {
    id: 'b3',
    category: 'birthday',
    title: 'Adult Birthday Elegance',
    description: 'Sophisticated lounge theme with custom neon signs',
    image: birthday3
  },
  {
    id: 'b4',
    category: 'birthday',
    title: 'Cake Cutting Moment',
    description: 'Beautiful central dessert table and lighting highlight',
    image: birthday4
  },
  {
    id: 'b5',
    category: 'birthday',
    title: 'Premium Birthday Backdrop',
    description: 'Custom photobooth backdrop with floral and balloon accents',
    image: birthday5
  },
  {
    id: 'b6',
    category: 'birthday',
    title: 'Party Lighting & Ambiance',
    description: 'Energetic dancefloor strobe and wash lighting setup',
    image: birthday6
  },

  /* CATERING */
  {
    id: 'f1',
    category: 'catering',
    title: 'Premium Buffet Spread',
    description: 'Exquisite multi-cuisine layout with brass warming dishes',
    image: catering1
  },
  {
    id: 'f2',
    category: 'catering',
    title: 'Live Food Counter',
    description: 'Interactive dining station managed by professional chefs',
    image: catering2
  },
  {
    id: 'f3',
    category: 'catering',
    title: 'Dessert Table Display',
    description: 'Delectable array of pastries, chocolates and custom cakes',
    image: catering3
  },
  {
    id: 'f4',
    category: 'catering',
    title: 'Fine Dining Table Setup',
    description: 'Luxurious formal dinner arrangement with premium cutlery',
    image: catering4
  },
  {
    id: 'f5',
    category: 'catering',
    title: 'Wedding Catering Service',
    description: 'Traditional and contemporary banquet menu presentation',
    image: catering5
  },
  {
    id: 'f6',
    category: 'catering',
    title: 'Chef Serving Guests',
    description: 'First-class hospitality and live culinary assistance',
    image: catering6
  },

  /* SOUND & STAGE */
  {
    id: 's1',
    category: 'music',
    title: 'DJ Performance Night',
    description: 'Club-grade sound systems and moving beam light consoles',
    image: sound1
  },
  {
    id: 's2',
    category: 'music',
    title: 'Concert Stage Setup',
    description: 'Vibrant outdoor stage structure with audio trusses',
    image: sound2
  },
  {
    id: 's3',
    category: 'music',
    title: 'LED Wall Spectacular',
    description: 'Ultra-high definition backdrop displaying custom visual animations',
    image: sound3
  },
  {
    id: 's4',
    category: 'music',
    title: 'Professional Stage Lighting',
    description: 'Intelligent moving head lights and atmospheric haze',
    image: sound4
  },
  {
    id: 's5',
    category: 'music',
    title: 'Live Music Band',
    description: 'Acoustically optimized venue design for live bands',
    image: sound5
  },
  {
    id: 's6',
    category: 'music',
    title: 'Sound System Array',
    description: 'High-fidelity line arrays and subwoofers for crystal audio',
    image: sound6
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

/* ── SINGLE GALLERY CARD ── */
const GalleryCard = ({ item, idx, onOpen }) => {
  const displayCategory = item.category === 'music' ? 'Sound & Stage' : item.category;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (idx % 6) * 0.08, ease: "easeOut" }}
      className="col-lg-4 col-md-6 gallery-card-wrapper"
    >
      <div className="gallery-item-premium" onClick={() => onOpen(idx)}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = wedding1;
          }}
        />
        <div className="gallery-overlay-premium">
          <span className="gallery-badge">{displayCategory.toUpperCase()}</span>
          <h5 className="gallery-overlay-title">{item.title}</h5>
          <p className="gallery-overlay-desc">{item.description}</p>
          <i className="bi bi-zoom-in text-white fs-4 mt-2"></i>
        </div>
      </div>
    </motion.div>
  );
};

/* ── MAIN GALLERY PAGE ── */
const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState('all');
  const [lightbox, setLightbox]         = useState({ isOpen: false, currentIdx: 0 });
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${apiUrl}/gallery`);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (data && data.length > 0) {
          const apiMapped = data.map((item, idx) => {
            const matchedLocal = FALLBACK_ITEMS.find(f => f.title === item.title) || FALLBACK_ITEMS[idx % FALLBACK_ITEMS.length];
            return {
              ...item,
              image: matchedLocal ? matchedLocal.image : wedding1
            };
          });
          setGalleryItems(apiMapped);
        } else {
          setGalleryItems(FALLBACK_ITEMS);
        }
      } catch {
        setGalleryItems(FALLBACK_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [apiUrl]);

  const categories = [
    { value: 'all',       label: 'All Projects' },
    { value: 'weddings',  label: 'Weddings' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'birthday',  label: 'Birthdays' },
    { value: 'catering',  label: 'Catering' },
    { value: 'music',     label: 'Sound & Stage' }
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  const openLightbox  = useCallback((idx) => setLightbox({ isOpen: true, currentIdx: idx }), []);
  const closeLightbox = useCallback(() => setLightbox(l => ({ ...l, isOpen: false })), []);
  const showPrev = useCallback((e) => {
    e.stopPropagation();
    setLightbox(l => ({ ...l, currentIdx: l.currentIdx === 0 ? filteredItems.length - 1 : l.currentIdx - 1 }));
  }, [filteredItems.length]);
  const showNext = useCallback((e) => {
    e.stopPropagation();
    setLightbox(l => ({ ...l, currentIdx: l.currentIdx === filteredItems.length - 1 ? 0 : l.currentIdx + 1 }));
  }, [filteredItems.length]);

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e) => {
      if (!lightbox.isOpen) return;
      if (e.key === 'ArrowLeft')  setLightbox(l => ({ ...l, currentIdx: l.currentIdx === 0 ? filteredItems.length - 1 : l.currentIdx - 1 }));
      if (e.key === 'ArrowRight') setLightbox(l => ({ ...l, currentIdx: l.currentIdx === filteredItems.length - 1 ? 0 : l.currentIdx + 1 }));
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox.isOpen, filteredItems.length, closeLightbox]);

  return (
    <div className="animate-fade-in">

      {/* ── Page Header ── */}
      <header className="page-header">
        <div className="container">
          <motion.span 
            variants={textAnims.label}
            initial="hidden"
            animate="visible"
            className="text-gold text-uppercase fw-bold d-block" 
            style={{ fontSize: '0.8rem', letterSpacing: '2px' }}
          >
            Our Portfolio
          </motion.span>
          <motion.h1 
            variants={textAnims.h1}
            initial="hidden"
            animate="visible"
            className="display-4 text-white mt-2 shimmer-gold-text"
          >
            Visual Masterpieces
          </motion.h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* ── Hero Gallery Image ── */}
      <div className="gallery-hero-wrapper">
        <img
          src={wedding1}
          alt="Luxury wedding decoration with elegant flowers and golden lights"
          className="gallery-hero-img"
        />
        <div className="gallery-hero-overlay">
          <motion.span 
            variants={textAnims.label}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gold text-uppercase fw-bold d-block" 
            style={{ fontSize: '0.85rem', letterSpacing: '3px' }}
          >
            Sri Durga Events
          </motion.span>
          <motion.h2 
            variants={textAnims.h2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white mt-2" 
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}
          >
            Where Every Moment Becomes a Masterpiece
          </motion.h2>
        </div>
      </div>

      {/* ── Gallery Grid ── */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-4">

          {/* Filter Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`btn ${filter === cat.value ? 'btn-gold' : 'btn-luxury-outline'} px-3 py-2`}
                style={{ fontSize: '0.8rem' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <LoadingSpinner text="Retrieving Portfolio items..." />
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-white py-5">No photos found in this category.</p>
          ) : (
            <div className="row g-4">
              {filteredItems.map((item, idx) => (
                <GalleryCard key={item.id} item={item} idx={idx} onOpen={openLightbox} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox.isOpen && filteredItems[lightbox.currentIdx] && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          style={{ zIndex: 1080, backgroundColor: 'rgba(5, 10, 24, 0.96)', backdropFilter: 'blur(10px)' }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button onClick={closeLightbox} className="btn btn-link text-white position-absolute top-0 end-0 p-4 border-0 fs-2 text-decoration-none" style={{ zIndex: 1090 }}>
            <i className="bi bi-x-lg"></i>
          </button>

          {/* Prev */}
          <button onClick={showPrev} className="btn btn-link text-white position-absolute start-0 p-4 border-0 fs-1 text-decoration-none" style={{ zIndex: 1090, top: '50%', transform: 'translateY(-50%)' }}>
            <i className="bi bi-chevron-left"></i>
          </button>

          {/* Image */}
          <div
            className="d-flex flex-column align-items-center text-center px-5"
            style={{ maxWidth: '85vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightbox.currentIdx].image}
              alt={filteredItems[lightbox.currentIdx].title}
              className="img-fluid rounded border border-gold"
              style={{ maxHeight: '70vh', boxShadow: '0 10px 40px rgba(0,0,0,0.7)', borderColor: 'rgba(212,175,55,0.35) !important' }}
              onError={(e) => { e.target.src = wedding1; }}
            />
            <h4 className="text-white mt-4 mb-1">{filteredItems[lightbox.currentIdx].title}</h4>
            <span className="text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'rgba(212,175,55,0.85)' }}>
              {filteredItems[lightbox.currentIdx].category === 'music' ? 'Sound & Stage' : filteredItems[lightbox.currentIdx].category}
            </span>
            <small className="text-white mt-2" style={{ opacity: 0.5 }}>
              {lightbox.currentIdx + 1} / {filteredItems.length}
            </small>
          </div>

          {/* Next */}
          <button onClick={showNext} className="btn btn-link text-white position-absolute end-0 p-4 border-0 fs-1 text-decoration-none" style={{ zIndex: 1090, top: '50%', transform: 'translateY(-50%)' }}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}

    </div>
  );
};

export default Gallery;
