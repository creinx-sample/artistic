import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicalCursor from './components/MusicalCursor';
import AudioPlayer from './components/AudioPlayer';
import { Mic2, Headphones, Film, Globe } from 'lucide-react';

import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Audiobooks from './pages/Audiobooks';
import LanguagePage from './pages/LanguagePage';
import Contact from './pages/Contact';
import AudiobookDetail from './pages/AudiobookDetail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageRoutes({ setTrack }: { setTrack: (track: any) => void }) {
  const location = useLocation();
  
  // Reveal observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio setTrack={setTrack} />} />
      <Route
        path="/hindi"
        element={
          <LanguagePage
            language="Hindi"
            gradient="from-[#ef4444] to-transparent"
            description="Experience the richness of Hindi voice artistry. Explore my extensive work in India's most widely spoken language."
            icon={Mic2}
            setTrack={setTrack}
          />
        }
      />
      <Route
        path="/english"
        element={
          <LanguagePage
            language="English"
            gradient="from-[#3b82f6] to-transparent"
            description="Professional English voice work for global audiences. Delivering clarity and engagement in every project."
            icon={Globe}
            setTrack={setTrack}
          />
        }
      />
      <Route
        path="/tamil"
        element={
          <LanguagePage
            language="Tamil"
            gradient="from-[#22c55e] to-transparent"
            description="Authentic Tamil voice artistry celebrating the beauty of this ancient language. Bringing stories to life for Tamil audiences."
            icon={Film}
            setTrack={setTrack}
          />
        }
      />
      <Route
        path="/malayalam"
        element={
          <LanguagePage
            language="Malayalam"
            gradient="from-[#f59e0b] to-transparent"
            description="Capturing the melodic essence of Malayalam in every project. Connecting with audiences from God's Own Country."
            icon={Headphones}
            setTrack={setTrack}
          />
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/audiobooks" element={<Audiobooks />} />
      <Route path="/audiobook/:id" element={<AudiobookDetail setTrack={setTrack} />} />
    </Routes>
  );
}

function App() {
  const [activeTrack, setActiveTrack] = useState<{ url: string; title: string; subtitle: string } | null>(null);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 leading-relaxed tracking-normal">
        <ScrollToTop />
        <MusicalCursor />
        <Navbar />
        <main className="relative" style={{ zIndex: 1 }}>
          <PageRoutes setTrack={setActiveTrack} />
        </main>
        <Footer />
        <AudioPlayer track={activeTrack} onClose={() => setActiveTrack(null)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
