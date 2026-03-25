import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const [aboutIdx, setAboutIdx] = useState(0);
  const aboutImages = ['/images/suja1.jpg', '/images/suja2.png', '/images/suja3.png'];

  const [boutiqueIdx, setBoutiqueIdx] = useState(0);
  const boutiqueImages = [
    '/images/boutique/boutique_1.jpg',
    '/images/boutique/boutique_2.jpg',
    '/images/boutique/boutique_3.jpg',
    '/images/boutique/boutique_4.jpg'
  ];

  const nextAbout = () => setAboutIdx(prev => (prev + 1) % aboutImages.length);
  const prevAbout = () => setAboutIdx(prev => (prev - 1 + aboutImages.length) % aboutImages.length);
  
  const nextBoutique = () => setBoutiqueIdx(prev => (prev + 1) % boutiqueImages.length);
  const prevBoutique = () => setBoutiqueIdx(prev => (prev - 1 + boutiqueImages.length) % boutiqueImages.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setAboutIdx(prev => (prev + 1) % aboutImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBoutiqueIdx(prev => (prev + 1) % boutiqueImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-0">
      <section id="about" style={{ padding: '0 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '6rem', alignItems: 'start', maxWidth: '1200px', margin: '15rem auto 0' }}>
        <div className="about-frame reveal" style={{ maxWidth: '320px', justifySelf: 'center' }}>
          <div className="about-img-container" style={{ aspectRatio: '4/5' }}>
            {aboutImages.map((src, idx) => (
              <div 
                key={idx} 
                className={`about-slide ${idx === aboutIdx ? 'active' : ''}`}
                style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
              />
            ))}
            <div className="about-dots">
              {aboutImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`about-dot ${idx === aboutIdx ? 'active' : ''}`} 
                  onClick={() => setAboutIdx(idx)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>

            {/* Manual Controls */}
            <button onClick={prevAbout} className="carousel-control prev" style={{ left: '15px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button onClick={nextAbout} className="carousel-control next" style={{ right: '15px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
        
        <div>
          <div className="section-label reveal">Biographical Profile</div>
          <h2 className="section-title reveal d1">Suja <em>Sambandam</em></h2>
          <div className="reveal d2" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem', fontFamily: 'var(--fd)' }}>
            47yrs • Female • DOB: 15-09-1978
          </div>
          
          <p className="about-bio reveal d2">
            Professional voice artist dedicated to bringing scripts to life through tonal precision and emotional authenticity.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <h3 className="section-label reveal d3">Language Proficiency</h3>
            <div className="about-stats reveal d3" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
              <div><div className="stat-num" style={{ fontSize: '1.5rem' }}>English</div><div className="stat-label">Read, Write & Spoken</div></div>
              <div><div className="stat-num" style={{ fontSize: '1.5rem' }}>Hindi</div><div className="stat-label">Read & Spoken</div></div>
              <div><div className="stat-num" style={{ fontSize: '1.5rem' }}>Tamil</div><div className="stat-label">Read & Spoken</div></div>
              <div><div className="stat-num" style={{ fontSize: '1.5rem' }}>Malayalam</div><div className="stat-label">Spoken</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL SEPARATOR */}
      <div className="footer-cta" style={{ padding: '4rem 0', height: '120px' }}></div>

      <section id="journey" className="reveal d2" style={{ padding: '0 5%', maxWidth: '1200px', margin: '0 auto 8rem' }}>
        <div className="section-label">Professional Evolution</div>
        <h2 className="section-title">Career <em>Milestones</em></h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '6rem', marginTop: '4rem', alignItems: 'center' }}>
          <div className="about-bio">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '2rem', paddingLeft: '2rem', borderLeft: '2px solid var(--gold)' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '0.5rem', fontFamily: 'var(--fd)', fontSize: '1.5rem' }}>Garment Design Graduate</h4>
                <p>Foundational education in Garment Design, shaping a keen eye for detail and creative structure.</p>
              </li>
              <li style={{ marginBottom: '2rem', paddingLeft: '2rem', borderLeft: '2px solid var(--gold)' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '0.5rem', fontFamily: 'var(--fd)', fontSize: '1.5rem' }}>Export Merchandiser</h4>
                <p>Worked with leading Garment Export Manufacturing companies in Chennai & Bangalore, honing professional discipline.</p>
              </li>
              <li style={{ marginBottom: '2rem', paddingLeft: '2rem', borderLeft: '2px solid var(--gold)' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '0.5rem', fontFamily: 'var(--fd)', fontSize: '1.5rem' }}>Entrepreneurship: Surabhi Garments</h4>
                <p>Proprietress of "Surabhi Garments", a dedicated Garment Manufacturing & Finishing Unit.</p>
              </li>
              <li style={{ marginBottom: '2rem', paddingLeft: '2rem', borderLeft: '2px solid var(--gold)' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '0.5rem', fontFamily: 'var(--fd)', fontSize: '1.5rem' }}>Vyoma Boutique</h4>
                <p>Owned and managed "Vyoma", a retail boutique specializing in international and domestic clothing trends.</p>
              </li>
            </ul>
          </div>
          
          <div className="about-frame" style={{ maxWidth: '400px', justifySelf: 'center', width: '100%' }}>
            <div className="about-img-container" style={{ aspectRatio: '1/1', borderRadius: '30px' }}>
              {boutiqueImages.map((src, idx) => (
                <div 
                  key={idx} 
                  className={`about-slide ${idx === boutiqueIdx ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              ))}
              <div className="about-dots">
                {boutiqueImages.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`about-dot ${idx === boutiqueIdx ? 'active' : ''}`} 
                    onClick={() => setBoutiqueIdx(idx)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>

              {/* Manual Controls */}
              <button onClick={prevBoutique} className="carousel-control prev" style={{ left: '15px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button onClick={nextBoutique} className="carousel-control next" style={{ right: '15px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', marginTop: '1.5rem', opacity: 0.8 }}>
              Suja's creative journey in fashion design and boutique entrepreneurship.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '6rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link to="/portfolio" className="btn-primary">View Voice Portfolio</Link>
          <Link to="/contact" className="btn-outline">Contact Me</Link>
        </div>
      </section>
      
      {/* PROFESSIONAL TRANSITION SPACER */}
      <div style={{ height: '10rem' }}></div>
    </div>
  );
}
