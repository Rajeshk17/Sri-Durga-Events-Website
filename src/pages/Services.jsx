import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

/* Clean plain-text service titles — no emojis, no broken characters */
const FALLBACK_SERVICES = [
  { id: '1', title: 'Wedding Events',           description: 'Complete luxury wedding planning, from floral design and layout to stage setup, catering coordination, and scheduling.',                              image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: 'Birthday Parties',          description: 'Magical themes, customized decor, activities planning, and vibrant lighting designs to make birthdays unforgettable.',                             image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800' },
  { id: '3', title: 'Baby Shower',               description: 'Charming, elegant designs with subtle pastel palettes, custom photo booths, and heartwarming arrangements for expecting parents.',                  image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800' },
  { id: '4', title: 'Anniversary Celebrations',  description: 'Sophisticated candle-lit tables, custom stage setups, live music coordinates, and memory collages for romance celebrations.',                        image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800' },
  { id: '5', title: 'Corporate Events',          description: 'Premium stage decoration, high-end audiovisual arrays, and smooth organization for gala nights, product launches, and conferences.',               image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800' },
  { id: '6', title: 'Catering Services',         description: 'Gourmet menu selections from worldwide cuisines, premium buffet stations, professional fine-dining staff, and custom beverage bars.',               image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800' },
  { id: '7', title: 'Photography & Videography', description: 'Cinematic video highlight packages, aerial drone shots, high-resolution editing, and premium leather-bound photo albums.',                          image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800' },
  { id: '8', title: 'DJ & Sound Systems',        description: 'Advanced audio consoles, club-grade sound outputs, intelligent strobe beam light coordinators, and dynamic master hosts.',                         image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800' }
];

/* Image map keyed by clean plain-text titles */
const SERVICE_IMAGE_MAPPING = {
  'Wedding Events':           'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
  'Birthday Parties':         'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800',
  'Baby Shower':              'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800',
  'Anniversary Celebrations': 'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=800',
  'Corporate Events':         'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
  'Catering Services':        'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
  'Photography & Videography':'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
  'DJ & Sound Systems':       'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
};

/* Strip any leading emoji / mojibake characters, keep plain text */
const cleanTitle = (raw = '') =>
  raw
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')   // unicode emoji range
    .replace(/[^\x00-\x7F\u00C0-\u024F&]/g, '') // non-ASCII except common latin & ampersand
    .replace(/^[\s\W]+/, '')                   // leading non-word chars / spaces
    .trim();

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${apiUrl}/services`);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(FALLBACK_SERVICES);
        }
      } catch {
        setServices(FALLBACK_SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [apiUrl]);

  const resolveServiceImage = (rawTitle, originalImage) => {
    const title = cleanTitle(rawTitle);
    if (
      originalImage &&
      originalImage.trim().length > 0 &&
      originalImage.startsWith('http') &&
      !originalImage.includes('placeholder')
    ) {
      return originalImage;
    }
    return (
      SERVICE_IMAGE_MAPPING[title] ||
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800'
    );
  };

  return (
    <div className="animate-fade-in">

      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <span className="text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#FFFFFF' }}>
            What We Offer
          </span>
          <h1 className="display-4 text-white mt-2">Premium Event Services</h1>
          <div className="gold-divider"></div>
        </div>
      </header>

      {/* Service Cards */}
      <section className="py-5 bg-luxury-navy">
        <div className="container py-4">
          {loading ? (
            <LoadingSpinner text="Retrieving Exquisite Offerings..." />
          ) : (
            <div className="row g-4">
              {services.map((service) => {
                const title = cleanTitle(service.title);
                return (
                  <div key={service.id} className="col-lg-3 col-md-6">
                    <div className="card h-100 luxury-card d-flex flex-column">
                      <div className="luxury-card-img-wrapper" style={{ height: '180px' }}>
                        <img
                          src={resolveServiceImage(service.title, service.image)}
                          alt={title}
                          className="card-img-top w-100 h-100 object-fit-cover luxury-card-img"
                          onError={(e) => {
                            e.target.src =
                              SERVICE_IMAGE_MAPPING[title] ||
                              'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800';
                          }}
                        />
                      </div>
                      <div className="card-body p-4 d-flex flex-column flex-grow-1">
                        {/* Title — GOLD, no emoji */}
                        <h4 className="card-title mb-3 h5" style={{ color: '#D4AF37' }}>
                          {title}
                        </h4>
                        {/* Description — WHITE */}
                        <p className="card-text mb-4 small" style={{ lineHeight: '1.6', fontSize: '0.85rem', color: '#FFFFFF' }}>
                          {service.description}
                        </p>
                        <div className="mt-auto pt-2">
                          <Link
                            to={`/booking?type=${encodeURIComponent(title)}`}
                            className="btn btn-gold w-100 py-2"
                            style={{ fontSize: '0.75rem' }}
                          >
                            Book Service
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

      {/* CTA */}
      <section className="py-5 bg-luxury-navy-light text-center border-top border-gold" style={{ borderColor: 'rgba(212, 175, 55, 0.15) !important' }}>
        <div className="container py-4">
          {/* Heading — GOLD */}
          <h3 className="text-gold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Looking for a custom event package?
          </h3>
          {/* Paragraph — WHITE */}
          <p className="text-white mx-auto mb-4" style={{ maxWidth: '600px', fontSize: '0.9rem' }}>
            Get in touch with our event design director for tailored setups, custom lighting blueprints, and multi-cuisine buffet menus.
          </p>
          <Link to="/booking" className="btn btn-luxury-outline">Customize Event</Link>
        </div>
      </section>

    </div>
  );
};

export default Services;
