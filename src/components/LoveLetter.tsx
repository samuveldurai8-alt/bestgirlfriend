import React, { useState } from 'react';
import { Sparkles, Heart, Feather } from 'lucide-react';
import { LoveLetterConfig } from '../types';

interface LoveLetterProps {
  loveLetter: LoveLetterConfig;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ loveLetter }) => {
  const [isSealed, setIsSealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `${loveLetter.salutation}\n\n${loveLetter.paragraphs.join('\n\n')}\n\n${loveLetter.signoffPrefix}\n${loveLetter.senderName}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="love-letter"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#14020b] via-[#240615] to-[#12020a] overflow-hidden"
    >
      {/* Golden particle haze */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#e5c158]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-2 text-[#e5c158]">
            <Feather className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase">
              Handwritten From My Soul
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gold-gradient">
            A Little Something From My Heart…
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#e5c158] to-transparent my-4" />
        </div>

        {/* Parchment Envelope / Letter Container */}
        <div className="relative mx-auto max-w-2xl">
          {/* Subtle outer glow */}
          <div className="absolute -inset-3 bg-gradient-to-r from-[#e5c158]/30 via-[#f472b6]/20 to-[#e5c158]/30 rounded-3xl blur-xl opacity-60 pointer-events-none" />

          {/* Authentic luxury stationery parchment */}
          <div className="relative parchment-bg rounded-2xl p-8 sm:p-12 md:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-2 border-[#d4af37]/60 overflow-hidden">
            {/* Ornate corner filigree borders */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#b88628]/80 pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#b88628]/80 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#b88628]/80 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#b88628]/80 pointer-events-none" />

            {/* Subtle vintage watermark emblem */}
            <div className="absolute right-8 bottom-12 opacity-[0.06] pointer-events-none font-cinzel text-8xl font-black text-[#581525]">
              👑
            </div>

            {/* Salutation in script font */}
            <div className="mb-6">
              <h3 className="font-script text-3xl sm:text-4xl text-[#581525] font-normal tracking-wide">
                {loveLetter.salutation}
              </h3>
            </div>

            {/* Body paragraphs in elegant editorial font */}
            <div className="space-y-5 text-[#3a1b15] font-cormorant text-xl sm:text-2xl leading-relaxed sm:leading-[1.75] font-normal">
              {loveLetter.paragraphs.map((para, i) => (
                <p key={i} className="transition-opacity duration-700">
                  {para}
                </p>
              ))}
            </div>

            {/* Signoff */}
            <div className="mt-10 pt-6 border-t border-[#d4af37]/30 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div>
                <p className="font-cormorant italic text-lg text-[#6b3528]">
                  {loveLetter.signoffPrefix}
                </p>
                <p className="font-script text-3xl sm:text-4xl text-[#6b1527] font-semibold mt-1">
                  {loveLetter.senderName}
                </p>
              </div>

              {/* Royal Ruby Wax Seal */}
              <div
                className="relative group cursor-pointer"
                title="Official Seal of Love"
                onClick={() => setIsSealed(!isSealed)}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9f1239] via-[#881337] to-[#4c0519] border-2 border-[#fb7185]/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.4)] flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-full border border-[#f43f5e]/40 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#fecdd3] fill-[#fecdd3]/80" />
                  </div>
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-sans font-medium text-[#7c2d12]/70 uppercase tracking-widest pointer-events-none">
                  Endless Love
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small action below letter */}
        <div className="mt-8 text-center flex items-center justify-center gap-4">
          <button
            onClick={handleCopy}
            className="text-xs text-[#e5c158]/80 hover:text-[#fef0cd] flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>{copied ? 'Letter Copied to Clipboard ❤️' : 'Copy Love Letter'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
