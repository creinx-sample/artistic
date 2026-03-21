import { motion } from 'framer-motion';

interface AudioWaveProps {
  className?: string;
  barCount?: number;
  color?: string;
}

export default function AudioWave({ className = '', barCount = 5, color = 'from-primary to-secondary' }: AudioWaveProps) {
  return (
    <div className={`flex items-center gap-1 h-10 ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.span
          key={i}
          className={`w-1 rounded-full bg-gradient-to-t ${color}`}
          animate={{
            height: ['10px', '35px', '10px'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
