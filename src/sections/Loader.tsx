import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
  isLoaded: boolean;
}

export default function Loader({ onComplete, isLoaded }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    const update = () => {
      const elapsed = performance.now() - startTime;
      const p = Math.min(100, (elapsed / duration) * 100);
      setProgress(Math.floor(p));

      if (p < 100) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    if (!isLoaded || completedRef.current) return;
    completedRef.current = true;

    // Wait for progress to reach near 100
    const checkAndAnimate = () => {
      if (progress < 90) {
        setTimeout(checkAndAnimate, 50);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to([barRef.current, textRef.current], {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }).to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        '-=0.1'
      );
    };

    checkAndAnimate();
  }, [isLoaded, progress, onComplete]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        backgroundColor: '#0f0f0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        ref={textRef}
        className="font-mono"
        style={{
          fontSize: '11px',
          color: 'rgba(245, 245, 240, 0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '16px',
        }}
      >
        LOADING
      </span>
      <div
        style={{
          width: '200px',
          height: '2px',
          backgroundColor: 'rgba(245, 245, 240, 0.1)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#d4a041',
            borderRadius: '1px',
            transition: 'width 0.1s ease',
          }}
        />
      </div>
      <span
        className="font-heading"
        style={{
          fontSize: '14px',
          fontWeight: 700,
          color: '#f5f5f0',
          marginTop: '12px',
        }}
      >
        {progress}%
      </span>
    </div>
  );
}
