import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroVisualizer from '../components/HeroVisualizer';

const SYMBOLS = ['♩', '♪', '♫', '♬', '♭', '♯'];

export default function Home() {
  const [heroNotes, setHeroNotes] = useState<{ id: number; symbol: string; left: string; size: string; duration: string; delay: string }[]>([]);
  const [particles, setParticles] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    // Hero notes
    const notes = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      left: `${Math.random() * 100}%`,
      size: `${0.9 + Math.random() * 1.2}rem`,
      duration: `${10 + Math.random() * 14}s`,
      delay: `${Math.random() * 10}s`
    }));
    setHeroNotes(notes);

    // Particles
    const parts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 4}px`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `${Math.random() * 10}s`
    }));
    setParticles(parts);

    // Intersection observer for counters
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.target || '0');
          const suffix = el.dataset.suffix || '';
          let t0: number | null = null;
          const dur = 1800;
          
          const step = (ts: number) => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 4);
            el.textContent = Math.floor(ease * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target + suffix;
          };
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const [aboutIdx, setAboutIdx] = useState(0);
  const aboutImages = ['/images/suja1.jpg', '/images/suja2.png', '/images/suja3.png'];

  useEffect(() => {
    const timer = setInterval(() => {
      setAboutIdx(prev => (prev + 1) % aboutImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      
      {/* HERO */}
      <section id="hero">
        <div className="hero-bg"></div>
        <div className="hero-particles">
          {particles.map(p => (
            <div 
              key={p.id} 
              className="particle" 
              style={{ left: p.left, width: p.size, height: p.size, animationDuration: p.duration, animationDelay: p.delay }} 
            />
          ))}
        </div>
        <div id="heroNotes">
          {heroNotes.map(n => (
            <div 
              key={n.id} 
              className="staff-note" 
              style={{ left: n.left, fontSize: n.size, animationDuration: n.duration, animationDelay: n.delay }}
            >
              {n.symbol}
            </div>
          ))}
        </div>
        <div className="clef-wm" style={{ right: '3%', top: '50%', transform: 'translateY(-50%)' }}>♬</div>

        <div className="hero-glow-lines">
          <div className="glow-line gl-1"></div>
          <div className="glow-line gl-2"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-wave" style={{ gap: '3px' }}>
              {[30, 70, 45, 90, 40, 60].map((h, i) => (
                <div key={i} className="bw-line" style={{ height: `${h}%`, width: '3px', background: 'var(--gold)', borderRadius: '1px' }}></div>
              ))}
            </div>
            <span className="badge-text-gold">Professional Voice Artist</span>
          </div>
          
          <h1 className="hero-title">
            <span className="name-first">Suja</span>
            <span className="accent">Sambandam</span>
          </h1>
          
          <p className="hero-desc">
            Professional Voice Artist specializing in dubbing and podcasting across Tamil, Hindi, English, and Malayalam. Bringing characters to life with authenticity and precision.
          </p>
          
          <div className="hero-actions">
            <Link to="/portfolio" className="btn-primary">
              <span style={{ fontSize: '1.2rem' }}>▶</span> Explore My Work <span>→</span>
            </Link>
            <Link to="/contact" className="btn-outline">Get In Touch</Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="soundwave-container">
            <div className="soundwave-ring"></div>
            <div className="soundwave-ring"></div>
            <div className="soundwave-ring"></div>
            <div className="mic-icon">🎙️</div>
          </div>
        </div>

        <svg className="hero-wave-svg" height="120" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path className="hw" d="M0,60 C150,20 300,100 450,50 C600,10 750,90 900,55 C1050,20 1150,70 1200,60" />
          <path className="hw" d="M0,70 C200,30 400,110 600,60 C800,20 1000,80 1200,70" style={{ opacity: 0.6 }} />
          <path className="hw" d="M0,50 C250,90 500,20 750,65 C900,90 1100,40 1200,50" style={{ opacity: 0.4 }} />
        </svg>
        <div className="hero-scroll">
          <div className="mouse-icon">
            <div className="mouse-wheel"></div>
          </div>
        </div>
        <HeroVisualizer />
      </section>

      {/* MARQUEE */}
      <div className="marquee-strip">
        <div className="marquee-inner">
          {['Hindi Dubbing', 'English Narration', 'Tamil Storytelling', 'Malayalam Podcasts', 'Voice Acting', 'Audiobooks', 'OTT Content', 'E-Learning', 'Hindi Dubbing', 'English Narration', 'Tamil Storytelling', 'Malayalam Podcasts', 'Voice Acting', 'Audiobooks', 'OTT Content', 'E-Learning'].map((x, i) => (
            <span key={i} className="mq-item">
              {x}<span className="mq-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="about-frame reveal">
          <div className="about-img-container">
            {aboutImages.map((src, idx) => (
              <div 
                key={idx} 
                className={`about-slide ${idx === aboutIdx ? 'active' : ''}`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
            <div className="about-dots">
              {aboutImages.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`about-dot ${idx === aboutIdx ? 'active' : ''}`}
                  onClick={() => setAboutIdx(idx)}
                />
              ))}
            </div>
            <button className="carousel-control prev" onClick={() => setAboutIdx((prev) => (prev - 1 + aboutImages.length) % aboutImages.length)}>
              <span>‹</span>
            </button>
            <button className="carousel-control next" onClick={() => setAboutIdx((prev) => (prev + 1) % aboutImages.length)}>
              <span>›</span>
            </button>
          </div>
        </div>
        <div>
          <div className="section-label reveal">About Me</div>
          <h2 className="section-title reveal d1">The voice<br />behind <em>the story</em></h2>
          <p className="about-bio reveal d2">I'm <strong>Suja Sambandam</strong>, a professional voice artist dedicated to bringing scripts to life. Trained in the nuances of four languages, I bring <strong>tonal precision and emotional authenticity</strong> to every project, recorded from my professional studio with high-grade gear.</p>
          <div className="reveal d3" style={{ marginTop: '2rem' }}>
            <Link to="/about" className="btn-primary">Read Full Profile</Link>
          </div>
        </div>
      </section>

      <div className="musical-divider"><div className="divider-line"></div><span className="divider-note">𝅘𝅥𝅮</span><span className="divider-note" style={{ fontSize: '1rem' }}>♩</span><span className="divider-note">♬</span><span className="divider-note" style={{ fontSize: '1rem' }}>♩</span><span className="divider-note">𝅘𝅥𝅮</span><div className="divider-line"></div></div>

      {/* LANGUAGES */}
      <section id="languages">
        <div className="lang-header">
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>My Languages</div>
          <h2 className="section-title reveal d1">Four tongues,<br /><em>one voice</em></h2>
        </div>
        <div className="lang-grid">
          <Link to="/hindi" className="lang-card reveal" style={{ textDecoration: 'none' }}><div className="lang-num">01</div><span className="lang-script">हिन्दी</span><div className="lang-name">Hindi</div><div className="lang-desc">50+ Works in dubbing and narrative storytelling. Bringing classic and contemporary characters to life.</div><div className="lang-tags"><span className="lang-tag">Dubbing</span><span className="lang-tag">Podcast</span><span className="lang-tag">Narration</span></div><div className="lang-arrow">→</div></Link>
          <Link to="/english" className="lang-card reveal d1" style={{ textDecoration: 'none' }}><div className="lang-num">02</div><span className="lang-script">English</span><div className="lang-name">English</div><div className="lang-desc">40+ Works with a neutral international accent. Delivering clarity and engagement in every project.</div><div className="lang-tags"><span className="lang-tag">Dubbing</span><span className="lang-tag">Podcast</span><span className="lang-tag">Audiobook</span></div><div className="lang-arrow">→</div></Link>
          <Link to="/tamil" className="lang-card reveal d2" style={{ textDecoration: 'none' }}><div className="lang-num">03</div><span className="lang-script">தமிழ்</span><div className="lang-name">Tamil</div><div className="lang-desc">35+ Works in film dubbing and cultural storytelling. Authenticity celebrating the beauty of the language.</div><div className="lang-tags"><span className="lang-tag">Dubbing</span><span className="lang-tag">Podcast</span><span className="lang-tag">Cinema</span></div><div className="lang-arrow">→</div></Link>
          <Link to="/malayalam" className="lang-card reveal d3" style={{ textDecoration: 'none' }}><div className="lang-num">04</div><span className="lang-script">മലയാളം</span><div className="lang-name">Malayalam</div><div className="lang-desc">30+ Works capturing the melodic essence of the language. Connecting with audiences from Keralam.</div><div className="lang-tags"><span className="lang-tag">Dubbing</span><span className="lang-tag">Podcast</span><span className="lang-tag">Documentary</span></div><div className="lang-arrow">→</div></Link>
        </div>
      </section>
    </div>
  );
}
