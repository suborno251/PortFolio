interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <div
      id="mobileMenu"
      className={`mobile-menu ${isOpen ? 'open' : ''}`}
      aria-hidden={!isOpen}
    >
      <nav aria-label="Mobile">
        <a href="#about" onClick={onClose}>
          <span>01</span>ABOUT
        </a>
        <a href="#skills" onClick={onClose}>
          <span>02</span>TOOLBOX
        </a>
        <a href="#projects" onClick={onClose}>
          <span>03</span>WORK
        </a>
        <a href="#experience" onClick={onClose}>
          <span>04</span>EXPERIENCE
        </a>
        <a href="#contact" onClick={onClose}>
          <span>05</span>CONTACT
        </a>
      </nav>
      <div className="mm-foot">
        <a
          href="https://github.com/suborno251"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
        >
          GITHUB ↗
        </a>
        <a
          href="https://www.linkedin.com/in/suborno-das-9220b51a0/"
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
        >
          LINKEDIN ↗
        </a>
        <a href="Suborno_Das_CV.pdf" target="_blank" rel="noreferrer" onClick={onClose}>
          CV ↓
        </a>
      </div>
    </div>
  );
}
