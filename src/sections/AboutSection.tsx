import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        bodyRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        eduRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        langRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        backgroundColor: '#0f0f0f',
        padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 60px)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          gap: 'clamp(32px, 5vw, 60px)',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left column - Title */}
        <div ref={titleRef} style={{ opacity: 0 }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(48px, 6vw, 80px)',
              textTransform: 'uppercase',
              color: '#f5f5f0',
              lineHeight: 1,
              margin: 0,
            }}
          >
            About
          </h2>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(48px, 6vw, 80px)',
              textTransform: 'uppercase',
              color: 'rgba(245, 245, 240, 0.15)',
              lineHeight: 1,
              display: 'block',
            }}
          >
            Me
          </span>
        </div>

        {/* Right column - Content */}
        <div>
          <div ref={bodyRef} style={{ opacity: 0 }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                color: 'rgba(245, 245, 240, 0.75)',
                lineHeight: 1.7,
                margin: '0 0 32px 0',
              }}
            >
              I'm Joseph Karanja, a reliable remote worker specializing in data
              annotation, AI training support, and web hosting. With a Master's
              in Advanced Cyber Security from Mount Kenya University and hands-on
              experience since 2021, I bring strong attention to detail, fast
              typing skills, and the ability to meet deadlines while working
              independently. I'm passionate about the intersection of AI and
              human intelligence, helping build better machine learning models
              through precise data labeling and quality assurance.
            </p>
          </div>

          {/* Education */}
          <div ref={eduRef} style={{ marginBottom: '24px', opacity: 0 }}>
            <span
              className="font-mono"
              style={{
                fontSize: '11px',
                color: '#d4a041',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Education
            </span>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                color: '#f5f5f0',
                margin: '0 0 6px 0',
              }}
            >
              Mount Kenya University — Master's in Advanced Cyber Security
              (2020-2025)
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                color: 'rgba(245, 245, 240, 0.6)',
                margin: 0,
              }}
            >
              Shimo La Tewa School — Mean Grade B- (2015-2019)
            </p>
          </div>

          {/* Languages */}
          <div ref={langRef} style={{ opacity: 0 }}>
            <span
              className="font-mono"
              style={{
                fontSize: '11px',
                color: '#d4a041',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                display: 'block',
                marginBottom: '12px',
              }}
            >
              Languages
            </span>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                color: 'rgba(245, 245, 240, 0.6)',
                margin: 0,
              }}
            >
              English — Excellent | Kiswahili — Excellent
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
