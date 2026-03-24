import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Me', path: '/about' },
    { name: 'Works', path: '/portfolio' },
  ];

  return (
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
          {/* Desktop Nav Links moved to right */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`nav-link`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <Link to="/contact" className="nav-cta">Contact Me</Link>
          
          {/* Mobile Toggle */}
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

      {/* Mobile Menu */}
      <div className={`mob-menu ${isMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        <Link 
          to="/contact" 
          className="nav-cta" 
          style={{ marginTop: '1rem', display: 'inline-block' }}
          onClick={() => setIsMenuOpen(false)}
        >
          Contact Me
        </Link>
      </div>
    </nav>
  );
}
