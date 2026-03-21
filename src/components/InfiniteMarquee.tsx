import { motion } from 'framer-motion';

interface InfiniteMarqueeProps {
  items: string[];
  speed?: number; // seconds per loop
  className?: string;
}

export default function InfiniteMarquee({ items, speed = 20, className = '' }: InfiniteMarqueeProps) {
  // We duplicate the items a few times so they can scroll seamlessly
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden flex bg-primary/10 py-4 border-y border-border whitespace-nowrap ${className}`}>
      <motion.div
        className="flex items-center gap-8 px-4"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          ease: 'linear',
          duration: speed,
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-display text-xl font-bold tracking-wider text-muted hover:text-primary transition-colors cursor-default">
              {item}
            </span>
            <span className="text-border text-lg">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
