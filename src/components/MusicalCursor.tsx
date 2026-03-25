import { useEffect, useRef } from 'react';

const SYMBOLS = ['♩', '♪', '♫', '♬', '♭', '♯'];

export default function MusicalCursor() {
  const mcRef = useRef<HTMLDivElement>(null);
  const o1Ref = useRef<SVGCircleElement>(null);
  const o2Ref = useRef<SVGCircleElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mc = mcRef.current;
    const cv = canvasRef.current;
    if (!mc || !cv) return;

    const ct = cv.getContext('2d');
    if (!ct) return;

    let trail: { x: number; y: number; t: number }[] = [];

    // State for cursor smoothing/physics
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let vx = 0;
    let vy = 0;
    let ang = 0;
    let lnt = 0; // last note time
    let lx = mx; // last x for distance check
    let ly = my; // last y for distance check
    let ih = false; // is hovering

    const rsz = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    rsz();
    window.addEventListener('resize', rsz);

    const spawnNote = (x: number, y: number) => {
      const el = document.createElement('div');
      el.className = 'np';
      const tx = (Math.random() - 0.5) * 60;
      const ty = -(20 + Math.random() * 50);
      const tx2 = tx + (Math.random() - 0.5) * 40;
      const ty2 = ty - (20 + Math.random() * 40);
      const tr = (Math.random() - 0.5) * 90;
      const tr2 = (Math.random() - 0.5) * 180;
      
      el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      el.style.cssText = `left:${x}px;top:${y}px;color:rgba(200,150,74,${0.5 + Math.random() * 0.5});font-size:${0.8 + Math.random() * 0.8}rem;--nx:${tx}px;--ny:${ty}px;--nx2:${tx2}px;--ny2:${ty2}px;--nr:${tr}deg;--nr2:${tr2}deg`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1450);
    };

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
      trail.push({ x: e.clientX, y: e.clientY, t: Date.now() });
      if (trail.length > 500) trail.splice(0, 60);

      // Check for hover state on interactables
      const target = e.target as HTMLElement;
      const isInteractable = target.closest('a, button, .lang-card, .work-card, .contact-item, .sub-work-card, .social-btn, .filter-btn');
      if (isInteractable && !ih) {
        ih = true;
        spawnRipple(mx, my);
      } else if (!isInteractable && ih) {
        ih = false;
      }
    };

    const handleClick = () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnNote(mx, my), i * 80);
      }
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

      const now = Date.now();
      if (Math.sqrt((mx - lx) ** 2 + (my - ly) ** 2) > 28 && now - lnt > 190) {
        spawnNote(mx, my);
        lnt = now;
        lx = mx;
        ly = my;
      }

      // Draw Stave Trail
      ct.clearRect(0, 0, cv.width, cv.height);
      trail = trail.filter(p => now - p.t < 1800);
      for (let l = -2; l <= 2; l++) {
        ct.beginPath();
        let st = false;
        for (let i = 1; i < trail.length; i++) {
          const p = trail[i];
          const pp = trail[i - 1];
          const age = now - p.t;
          const al = Math.max(0, 1 - age / 1800) * 0.55;
          if (al <= 0) continue;
          
          const tdx = p.x - pp.x;
          const tdy = p.y - pp.y;
          const len = Math.sqrt(tdx * tdx + tdy * tdy) || 1;
          const nx = -tdy / len;
          const ny = tdx / len;
          const yo = l * 5;
          
          const x1 = pp.x + nx * yo;
          const y1 = pp.y + ny * yo;
          const x2 = p.x + nx * yo;
          const y2 = p.y + ny * yo;
          
          if (!st) {
            ct.moveTo(x1, y1);
            st = true;
          }
          ct.lineTo(x2, y2);
          ct.strokeStyle = `rgba(200, 150, 74, ${al})`;
          ct.lineWidth = 0.8;
          ct.stroke();
          ct.beginPath();
          ct.moveTo(x2, y2);
        }
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
      window.removeEventListener('resize', rsz);
    };
  }, []);

  return (
    <>
      <canvas id="staffCanvas" ref={canvasRef} />
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
