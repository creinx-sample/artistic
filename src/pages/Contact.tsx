import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Clear form
    setFormState({
      name: '',
      email: '',
      service: '',
      message: '',
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen pt-32 pb-0" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="contact-bg-glow" style={{ top: '20%', right: '10%' }}></div>
      <div className="contact-bg-glow" style={{ bottom: '10%', left: '5%' }}></div>
      
      <div className="contact-accent" style={{ top: '15%', left: '8%', animationDelay: '0s' }}>𝄞</div>
      <div className="contact-accent" style={{ top: '40%', right: '12%', animationDelay: '1s', fontSize: '1.5rem' }}>♭</div>
      <div className="contact-accent" style={{ bottom: '25%', left: '15%', animationDelay: '2s' }}>♯</div>
      <div className="contact-accent" style={{ bottom: '15%', right: '25%', animationDelay: '0.5s', fontSize: '1.2rem' }}>𝄢</div>

      <section id="contact" style={{ padding: '15rem 3% 2rem', maxWidth: '100%', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', width: '100%' }}>
          <div className="reveal">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title d1" style={{ marginBottom: '1.5rem' }}>Ready to <em>collaborate?</em></h2>
            
            <p className="about-bio d2" style={{ fontSize: '1.2rem', opacity: 0.9, width: '100%' }}>
              Whether you have a script ready for dubbing, a podcast idea that needs a voice, or just want to discuss a creative project — my door is always open.
            </p>
          </div>

          <div className="contact-grid-system">
            <div className="reveal d2" style={{ width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', width: '100%' }}>
                <div className="contact-glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '180px' }}>
                  <div className="section-label" style={{ marginBottom: '1.2rem', fontSize: '0.75rem' }}>Email Me</div>
                  <div className="contact-card-value" style={{ fontSize: '1.4rem' }}>sujavagishwari.voiceartist@gmail.com</div>
                </div>
                <div className="contact-glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '180px' }}>
                  <div className="section-label" style={{ marginBottom: '1.2rem', fontSize: '0.75rem' }}>Call / WhatsApp</div>
                  <div className="contact-card-value" style={{ fontSize: '1.8rem' }}>+91 89391 79351</div>
                </div>
                <div className="contact-glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '180px' }}>
                  <div className="section-label" style={{ marginBottom: '1.2rem', fontSize: '0.75rem' }}>Location</div>
                  <div className="contact-card-value" style={{ fontSize: '1.8rem' }}>Chennai, Tamil Nadu</div>
                </div>
              </div>
            </div>

            <div className="reveal d3" style={{ width: '100%' }}>
              <div className="contact-glass-card" style={{ padding: '4rem' }}>
                <form 
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.2rem' }}>
                    <input 
                      type="text" 
                      placeholder="Name" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="contact-input"
                    />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="contact-input"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Service (e.g. Hindi Dubbing)" 
                    value={formState.service}
                    onChange={(e) => setFormState({...formState, service: e.target.value})}
                    className="contact-input"
                  />
                  <textarea 
                    placeholder="Tell me about your project..." 
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="contact-input"
                    style={{ resize: 'none' }}
                  />
                  <button 
                    type="submit" 
                    className={`btn-primary ${submitted ? 'btn-success' : ''}`} 
                    style={{ width: '100%', justifyContent: 'center', height: '3.5rem', fontSize: '1.1rem' }}
                  >
                    {submitted ? '✓ Message Sent Successfully!' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div style={{ height: '10rem' }}></div>
    </div>
  );
}
