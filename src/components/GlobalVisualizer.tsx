import { useMemo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function GlobalVisualizer() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  
  // Track hero visibility to pause animation
  useEffect(() => {
    if (!isHome) {
      setIsHeroVisible(false);
      return;
    }

    const hero = document.getElementById('hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  // Generate stable random heights to avoid re-renders Jitter
  const barsCount = 120;
  const bars = useMemo(() => 
    Array.from({ length: barsCount }, () => Math.floor(Math.random() * 80) + 10),
  []);

  return (
    <div className={`global-wave-container ${isHome ? 'hero-mode' : 'subtle-mode'} ${!isHeroVisible ? 'paused' : ''}`}>
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
