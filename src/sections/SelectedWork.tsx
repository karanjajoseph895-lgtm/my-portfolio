import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'School Bus Tracker',
    category: 'WEB APPLICATION',
    year: '2024',
    image: '/images/work-schoolbus.jpg',
    description:
      'Full-featured school bus tracking system with live maps, M-Pesa payments, OTP authentication, and multi-role dashboards for schools, drivers, parents, and admins.',
    large: true,
  },
  {
    title: 'AI Data Pipeline',
    category: 'DATA ANNOTATION',
    year: '2023',
    image: '/images/work-ai.jpg',
    description:
      'End-to-end data annotation pipeline using YOLO, Roboflow, and CVAT for computer vision model training with bounding boxes, segmentation, and quality assurance.',
    large: false,
  },
  {
    title: 'Content Moderation System',
    category: 'AI TRAINING',
    year: '2023',
    image: '/images/work-content.jpg',
    description:
      'Scalable content moderation and filtering system for AI training datasets, ensuring data quality and consistency across large-scale annotation projects.',
    large: true,
  },
  {
    title: 'Cyber Security Dashboard',
    category: 'SECURITY TOOL',
    year: '2022',
    image: '/images/work-security.jpg',
    description:
      'Security monitoring dashboard with real-time threat detection, network analysis, and vulnerability reporting for comprehensive cybersecurity oversight.',
    large: false,
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        backgroundColor: '#0f0f0f',
        padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 60px)',
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 64px)',
            textTransform: 'uppercase',
            color: '#f5f5f0',
            lineHeight: 1,
            margin: 0,
          }}
        >
          Selected Work
        </h2>
        <a
          href="https://github.com/karanjajoseph895-lgtm"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono"
          style={{
            fontSize: '13px',
            textTransform: 'uppercase',
            color: 'rgba(245, 245, 240, 0.4)',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#d4a041';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(245, 245, 240, 0.4)';
          }}
        >
          VIEW ALL &rarr;
        </a>
      </div>

      {/* Project grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}
        className="work-grid"
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            style={{
              gridColumn: project.large ? 'span 1' : 'span 1',
              marginTop: !project.large ? '30px' : '0',
              opacity: 0,
            }}
          >
            <div
              className="work-card"
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                }}
              />

              {/* Overlay gradient */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '70%',
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Content overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  padding: '24px',
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: 'rgba(245, 245, 240, 0.5)',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  {project.category} / {project.year}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(20px, 2.5vw, 32px)',
                    color: '#f5f5f0',
                    margin: '0 0 8px 0',
                    lineHeight: 1.2,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(245, 245, 240, 0.7)',
                    lineHeight: 1.6,
                    margin: '0 0 12px 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.description}
                </p>
                <span
                  className="work-explore font-mono"
                  style={{
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    color: '#d4a041',
                    letterSpacing: '0.05em',
                    opacity: 0,
                    transform: 'translateX(-10px)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                  }}
                >
                  EXPLORE &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .work-card:hover .work-explore {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        .work-card:hover img {
          transform: scale(1.06);
        }

        @media (max-width: 768px) {
          .work-grid {
            grid-template-columns: 1fr !important;
          }
          .work-grid > div {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
