import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRight, Unlock } from 'lucide-react';

interface DragToUnlockProps {
  onComplete: () => void;
}

export function DragToUnlock({ onComplete }: DragToUnlockProps) {
  const [unlocked, setUnlocked] = useState(false);
  const x = useMotionValue(0);

  // Container is 320px wide. Padding is 4px (p-1). Handle is 56px.
  // Max drag distance = 320 (total) - 8 (L+R padding) - 56 (handle) = 256
  const maxDrag = 256;
  
  // Progress width exactly trails the handle: 4px padding + 56px handle + x current drag
  const progressWidth = useTransform(x, [0, maxDrag], [60, 316]);
  const textOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);

  // Continuously monitor drag position
  useEffect(() => {
    const unsubscribe = x.on("change", (latestVal) => {
      // If dragged 90% of the way, trigger unlock
      if (latestVal >= maxDrag * 0.9 && !unlocked) {
        setUnlocked(true);
        setTimeout(onComplete, 400); // Slight delay to show unlocked state
      }
    });
    return unsubscribe;
  }, [x, unlocked, onComplete, maxDrag]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 tech-grid"
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4 text-glow tracking-widest uppercase">
          SYS.AUTH
        </h1>
        <p className="font-mono text-primary font-medium tracking-widest uppercase text-sm md:text-base">
          STATUS: INITIATING
        </p>
      </motion.div>

      <div 
        className="relative w-[320px] h-[64px] bg-card flex items-center p-1 rounded-full neon-border overflow-hidden"
      >
        {/* Progress Fill */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-secondary to-primary rounded-full overflow-hidden opacity-80"
          style={{ width: progressWidth }}
        />

        {/* Text */}
        <motion.p
          className="absolute inset-0 flex items-center justify-center font-mono text-primary/70 font-medium pointer-events-none z-0 text-sm"
          style={{ opacity: textOpacity }}
        >
          {unlocked ? '' : 'AWAITING AUTHORIZATION'}
        </motion.p>
        
        {/* Unlocked Message Text */}
        {unlocked && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center text-white font-mono font-bold pointer-events-none z-0 tracking-widest text-glow"
          >
            ACCESS GRANTED
          </motion.p>
        )}

        {/* Draggable Handle */}
        <motion.div
          drag={!unlocked ? "x" : false}
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.05}
          dragSnapToOrigin={!unlocked}
          style={{ x }}
          className={`relative w-[56px] h-full bg-[#020617] rounded-full flex items-center justify-center z-10 neon-border
            ${unlocked ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
        >
          {unlocked ? (
            <Unlock className="w-5 h-5 text-primary drop-shadow-[0_0_5px_theme(colors.primary)]" />
          ) : (
            <ChevronRight className="w-6 h-6 text-primary ml-1 drop-shadow-[0_0_5px_theme(colors.primary)]" />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
