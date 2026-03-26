import { useMemo } from 'react';

export default function HeroVisualizer() {
  // Generate stable random heights to avoid re-renders Jitter
  const barsCount = 120;
  const bars = useMemo(() => 
    Array.from({ length: barsCount }, () => Math.floor(Math.random() * 80) + 10),
  []);

  return (
    <div className="hero-wave-visualizer">
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
