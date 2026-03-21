import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle, Mic2, Headphones, Film, MessageSquare } from 'lucide-react';
import AudioWave from '../components/AudioWave';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: '',
    language: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const services = [
    { value: 'dubbing', label: 'Film/TV Dubbing', icon: Film },
    { value: 'podcast', label: 'Podcast Recording', icon: Headphones },
    { value: 'voiceover', label: 'Voice Over', icon: Mic2 },
    { value: 'other', label: 'Other', icon: MessageSquare },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'sujavagishwari.voiceartist@gmail.com', href: 'mailto:sujavagishwari.voiceartist@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 89391 79351', href: 'tel:+918939179351' },
    { icon: MapPin, label: 'Location', value: 'Chennai, India', href: '#' },
    { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: '#' },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AudioWave className="justify-center mb-6" barCount={7} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
              className="font-display text-5xl md:text-7xl font-bold mb-6"
            >
              Let's <span className="gradient-text">Connect</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="text-xl text-muted"
            >
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="font-display text-3xl font-bold mb-4">Get In Touch</h2>
                <p className="text-muted">
                  Ready to bring your project to life with professional voice artistry? Reach out and let's discuss how I can help.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary group-hover:to-secondary transition-all">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-muted">{item.label}</p>
                      <p className="font-medium group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Languages Available */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-lg font-semibold mb-4">Languages Available</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Hindi', color: 'bg-hindi' },
                    { name: 'English', color: 'bg-english' },
                    { name: 'Tamil', color: 'bg-tamil' },
                    { name: 'Malayalam', color: 'bg-malayalam' },
                  ].map((lang) => (
                    <span
                      key={lang.name}
                      className="px-4 py-2 rounded-full bg-card-hover border border-border text-sm flex items-center gap-2"
                    >
                      <span className={`w-2 h-2 rounded-full ${lang.color}`} />
                      {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl" />
                <form
                  onSubmit={handleSubmit}
                  className="relative bg-card rounded-3xl border border-border p-8 md:p-10"
                >
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted">I'll get back to you within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <>
                      <h3 className="font-display text-2xl font-bold mb-8">Send a Message</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Your Name</label>
                          <input
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address</label>
                          <input
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-3">Service Required</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {services.map((service) => (
                            <button
                              key={service.value}
                              type="button"
                              onClick={() => setFormState({ ...formState, service: service.value })}
                              className={`p-4 rounded-xl border text-center transition-all ${
                                formState.service === service.value
                                  ? 'bg-gradient-to-br from-primary to-secondary border-transparent text-white'
                                  : 'bg-background border-border hover:border-primary/50'
                              }`}
                            >
                              <service.icon className="w-5 h-5 mx-auto mb-2" />
                              <span className="text-xs font-medium">{service.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Preferred Language</label>
                        <select
                          value={formState.language}
                          onChange={(e) => setFormState({ ...formState, language: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                        >
                          <option value="">Select a language</option>
                          <option value="hindi">Hindi</option>
                          <option value="english">English</option>
                          <option value="tamil">Tamil</option>
                          <option value="malayalam">Malayalam</option>
                          <option value="multiple">Multiple Languages</option>
                        </select>
                      </div>

                      <div className="mb-8">
                        <label className="block text-sm font-medium mb-2">Project Details</label>
                        <textarea
                          required
                          rows={5}
                          value={formState.message}
                          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                          placeholder="Tell me about your project, timeline, and any specific requirements..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-medium text-white flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-primary/30 transition-all"
                      >
                        <Send className="w-5 h-5" />
                        Send Message
                      </motion.button>
                    </>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
