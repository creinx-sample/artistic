import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <footer className="reveal">
      {!isContactPage && (
        <div className="footer-cta" style={{ padding: '8rem 5%', borderTop: '1px solid rgba(200,150,74,0.1)' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--gold-pale)' }}>Get In Touch</div>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Ready to <em>collaborate?</em></h2>
          <p style={{ opacity: 0.8, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>Whether it's a feature film, a brand commercial, or an experimental podcast — I'd love to hear your vision.</p>
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:sujavagishwari.voiceartist@gmail.com" className="btn-primary">Connect via Email</a>
            <a href="https://instagram.com" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'var(--cream)' }}>Instagram</a>
          </div>
        </div>
      )}

      <div className="footer-bottom" style={{ padding: '3rem 5%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to="/" className="footer-logo">𝄞 SujaVoices</Link>
        <div className="footer-copy" style={{ textAlign: 'right' }}>
          &copy; {new Date().getFullYear()} Suja Sambandam. All rights reserved. <br />
          <span style={{ opacity: 0.4, fontSize: '0.75rem' }}>Crafted with passion for voice</span>
        </div>
        <div className="dev-watermark">
          Developed by <strong>Creinx</strong>
        </div>
      </div>
    </footer>
  );
}
