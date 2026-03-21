import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Headphones, Play, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorkCard from '../components/WorkCard';
import AudioWave from '../components/AudioWave';
import { getWorksByLanguage, type Work } from '../data/works';

interface LanguagePageProps {
  language: Work['language'];
  color: string;
  gradient: string;
  description: string;
  icon: string;
}

export default function LanguagePage({ language, color, gradient, description, icon }: LanguagePageProps) {
  const [filter, setFilter] = useState<'all' | 'dubbing' | 'podcast'>('all');
  const works = getWorksByLanguage(language);
  
  const filteredWorks = filter === 'all' 
    ? works 
    : works.filter(work => work.type === filter);

  const dubbingCount = works.filter(w => w.type === 'dubbing').length;
  const podcastCount = works.filter(w => w.type === 'podcast').length;

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${color}/30 rounded-full blur-3xl`} />
          <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] ${color}/20 rounded-full blur-3xl`} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 mb-6"
              >
                <motion.span
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-6xl"
                >{icon}</motion.span>
                <AudioWave color={gradient} />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="font-display text-5xl md:text-7xl font-bold mb-6"
              >
                <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {language}
                </span>
                <br />Works
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-xl text-muted leading-relaxed mb-8"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className={`text-4xl font-display font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {dubbingCount}
                  </div>
                  <p className="text-sm text-muted">Dubbing Projects</p>
                </motion.div>
                <div className="w-px bg-border" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className={`text-4xl font-display font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {podcastCount}
                  </div>
                  <p className="text-sm text-muted">Podcast Episodes</p>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.55, ease: 'easeOut' }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl blur-2xl opacity-30`} />
              <div className="relative bg-card rounded-3xl border border-border p-8">
                <div className="grid grid-cols-2 gap-4">
                  {works.slice(0, 4).map((work, i) => (
                    <motion.div
                      key={work.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="relative group rounded-xl overflow-hidden"
                    >
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-3">
                        <p className="text-xs font-medium truncate">{work.title}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-border py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2">
            {[
              { value: 'all', label: 'All Works', count: works.length, icon: null },
              { value: 'dubbing', label: 'Dubbing', count: dubbingCount, icon: Film },
              { value: 'podcast', label: 'Podcasts', count: podcastCount, icon: Headphones },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value as typeof filter)}
                className={`px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                  filter === item.value
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                    : 'bg-card border border-border text-muted hover:text-foreground hover:border-muted'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === item.value ? 'bg-white/20' : 'bg-border'
                }`}>
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work, i) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <WorkCard {...work} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
