import React from 'react';
import { Award, Music, SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSettings,
  isPlayingMusic,
  onToggleMusic,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0d0208]/75 backdrop-blur-md border-b border-[#e5c158]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#ceremony-top"
          className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-gold-gradient hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
        >
          <Award className="w-5 h-5 text-[#e5c158] inline-block" />
          <span>The Best Girlfriend Award</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium tracking-wide text-[#e8d5b5]/80">
          <a href="#the-award" className="hover:text-[#fef0cd] transition-colors">
            The Award
          </a>
          <a href="#why-you-deserve-it" className="hover:text-[#fef0cd] transition-colors">
            Why You
          </a>
          <a href="#love-letter" className="hover:text-[#fef0cd] transition-colors">
            Love Letter
          </a>
          <a href="#our-universe" className="hover:text-[#fef0cd] transition-colors">
            Our Universe
          </a>
          <a href="#certificate" className="hover:text-[#fef0cd] transition-colors">
            Certificate
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? "Pause Romantic Music" : "Play Romantic Music"}
            className={`px-3 py-1.5 text-xs font-medium tracking-wider rounded-full border transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
              isPlayingMusic
                ? "bg-[#641026] border-[#e5c158] text-[#fef0cd] shadow-[0_0_15px_rgba(229,193,88,0.3)] animate-pulse"
                : "bg-[#1f0514]/70 border-[#e5c158]/30 text-[#e8d5b5]/80 hover:border-[#e5c158] hover:text-[#fef0cd]"
            }`}
          >
            {isPlayingMusic ? (
              <Volume2 className="w-3.5 h-3.5 text-[#e5c158]" />
            ) : (
              <Music className="w-3.5 h-3.5 text-[#e5c158]/70" />
            )}
            <span className="hidden sm:inline">Our Song</span>
          </button>

          <button
            onClick={onOpenSettings}
            title="Personalize Names, Photos & Letter"
            className="p-1.5 text-xs rounded-full border border-[#e5c158]/30 bg-[#1f0514]/70 text-[#e8d5b5]/80 hover:text-[#fef0cd] hover:border-[#e5c158] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#e5c158]" />
            <span className="sr-only">Personalize</span>
          </button>
        </div>
      </div>
    </header>
  );
};
