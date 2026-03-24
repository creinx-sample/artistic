import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getWorksByLanguage, type Work } from '../data/works';

interface LanguagePageProps {
  language: Work['language'];
  gradient: string;
  description: string;
  icon: any; // Simplified for this refactor
}

export default function LanguagePage({ language, description }: LanguagePageProps) {
  const [filter, setFilter] = useState<'all' | 'dubbing' | 'podcast'>('all');
  const works = getWorksByLanguage(language);
  
  const filteredWorks = filter === 'all' 
    ? works 
    : works.filter(work => work.type === filter);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <section style={{ padding: '0' }}>
        <div className="reveal">
          <Link to="/" className="nav-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="section-label reveal d1">{language} Portfolio</div>
        <h2 className="section-title reveal d2">Capturing the <em>essence</em> of {language}</h2>
        
        <div className="reveal d3">
          <p className="about-bio" style={{ maxWidth: '800px', marginBottom: '3rem' }}>
            {description}
          </p>
        </div>

        {/* Filters */}
        <div className="reveal d4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
            {['all', 'dubbing', 'podcast'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`nav-link ${filter === f ? 'active' : ''}`}
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', textTransform: 'capitalize' }}
              >
                {f === 'all' ? `All (${works.length})` : f}
              </button>
            ))}
          </div>
        </div>

        <div className="works-grid">
          {filteredWorks.map((work, i) => (
            <div 
              key={work.id} 
              className={`work-card reveal d${(i % 4) + 1}`}
            >
              <div className="work-img">
                <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span style={{ fontSize: '2rem', opacity: 0.2 }}>{work.type === 'dubbing' ? '🎬' : '🎙️'}</span>
                </div>
              </div>
              <div className="work-info">
                <div className="work-meta">
                  <span className="work-tag">{work.type}</span>
                </div>
                <h3 className="work-title">{work.title}</h3>
                <div className="work-play">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Listen</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal d4" style={{ marginTop: '8rem', textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.03)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Want a custom <em>sample?</em></h3>
          <p style={{ opacity: 0.6, marginBottom: '2.5rem', maxWidth: '500px', marginInline: 'auto' }}>
            I can record a personalized sample for your script in {language} within 24 hours.
          </p>
          <Link to="/contact" className="btn-primary" style={{ marginInline: 'auto' }}>
            Request Sample
          </Link>
        </div>
      </section>
    </div>
  );
}
