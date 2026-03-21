import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Generates dynamic sine wave paths for a "live audio" feeling
const generateWavePath = (phase: number, amplitude: number, frequency: number, width: number, offsetY: number) => {
  let path = `M 0 ${offsetY}`;
  for (let x = 0; x <= width; x += 10) {
    const y = offsetY + Math.sin(x * frequency + phase) * amplitude;
    path += ` L ${x} ${y}`;
  }
  return path;
};

function AnimatedWave({ color, duration, offset, amplitude, frequency }: { color: string, duration: number, offset: number, amplitude: number, frequency: number }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let currentPhase = 0;
    
    const animate = () => {
      currentPhase += 0.05 * (10 / duration);
      setPhase(currentPhase);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [duration]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      <motion.path
        d={generateWavePath(phase, amplitude, frequency, typeof window !== 'undefined' ? window.innerWidth : 1000, offset)}
        fill="none"
        stroke={color}
        strokeWidth="2"
        style={{
          filter: 'blur(4px)',
          opacity: 0.6,
        }}
      />
      <motion.path
        d={generateWavePath(phase, amplitude, frequency, typeof window !== 'undefined' ? window.innerWidth : 1000, offset)}
        fill="none"
        stroke={color}
        strokeWidth="1"
        style={{ opacity: 0.3 }}
      />
    </svg>
  );
}

const BAR_COUNT = 60;

function LiveEqualizer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-center gap-1 opacity-20 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {Array.from({ length: BAR_COUNT }, (_, i) => {
        const heightBase = 20 + Math.random() * 80;
        return (
          <motion.div
            key={i}
            className="w-1.5 md:w-3 bg-gradient-to-t from-primary to-secondary rounded-t-full origin-bottom"
            animate={{
              height: [heightBase * 0.2, heightBase, heightBase * 0.3, heightBase * 1.2, heightBase * 0.2],
            }}
            transition={{
              duration: 1 + Math.random() * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        );
      })}
    </div>
  );
}

function FloatingMusicNotes() {
  const notes = ['♪', '♫', '♬', '♩'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/10 text-2xl md:text-4xl font-serif"
          initial={{
            y: '100vh',
            x: `${Math.random() * 100}vw`,
            opacity: 0,
            rotate: Math.random() * 360
          }}
          animate={{
            y: '-10vh',
            x: `${Math.random() * 100}vw`,
            opacity: [0, 0.4, 0],
            rotate: Math.random() * 360 + 180
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
        >
          {notes[Math.floor(Math.random() * notes.length)]}
        </motion.div>
      ))}
    </div>
  );
}

export default function LiveHeroBackground() {
  const [windowWidth, setWindowWidth] = useState(1000);
  const [windowHeight, setWindowHeight] = useState(800);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden mix-blend-screen pointer-events-none">
      {/* Live Equalizer at the bottom of the viewport */}
      <LiveEqualizer />

      {/* Floating Notes */}
      <FloatingMusicNotes />

      {/* Animated Sound Waves crossing the screen */}
      {windowWidth && (
        <>
          <AnimatedWave color="rgb(139, 92, 246)" duration={18} offset={windowHeight * 0.4} amplitude={80} frequency={0.003} />
          <AnimatedWave color="rgb(217, 70, 239)" duration={24} offset={windowHeight * 0.6} amplitude={120} frequency={0.002} />
          <AnimatedWave color="rgb(59, 130, 246)" duration={15} offset={windowHeight * 0.5} amplitude={60} frequency={0.004} />
        </>
      )}
    </div>
  );
}
