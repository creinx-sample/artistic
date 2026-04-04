import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { works } from '../data/works';
import { Calendar, Clock, ArrowLeft, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AudiobookDetail({ setTrack }: { setTrack: (track: any) => void }) {
  const { id } = useParams();
  const work = works.find(w => w.id === id);
  const [slide, setSlide] = useState(0);

  const covers = [
    { src: '/shadows-front.png', label: 'Front Cover' },
    { src: '/shadows-back.png', label: 'Back Cover' },
  ];

  if (!work) {
    return (
      <div className="audiobook-detail-page" style={{ textAlign: 'center', padding: '10rem 5%' }}>
        <h2 className="section-title">Work not found</h2>
        <Link to="/portfolio" className="btn-outline" style={{ marginTop: '2rem' }}>Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="audiobook-detail-page">
      <section className="audiobook-hero">
        <div className="reveal">
          <Link to="/portfolio" className="subpage-back">
            <ArrowLeft size={16} />
            Back to Archives
          </Link>
          
          {/* Controlled Carousel */}
          <div className="audiobook-cover-wrap reveal d1" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="audiobook-wip-badge" style={{ zIndex: 10 }}>Work In Progress</div>
            
            {/* Active image */}
            <img
              key={covers[slide].src}
              src={covers[slide].src}
              alt={covers[slide].label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.4s ease' }}
            />

            {/* Left Arrow */}
            <button
              onClick={() => setSlide((s) => (s === 0 ? covers.length - 1 : s - 1))}
              style={{
                position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(200,150,74,0.4)',
                borderRadius: '50%', width: '2.5rem', height: '2.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', cursor: 'pointer', zIndex: 20,
                backdropFilter: 'blur(4px)', transition: 'background 0.2s'
              }}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => setSlide((s) => (s === covers.length - 1 ? 0 : s + 1))}
              style={{
                position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(200,150,74,0.4)',
                borderRadius: '50%', width: '2.5rem', height: '2.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold)', cursor: 'pointer', zIndex: 20,
                backdropFilter: 'blur(4px)', transition: 'background 0.2s'
              }}
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot Indicators */}
            <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 20 }}>
              {covers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  style={{
                    width: slide === i ? '18px' : '6px',
                    height: '6px',
                    borderRadius: '50px',
                    background: slide === i ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            {/* Slide label */}
            <div style={{ position: 'absolute', bottom: '2.8rem', left: 0, right: 0, textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', zIndex: 20 }}>
              {covers[slide].label}
            </div>
          </div>
        </div>

        <div className="audiobook-info reveal d2">
          <div className="section-label">Production Detail</div>
          <h1>{work.title}</h1>
          
          <div className="audiobook-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Calendar size={18} />
              <span>{work.year} PRODUCTION</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Clock size={18} />
              <span>RECORDING ACTIVE</span>
            </div>
          </div>

          <p className="about-bio" style={{ marginBottom: '3rem' }}>
            {work.description} This project is currently in the active production phase. We are meticulously refining the vocal texture and emotional resonance to match the artistic vision of the manuscript.
          </p>

          {work.audio ? (
            <div className="audiobook-player-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button 
                  className="play-btn-large"
                  onClick={() => setTrack({ url: work.audio, title: work.filename, subtitle: `${work.language} • Audiobooks` })}
                >
                  <Play fill="currentColor" />
                </button>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--cream)', marginBottom: '0.3rem' }}>Preview Draft</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Studio Quality • MP3</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="audiobook-player-card" style={{ opacity: 0.6 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>🎙 Audio Preview Coming Soon</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>Recording is currently in active production.</div>
            </div>
          )}

          <div className="wip-status-row reveal d3">
            <div className="wip-dot"></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.05em' }}>VOCAL SESSION LIVE</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '2px' }}>Recording latest chapters in the professional studio environment.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
