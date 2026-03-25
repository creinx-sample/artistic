import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default function GlobalVisualizer() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  // Generate stable random heights to avoid re-renders Jitter
  const barsCount = 120;
  const bars = useMemo(() => 
    Array.from({ length: barsCount }, () => Math.floor(Math.random() * 80) + 10),
  []);

  return (
    <div className={`global-wave-container ${isHome ? 'hero-mode' : 'subtle-mode'}`}>
      <div className="wave-track">
        {bars.map((h, i) => (
          <div 
            key={i} 
            className="wave-bar" 
            style={{ 
              height: `${h}%`, 
              animationDuration: `${0.8 + Math.random() * 1.2}s`,
              animationDelay: `${(i * 0.05).toFixed(2)}s`
            }} 
          />
        ))}
      </div>
      
      {/* Reflection (Mirrored) */}
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
          />
        ))}
      </div>
    </div>
  );
}
