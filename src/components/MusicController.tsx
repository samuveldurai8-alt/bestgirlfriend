import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, Disc, Upload, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';

interface MusicControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicController: React.FC<MusicControllerProps> = ({
  isPlaying,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [customAudioUrl, setCustomAudioUrl] = useState('');
  const [customFileName, setCustomFileName] = useState('');
  const [audioSource, setAudioSource] = useState<'synth' | 'custom'>('synth');

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomFileName(file.name);
      setCustomAudioUrl(url);
      setAudioSource('custom');
      romanticAudio.loadCustomAudio(url);
      if (!isPlaying) {
        onToggle();
      }
    }
  };

  const handleSwitchToSynth = () => {
    setAudioSource('synth');
    romanticAudio.loadCustomAudio('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Expanded Control Box */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl glass-panel p-5 shadow-[0_15px_45px_rgba(0,0,0,0.85)] border border-[#e5c158]/35 bg-[#1f0514]/95 backdrop-blur-xl animate-fadeIn text-[#fef0cd]">
          <div className="flex items-center justify-between pb-3 border-b border-[#e5c158]/20">
            <div className="flex items-center gap-2">
              <Disc className={`w-4 h-4 text-[#e5c158] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <span className="font-cinzel text-xs font-bold tracking-wider uppercase text-gold-gradient">
                Ceremony Audio
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#e8d5b5]/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Current track indicator */}
          <div className="my-3 py-2 px-3 rounded-lg bg-[#2f081d]/60 border border-[#e5c158]/15 flex items-center justify-between">
            <div className="flex flex-col truncate pr-2">
              <span className="text-[10px] text-[#e5c158]/80 uppercase tracking-widest font-sans">
                Now Playing
              </span>
              <span className="text-xs font-cormorant italic text-[#fae8cb] font-semibold truncate">
                {audioSource === 'synth'
                  ? 'Dreamy Piano Romance (Built-in Web Audio)'
                  : customFileName || 'Custom Romantic Song'}
              </span>
            </div>
            <button
              onClick={onToggle}
              className="w-8 h-8 rounded-full bg-[#e5c158] text-[#1c0410] flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="my-3">
            <div className="flex items-center justify-between text-[11px] text-[#e8d5b5]/70 mb-1">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              {volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-[#e8d5b5]/60" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-[#e5c158]" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-[#3d0922] rounded-lg appearance-none cursor-pointer accent-[#e5c158]"
              />
            </div>
          </div>

          {/* Audio Source Options */}
          <div className="pt-3 border-t border-[#e5c158]/20 flex flex-col gap-2">
            <span className="text-[10px] text-[#e8d5b5]/70 font-sans uppercase tracking-widest">
              Audio Source
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={handleSwitchToSynth}
                className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                  audioSource === 'synth'
                    ? 'border-[#e5c158] bg-[#420924] text-[#fef0cd] font-medium'
                    : 'border-[#e5c158]/20 bg-[#16030e] text-[#e8d5b5]/70 hover:border-[#e5c158]/50'
                }`}
              >
                Piano Chords
              </button>

              <label
                className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer truncate ${
                  audioSource === 'custom'
                    ? 'border-[#e5c158] bg-[#420924] text-[#fef0cd] font-medium'
                    : 'border-[#e5c158]/20 bg-[#16030e] text-[#e8d5b5]/70 hover:border-[#e5c158]/50'
                }`}
              >
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="truncate">Upload MP3</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger Button */}
      <button
        onClick={() => {
          if (!isPlaying && !isOpen) {
            onToggle();
          }
          setIsOpen(!isOpen);
        }}
        className={`group px-4 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.7)] cursor-pointer ${
          isPlaying
            ? 'bg-[#500b1e]/90 border-[#e5c158] text-[#fef0cd] shadow-[0_0_20px_rgba(229,193,88,0.3)]'
            : 'bg-[#18030f]/85 border-[#e5c158]/35 text-[#e8d5b5]/80 hover:border-[#e5c158] hover:text-[#fef0cd]'
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-1 bg-[#e5c158] rounded-full animate-bounce" style={{ height: '70%', animationDelay: '0.1s' }} />
            <span className="w-1 bg-[#f472b6] rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0.25s' }} />
            <span className="w-1 bg-[#e5c158] rounded-full animate-bounce" style={{ height: '50%', animationDelay: '0.4s' }} />
          </div>
        ) : (
          <Music className="w-4 h-4 text-[#e5c158]" />
        )}

        <span className="font-cinzel text-xs font-semibold tracking-wider">
          Our Song
        </span>

        <span className="text-[10px] opacity-60 font-sans">
          {isPlaying ? '• Playing' : '• Tap'}
        </span>
      </button>
    </div>
  );
};
