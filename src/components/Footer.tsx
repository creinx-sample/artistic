import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  const languages = [
    { name: 'Hindi', path: '/hindi', color: 'var(--gold)' },
    { name: 'English', path: '/english', color: 'var(--cream)' },
    { name: 'Tamil', path: '/tamil', color: 'var(--gold-pale)' },
    { name: 'Malayalam', path: '/malayalam', color: 'var(--cream)' },
  ];

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/sujavagishwari78voiceartist?utm_source=qr&igsh=MWtva2JuNTM5eGU3ag==', label: 'Instagram' },
  ];

  return (
    <footer style={{ background: 'var(--dark)', position: 'relative', zIndex: 2, paddingBottom: '2rem' }}>
      {/* Ready to Collaborate CTA */}
      {!isContactPage && (
        <div className="footer-cta" style={{ padding: '4rem 5%', borderTop: '1px solid rgba(200,150,74,0.1)' }}>
          <div className="section-label" style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold-pale)' }}>Get In Touch</div>
          <h2 className="section-title" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Ready to <em>collaborate?</em></h2>
          <p style={{ opacity: 0.8, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', textAlign: 'center', color: 'var(--cream)' }}>Whether it's a feature film, a brand commercial, or an experimental podcast — I'd love to hear your vision.</p>
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:sujavagishwari.voiceartist@gmail.com" className="btn-primary">Connect via Email</a>
            <a href="https://www.instagram.com/sujavagishwari78voiceartist?utm_source=qr&igsh=MWtva2JuNTM5eGU3ag==" target="_blank" rel="noopener noreferrer" className="btn-white">
              <Instagram size={16} />
              Instagram
            </a>
          </div>
        </div>
      )}

      {/* 4-Column Footer Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 5%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="footer-grid-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '4rem' }}>
          
          {/* Column 1: Brand & Attributions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', textDecoration: 'none' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--cream)', margin: 0, letterSpacing: '0.05em' }}>Suja Sambandam</h3>
              </div>
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
              {socials.map((social) => (
                <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -2, scale: 1.1 }} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', background: 'rgba(200,150,74,0.15)', border: '1px solid rgba(200,150,74,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>

            <div style={{ opacity: 0.5, fontSize: '0.75rem', letterSpacing: '0.05em', color: '#fff', lineHeight: 1.5, marginTop: 'auto' }}>
              &copy; {new Date().getFullYear()} Suja Sambandam.<br />Portfolio & Voice Archives.
            </div>
          </div>

          {/* Column 2: Languages */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--cream)', marginBottom: '1.5rem' }}>Languages</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {languages.map((lang) => (
                <Link key={lang.name} to={lang.path} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'var(--cream)', opacity: 0.8, fontSize: '0.85rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: lang.color }}></span>
                  {lang.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--cream)', marginBottom: '1.5rem' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/" style={{ color: 'var(--cream)', opacity: 0.8, fontSize: '0.85rem', textDecoration: 'none' }}>Home</Link>
              <Link to="/about" style={{ color: 'var(--cream)', opacity: 0.8, fontSize: '0.85rem', textDecoration: 'none' }}>About</Link>
              <Link to="/portfolio" style={{ color: 'var(--cream)', opacity: 0.8, fontSize: '0.85rem', textDecoration: 'none' }}>Audiobooks</Link>
              <Link to="/contact" style={{ color: 'var(--cream)', opacity: 0.8, fontSize: '0.85rem', textDecoration: 'none' }}>Hire Me</Link>
            </div>
          </div>

          {/* Column 4: Location & Contact */}
          <div>
             <h4 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--cream)', marginBottom: '1.5rem' }}>Location</h4>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--cream)', opacity: 0.8, fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Mail size={16} color="var(--gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <a href="mailto:sujavagishwari.voiceartist@gmail.com" style={{ fontSize: '0.75rem', wordBreak: 'break-all', lineHeight: 1.5, color: 'inherit', textDecoration: 'none' }}>sujavagishwari.voiceartist@gmail.com</a>
                </div>
                <a href="https://wa.me/918939179351" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                  <Phone size={16} color="var(--gold)" />
                  <span>+91 89391 79351</span>
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                 <MapPin size={16} color="var(--gold)" />
                 <span>Chennai, India</span>
               </div>
             </div>
          </div>

        </div>

        {/* Absolute Centered Bottom Attribution */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
          <div className="dev-watermark" style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5, marginRight: '10px', color: '#fff' }}>DESIGNED BY</span>
            <a href="https://www.creinx.com/" target="_blank" rel="noopener noreferrer" className="creinx-link">
              Crienx
              <div className="creinx-bars">
                <div className="creinx-bar" style={{ animationDelay: '0s' }}></div>
                <div className="creinx-bar" style={{ animationDelay: '0.2s' }}></div>
                <div className="creinx-bar" style={{ animationDelay: '0.1s' }}></div>
                <div className="creinx-bar" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
