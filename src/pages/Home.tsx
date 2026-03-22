import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mic2, Headphones, Film, Globe } from 'lucide-react';
import AudioWave from '../components/AudioWave';
import WorkCard from '../components/WorkCard';
import TextReveal from '../components/TextReveal';
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
    { name: 'English', path: '/english', color: 'from-secondary to-secondary-light', icon: Globe, works: '40+' },
    { name: 'Hindi', path: '/hindi', color: 'from-primary to-primary-light', icon: Mic2, works: '50+' },
    { name: 'Tamil', path: '/tamil', color: 'from-primary to-secondary', icon: Film, works: '35+' },
    { name: 'Malayalam', path: '/malayalam', color: 'from-secondary to-primary', icon: Headphones, works: '30+' },
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
            className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
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
              text="Professional Voice Artist specializing in the art of dubbing and narrative storytelling across Tamil, Hindi, English, and Malayalam. Bringing classic and contemporary characters to life with refined industry expertise."
              delay={0.4}
              className="text-2xl font-body italic leading-relaxed mb-10 max-w-xl text-foreground/80"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6"
            >
              <Link
                to="/portfolio"
                className="vibrant-btn flex items-center gap-3"
              >
                Selected Works
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 border border-foreground/20 italic font-display hover:border-primary transition-all flex items-center gap-2"
              >
                Connect With Me
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



      {/* About Section */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative max-w-sm mx-auto lg:mx-0"
            >
              <div className="relative overflow-hidden aspect-[4/5] border-4 border-primary shadow-xl bg-card rounded-2xl">
                <img
                  src="/images/suja_studio.jpg"
                  alt="Suja Sambandam - Professional Voice Artist"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium tracking-widest uppercase mb-4 block">About Me</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                The Voice Behind the <span className="gradient-text">Stories</span>
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-6 text-lg">
                I'm Suja Sambandam, a professional voice artist with a rich professional history in Garment Design and international clothing trends. My journey from the intricate world of textile manufacturing to the art of vocal performance is fueled by a lifelong passion for storytelling.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-8 text-lg opacity-90">
                With extensive experience as a Merchandiser and founder of "Surabhi Garments," I bring a meticulous eye for detail to my voice work. Fluent in four languages—Tamil, Hindi, English, and Malayalam—I strive to create authentic, emotionally resonant audio experiences.
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

              <div className="flex flex-wrap gap-6 items-center">
                <Link
                  to="/about"
                  className="vibrant-btn flex items-center gap-3"
                >
                  Explore My Journey
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all"
                >
                  Let's Work Together <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
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
            <span className="text-primary font-medium tracking-widest uppercase mb-4 block">Multilingual Expertise</span>
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
                    <motion.div 
                      className="text-primary group-hover:text-white transition-colors duration-500"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    >
                      <lang.icon className="w-12 h-12 drop-shadow-md" />
                    </motion.div>
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
              <span className="text-primary font-medium tracking-widest uppercase mb-4 block">Selected Works</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                My <span className="gradient-text">Portfolio</span>
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
      <section className="relative py-32 overflow-hidden bg-background border-t border-primary/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
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
              className="text-xl text-muted/80 mb-10 max-w-2xl mx-auto"
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
                className="px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-display uppercase tracking-widest transition-all flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,168,197,0.4)]"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
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
