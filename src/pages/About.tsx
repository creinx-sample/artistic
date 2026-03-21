import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Film, Headphones, Globe, Award, Heart, Music, Star, ArrowRight, Instagram, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import AudioWave from '../components/AudioWave';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCounter from '../components/AnimatedCounter';


const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

export default function About() {
  const carouselPhotos = [
    { src: '/images/suja1.jpg', alt: 'Suja in the recording studio' },
    { src: '/images/suja2.png', alt: 'Suja at Sound Parti Studios' },
    { src: '/images/suja3.png', alt: 'Suja at the reception' },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index: number, dir?: number) => {
    setDirection(dir ?? (index > activeSlide ? 1 : -1));
    setActiveSlide(index);
  }, [activeSlide]);

  const next = useCallback(() => {
    const n = (activeSlide + 1) % carouselPhotos.length;
    setDirection(1);
    setActiveSlide(n);
  }, [activeSlide, carouselPhotos.length]);

  const prev = useCallback(() => {
    const n = (activeSlide - 1 + carouselPhotos.length) % carouselPhotos.length;
    setDirection(-1);
    setActiveSlide(n);
  }, [activeSlide, carouselPhotos.length]);

  // Auto-advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const timeline = [
    { year: '2008', title: 'Started Voice Acting', desc: 'Began professional voice work with local Tamil productions and regional radio spots.' },
    { year: '2011', title: 'Expanded to Hindi', desc: 'Broke into Hindi dubbing, working with major production studios in Chennai.' },
    { year: '2014', title: 'English & Malayalam', desc: 'Added English and Malayalam to repertoire, enabling projects across four major Indian languages.' },
    { year: '2017', title: 'Podcast Journey Begins', desc: 'Launched podcast narration and hosting career, reaching over 5 million listeners.' },
    { year: '2020', title: 'Digital & OTT Boom', desc: 'Voice featured in leading OTT platform original series and international dubbing projects.' },
    { year: '2024', title: 'Present', desc: 'Over 150 dubbing projects, 500+ podcast episodes, and 15+ years of industry expertise.' },
  ];

  const languages = [
    { name: 'Tamil', flag: '🎭', level: 95, desc: 'Native tongue — deep emotional range, classical to contemporary', color: 'from-tamil to-emerald-600' },
    { name: 'Hindi', flag: '🇮🇳', level: 90, desc: 'Fluent — Bollywood dubbing, radio, and brand campaigns', color: 'from-hindi to-orange-600' },
    { name: 'English', flag: '🌍', level: 85, desc: 'Professional — international projects, neutral accent', color: 'from-english to-blue-600' },
    { name: 'Malayalam', flag: '🌴', level: 80, desc: 'Proficient — film dubbing and regional productions', color: 'from-malayalam to-amber-600' },
  ];

  const skills = [
    { icon: Film, label: 'Film & TV Dubbing' },
    { icon: Headphones, label: 'Podcast Narration' },
    { icon: Mic2, label: 'Voice Over' },
    { icon: Globe, label: 'Multilingual Storytelling' },
    { icon: Music, label: 'Audio Branding' },
    { icon: Heart, label: 'Character Animation' },
  ];

  const stats = [
    { icon: Film, value: '150+', label: 'Dubbing Projects' },
    { icon: Headphones, value: '500+', label: 'Podcast Episodes' },
    { icon: Star, value: '12', label: 'Industry Awards' },
    { icon: Globe, value: '4', label: 'Languages' },
  ];

  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Interactive Carousel */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative max-w-sm mx-auto lg:mx-0"
            >
              {/* Photo container */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-card shadow-2xl">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.img
                    key={activeSlide}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                      center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } },
                      exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.35, ease: 'easeIn' } }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    src={carouselPhotos[activeSlide].src}
                    alt={carouselPhotos[activeSlide].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />

                {/* Prev / Next arrows */}
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background/90 transition-all z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background/90 transition-all z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {carouselPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeSlide
                          ? 'bg-primary w-5'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating years badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-5 -right-5 bg-card border border-border rounded-2xl p-4 shadow-2xl z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold">15+</p>
                    <p className="text-xs text-muted">Years of Experience</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AudioWave className="mb-6" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-primary font-medium mb-3 block"
              >
                About Me
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
                className="font-display text-5xl md:text-6xl font-bold mb-6"
              >
                The Voice Behind <span className="gradient-text">the Stories</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                className="text-muted leading-relaxed mb-4"
              >
                I'm <strong className="text-foreground">Suja Sambandam</strong>, a professional voice artist based in Chennai, India, with over 15 years of industry experience. My journey began with a deep love for storytelling through sound — and it has taken me across four languages and hundreds of projects since then.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
                className="text-muted leading-relaxed mb-8"
              >
                Whether it's bringing a character to life in a Tamil film, narrating an English documentary, anchoring a Hindi podcast, or voicing a Malayalam production — I craft every performance with authenticity, warmth, and emotional depth.
              </motion.p>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
              >
                {stats.map((s) => (
                  <div key={s.label} className="bg-card rounded-2xl p-4 border border-border text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="font-display text-2xl font-bold gradient-text">
                      <AnimatedCounter 
                        value={parseInt(s.value)} 
                        suffix={s.value.replace(/[0-9]/g, '')} 
                      />
                    </p>
                    <p className="text-xs text-muted mt-1">{s.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white flex items-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  Work With Me <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 border border-border rounded-full font-medium flex items-center gap-2 hover:bg-card hover:border-primary/50 transition-all"
                >
                  <Instagram className="w-4 h-4" /> Follow on Instagram
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────── */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal variant="zoom" className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              What I <span className="gradient-text">Specialise In</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 40, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.06 }}
                className="bg-background rounded-2xl p-5 border border-border text-center hover:border-primary/50 transition-colors cursor-default"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">{skill.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Language Proficiency ─────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal variant="slide" direction="up" className="text-center mb-16">
            <span className="text-primary font-medium block mb-3">Multilingual Expertise</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Four Languages, <span className="gradient-text">One Voice</span>
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {languages.map((lang, i) => (
              <ScrollReveal
                key={lang.name}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 0.1}
                variant="slide"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-3xl border border-border p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display text-xl font-bold">{lang.name}</h3>
                        <span className="text-sm text-primary font-medium">{lang.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full bg-gradient-to-r ${lang.color} rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted text-sm">{lang.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Timeline ──────────────────────────── */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="text-primary font-medium block mb-3">My Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Career <span className="gradient-text">Timeline</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <ScrollReveal
                  key={item.year}
                  direction={i % 2 === 0 ? 'right' : 'left'}
                  delay={0.05}
                  amount={0.2}
                >
                  <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background z-10 mt-1" />

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                      <span className="text-primary font-bold font-display text-lg block mb-1">{item.year}</span>
                      <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Spacer on opposite side */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────── */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal variant="zoom">
            <h2 className="font-display text-4xl font-bold mb-4">
              Ready to <span className="gradient-text">Collaborate?</span>
            </h2>
            <p className="text-muted mb-8">
              Let's create something unforgettable together. Reach out for projects, collaborations, or just a conversation about voice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-10 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-medium text-white hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Get In Touch
              </Link>
              <a
                href="tel:+918939179351"
                className="px-10 py-4 border border-border rounded-full font-medium hover:bg-background hover:border-primary/50 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> +91 89391 79351
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
