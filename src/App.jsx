import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Packages from './pages/Packages';
import Contact from './pages/Contact';

// Layout wrapper for pages requiring standard navigation
const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-luxury-navy">
      <Navbar />
      {/* We add margin-top to account for the fixed navbar height */}
      <main className="flex-grow-1" style={{ paddingTop: '80px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Setup scroll reveal animation for all sections on the new page
    // We add a tiny delay to let components render fully
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(sec => {
        sec.classList.add('scroll-section-reveal');
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-section-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      sections.forEach(sec => observer.observe(sec));
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Pages with standard navbar/footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Fallback Catch-All Route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
