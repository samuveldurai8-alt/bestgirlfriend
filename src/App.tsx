/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { ParticleCanvas } from './components/ParticleCanvas';
import { OpeningExperience } from './components/OpeningExperience';
import { AwardHero } from './components/AwardHero';
import { ReasonsSection } from './components/ReasonsSection';
import { LoveLetter } from './components/LoveLetter';
import { OurUniverse } from './components/OurUniverse';
import { CertificateOfLove } from './components/CertificateOfLove';
import { EmotionalFinale } from './components/EmotionalFinale';
import { MusicController } from './components/MusicController';
import { PersonalizeModal } from './components/PersonalizeModal';
import { DEFAULT_AWARD_CONFIG } from './data/defaultConfig';
import { AwardConfig } from './types';
import { romanticAudio } from './utils/audioEngine';

const STORAGE_KEY = 'the_best_girlfriend_award_config_v1';

export default function App() {
  const [config, setConfig] = useState<AwardConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_AWARD_CONFIG;
  });

  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });

  // Save configuration on change
  const handleSaveConfig = (newConfig: AwardConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  const handleToggleMusic = () => {
    const newState = romanticAudio.toggle();
    setIsPlayingMusic(newState);
  };

  const handleBeginCeremony = () => {
    // If not already playing, start gentle procedural ambient romantic audio
    if (!isPlayingMusic) {
      romanticAudio.play();
      setIsPlayingMusic(true);
    }

    const awardEl = document.getElementById('the-award');
    if (awardEl) {
      awardEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayStory = () => {
    const topEl = document.getElementById('ceremony-top');
    if (topEl) {
      topEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Subtle cursor follower on desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070105] text-[#f7e7ce] selection:bg-[#72152b] selection:text-[#fff4e0] antialiased">
      {/* Desktop subtle cursor-following romantic glow */}
      <div
        className="fixed w-72 h-72 rounded-full pointer-events-none z-30 blur-3xl transition-opacity duration-300 hidden md:block"
        style={{
          left: mousePos.x - 144,
          top: mousePos.y - 144,
          background: 'radial-gradient(circle, rgba(244, 114, 182, 0.08) 0%, rgba(229, 193, 88, 0.04) 50%, transparent 70%)',
        }}
      />

      {/* Floating Canvas with animated rose petals and golden sparkles */}
      <ParticleCanvas />

      <main className="relative z-10">
        {/* 1. Full-screen Cinematic Opening */}
        <OpeningExperience
          onBeginCeremony={handleBeginCeremony}
          awardTitle={config.awardTitle}
          recipientSubtitle={config.recipientSubtitle}
        />

        {/* 2. The Award Hero Section with 3D Trophy Card */}
        <AwardHero
          awardTitle={config.awardTitle}
          recipientSubtitle={config.recipientSubtitle}
          heroQuote={config.heroQuote}
          senderName={config.senderName}
        />

        {/* 3. Why She Deserves It */}
        <ReasonsSection reasons={config.reasons} />

        {/* 4. The Handwritten Love Letter */}
        <LoveLetter loveLetter={config.loveLetter} />

        {/* 5. Our Little Universe */}
        <OurUniverse
          quoteLine1={config.universeQuoteLine1}
          quoteLine2={config.universeQuoteLine2}
          quoteLine3={config.universeQuoteLine3}
          senderName={config.senderName}
          recipientTitle={config.recipientTitle}
        />

        {/* 6. Award Certificate */}
        <CertificateOfLove
          certificate={config.certificate}
          senderName={config.senderName}
        />

        {/* 8. Emotional Finale & Replay Story */}
        <EmotionalFinale
          finale={config.finale}
          onReplayStory={handleReplayStory}
        />
      </main>

      {/* Floating Personalization Quick Action */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        title="Personalize Award & Names"
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full border border-[#e5c158]/40 bg-[#1f0514]/80 backdrop-blur-md text-[#fef0cd] hover:bg-[#350717] hover:border-[#e5c158] transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
      >
        <SlidersHorizontal className="w-4 h-4 text-[#e5c158]" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-cinzel tracking-wider">
          Customize
        </span>
      </button>

      {/* Floating Music Controller */}
      <MusicController
        isPlaying={isPlayingMusic}
        onToggle={handleToggleMusic}
      />

      {/* Personalization Modal */}
      <PersonalizeModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
