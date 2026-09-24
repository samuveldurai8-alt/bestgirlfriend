import React, { useState } from 'react';
import { Crown, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AwardHeroProps {
  awardTitle: string;
  recipientSubtitle: string;
  heroQuote: string;
  senderName: string;
}

export const AwardHero: React.FC<AwardHeroProps> = ({
  awardTitle,
  recipientSubtitle,
  heroQuote,
  senderName,
}) => {
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 14, y: -y * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleCelebrate = () => {
    setHasCelebrated(true);
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#f472b6', '#e5c158', '#ffffff', '#be185d'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="the-award"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#1c0410] via-[#2a0618] to-[#16030d] overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#881337]/30 via-[#e5c158]/20 to-[#4c0519]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Subtle royal crown indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e5c158]/35 bg-[#3a0818]/60 backdrop-blur-md mb-6">
          <Crown className="w-4 h-4 text-[#e5c158]" />
          <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#fef0cd]">
            Highest Honor of My Heart
          </span>
        </div>

        {/* Section title */}
        <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gold-gradient drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          {awardTitle}
        </h2>

        <p className="mt-3 font-cormorant italic text-2xl sm:text-3xl text-[#fbd5db] font-light">
          Presented With All My Love ❤️
        </p>

        {/* 3D-Style Golden Trophy Card Visual */}
        <div
          className="my-10 relative cursor-pointer select-none group perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCelebrate}
          style={{ perspective: 1200 }}
        >
          {/* Outer rotating aura rays */}
          <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-[#e5c158]/25 via-transparent to-[#f472b6]/25 blur-2xl group-hover:opacity-100 opacity-60 transition-opacity duration-700 animate-pulse pointer-events-none" />

          {/* Luxury 3D tilted card container */}
          <div
            className="relative w-[290px] sm:w-[360px] md:w-[400px] h-[370px] sm:h-[430px] rounded-3xl p-3 bg-gradient-to-b from-[#38091a] via-[#1a040d] to-[#0f0207] border-2 border-[#e5c158]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(229,193,88,0.25)] transition-transform duration-200 ease-out"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Inner frame */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative border border-[#e5c158]/30 flex flex-col bg-[#120209]">
              {/* Golden corner flourishes */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#e5c158]/80 pointer-events-none z-10" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#e5c158]/80 pointer-events-none z-10" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#e5c158]/80 pointer-events-none z-10" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#e5c158]/80 pointer-events-none z-10" />

              {/* The Trophy Artwork */}
              <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center p-3">
                <img
                  src="/src/assets/images/award_golden_trophy_1790255905312.jpg"
                  alt="Golden Crown Trophy"
                  className="w-full h-full object-cover rounded-xl filter drop-shadow-[0_10px_25px_rgba(229,193,88,0.35)] group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle shine gloss */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Plaque Base */}
              <div className="px-4 py-3 bg-gradient-to-r from-[#220511] via-[#3a081b] to-[#220511] border-t border-[#e5c158]/40 text-center">
                <p className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#fef0cd] uppercase">
                  Grand Laureate of Eternal Affection
                </p>
                <p className="text-[11px] text-[#f7d6dc]/80 font-cormorant italic tracking-wide">
                  Awarded unconditionally by {senderName}
                </p>
              </div>
            </div>

            {/* Floating sparkle badge */}
            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd700] to-[#e5c158] flex items-center justify-center shadow-lg border border-white/40">
              <Sparkles className="w-5 h-5 text-[#3d0714]" />
            </div>
          </div>
        </div>

        {/* Short emotional description */}
        <blockquote className="max-w-2xl mx-auto px-4 mt-2">
          <p className="font-cormorant italic text-xl sm:text-2xl lg:text-3xl text-[#fae8cb] leading-relaxed font-light">
            “{heroQuote}”
          </p>
        </blockquote>

        {/* Interactive action */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleCelebrate}
            className="px-6 py-2.5 rounded-full border border-[#e5c158]/50 bg-[#350717]/80 hover:bg-[#4d0c22] text-[#fef0cd] text-xs sm:text-sm font-cinzel tracking-wider uppercase flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(229,193,88,0.2)] hover:shadow-[0_0_30px_rgba(229,193,88,0.4)] cursor-pointer"
          >
            <Heart className="w-4 h-4 text-[#f472b6] fill-[#f472b6]" />
            <span>Celebrate Her Honor</span>
          </button>
          <a
            href="#why-you-deserve-it"
            className="text-xs sm:text-sm text-[#e8d5b5]/70 hover:text-[#fef0cd] underline decoration-[#e5c158]/40 underline-offset-4 tracking-wide transition-colors"
          >
            See why she deserves it ↓
          </a>
        </div>
      </div>
    </section>
  );
};
