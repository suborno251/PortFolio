import './App.css';
import { useEffect, useState } from 'react';
import { usePortfolioData } from './hooks/usePortfolioData';
import IntroLoader from './components/UI/IntroLoader';
import ScrollProgress from './components/UI/ScrollProgress';
import CustomCursor from './components/UI/CustomCursor';
import Toast from './components/UI/Toast';
import BackToTop from './components/UI/BackToTop';
import ConfettiCanvas from './components/Visuals/ConfettiCanvas';
import Nav from './components/Navigation/Nav';
import MobileMenu from './components/Navigation/MobileMenu';
import Hero from './components/Sections/Hero';
import Marquee from './components/Sections/Marquee';
import About from './components/Sections/About';
import Toolbox from './components/Sections/Toolbox';
import Projects from './components/Sections/Projects';
import Experience from './components/Sections/Experience';
import Contact from './components/Sections/Contact';
import Footer from './components/Footer/Footer';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const {
    email,
    stats,
    coreSkills,
    skillCategories,
    projects,
    experiences,
    bio,
  } = usePortfolioData();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Body class toggle for mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      document.body.classList.toggle('menu-open', next);
      return next;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  // Scroll reveal observer for elements with .reveal or .core-card
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal, .core-card');

    if (reduceMotion) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('in');
          io.unobserve(en.target);
        });
      },
      { threshold: 0.14 }
    );

    elements.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* Intro Loader */}
      <IntroLoader />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Confetti Layer */}
      <ConfettiCanvas />

      {/* Toast Notification */}
      <Toast />

      {/* Navigation */}
      <Nav isMenuOpen={isMenuOpen} onToggleMenu={toggleMenu} />

      {/* Mobile Overlay Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />

      {/* Main Content */}
      <main id="top">
        <Hero stats={stats} />
        <Marquee />
        <About bio={bio} />
        <Toolbox coreSkills={coreSkills} categories={skillCategories} />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Contact email={email} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTop />

      {/* Vercel Web Analytics */}
      <Analytics />
    </>
  );
}
