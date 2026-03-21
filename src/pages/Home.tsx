import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mic2, Headphones, Film, Globe, Award, Users, Clock } from 'lucide-react';
import AudioWave from '../components/AudioWave';
import WorkCard from '../components/WorkCard';
import TextReveal from '../components/TextReveal';
import AnimatedCounter from '../components/AnimatedCounter';
import InfiniteMarquee from '../components/InfiniteMarquee';
import LiveHeroBackground from '../components/LiveHeroBackground';
import { getFeaturedWorks } from '../data/works';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const featuredWorks = getFeaturedWorks();

  const languages = [
    { name: 'Hindi', path: '/hindi', color: 'from-hindi to-orange-600', icon: '🇮🇳', works: '50+' },
    { name: 'English', path: '/english', color: 'from-english to-blue-600', icon: '🌍', works: '40+' },
    { name: 'Tamil', path: '/tamil', color: 'from-tamil to-emerald-600', icon: '🎭', works: '35+' },
    { name: 'Malayalam', path: '/malayalam', color: 'from-malayalam to-amber-600', icon: '🌴', works: '30+' },
  ];

  const stats = [
    { icon: Film, value: '150+', label: 'Dubbing Projects' },
    { icon: Headphones, value: '500+', label: 'Podcast Episodes' },
    { icon: Users, value: '10M+', label: 'Listeners Reached' },
    { icon: Award, value: '12', label: 'Industry Awards' },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image layer */}
        <motion.div style={{ y }} className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Studio"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Live Animated Overlay */}
        <LiveHeroBackground />

        <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <AudioWave />
              <span className="text-primary font-medium">Professional Voice Artist</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
            >
              Suja <span className="gradient-text">Sambandam</span>
            </motion.h1>

            <TextReveal
              text="Professional Voice Artist specializing in dubbing and podcasting across Tamil, Hindi, English, and Malayalam. Bringing characters to life with 15+ years of industry experience."
              delay={0.4}
              className="text-xl text-muted leading-relaxed mb-10 max-w-xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/portfolio"
                className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white flex items-center gap-3 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <span className="w-5 h-5 inline-flex items-center justify-center">▶</span>
                Explore My Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border border-border rounded-full font-medium hover:bg-card hover:border-primary/50 transition-all"
              >
                Get In Touch
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ height: ['20%', '80%', '20%'] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Scrolling Text Strip */}
      <InfiniteMarquee
        items={['Tamil Dubbing', 'Hindi Voiceovers', 'English Narration', 'Malayalam Podcasts', 'Character Voices', 'Audiobooks']}
        speed={30}
        className="bg-card border-y border-border"
      />

      {/* Stats Section */}
      <section className="relative py-20 bg-card border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter 
                    value={parseInt(stat.value)} 
                    suffix={stat.value.replace(/[0-9]/g, '')} 
                  />
                </div>
                <p className="text-muted text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Static Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative max-w-sm mx-auto lg:mx-0"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img
                  src="/images/suja1.jpg"
                  alt="Suja Sambandam"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating years badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-5 -right-5 bg-card border border-border rounded-2xl p-4 shadow-2xl z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-display font-bold">15+</p>
                    <p className="text-xs text-muted">Years Exp.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium mb-4 block">About Me</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                The Voice Behind the <span className="gradient-text">Stories</span>
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                I'm Suja Sambandam, a professional voice artist with over 15 years of experience in dubbing and podcasting. My journey is fueled by a passion for bringing characters and narratives to life through the power of voice.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Fluent in four languages—Tamil, Hindi, English, and Malayalam—I've worked on diverse projects ranging from film dubbing to intimate podcast storytelling. My goal is to create authentic, emotionally resonant audio experiences that connect with audiences globally.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Mic2, label: 'Voice Acting' },
                  { icon: Film, label: 'Film Dubbing' },
                  { icon: Headphones, label: 'Podcasting' },
                  { icon: Globe, label: 'Multilingual' },
                ].map((item, i) => (
                  <motion.div 
                    key={item.label} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all"
              >
                Let's Work Together <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="relative py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium mb-4 block">Multilingual Expertise</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Four Languages, <span className="gradient-text">One Voice</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Explore my work across different languages. Each brings its unique cultural flavor and emotional depth to the projects I undertake.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <Link
                  to={lang.path}
                  className="group block relative h-64 rounded-3xl overflow-hidden border border-border hover:border-transparent transition-all"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${lang.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-card group-hover:bg-transparent transition-colors duration-500" />
                  
                  <div className="relative h-full p-8 flex flex-col justify-between">
                    <div className="text-5xl">{lang.icon}</div>
                    <div>
                      <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                        {lang.name}
                      </h3>
                      <p className="text-muted group-hover:text-white/80 transition-colors">
                        {lang.works} Works
                      </p>
                    </div>
                    <motion.div
                      className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="relative py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <span className="text-primary font-medium mb-4 block">Featured Works</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                Top <span className="gradient-text">Projects</span>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all"
            >
              View All Works <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorks.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.55, ease: 'easeOut' }}
              >
                <WorkCard {...work} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/waveform.jpg"
            alt="Waveform"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <AudioWave className="justify-center mb-8" barCount={7} />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="font-display text-4xl md:text-6xl font-bold mb-6"
            >
              Ready to <span className="gradient-text">Collaborate?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="text-xl text-muted mb-10 max-w-2xl mx-auto"
            >
              Whether you need a voice for your next film, documentary, podcast, or commercial, I'm here to bring your vision to life.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/contact"
                className="px-10 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Start a Project
              </Link>
              <a
                href="mailto:sujavagishwari.voiceartist@gmail.com"
                className="px-10 py-4 border border-border rounded-full font-medium hover:bg-card transition-all"
              >
                sujavagishwari.voiceartist@gmail.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
