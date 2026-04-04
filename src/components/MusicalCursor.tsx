import { useEffect, useRef } from 'react';

export default function MusicalCursor() {
  const mcRef = useRef<HTMLDivElement>(null);
  const o1Ref = useRef<SVGCircleElement>(null);
  const o2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const mc = mcRef.current;
    if (!mc) return;

    // State for cursor smoothing/physics
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let vx = 0;
    let vy = 0;
    let ang = 0;
    let ih = false; // is hovering

    const spawnRipple = (x: number, y: number, sz = 48) => {
      const el = document.createElement('div');
      el.className = 'rr';
      el.style.cssText = `left:${x}px;top:${y}px;width:${sz}px;height:${sz}px`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 720);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Check for hover state on interactables
      const target = e.target as HTMLElement;
      const isInteractable = target.closest('a, button, .lang-card, .work-card, .contact-item, .sub-work-card, .social-btn, .filter-btn, .marquee-strip');
      if (isInteractable && !ih) {
        ih = true;
        spawnRipple(mx, my);
      } else if (!isInteractable && ih) {
        ih = false;
      }
    };

    const handleClick = () => {
      spawnRipple(mx, my, 60);
    };

    const anim = () => {
      const dx = mx - cx;
      const dy = my - cy;
      const spd = Math.sqrt(dx * dx + dy * dy);
      
      vx += (dx * 0.18);
      vy += (dy * 0.18);
      vx *= 0.72;
      vy *= 0.72;
      cx += vx * 0.3;
      cy += vy * 0.3;

      const tilt = Math.atan2(dy, dx) * 0.25;
      const wob = Math.sin(Date.now() * 0.004) * 5;
      ang += 0.03 + spd * 0.002;

      if (o1Ref.current) {
        o1Ref.current.setAttribute('cx', (24 + Math.cos(ang) * 20).toString());
        o1Ref.current.setAttribute('cy', (24 + Math.sin(ang) * 20).toString());
      }
      if (o2Ref.current) {
        o2Ref.current.setAttribute('cx', (24 + Math.cos(ang + Math.PI) * 16).toString());
        o2Ref.current.setAttribute('cy', (24 + Math.sin(ang + Math.PI) * 16).toString());
      }

      if (mcRef.current) {
        mcRef.current.style.cssText = `left:${cx}px;top:${cy}px;transform:translate(-50%,-50%) rotate(${wob + tilt * 20}deg) scale(${ih ? 1.35 : 1})`;
      }

      requestAnimationFrame(anim);
    };
    const reqId = requestAnimationFrame(anim);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(reqId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div id="mc" ref={mcRef}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <g transform="translate(12,6)">
            <ellipse cx="6" cy="30" rx="6" ry="4.5" fill="#c8964a" transform="rotate(-20 6 30)" />
            <line x1="11.5" y1="27" x2="11.5" y2="6" stroke="#c8964a" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M11.5 6 C22 10, 22 18, 14 22" stroke="#c8964a" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
          <circle ref={o1Ref} cx="38" cy="16" r="3" fill="rgba(200,150,74,.7)" />
          <circle ref={o2Ref} cx="10" cy="38" r="2" fill="rgba(200,150,74,.5)" />
        </svg>
      </div>
    </>
  );
}
