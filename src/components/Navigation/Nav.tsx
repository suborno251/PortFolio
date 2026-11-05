import { useEffect, useState } from 'react';
import { showToast } from '../../utils/toast';

interface NavProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Nav({ isMenuOpen, onToggleMenu }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Check saved theme
    try {
      const saved = localStorage.getItem('sd-theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch {
      // localStorage unavailable
    }

    const sections = ['#about', '#skills', '#projects', '#experience', '#contact']
      .map((sel) => document.querySelector(sel))
      .filter(Boolean) as HTMLElement[];

    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      let cur = '';
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= window.innerHeight * 0.42) {
          cur = '#' + sections[i].id;
        }
      }
      setActiveSection(cur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('sd-theme', next);
    } catch {
      // localStorage unavailable
    }
    showToast(next === 'dark' ? 'Lights off.' : 'Lights on.', 'ok');
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`} id="nav">
      <a className="logo" href="#top">
        SD<em>.</em>DAS
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a href="#about" className={activeSection === '#about' ? 'active' : ''}>
          <sup>01</sup>ABOUT
        </a>
        <a href="#skills" className={activeSection === '#skills' ? 'active' : ''}>
          <sup>02</sup>TOOLBOX
        </a>
        <a href="#projects" className={activeSection === '#projects' ? 'active' : ''}>
          <sup>03</sup>WORK
        </a>
        <a href="#experience" className={activeSection === '#experience' ? 'active' : ''}>
          <sup>04</sup>EXPERIENCE
        </a>
        <a href="#contact" className={activeSection === '#contact' ? 'active' : ''}>
          <sup>05</sup>CONTACT
        </a>
      </nav>
      <div className="nav-actions">
        <button
          id="themeBtn"
          className="icon-btn"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
        >
          <svg
            className="i-sun"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
          <svg
            className="i-moon"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        </button>
        <a className="btn btn-ghost btn-cv" href="Suborno_Das_CV.pdf" target="_blank" rel="noreferrer">
          CV ↓
        </a>
        <button
          id="menuBtn"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={onToggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
