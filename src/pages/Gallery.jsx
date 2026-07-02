import React, { useState, useEffect, useRef, useCallback } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

/* ────────────────────────────────────────────────────────────────────────
   FALLBACK DATA  (30 items across 5 categories with titles & descriptions)
   ──────────────────────────────────────────────────────────────────────── */
const FALLBACK_ITEMS = [
  /* WEDDINGS */
  {
    id: 'w1',
    category: 'weddings',
    title: 'Luxury Wedding Stage',
    description: 'Bespoke stage with floral arrangements and golden lights',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'w2',
    category: 'weddings',
    title: 'Bride & Groom Portrait',
    description: 'Romantic couples portrait captured in cinematic style',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'w3',
    category: 'weddings',
    title: 'Floral Mandap Decor',
    description: 'Traditional mandap decor with fresh exotic flowers',
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'w4',
    category: 'weddings',
    title: 'Reception Decoration',
    description: 'Grand reception hall design with crystal chandeliers',
    image: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'w5',
    category: 'weddings',
    title: 'Wedding Entrance Arch',
    description: 'Elegant entrance walkway with candles and drapery',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'w6',
    category: 'weddings',
    title: 'Candle Pathway Aisle',
    description: 'Charming candle-lit path leading to the wedding stage',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=800'
  },

  /* CORPORATE */
  {
    id: 'c1',
    category: 'corporate',
    title: 'Corporate Conference',
    description: 'Professional executive summit layout and seating',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c2',
    category: 'corporate',
    title: 'Business Seminar',
    description: 'Interactive seminar hall setup with advanced projector screen',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c3',
    category: 'corporate',
    title: 'Product Launch Event',
    description: 'High-impact stage design for premium product launches',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c4',
    category: 'corporate',
    title: 'Award Ceremony Night',
    description: 'Elegant banquet setup for corporate recognition nights',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c5',
    category: 'corporate',
    title: 'Luxury Meeting Hall',
    description: 'Boardroom configuration with high-end furniture',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'c6',
    category: 'corporate',
    title: 'Conference Audience',
    description: 'Flawless crowd management and audience view',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800'
  },

  /* BIRTHDAYS */
  {
    id: 'b1',
    category: 'birthday',
    title: 'Balloon Decoration Setup',
    description: 'Whimsical arches and pillars of premium colored balloons',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    category: 'birthday',
    title: 'Kids Birthday Party',
    description: 'Fun character-themed party setup with games area',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b3',
    category: 'birthday',
    title: 'Adult Birthday Elegance',
    description: 'Sophisticated lounge theme with custom neon signs',
    image: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b4',
    category: 'birthday',
    title: 'Cake Cutting Moment',
    description: 'Beautiful central dessert table and lighting highlight',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b5',
    category: 'birthday',
    title: 'Premium Birthday Backdrop',
    description: 'Custom photobooth backdrop with floral and balloon accents',
    image: 'https://images.unsplash.com/photo-1587271339318-2e78e3c63681?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b6',
    category: 'birthday',
    title: 'Party Lighting & Ambiance',
    description: 'Energetic dancefloor strobe and wash lighting setup',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800'
  },

  /* CATERING */
  {
    id: 'f1',
    category: 'catering',
    title: 'Premium Buffet Spread',
    description: 'Exquisite multi-cuisine layout with brass warming dishes',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'f2',
    category: 'catering',
    title: 'Live Food Counter',
    description: 'Interactive dining station managed by professional chefs',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'f3',
    category: 'catering',
    title: 'Dessert Table Display',
    description: 'Delectable array of pastries, chocolates and custom cakes',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'f4',
    category: 'catering',
    title: 'Fine Dining Table Setup',
    description: 'Luxurious formal dinner arrangement with premium cutlery',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'f5',
    category: 'catering',
    title: 'Wedding Catering Service',
    description: 'Traditional and contemporary banquet menu presentation',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'f6',
    category: 'catering',
    title: 'Chef Serving Guests',
    description: 'First-class hospitality and live culinary assistance',
    image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&q=80&w=800'
  },

  /* SOUND & STAGE */
  {
    id: 's1',
    category: 'music',
    title: 'DJ Performance Night',
    description: 'Club-grade sound systems and moving beam light consoles',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's2',
    category: 'music',
    title: 'Concert Stage Setup',
    description: 'Vibrant outdoor stage structure with audio trusses',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's3',
    category: 'music',
    title: 'LED Wall Spectacular',
    description: 'Ultra-high definition backdrop displaying custom visual animations',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's4',
    category: 'music',
    title: 'Professional Stage Lighting',
    description: 'Intelligent moving head lights and atmospheric haze',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's5',
    category: 'music',
    title: 'Live Music Band',
    description: 'Acoustically optimized venue design for live bands',
    image: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's6',
    category: 'music',
    title: 'Sound System Array',
    description: 'High-fidelity line arrays and subwoofers for crystal audio',
    image: 'https://images.unsplash.com/photo-1563841563604-0f7b27c5c1d5?auto=format&fit=crop&q=80&w=800'
  }
];

/* ────────────────────────────────────────────────────────────────────────
   SCROLL-FADE HOOK — fires once per card
   ──────────────────────────────────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('gallery-card-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ────────────────────────────────────────────────────────────────────────
   SINGLE GALLERY CARD
   ──────────────────────────────────────────────────────────────────────── */
const GalleryCard = ({ item, idx, onOpen }) => {
  const ref = useFadeIn();
  const displayCategory = item.category === 'music' ? 'Sound & Stage' : item.category;
  return (
    <div
      ref={ref}
      className="col-lg-4 col-md-6 gallery-card-wrapper"
      style={{ transitionDelay: `${(idx % 6) * 80}ms` }}
    >
      <div className="gallery-item-premium" onClick={() => onOpen(idx)}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="gallery-overlay-premium">
          <span className="gallery-badge">{displayCategory.toUpperCase()}</span>
          <h5 className="gallery-overlay-title">{item.title}</h5>
          <p className="gallery-overlay-desc">{item.description}</p>
          <i className="bi bi-zoom-in text-white fs-4 mt-2"></i>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────────────
   MAIN GALLERY PAGE
   ──────────────────────────────────────────────────────────────────────── */
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
        setGalleryItems(data && data.length > 0 ? data : FALLBACK_ITEMS);
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
          <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
            Our Portfolio
          </span>
          <h1 className="display-4 text-white mt-2">Visual Masterpieces</h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* ── Hero Gallery Image ── */}
      <div className="gallery-hero-wrapper">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600"
          alt="Luxury wedding decoration with elegant flowers and golden lights"
          className="gallery-hero-img"
        />
        <div className="gallery-hero-overlay">
          <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.85rem', letterSpacing: '3px' }}>Sri Durga Events</span>
          <h2 className="text-white mt-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
            Where Every Moment Becomes a Masterpiece
          </h2>
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
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'; }}
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
