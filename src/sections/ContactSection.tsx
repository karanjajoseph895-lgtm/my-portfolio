import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: 'GITHUB', href: 'https://github.com/karanjajoseph895-lgtm' },
  { label: 'LINKEDIN', href: '#' },
  { label: 'TWITTER', href: '#' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const words = headlineRef.current?.querySelectorAll('.headline-word');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    if (words) {
      tl.fromTo(
        words,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.12,
        }
      );
    }

    tl.fromTo(
      [subtextRef.current, emailRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    );

    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('a');
      tl.fromTo(
        links,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );
    }

    tl.fromTo(
      copyRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: '#0a0a0a',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Headline */}
        <h2
          ref={headlineRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(36px, 7vw, 90px)',
            textTransform: 'uppercase',
            color: '#f5f5f0',
            lineHeight: 0.95,
            margin: 0,
          }}
        >
          <span className="headline-word" style={{ display: 'block', opacity: 0 }}>
            Let's Build
          </span>
          <span className="headline-word" style={{ display: 'block', opacity: 0 }}>
            Something Together
          </span>
        </h2>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="font-mono"
          style={{
            fontSize: '13px',
            textTransform: 'uppercase',
            color: 'rgba(245, 245, 240, 0.5)',
            marginTop: '24px',
            opacity: 0,
          }}
        >
          Open for freelance projects, remote work, and collaborations
        </p>

        {/* Email CTA */}
        <a
          ref={emailRef}
          href="mailto:karanjajoseph895@gmail.com"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: '#d4a041',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '32px',
            borderBottom: '2px solid transparent',
            transition: 'border-color 0.3s ease',
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderBottomColor = '#d4a041';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
          }}
        >
          karanjajoseph895@gmail.com
        </a>

        {/* Social links */}
        <div
          ref={linksRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(24px, 4vw, 48px)',
            marginTop: '40px',
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href !== '#' ? '_blank' : undefined}
              rel={link.href !== '#' ? 'noopener noreferrer' : undefined}
              className="font-mono contact-link"
              style={{
                fontSize: '13px',
                textTransform: 'uppercase',
                color: 'rgba(245, 245, 240, 0.55)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative',
                paddingBottom: '4px',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#f5f5f0';
                const underline = e.currentTarget.querySelector(
                  '.contact-underline'
                ) as HTMLElement;
                if (underline) underline.style.transform = 'scaleX(1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  'rgba(245, 245, 240, 0.55)';
                const underline = e.currentTarget.querySelector(
                  '.contact-underline'
                ) as HTMLElement;
                if (underline) underline.style.transform = 'scaleX(0)';
              }}
            >
              {link.label}
              <span
                className="contact-underline"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#d4a041',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease',
                }}
              />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          ref={copyRef}
          className="font-mono"
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            color: 'rgba(245, 245, 240, 0.25)',
            marginTop: '80px',
            opacity: 0,
          }}
        >
          &copy; 2024 Joseph Karanja. All Rights Reserved.
        </p>
      </div>
    </section>
  );
}
