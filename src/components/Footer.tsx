import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic2, Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function Footer() {
  const languages = [
    { name: 'Hindi', path: '/hindi', color: 'text-hindi' },
    { name: 'English', path: '/english', color: 'text-english' },
    { name: 'Tamil', path: '/tamil', color: 'text-tamil' },
    { name: 'Malayalam', path: '/malayalam', color: 'text-malayalam' },
  ];

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/', label: 'Instagram' },
  ];

  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Mic2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Suja Sambandam</h3>
                <p className="text-xs text-muted">Voice Artist</p>
              </div>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Professional voice artist specializing in dubbing and podcasting across four languages. Bringing stories to life through the power of voice.
            </p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-border/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Languages</h4>
            <ul className="space-y-3">
              {languages.map((lang) => (
                <li key={lang.path}>
                  <Link
                    to={lang.path}
                    className={`text-muted hover:${lang.color} transition-colors flex items-center gap-2 group`}
                  >
                    <span className={`w-2 h-2 rounded-full bg-current opacity-50 group-hover:opacity-100 ${lang.color}`} />
                    {lang.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Portfolio', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : link === 'About' ? '/about' : `/${link.toLowerCase()}`}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted">Email</p>
                  <a href="mailto:sujavagishwari.voiceartist@gmail.com" className="hover:text-primary transition-colors">
                    sujavagishwari.voiceartist@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted">Phone</p>
                  <a href="tel:+918939179351" className="hover:text-primary transition-colors">
                    +91 89391 79351
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted">Location</p>
                  <p>Chennai, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Suja Sambandam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-sm text-muted hover:text-primary transition-colors">
              Hire Me
            </Link>
            <span className="text-border">|</span>
            <p className="text-sm text-muted">Crafted with passion for voice</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
