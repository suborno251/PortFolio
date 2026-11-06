import { useState, type CSSProperties, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { showToast } from '../../utils/toast';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface ContactProps {
  email: string;
}

export default function Contact({ email }: ContactProps) {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const handleCopyEmail = () => {
    const done = () => showToast('EMAIL COPIED — NOW USE IT.', 'ok');
    const fail = () => showToast(`COPY FAILED — IT'S ${email}`, 'err');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, fail);
    } else {
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        done();
      } catch {
        fail();
      }
      ta.remove();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = "required — who's asking?";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.trim())) {
      newErrors.email = 'that email looks off';
    }
    if (message.trim().length < 10) {
      newErrors.message = 'give me 10+ chars to work with';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showToast('FIX THE RED FIELDS FIRST.', 'err');
      return;
    }

    const subject = encodeURIComponent(`Project inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n— ${name.trim()} (${userEmail.trim()})`
    );

    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      setIsSending(true);
      emailjs
        .send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: name.trim(),
            from_email: userEmail.trim(),
            reply_to: userEmail.trim(),
            message: message.trim(),
            name: name.trim(),
            email: userEmail.trim(),
          },
          PUBLIC_KEY
        )
        .then(() => {
          showToast('MESSAGE SENT! I’LL GET BACK TO YOU SOON.', 'ok');
          setName('');
          setUserEmail('');
          setMessage('');
        })
        .catch((err) => {
          console.error('EmailJS error:', err);
          showToast('EMAILJS FAILED — OPENING MAIL CLIENT AS FALLBACK.', 'err');
          window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
        })
        .finally(() => {
          setIsSending(false);
        });
    } else {
      showToast('OPENING YOUR MAIL APP — PRE-FILLED.', 'ok');
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }
  };

  const onMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  };

  const onMagneticLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = '';
  };

  const bigText = "LET'S TALK";

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="sec-num mono">05&nbsp;/</span>
          <h2>CONTACT</h2>
        </div>

        <h2 className="contact-big" id="contactBig" aria-label={bigText}>
          {bigText.split('').map((ch, i) => (
            <span key={i}>{ch === ' ' ? '\u00A0' : ch}</span>
          ))}
        </h2>

        <p className="sec-sub reveal">
          Open to full-time roles, freelance contracts, and interesting side projects. Pick a
          channel — or use the form.
        </p>

        <div className="contact-grid">
          <div className="channels">
            <div className="channel reveal">
              <div>
                <span className="mono">EMAIL</span>
                <strong>{email}</strong>
              </div>
              <button
                className="btn btn-small"
                id="copyEmail"
                data-cursor
                onClick={handleCopyEmail}
                type="button"
              >
                COPY
              </button>
            </div>

            <a
              className="channel reveal"
              style={{ '--d': '.05s' } as CSSProperties}
              href="https://github.com/suborno251"
              target="_blank"
              rel="noreferrer"
              data-cursor
            >
              <div>
                <span className="mono">GITHUB</span>
                <strong>github.com/suborno251</strong>
              </div>
              <em>↗</em>
            </a>

            <a
              className="channel reveal"
              style={{ '--d': '.1s' } as CSSProperties}
              href="https://www.linkedin.com/in/suborno-das-9220b51a0/"
              target="_blank"
              rel="noreferrer"
              data-cursor
            >
              <div>
                <span className="mono">LINKEDIN</span>
                <strong>in/suborno-das</strong>
              </div>
              <em>↗</em>
            </a>

            <a
              className="channel reveal"
              style={{ '--d': '.15s' } as CSSProperties}
              href="Suborno_Das_CV.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor
            >
              <div>
                <span className="mono">RESUME</span>
                <strong>Suborno_Das_CV.pdf</strong>
              </div>
              <em>↓</em>
            </a>
          </div>

          <form
            id="contactForm"
            className="form reveal"
            style={{ '--d': '.1s' } as CSSProperties}
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="f-row">
              <div className="f-field">
                <label className="mono" htmlFor="fName">
                  NAME
                </label>
                <input
                  id="fName"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  className={errors.name ? 'bad' : ''}
                />
                <small className="f-err" data-err="name">
                  {errors.name || ''}
                </small>
              </div>

              <div className="f-field">
                <label className="mono" htmlFor="fEmail">
                  EMAIL
                </label>
                <input
                  id="fEmail"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={errors.email ? 'bad' : ''}
                />
                <small className="f-err" data-err="email">
                  {errors.email || ''}
                </small>
              </div>
            </div>

            <div className="f-field">
              <label className="mono" htmlFor="fMsg">
                MESSAGE
              </label>
              <textarea
                id="fMsg"
                name="message"
                rows={6}
                placeholder="Tell me about your project…"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                className={errors.message ? 'bad' : ''}
              />
              <small className="f-err" data-err="message">
                {errors.message || ''}
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block magnetic"
              data-cursor
              disabled={isSending}
              onMouseMove={onMagneticMove}
              onMouseLeave={onMagneticLeave}
            >
              {isSending ? 'SENDING…' : 'SEND MESSAGE'}
            </button>
            <p className="f-note mono">
              {SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY
                ? 'DELIVERED DIRECTLY TO MY INBOX VIA EMAILJS.'
                : 'OPENS YOUR MAIL APP, PRE-FILLED — NOTHING IS STORED.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
