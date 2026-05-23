import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Data Annotation',
    tags: [
      'Image Annotation',
      'Video Annotation',
      'Audio Annotation',
      'Speech Transcription',
      'Bounding Boxes',
      'Polygon Annotation',
      'Semantic Segmentation',
      'Keypoint Annotation',
      'Object Tracking',
      'OCR Labeling',
    ],
  },
  {
    title: 'AI & Computer Vision',
    tags: [
      'YOLO Database Prep',
      'Computer Vision',
      'Data Cleaning',
      'Metadata Tagging',
      'AI Model Training',
      'NLP Classification',
      'Quality Assurance',
    ],
  },
  {
    title: 'Tools & Platforms',
    tags: [
      'Amazon SageMaker',
      'Hive AI',
      'CVAT',
      'Labelbox',
      'Supervisely',
      'Roboflow',
      'Scale AI',
      'V7 Darwin',
      'Dataloop',
      'Audacity',
    ],
  },
  {
    title: 'Web & Technical',
    tags: [
      'Website Setup',
      'Domain & DNS',
      'cPanel',
      'File Management',
      'Email Setup',
      'Live Chat Support',
      'Content Moderation',
      'Research',
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    const cards = cardsRef.current.filter(Boolean);
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
      id="skills"
      ref={sectionRef}
      style={{
        backgroundColor: '#0a0a0a',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 60px)',
      }}
    >
      {/* Header */}
      <div ref={headerRef} style={{ marginBottom: '48px', opacity: 0 }}>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(36px, 5vw, 64px)',
            textTransform: 'uppercase',
            color: '#f5f5f0',
            lineHeight: 1,
            margin: '0 0 12px 0',
          }}
        >
          Skills & Tools
        </h2>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: '16px',
            color: 'rgba(245, 245, 240, 0.5)',
            margin: 0,
          }}
        >
          Technologies I work with daily
        </p>
      </div>

      {/* Skills grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
        }}
        className="skills-grid"
      >
        {skillCategories.map((category, i) => (
          <div
            key={category.title}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="skill-card"
            style={{ opacity: 0 }}
          >
            <h3
              className="font-mono"
              style={{
                fontSize: '12px',
                color: '#d4a041',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: '0 0 20px 0',
              }}
            >
              {category.title}
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {category.tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
