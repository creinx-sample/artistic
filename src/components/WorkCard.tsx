import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Play, Pause, Headphones, Film, ExternalLink } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface WorkCardProps {
  title: string;
  description: string;
  type: 'dubbing' | 'podcast';
  language: string;
  image: string;
  audio: string;
  duration?: string;
  year?: string;
  featured?: boolean;
}

export default function WorkCard({ title, description, type, language, image, audio, duration, year, featured = false }: WorkCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 3D tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const languageColors: Record<string, string> = {
    Hindi: 'bg-hindi/20 text-hindi border-hindi/30',
    English: 'bg-english/20 text-english border-english/30',
    Tamil: 'bg-tamil/20 text-tamil border-tamil/30',
    Malayalam: 'bg-malayalam/20 text-malayalam border-malayalam/30',
  };

  useEffect(() => {
    audioRef.current = new Audio(audio);
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [audio]);

  const togglePlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10, boxShadow: '0 25px 60px -10px rgba(139,92,246,0.25)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300 card-shine ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 lg:h-80' : 'h-48'}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Play Button */}
        <motion.button
          onClick={togglePlayback}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 shadow-lg shadow-primary/30 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" fill="white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" fill="white" />
          )}
        </motion.button>

        {/* Type Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
          {type === 'dubbing' ? (
            <><Film className="w-3.5 h-3.5" /> Dubbing</>
          ) : (
            <><Headphones className="w-3.5 h-3.5" /> Podcast</>
          )}
        </div>

        {/* Language Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium border ${languageColors[language]}`}>
          {language}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className={`font-display font-semibold ${featured ? 'text-xl' : 'text-lg'} group-hover:text-primary transition-colors`}>
            {title}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 45 }}
            className={`w-8 h-8 rounded-full bg-border/50 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted">
          {duration && <span>{duration}</span>}
          {isPlaying ? <span className="text-primary">Playing...</span> : (year && <span>{year}</span>)}
        </div>
      </div>
    </motion.div>
  );
}
