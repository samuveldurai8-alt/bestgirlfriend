import React, { useState, useEffect } from 'react';
import { Award, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OpeningExperienceProps {
  onBeginCeremony: () => void;
  awardTitle: string;
  recipientSubtitle: string;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({
  onBeginCeremony,
  awardTitle,
  recipientSubtitle,
}) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Step 0: Screen dark, initial ambient particles (0s)
    // Step 1: "Tonight, one very special person receives an award…" (1.2s)
    const t1 = setTimeout(() => setStep(1), 1200);

    // Step 2: "And the award goes to…" (3.5s)
    const t2 = setTimeout(() => setStep(2), 3500);

    // Step 3: Dramatic pause & spotlight (5.8s)
    const t3 = setTimeout(() => setStep(3), 5800);

    // Step 4: Full reveal of Award Title + Princess + Begin CTA (7.2s)
    const t4 = setTimeout(() => {
      setStep(4);
    }, 7200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleBegin = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e5c158', '#f472b6', '#ffd700', '#fbcfe8'],
      });
    } catch {
      // ignore
    }
    onBeginCeremony();
  };

  return (
    <section
      id="ceremony-top"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#060104] via-[#12030a] to-[#1c0410] text-center"
    >
      {/* Soft pink and golden ambient light bloom in center */}
      <div
        className={`absolute w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full pointer-events-none transition-all duration-1000 blur-[120px] ${
          step >= 3
            ? 'opacity-70 bg-gradient-to-tr from-[#681128] via-[#a82245] to-[#e5c158]/40 scale-100'
            : step >= 1
            ? 'opacity-30 bg-[#500c1e] scale-75'
            : 'opacity-0 scale-50'
        }`}
      />

      {/* Golden spotlight effect */}
      {step >= 3 && (
        <div className="absolute inset-0 pointer-events-none flex justify-center">
          <div className="w-[320px] sm:w-[500px] h-full bg-gradient-to-b from-[#e5c158]/20 via-[#e5c158]/5 to-transparent blur-2xl transform -translate-y-12 animate-pulse" />
        </div>
      )}

      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[500px]">
        {/* Stage 1: Tonight, one very special person... */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            step === 1
              ? 'opacity-100 translate-y-0 filter blur-0'
              : step > 1
              ? 'opacity-0 -translate-y-4 filter blur-sm pointer-events-none absolute'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="font-cormorant italic text-xl sm:text-2xl text-[#f7d6dc]/90 tracking-wide">
            “Tonight, one very special person receives an award…”
          </span>
        </div>

        {/* Stage 2: And the award goes to... */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            step === 2
              ? 'opacity-100 translate-y-0 filter blur-0'
              : step > 2
              ? 'opacity-0 -translate-y-4 filter blur-sm pointer-events-none absolute'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="font-cormorant italic text-2xl sm:text-3xl font-light text-[#fef0cd] tracking-widest uppercase">
            “And the award goes to…”
          </span>
          <div className="mt-4 flex justify-center">
            <Heart className="w-5 h-5 text-[#f472b6] animate-bounce opacity-80" />
          </div>
        </div>

        {/* Stage 3 & 4: Dramatic spotlight & Main Title Reveal */}
        <div
          className={`transition-all duration-1000 ease-out flex flex-col items-center ${
            step >= 3
              ? 'opacity-100 translate-y-0 filter blur-0 scale-100'
              : 'opacity-0 translate-y-8 filter blur-md scale-95 pointer-events-none absolute'
          }`}
        >
          {/* Subtle crown / trophy emblem */}
          <div className="mb-4 relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#e5c158]/40 bg-[#2b0714]/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(229,193,88,0.35)]">
              <Award className="w-9 h-9 sm:w-11 sm:h-11 text-[#e5c158]" />
            </div>
            <Sparkles className="w-5 h-5 text-[#fef08a] absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#e5c158] mb-3">
            Official Royal Recognition
          </h2>

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gold-gradient max-w-2xl px-2 leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]">
            {awardTitle}
          </h1>

          <p className="mt-4 font-cormorant italic text-xl sm:text-2xl lg:text-3xl text-[#fbd5db] tracking-wide flex items-center justify-center gap-2">
            <span>{recipientSubtitle}</span>
          </p>

          <div
            className={`mt-10 transition-all duration-700 delay-300 ${
              step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <button
              onClick={handleBegin}
              className="group relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-cinzel text-xs sm:text-sm tracking-[0.18em] uppercase font-semibold text-[#1a050d] bg-gradient-to-r from-[#ffe599] via-[#e5c158] to-[#d4af37] shadow-[0_0_25px_rgba(229,193,88,0.45)] hover:shadow-[0_0_40px_rgba(229,193,88,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Begin the Ceremony</span>
                <Sparkles className="w-4 h-4 text-[#500c1e] group-hover:rotate-45 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <p className="mt-3 text-[11px] text-[#e8d5b5]/60 tracking-wider">
              Sound recommended · Prepared exclusively for you
            </p>
          </div>
        </div>
      </div>

      {/* Skip button for fast-forward if user reloads */}
      {step < 4 && (
        <button
          onClick={() => setStep(4)}
          className="absolute bottom-6 right-6 text-xs text-[#e8d5b5]/40 hover:text-[#e8d5b5]/80 underline decoration-[#e5c158]/30 transition-colors"
        >
          Skip Intro
        </button>
      )}
    </section>
  );
};
