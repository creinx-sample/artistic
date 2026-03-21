import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, Mic2, Film, Headphones } from 'lucide-react';
import WorkCard from '../components/WorkCard';
import { works, type Work } from '../data/works';

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'dubbing' | 'podcast'>('all');
  const [langFilter, setLangFilter] = useState<'all' | Work['language']>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorks = works.filter((work) => {
    const typeMatch = filter === 'all' || work.type === filter;
    const langMatch = langFilter === 'all' || work.language === langFilter;
    return typeMatch && langMatch;
  });

  const languages: Array<{ value: 'all' | Work['language']; label: string; color: string }> = [
    { value: 'all', label: 'All Languages', color: 'bg-muted' },
    { value: 'Hindi', label: 'Hindi', color: 'bg-hindi' },
    { value: 'English', label: 'English', color: 'bg-english' },
    { value: 'Tamil', label: 'Tamil', color: 'bg-tamil' },
    { value: 'Malayalam', label: 'Malayalam', color: 'bg-malayalam' },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6 mx-auto block w-fit"
          >
            <Mic2 className="w-4 h-4 text-primary" />
            <span className="text-sm">Complete Portfolio</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-display text-5xl md:text-7xl font-bold mb-6 text-center"
          >
            My <span className="gradient-text">Work</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-xl text-muted max-w-2xl mx-auto text-center"
          >
            Explore my complete collection of dubbing projects and podcast episodes across four languages.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-y border-border py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Type Filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted" />
              <div className="flex rounded-full bg-card border border-border p-1">
                {[
                  { value: 'all', label: 'All', icon: null },
                  { value: 'dubbing', label: 'Dubbing', icon: Film },
                  { value: 'podcast', label: 'Podcast', icon: Headphones },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilter(item.value as typeof filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                      filter === item.value
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLangFilter(lang.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all border ${
                    langFilter === lang.value
                      ? 'bg-card border-primary text-foreground'
                      : 'border-border text-muted hover:border-muted'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${lang.color}`} />
                  {lang.label}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="hidden md:flex items-center gap-1 rounded-lg bg-card border border-border p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-muted">
              Showing <span className="text-foreground font-medium">{filteredWorks.length}</span> works
            </p>
          </div>

          <motion.div
            layout
            className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
          >
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkCard {...work} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredWorks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card flex items-center justify-center">
                <Mic2 className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">No works found</h3>
              <p className="text-muted">Try adjusting your filters to see more results.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
