import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';


const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        formRef.current?.reset();
      })
      .catch(() => setStatus('error'));
  };

  return (
    <section id="contact">
      <div className="contact-inner">
        <p className="section-eyebrow reveal">05 / contact</p>
        <h2 className="contact-big reveal">Let's work together.</h2>
        <p className="contact-sub reveal">
          Open to full-time roles, freelance contracts, and interesting side projects.
          Drop me a message — I'll get back to you.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="contact-form reveal">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                type="text"
                name="from_name"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                name="from_email"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-input form-textarea"
              name="message"
              placeholder="Tell me about your project..."
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="form-feedback success">Message sent! I'll get back to you soon.</p>
          )}
          {status === 'error' && (
            <p className="form-feedback error">Something went wrong. Please try again.</p>
          )}
        </form>

        <div className="contact-links" style={{ marginTop: '2.5rem' }}>
          <a href="https://github.com/" target="_blank" className="btn btn-ghost">GitHub</a>
          <a href="https://linkedin.com/in/" target="_blank" className="btn btn-ghost">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}