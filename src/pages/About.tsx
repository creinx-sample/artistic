import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic2, Headphones, Film, Globe, Heart, Music, ArrowRight, Instagram, Mail, Phone, Languages 
} from 'lucide-react';
import AudioWave from '../components/AudioWave';
import ScrollReveal from '../components/ScrollReveal';


export default function About() {
  const carouselPhotos = [
    { src: '/images/suja_studio.jpg', alt: 'Suja in the recording studio' },
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

  const languages = [
    { name: 'English', icon: Globe, level: 100, desc: 'Read, Speak & Write — Professional international neutral accent.' },
    { name: 'Hindi', icon: Mic2, level: 90, desc: 'Read & Speak — Fluent in dubbing, radio, and brand narration.' },
    { name: 'Tamil', icon: Languages, level: 90, desc: 'Read & Speak — Native fluency with deep emotional range.' },
    { name: 'Malayalam', icon: Headphones, level: 80, desc: 'Speak — Proficient in film dubbing and regional storytelling.' },
  ];

  const skills = [
    { icon: Film, label: 'Film & TV Dubbing' },
    { icon: Headphones, label: 'Podcast Narration' },
    { icon: Mic2, label: 'Voice Over' },
    { icon: Globe, label: 'Multilingual Storytelling' },
    { icon: Music, label: 'Audio Branding' },
    { icon: Heart, label: 'Character Animation' },
  ];



  return (
    <div className="min-h-screen pt-24">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
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
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-card shadow-2xl border-4 border-primary">
                <img
                  src="/images/suja_studio.jpg"
                  alt="Suja Sambandam - Voice Artist"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-secondary/10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
              </div>


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
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
                Suja Sambandam
              </h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm font-body italic opacity-80 border-b border-border pb-4">
                <span>47 Years</span>
                <span>Female</span>
                <span>DOB: 15-09-1978</span>
              </div>
              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed text-justify">
                <p>
                  I am <span className="text-primary font-bold">Suja Sambandam</span>, a voice artist whose career has been a tapestry of creative expression. My professional journey began in the world of fashion, where I graduated in Garment Design and spent years working with leading export manufacturing companies in Chennai and Bangalore.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-4 italic text-lg opacity-90 text-justify">
                  With a degree in Garment Design and over a decade of experience as a Merchandiser and business owner of "Surabhi Garments" and "Vyoma Boutique," I bring a unique perspective of international trends and meticulous craftsmanship to the world of voice artistry.
                </p>
              </div>



              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="vibrant-btn flex items-center gap-2"
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
      <section className="py-20 bg-slate-50 border-y border-border">
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
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <lang.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display text-xl font-bold">{lang.name}</h3>
                        <span className="text-sm text-primary font-medium">{lang.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden border border-primary/20">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(74,20,140,0.3)]"
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



      {/* ── Creative Ventures (Boutique) ─────────────── */}
      <section className="py-24 bg-slate-50 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <ScrollReveal variant="zoom">
              <span className="text-primary font-display tracking-widest text-sm mb-4 block text-center">Entrepreneurship</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-center">Creative <span className="gradient-text">Ventures</span></h2>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              <ScrollReveal direction="right" className="col-span-2 relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video bg-card">
                  <img src="/images/boutique_exterior.png" alt="Boutique Exterior" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2} className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-square bg-card">
                  <img src="/images/boutique_1.jpg" alt="Interior Detail" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.4} className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-square bg-card">
                  <img src="/images/boutique_2.jpg" alt="Boutique Racks" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.6} className="col-span-2 relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-video bg-card">
                  <img src="/images/boutique_3.jpg" alt="Boutique Interior View" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left">
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>
                  Beyond the microphone, my passion for aesthetics leads me into the world of fashion and curated style. My journey reflects a deep appreciation for textile craftsmanship and international trends.
                </p>
                <p>
                  My boutique is a curated space where traditional craftsmanship meets modern silhouettes. From vibrant ethnic wear to contemporary designs, every piece is selected to celebrate individuality and grace.
                </p>
                <p className="font-medium text-purple-900 italic">
                  "Fashion is another form of voice—one that speaks through color, fabric, and design."
                </p>
                <div className="pt-6">
                  <Link to="/contact" className="vibrant-btn inline-block">
                    Inquire for Designs
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────── */}
      <section className="py-20 bg-white border-t border-border">
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
                className="px-10 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-display uppercase tracking-widest text-white hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-2"
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
