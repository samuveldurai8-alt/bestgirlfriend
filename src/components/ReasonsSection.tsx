import React from 'react';
import { Heart, Sparkles, Sun, Smile, Crown, HeartHandshake } from 'lucide-react';
import { ReasonItem } from '../types';

interface ReasonsSectionProps {
  reasons: ReasonItem[];
}

export const ReasonsSection: React.FC<ReasonsSectionProps> = ({ reasons }) => {
  const getIcon = (type: ReasonItem['iconType']) => {
    switch (type) {
      case 'love':
        return <Heart className="w-5 h-5 text-[#f472b6] fill-[#f472b6]/20" />;
      case 'smile':
        return <Smile className="w-5 h-5 text-[#fde047]" />;
      case 'patience':
        return <HeartHandshake className="w-5 h-5 text-[#e5c158]" />;
      case 'presence':
        return <Sun className="w-5 h-5 text-[#f9a8d4]" />;
      case 'royal':
        return <Crown className="w-5 h-5 text-[#ffd700]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#e5c158]" />;
    }
  };

  return (
    <section
      id="why-you-deserve-it"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#16030d] via-[#210514] to-[#14020b] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#831843]/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#e5c158]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#e5c158] mb-2">
            The Nominations of My Soul
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gold-gradient">
            Why You Deserve This Award
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#e5c158] to-transparent my-4" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#f7d6dc]/90">
            Out of countless reasons that make my heart beat for you, here are the ones I cherish every single day.
          </p>
        </div>

        {/* Reason Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={reason.id}
              className="glass-panel glass-card-hover rounded-2xl p-7 relative flex flex-col justify-between group overflow-hidden border border-[#e5c158]/20 bg-[#240615]/50 hover:bg-[#2e091b]/80 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Subtle top corner gold flourish */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#e5c158]/15 via-transparent to-transparent pointer-events-none" />

              <div>
                {/* Header row with editorial number and icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#3c0920] border border-[#e5c158]/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {getIcon(reason.iconType)}
                  </div>
                  <span className="font-cinzel text-xs font-semibold tracking-widest text-[#e5c158]/60">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fef0cd] group-hover:text-white transition-colors mb-3">
                  {reason.title}
                </h3>

                {/* Primary emotional quote */}
                <p className="font-cormorant italic text-lg sm:text-xl text-[#fbd5db] leading-relaxed mb-4">
                  “{reason.description}”
                </p>
              </div>

              {/* Subtext / editorial foot note */}
              {reason.subtext && (
                <div className="pt-4 border-t border-[#e5c158]/15 flex items-center gap-2 text-xs text-[#e8d5b5]/70 tracking-wide font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-[#e5c158]/70 shrink-0" />
                  <span>{reason.subtext}</span>
                </div>
              )}
            </div>
          ))}

          {/* Interactive 6th Special Card: Secret Reason */}
          <div className="glass-panel glass-card-hover rounded-2xl p-7 relative flex flex-col justify-between group overflow-hidden border border-[#f472b6]/35 bg-gradient-to-br from-[#3b0920]/70 via-[#260515]/60 to-[#19030e]/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#520c2a] border border-[#f472b6]/40 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#f472b6] fill-[#f472b6] animate-pulse" />
                </div>
                <span className="font-cinzel text-xs font-semibold tracking-widest text-[#f472b6]/70">
                  SPECIAL
                </span>
              </div>

              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fef0cd] mb-3">
                For Everything Else
              </h3>

              <p className="font-cormorant italic text-lg sm:text-xl text-[#fbd5db] leading-relaxed mb-4">
                “For every little glance, sweet laugh, late-night conversation, and dream we have yet to live together.”
              </p>
            </div>

            <div className="pt-4 border-t border-[#f472b6]/20 flex items-center gap-2 text-xs text-[#fbcfe8]/80 font-sans tracking-wide">
              <span>And a million more reasons waiting in tomorrow.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
