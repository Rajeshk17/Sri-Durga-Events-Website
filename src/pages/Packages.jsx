import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const FALLBACK_PACKAGES = [
  {
    id: '1',
    name: 'Basic Package',
    price: '$1,999',
    features: ['Standard Stage Decoration', 'Warm Ambiance Lighting', 'Dual Speaker Sound Setup', '1 Lead Event Coordinator', 'Coordination for up to 100 Guests']
  },
  {
    id: '2',
    name: 'Standard Package',
    price: '$4,999',
    features: ['Full Theme Venue Setup', 'Cinematic Photography (5 hrs)', 'Vibrant LED & Moving Head Beams', 'DJ Console & Sound Array', 'Lead Planner & 2 Assistants', 'Coordination for up to 250 Guests', 'Catering Management']
  },
  {
    id: '3',
    name: 'Premium Package',
    price: '$9,999',
    features: ['Bespoke Luxury Architecture Concept', 'Comprehensive Photography & Cinema Video (8 hrs)', 'Advanced LED Wall, Sound Arrays & Smoke Effects', 'Elite DJ, Host/MC & Playlist Sync', 'Dedicated Director & Complete Execution Team', 'Unlimited Guests Coordination', 'Fine Dining Buffet Management', '3D Stage Rendering Design Preview']
  }
];

/* ────────────────────────────────────────────────────────────────────────
   COUNT UP PRICE COMPONENT
   ──────────────────────────────────────────────────────────────────────── */
const CountUpPrice = ({ priceStr }) => {
  const [displayPrice, setDisplayPrice] = useState('$0');

  useEffect(() => {
    const numericStr = priceStr.replace(/[^0-9]/g, '');
    const target = parseInt(numericStr, 10) || 0;
    const prefix = priceStr.startsWith('$') ? '$' : '';

    let start = 0;
    const duration = 1200; // 1.2s count up
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      const current = Math.round(easedProgress * target);

      setDisplayPrice(`${prefix}${current.toLocaleString('en-US')}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [priceStr]);

  return (
    <span className="display-4 text-white fw-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
      {displayPrice}
    </span>
  );
};

/* ────────────────────────────────────────────────────────────────────────
   FLOATING PARTICLES BACKGROUND
   ──────────────────────────────────────────────────────────────────────── */
const Particles = () => {
  const particles = Array.from({ length: 12 });
  return (
    <div className="particle-container">
      {particles.map((_, i) => {
        const size = Math.random() * 8 + 4; // 4px to 12px
        const left = Math.random() * 100; // 0% to 100%
        const delay = Math.random() * 8; // 0s to 8s
        const duration = Math.random() * 6 + 6; // 6s to 12s
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

/* ────────────────────────────────────────────────────────────────────────
   FADE UP IN VIEWPORT HOOK
   ──────────────────────────────────────────────────────────────────────── */
function useFadeInView() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-up-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ────────────────────────────────────────────────────────────────────────
   MAIN PACKAGES PAGE
   ──────────────────────────────────────────────────────────────────────── */
const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCardIds, setVisibleCardIds] = useState([]);
  const disclaimerRef = useFadeInView();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${apiUrl}/packages`);
        if (!res.ok) throw new Error('API server returned error status');
        const data = await res.json();
        setPackages(data && data.length > 0 ? data : FALLBACK_PACKAGES);
      } catch (err) {
        console.warn('API error fetching packages, using fallback data.', err);
        setPackages(FALLBACK_PACKAGES);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [apiUrl]);

  // Stagger fade-up animation on page load for the cards
  useEffect(() => {
    if (!loading && packages.length > 0) {
      packages.forEach((pkg, index) => {
        setTimeout(() => {
          setVisibleCardIds((prev) => [...prev, pkg.id]);
        }, index * 200); // 0.2s delay between cards
      });
    }
  }, [loading, packages]);

  return (
    <div className="animate-fade-in position-relative">
      <Particles />

      {/* Header */}
      <header className="page-header position-relative" style={{ zIndex: 1 }}>
        <div className="container">
          <span className="text-gold text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
            Investment Plans
          </span>
          <h1 className="display-4 text-gold mt-2">
            <span className="shimmer-title">Curated Packages</span>
          </h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Pricing Cards */}
      <section className="py-5 bg-luxury-navy position-relative" style={{ zIndex: 1 }}>
        <div className="container py-4">
          {loading ? (
            <LoadingSpinner text="Retrieving Curated Pricing..." />
          ) : (
            <div className="row g-4 justify-content-center">
              {packages.map((pkg) => {
                const isPremium = pkg.name.toLowerCase().includes('premium');
                const isCardVisible = visibleCardIds.includes(pkg.id);
                
                return (
                  <div key={pkg.id} className="col-lg-4 col-md-6">
                    <div 
                      className={`card h-100 luxury-card package-card d-flex flex-column text-center position-relative ${
                        isCardVisible ? 'package-card-visible' : ''
                      } ${isPremium ? 'border-2 gold-glow-card' : ''}`}
                      style={{ 
                        borderColor: isPremium ? 'var(--luxury-gold)' : 'rgba(212, 175, 55, 0.15)',
                        zIndex: isPremium ? 2 : 1
                      }}
                    >
                      {/* Popular tag for Premium */}
                      {isPremium && (
                        <span 
                          className="position-absolute top-0 start-50 translate-middle badge bg-gold text-dark text-uppercase py-2 px-3 fw-bold"
                          style={{ letterSpacing: '2px', fontSize: '0.65rem' }}
                        >
                          The Masterpiece
                        </span>
                      )}

                      <div className="card-body p-5 d-flex flex-column">
                        {/* Package Name heading in Gold */}
                        <h3 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {pkg.name}
                        </h3>
                        
                        {/* Price with count-up animation */}
                        <div className="my-4">
                          <CountUpPrice priceStr={pkg.price} />
                          <span className="text-white d-block mt-2 small">Starting Price</span>
                        </div>

                        <hr className="bg-gold my-4" style={{ opacity: 0.15 }} />

                        {/* Features List */}
                        <ul className="list-unstyled text-start mb-5 d-flex flex-column gap-3 flex-grow-1" style={{ fontSize: '0.9rem' }}>
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="d-flex align-items-start gap-2">
                              <i className="bi bi-check2 text-gold mt-1"></i>
                              <span style={{ color: '#FFFFFF', opacity: 0.85 }}>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* CTA Button with zoom and glow */}
                        <div className="mt-auto">
                          <Link 
                            to={`/booking?type=Custom&package=${encodeURIComponent(pkg.name)}`} 
                            className={`btn w-100 py-3 packages-btn ${isPremium ? 'btn-gold' : 'btn-luxury-outline'}`}
                          >
                            Inquire Package
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Package Disclaimer with viewport fade-up */}
      <section 
        ref={disclaimerRef}
        className="py-5 bg-luxury-navy-light text-center border-top border-gold fade-up-view position-relative" 
        style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important', zIndex: 1 }}
      >
        <div className="container py-4">
          <h4 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Need a Tailor-made Blueprint?
          </h4>
          <p className="text-white mx-auto mb-4" style={{ maxWidth: '600px', fontSize: '0.9rem' }}>
            All standard event sizes can be extended. Contact our sales department to include custom setups, floral modifications, and guest list count extensions.
          </p>
          <Link to="/contact" className="btn btn-luxury-outline packages-btn">Contact Planners</Link>
        </div>
      </section>
    </div>
  );
};

export default Packages;
