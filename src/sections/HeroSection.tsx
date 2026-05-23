import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroSectionProps {
  loaderDone: boolean;
}

export default function HeroSection({ loaderDone }: HeroSectionProps) {
  const metaRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!loaderDone || hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline();

    // Metadata row fade in
    tl.fromTo(
      metaRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    );

    // Title line 1 - clip reveal
    tl.fromTo(
      titleLine1Ref.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.out' },
      '-=0.3'
    );

    // Title line 2 - clip reveal
    tl.fromTo(
      titleLine2Ref.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.out' },
      '-=0.9'
    );

    // Subtitle fade in
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
  }, [loaderDone]);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(15,15,15,0.2) 0%, rgba(15,15,15,0.75) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          height: '100%',
          padding: '0 clamp(20px, 5vw, 60px)',
          paddingBottom: '12vh',
        }}
      >
        {/* Metadata row */}
        <div
          ref={metaRef}
          className="font-mono"
          style={{
            fontSize: '11px',
            color: 'rgba(245, 245, 240, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '20px',
            opacity: 0,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span>2021 — Present</span>
          <span style={{ color: 'rgba(245, 245, 240, 0.2)' }}>|</span>
          <span>Creative Technologist</span>
          <span style={{ color: 'rgba(245, 245, 240, 0.2)' }}>|</span>
          <span>AI & Web</span>
        </div>

        {/* Main title */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(48px, 10vw, 140px)',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: '#f5f5f0',
            textShadow: '0 2px 40px rgba(0,0,0,0.6)',
            margin: 0,
          }}
        >
          <span
            ref={titleLine1Ref}
            style={{
              display: 'block',
              clipPath: 'inset(0 100% 0 0)',
            }}
          >
            Creative
          </span>
          <span
            ref={titleLine2Ref}
            style={{
              display: 'block',
              clipPath: 'inset(0 100% 0 0)',
            }}
          >
            Technologist
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.5vw, 20px)',
            color: 'rgba(245, 245, 240, 0.6)',
            letterSpacing: '0.02em',
            marginTop: '20px',
            opacity: 0,
          }}
        >
          Data Annotation &middot; AI Training &middot; Web Development &middot; Cyber Security
        </p>
      </div>
    </section>
  );
}
