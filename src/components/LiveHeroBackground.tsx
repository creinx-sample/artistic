import { motion } from 'framer-motion';


function SonicRings() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-[20%] -translate-y-1/2 pointer-events-none opacity-30 mix-blend-screen">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: `${i * 300}px`,
            height: `${i * 300}px`,
            border: `1px solid ${i % 2 === 0 ? 'rgba(255, 107, 53, 0.2)' : 'rgba(124, 58, 237, 0.2)'}`,
            boxShadow: `0 0 40px ${i % 2 === 0 ? 'rgba(255, 107, 53, 0.05)' : 'rgba(124, 58, 237, 0.05)'} inset`,
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
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
  return (
    <div className="absolute inset-0 z-0 overflow-hidden mix-blend-screen pointer-events-none">
      {/* Live Equalizer at the bottom of the viewport */}
      <LiveEqualizer />

      {/* Floating Notes */}
      <FloatingMusicNotes />

      {/* Creative background replacing the spectral waves */}
      <SonicRings />
    </div>
  );
}
