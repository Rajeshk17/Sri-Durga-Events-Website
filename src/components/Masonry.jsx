import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Masonry.css';

gsap.registerPlugin(ScrollTrigger);

const Masonry = ({
  items = [],
  animateFrom = 'bottom',
  duration = 0.6,
  ease = 'power3.out',
  stagger = 0.05,
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick = null
}) => {
  const containerRef = useRef(null);
  const [columnsCount, setColumnsCount] = useState(3);
  const [activeItem, setActiveItem] = useState(null);

  // Responsive column count logic
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 576) {
        setColumnsCount(1);
      } else if (w < 992) {
        setColumnsCount(2);
      } else {
        setColumnsCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Distribute items across columns evenly
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnsCount }, () => []);
    items.forEach((item, idx) => {
      cols[idx % columnsCount].push({ ...item, originalIndex: idx });
    });
    return cols;
  }, [items, columnsCount]);

  // Entrance animations using GSAP
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reset animations
    gsap.killTweensOf('.masonry-item-wrapper');

    const elements = el.querySelectorAll('.masonry-item-wrapper');
    if (elements.length === 0) return;

    // Calculate start positions
    let startY = 0;
    let startX = 0;
    if (animateFrom === 'bottom') startY = 60;
    else if (animateFrom === 'top') startY = -60;
    else if (animateFrom === 'left') startX = -60;
    else if (animateFrom === 'right') startX = 60;

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: startY,
        x: startX,
        filter: blurToFocus ? 'blur(12px)' : 'none'
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
        duration: duration,
        stagger: stagger,
        ease: ease,
        overwrite: 'auto',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=10%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, [items, columnsCount, animateFrom, duration, ease, stagger, blurToFocus]);

  const handleCardClick = (item) => {
    if (onItemClick) {
      onItemClick(item.originalIndex);
    } else {
      setActiveItem(item);
    }
  };

  return (
    <div className="masonry-container" ref={containerRef}>
      <div className="masonry-grid">
        {columns.map((column, colIdx) => (
          <div key={colIdx} className="masonry-column">
            {column.map((item) => (
              <div
                key={item.id || item.title}
                className={`masonry-item-wrapper ${scaleOnHover ? 'scale-hover' : ''}`}
                onClick={() => handleCardClick(item)}
                style={{
                  '--hover-scale': hoverScale
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="masonry-img"
                  loading="lazy"
                />
                <div className="masonry-overlay">
                  <h5 className="masonry-title">{item.title}</h5>
                  <p className="masonry-desc">{item.description}</p>
                </div>
                <div className="masonry-zoom-icon">
                  <i className="bi bi-zoom-in fs-5"></i>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Internal Lightbox when no external handler is provided */}
      {activeItem && (
        <div className="masonry-lightbox" onClick={() => setActiveItem(null)}>
          <button className="masonry-lightbox-close" onClick={() => setActiveItem(null)}>
            <i className="bi bi-x-lg"></i>
          </button>
          <div className="masonry-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="masonry-lightbox-img"
            />
            <h4 className="masonry-lightbox-title">{activeItem.title}</h4>
            <p className="masonry-lightbox-desc">{activeItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Masonry;
