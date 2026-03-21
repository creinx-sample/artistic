import { motion, type Variants } from 'framer-motion';

const containerVariants: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -50,
    filter: 'blur(10px)',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1], // Custom sleek easing
      when: 'afterChildren',
    },
  },
};

const textVariants: Variants = {
  initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

export default function InitialLoader({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background select-none"
    >
      <div className="overflow-hidden flex flex-col items-center">
        <motion.div variants={textVariants} className="text-muted tracking-[0.3em] text-xs uppercase mb-4">
          Aria Voices
        </motion.div>
        
        <div className="flex gap-4">
          <motion.h1 variants={textVariants} className="font-display text-5xl md:text-7xl font-light tracking-wide">
            Suja
          </motion.h1>
          <motion.h1 variants={textVariants} className="font-display text-5xl md:text-7xl font-bold tracking-wide">
            Sambandam
          </motion.h1>
        </div>

        <motion.div variants={textVariants} className="mt-8 flex gap-2 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '300ms' }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
