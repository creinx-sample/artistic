import { useState } from 'react';
import { works, type Work } from '../data/works';

export default function Portfolio({ setTrack }: { setTrack: (track: any) => void }) {
  const [langFilter, setLangFilter] = useState<'all' | Work['language']>('all');

  const filteredWorks = works.filter((work) => {
    return langFilter === 'all' || work.language === langFilter;
  });

  const languages: Array<{ value: 'all' | Work['language']; label: string }> = [
    { value: 'all', label: 'All Voices' },
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Malayalam', label: 'Malayalam' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-0">
      <section id="portfolio" style={{ padding: '15rem 5% 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label reveal">Archives</div>
        <h2 className="section-title reveal d1" style={{ marginBottom: '4rem' }}>Formal Voice <em>Repertoire</em></h2>
        
        {/* Premium Filters */}
        <div className="reveal d2" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem' }}>
          {languages.map((l) => (
            <button
              key={l.value}
              onClick={() => setLangFilter(l.value)}
              className={`portfolio-filter ${langFilter === l.value ? 'active' : ''}`}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: langFilter === l.value ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '0 0 1rem 0',
                transition: 'all 0.4s ease',
                position: 'relative',
                fontFamily: 'var(--fb)'
              }}
            >
              {l.label}
              {langFilter === l.value && (
                <div style={{ position: 'absolute', bottom: '-1px', left: 0, width: '100%', height: '2px', background: 'var(--gold)' }} />
              )}
            </button>
          ))}
        </div>

        <div key={langFilter} className="file-list-container reveal d3">
          {filteredWorks.map((work) => (
            <div 
              key={work.id} 
              className="file-item"
              onClick={() => setTrack({ url: work.audio, title: work.filename, subtitle: `${work.language} • ${work.year}` })}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '2rem 0', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                gap: '2.5rem',
                animation: 'fadeInUp 0.5s ease forwards'
              }}
            >
              {/* Index/Play button */}
              <div className="file-play-icon" style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid rgba(200,150,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--gold)' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
              </div>

              {/* Filename (Primary) */}
              <div style={{ flex: '1' }}>
                <div className="file-name" style={{ 
                  fontFamily: 'var(--fd)', 
                  fontSize: '1.4rem', 
                  color: 'var(--cream)', 
                  letterSpacing: '0.03em',
                  marginBottom: '0.3rem',
                  transition: 'color 0.3s ease'
                }}>
                  {work.filename}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {work.language} &bull; {work.year}
                </div>
              </div>

              {/* Action */}
              <div className="listen-label" style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.5, transition: 'all 0.3s ease' }}>
                Listen Archive
              </div>
            </div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="reveal" style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ opacity: 0.5, letterSpacing: '0.1em' }}>No files found in this category.</p>
          </div>
        )}
      </section>
      <div style={{ height: '15rem' }}></div>
    </div>
  );
}
