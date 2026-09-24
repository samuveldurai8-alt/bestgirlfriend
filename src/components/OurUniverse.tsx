import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface OurUniverseProps {
  quoteLine1: string;
  quoteLine2: string;
  quoteLine3: string;
  senderName: string;
  recipientTitle: string;
}

export const OurUniverse: React.FC<OurUniverseProps> = ({
  quoteLine1,
  quoteLine2,
  quoteLine3,
  senderName,
  recipientTitle,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredStar, setHoveredStar] = useState<'you' | 'me' | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 650;
    };

    window.addEventListener('resize', handleResize);

    // Minor constellation background nodes
    const nodes: { x: number; y: number; r: number; alpha: number; pulse: number }[] = [];
    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.2,
        pulse: Math.random() * 0.03 + 0.01,
      });
    }

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.015;

      // Draw faint distant constellation lines between random nearby nodes
      ctx.strokeStyle = 'rgba(229, 193, 88, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.alpha += Math.sin(t + i) * 0.01;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 205, ${Math.max(0.1, Math.min(0.8, n.alpha))})`;
        ctx.fill();
      }

      // Two Main Protagonist Stars: "Me" and "You"
      const centerX = width / 2;
      const centerY = height / 2 + 20;
      const distance = Math.min(width * 0.35, 240);

      const meX = centerX - distance;
      const meY = centerY + Math.sin(t * 1.2) * 12;

      const youX = centerX + distance;
      const youY = centerY + Math.cos(t * 1.2) * 12;

      // Golden connection beam between the two stars
      const grad = ctx.createLinearGradient(meX, meY, youX, youY);
      grad.addColorStop(0, 'rgba(229, 193, 88, 0.85)');
      grad.addColorStop(0.5, 'rgba(254, 205, 211, 0.95)');
      grad.addColorStop(1, 'rgba(244, 114, 182, 0.85)');

      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.moveTo(meX, meY);

      // Gentle curve in the middle
      const midX = (meX + youX) / 2;
      const midY = (meY + youY) / 2 - 35 * Math.sin(t);
      ctx.quadraticCurveTo(midX, midY, youX, youY);
      ctx.stroke();
      ctx.restore();

      // Floating light particle pulsing along the beam
      const progress = (Math.sin(t * 2) + 1) / 2;
      const pulseX = (1 - progress) * (1 - progress) * meX + 2 * (1 - progress) * progress * midX + progress * progress * youX;
      const pulseY = (1 - progress) * (1 - progress) * meY + 2 * (1 - progress) * progress * midY + progress * progress * youY;

      ctx.save();
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // Draw Star "Me" (Warm Gold)
      ctx.save();
      const meGlow = ctx.createRadialGradient(meX, meY, 0, meX, meY, 32);
      meGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
      meGlow.addColorStop(0.3, 'rgba(229, 193, 88, 0.8)');
      meGlow.addColorStop(1, 'rgba(229, 193, 88, 0)');
      ctx.fillStyle = meGlow;
      ctx.beginPath();
      ctx.arc(meX, meY, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw Star "You" (Rose Gold / Princess Radiance)
      ctx.save();
      const youGlow = ctx.createRadialGradient(youX, youY, 0, youX, youY, 38);
      youGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
      youGlow.addColorStop(0.3, 'rgba(244, 114, 182, 0.9)');
      youGlow.addColorStop(0.7, 'rgba(225, 29, 72, 0.4)');
      youGlow.addColorStop(1, 'rgba(244, 114, 182, 0)');
      ctx.fillStyle = youGlow;
      ctx.beginPath();
      ctx.arc(youX, youY, 38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="our-universe"
      className="relative min-h-[750px] py-28 px-4 sm:px-6 lg:px-8 bg-[#070105] overflow-hidden flex flex-col justify-between"
    >
      {/* Deep cosmic nebula background glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#4a044e]/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#831843]/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Narrative */}
      <div className="relative z-20 text-center max-w-3xl mx-auto pt-4">
        <p className="font-cormorant italic text-xl sm:text-2xl text-[#fbd5db]/80 tracking-wide mb-2">
          {quoteLine1}
        </p>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-gold-gradient tracking-tight drop-shadow-[0_2px_15px_rgba(229,193,88,0.3)]">
          {quoteLine2}
        </h2>
      </div>

      {/* Interactive Constellation Canvas */}
      <div className="relative z-10 w-full h-[360px] sm:h-[420px] my-6">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Labels positioned over the stars */}
        <div className="absolute inset-0 max-w-4xl mx-auto flex items-center justify-between px-6 sm:px-20 pointer-events-none">
          {/* Left Star: Me */}
          <div
            className="flex flex-col items-center pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredStar('me')}
            onMouseLeave={() => setHoveredStar(null)}
          >
            <div className="mt-16 text-center">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#fef0cd] group-hover:text-white uppercase transition-colors">
                {senderName.replace('Your ', '').replace('❤️', '').trim()}
              </span>
              <p className="text-[11px] text-[#e8d5b5]/60 font-sans tracking-wide">
                Forever Guided By You
              </p>
            </div>
          </div>

          {/* Center heart indicator */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#3d0714]/80 border border-[#e5c158]/40 flex items-center justify-center shadow-[0_0_15px_rgba(244,114,182,0.4)]">
              <Heart className="w-4 h-4 text-[#f472b6] fill-[#f472b6] animate-pulse" />
            </div>
            <span className="text-[10px] font-cinzel text-[#e5c158]/70 tracking-widest mt-1 uppercase">
              Tethered
            </span>
          </div>

          {/* Right Star: You */}
          <div
            className="flex flex-col items-center pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredStar('you')}
            onMouseLeave={() => setHoveredStar(null)}
          >
            <div className="mt-16 text-center">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#fbcfe8] group-hover:text-white uppercase transition-colors">
                {recipientTitle}
              </span>
              <p className="text-[11px] text-[#f472b6]/70 font-sans tracking-wide">
                My Brightest Constellation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emotional Climax Quote */}
      <div className="relative z-20 text-center max-w-2xl mx-auto pb-6">
        <blockquote className="font-cormorant italic text-2xl sm:text-3xl lg:text-4xl text-[#fae8cb] font-light leading-relaxed">
          “{quoteLine3}”
        </blockquote>
        <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[#e5c158]/80 font-sans">
          <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
          <span>Across all lifetimes and every galaxy</span>
        </div>
      </div>
    </section>
  );
};
