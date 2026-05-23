import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'WORK', href: '#work' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '64px',
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'rgba(10, 10, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(245, 245, 240, 0.06)',
          zIndex: 1000,
          transition: 'background-color 0.3s ease',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: '0 clamp(20px, 5vw, 60px)',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              border: '1px solid rgba(212, 160, 65, 0.4)',
              textDecoration: 'none',
              color: '#f5f5f0',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '18px',
              textTransform: 'uppercase',
              flexShrink: 0,
            }}
          >
            JK
          </a>

          {/* Desktop Nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(16px, 3vw, 36px)',
            }}
            className="nav-desktop"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="nav-link"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'rgba(245, 245, 240, 0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                  paddingBottom: '2px',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = '#f5f5f0';
                  const underline = e.currentTarget.querySelector('.nav-underline') as HTMLElement;
                  if (underline) underline.style.transform = 'scaleX(1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(245, 245, 240, 0.55)';
                  const underline = e.currentTarget.querySelector('.nav-underline') as HTMLElement;
                  if (underline) underline.style.transform = 'scaleX(0)';
                }}
              >
                {link.label}
                <span
                  className="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: '#d4a041',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </a>
            ))}
          </div>

          {/* Status */}
          <div
            className="nav-status"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#d4a041',
                display: 'inline-block',
                animation: 'pulse 3s infinite ease-in-out',
              }}
            />
            <span
              className="font-mono"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: 'rgba(245, 245, 240, 0.45)',
              }}
            >
              AVAILABLE FOR PROJECTS
            </span>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
            }}
          >
            <div
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#f5f5f0',
                marginBottom: '6px',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#f5f5f0',
                transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <div
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: '#f5f5f0',
                marginTop: '6px',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(10, 10, 10, 0.98)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(28px, 6vw, 48px)',
                textTransform: 'uppercase',
                color: '#f5f5f0',
                textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-status {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: block !important;
          }
        }

        @media (min-width: 769px) {
          .nav-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
