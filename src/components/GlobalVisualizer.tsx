import { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function GlobalVisualizer() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  
  // Track visibility to hide waves when scrolling past hero
  useEffect(() => {
    if (!isHome) {
      setIsHeroVisible(false);
      return;
    }

    const hero = document.getElementById('hero');
    const marquee = document.querySelector('.marquee-strip');
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.classList.contains('marquee-strip')) {
            // If the marquee enters the viewport at all, hide the waves
            if (entry.isIntersecting) {
              setIsHeroVisible(false);
            } else if (entry.boundingClientRect.top > 0) {
              // If marquee is below the viewport, we are back in the hero
              setIsHeroVisible(true);
            }
          } else if (entry.target.id === 'hero' && !marquee) {
            // Fallback if marquee is missing
            setIsHeroVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: [0, 0.1] }
    );

    observer.observe(hero);
    if (marquee) observer.observe(marquee);
    
    return () => observer.disconnect();
  }, [isHome]);

  // Generate stable random heights to avoid re-renders Jitter
  const barsCount = 120;
  const bars = useMemo(() => 
    Array.from({ length: barsCount }, () => Math.floor(Math.random() * 80) + 10),
  []);

  if (!isHome) return null;

  return (
    <div className={`global-wave-container hero-mode ${!isHeroVisible ? 'hidden' : ''}`}>
      {/* Downward Waves (Bottom row) */}
      <div className="wave-track mirrored">
        {bars.map((h, i) => (
          <div 
            key={i} 
            className="wave-bar" 
            style={{ 
              height: `${h}%`, 
              animationDuration: `${0.8 + Math.random() * 1.2}s`,
              animationDelay: `${(i * 0.05).toFixed(2)}s`
            }} 
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
