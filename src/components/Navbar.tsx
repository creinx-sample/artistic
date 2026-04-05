import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Works', path: '/portfolio' },
    { name: 'Audiobooks', path: '/audiobooks' },
  ];

  return (
    <>
      {/* ── Navbar ── */}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/" className="nav-logo">
              <div className="mic-circle">🎙️</div>
              <div className="logo-text">
                <span className="logo-name">Suja Sambandam</span>
                <span className="logo-tagline">Voice Artist</span>
              </div>
            </Link>
          </div>

          <div className="nav-right">
            <div className="nav-links">
              {navLinks.map((link) => (
                <a key={link.path} href={link.path} className="nav-link">
                  {link.name}
                </a>
              ))}
            </div>

            <Link to="/contact" className="nav-cta">Contact Me</Link>

            {/* Hamburger toggle */}
            <div
              className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu — OUTSIDE <nav> so position:fixed works from viewport ── */}
      {isMenuOpen && (
        <div className="mob-menu open">
          {/* Close ✕ */}
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute', top: '1.2rem', right: '1.2rem',
              background: 'none', border: '1px solid rgba(200,150,74,0.3)',
              borderRadius: '50%', width: '2.2rem', height: '2.2rem',
              color: 'var(--gold)', fontSize: '1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>

          {/* Nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="mob-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Contact Me */}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            style={{
              marginTop: '1rem',
              padding: '0.7rem 2.2rem',
              background: 'var(--gold)',
              color: 'var(--dark)',
              borderRadius: '50px',
              fontSize: '0.78rem',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textDecoration: 'none',
            }}
          >
            Contact Me
          </Link>
        </div>
      )}
    </>
  );
}
