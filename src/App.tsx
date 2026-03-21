import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import InitialLoader from './components/InitialLoader';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import LanguagePage from './pages/LanguagePage';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const pageVariants = {
  initial: { opacity: 0, y: 30, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(3px)',
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
};

// Dark neutral overlay — just a brief flash of the background color
const overlayVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 0.85, 0.85, 0],
    transition: { duration: 0.55, times: [0, 0.35, 0.6, 1], ease: 'easeInOut' as const },
  },
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      className="fixed inset-0 z-[9999] bg-background pointer-events-none"
    />
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route
          path="/hindi"
          element={
            <PageTransition>
              <LanguagePage
                language="Hindi"
                color="bg-hindi"
                gradient="from-hindi to-orange-600"
                description="Experience the richness of Hindi voice artistry. Explore my extensive work in India's most widely spoken language."
                icon="🇮🇳"
              />
            </PageTransition>
          }
        />
        <Route
          path="/english"
          element={
            <PageTransition>
              <LanguagePage
                language="English"
                color="bg-english"
                gradient="from-english to-blue-600"
                description="Professional English voice work for global audiences. Delivering clarity and engagement in every project."
                icon="🌍"
              />
            </PageTransition>
          }
        />
        <Route
          path="/tamil"
          element={
            <PageTransition>
              <LanguagePage
                language="Tamil"
                color="bg-tamil"
                gradient="from-tamil to-emerald-600"
                description="Authentic Tamil voice artistry celebrating the beauty of this ancient language. Bringing stories to life for Tamil audiences."
                icon="🎭"
              />
            </PageTransition>
          }
        />
        <Route
          path="/malayalam"
          element={
            <PageTransition>
              <LanguagePage
                language="Malayalam"
                color="bg-malayalam"
                gradient="from-malayalam to-amber-600"
                description="Capturing the melodic essence of Malayalam in every project. Connecting with audiences from God's Own Country."
                icon="🌴"
              />
            </PageTransition>
          }
        />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20">
        <AnimatePresence mode="wait">
          {isAppLoading ? (
            <InitialLoader key="loader" onComplete={() => setIsAppLoading(false)} />
          ) : (
            <motion.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ScrollToTop />
              <div className="noise-overlay" />
              <AnimatedBackground />
              <Navbar />
              <main className="relative" style={{ zIndex: 1 }}>
                <AnimatedRoutes />
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;
