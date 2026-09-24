import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AwardConfig } from '../types';

interface EmotionalFinaleProps {
  finale: AwardConfig['finale'];
  onReplayStory: () => void;
}

export const EmotionalFinale: React.FC<EmotionalFinaleProps> = ({
  finale,
  onReplayStory,
}) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Stage 0: initial dark with beating glowing heart
    // Stage 1: "One Last Thing…"
    const s1 = setTimeout(() => setStage(1), 800);
    // Stage 2: "You're my favorite person. ❤️"
    const s2 = setTimeout(() => setStage(2), 2600);
    // Stage 3: "And you'll always have a special place in my heart."
    const s3 = setTimeout(() => setStage(3), 4600);
    // Stage 4: "Thank you for being my Princess. 👑❤️" + Replay button
    const s4 = setTimeout(() => {
      setStage(4);
      try {
        confetti({
          particleCount: 70,
          spread: 90,
          origin: { y: 0.7 },
          colors: ['#f472b6', '#ffd700', '#fb7185', '#e5c158', '#ffffff'],
        });
      } catch {
        // ignore
      }
    }, 6600);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(s4);
    };
  }, []);

  return (
    <section
      id="finale"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0d0107] via-[#1a020d] to-[#050003] flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Deep intimate dark bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#be185d]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
        {/* Single Beating Glowing Heart */}
        <div className="relative mb-8 cursor-pointer select-none group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#e11d48]/40 via-[#be185d]/30 to-transparent border border-[#fb7185]/40 flex items-center justify-center shadow-[0_0_50px_rgba(244,114,182,0.4)] animate-pulse">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#f43f5e] fill-[#f43f5e] drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
          </div>
          <Sparkles className="w-5 h-5 text-[#ffd700] absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Sequential Reveals */}
        <div className="space-y-6">
          {/* 1. "One Last Thing…" */}
          <div
            className={`transition-all duration-1000 ease-out transform ${
              stage >= 1
                ? 'opacity-100 translate-y-0 filter blur-0'
                : 'opacity-0 translate-y-4 filter blur-sm'
            }`}
          >
            <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#e5c158]">
              {finale.leadIn}
            </p>
          </div>

          {/* 2. "You're my favorite person. ❤️" */}
          <div
            className={`transition-all duration-1000 ease-out transform ${
              stage >= 2
                ? 'opacity-100 translate-y-0 filter blur-0'
                : 'opacity-0 translate-y-6 filter blur-sm'
            }`}
          >
            <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black text-gold-gradient tracking-tight leading-tight">
              {finale.mainStatement}
            </h2>
          </div>

          {/* 3. "And you'll always have a special place in my heart." */}
          <div
            className={`transition-all duration-1000 ease-out transform ${
              stage >= 3
                ? 'opacity-100 translate-y-0 filter blur-0'
                : 'opacity-0 translate-y-6 filter blur-sm'
            }`}
          >
            <p className="font-cormorant italic text-2xl sm:text-3xl text-[#fbd5db] font-light max-w-xl mx-auto">
              “{finale.promise}”
            </p>
          </div>

          {/* 4. "Thank you for being my Princess. 👑❤️" */}
          <div
            className={`pt-4 transition-all duration-1000 ease-out transform ${
              stage >= 4
                ? 'opacity-100 translate-y-0 filter blur-0'
                : 'opacity-0 translate-y-6 filter blur-sm'
            }`}
          >
            <h3 className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#ffd700] font-normal tracking-wide">
              {finale.gratitude}
            </h3>
          </div>
        </div>

        {/* Replay Our Story Button */}
        <div
          className={`mt-14 transition-all duration-700 ${
            stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <button
            onClick={onReplayStory}
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-cinzel text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold text-[#1a050d] bg-gradient-to-r from-[#ffe599] via-[#e5c158] to-[#d4af37] shadow-[0_0_30px_rgba(229,193,88,0.5)] hover:shadow-[0_0_45px_rgba(229,193,88,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2.5"
          >
            <RotateCcw className="w-4 h-4 text-[#3d0714] group-hover:-rotate-90 transition-transform duration-300" />
            <span>Replay Our Story ✨</span>
          </button>
        </div>

        {/* Quiet copyright / signoff */}
        <div className="mt-16 text-center text-xs text-[#e8d5b5]/40 font-sans tracking-wide">
          Created with eternal affection · Forever & Always
        </div>
      </div>
    </section>
  );
};
