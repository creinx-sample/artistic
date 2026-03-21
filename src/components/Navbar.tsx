import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mic2, Headphones } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT ME', path: '/about' },
    { name: 'WORKS', path: '/portfolio' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <Mic2 className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="font-display text-xl font-bold">Suja Sambandam</h1>
              <p className="text-xs text-muted flex items-center gap-1">
                <Headphones className="w-3 h-3" /> Voice Artist
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group py-1"
              >
                <motion.span
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.15 }}
                  className={`text-sm font-medium transition-colors block ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.name}
                </motion.span>
                {/* Active indicator */}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  />
                )}
                {/* Hover underline (non-active) */}
                {location.pathname !== link.path && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground/20 origin-left"
                  />
                )}
              </Link>
            ))}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -5px rgba(139,92,246,0.4)' }}
              whileTap={{ scale: 0.96 }}
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-medium text-white transition-all inline-block"
            >
              Contact Me
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-card"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-lg ${
                      location.pathname === link.path ? 'text-primary' : 'text-foreground/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium mt-4"
              >
                Contact Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
