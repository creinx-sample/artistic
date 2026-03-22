import { motion } from 'framer-motion';

function FloatingMusicNotes() {
  const notes = ['♪', '♫', '♬', '♩'];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute text-2xl md:text-5xl font-serif drop-shadow-[0_0_10px_currentColor] opacity-30 ${
            ['text-cyan-400', 'text-fuchsia-500', 'text-rose-500', 'text-blue-500'][i % 4]
          }`}
          initial={{
            y: '100vh',
            x: `${Math.random() * 100}vw`,
            opacity: 0,
            rotate: Math.random() * 360
          }}
          animate={{
            y: '-10vh',
            x: `${Math.random() * 100}vw`,
            opacity: [0, 0.5, 0],
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

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Soft Teal Orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" 
      />
      {/* Soft Magenta Orb */}
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.02, 0.08, 0.02],
          x: [0, -50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[150px]" 
      />
      
      {/* Subtle light vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
      
      {/* Global music notes overlay */}
      <FloatingMusicNotes />
    </div>
  );
}
