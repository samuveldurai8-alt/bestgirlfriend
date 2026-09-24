/**
 * Luxury Romantic Audio Engine
 * Provides procedural soothing romantic piano/chime ambient soundscapes
 * via Web Audio API, or allows streaming custom audio files.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isCustomSource: boolean = false;
  private volume: number = 0.65;

  // Romantic chord progression frequencies (Db major / Gb / Ab / Bbm - classic cinematic romance)
  // Rich frequencies for warm acoustic chime / piano notes
  private chordProgressions = [
    // Db major 7 (Db, F, Ab, C)
    [277.18, 349.23, 415.30, 523.25, 554.37, 698.46],
    // Bbm 7 (Bb, Db, F, Ab)
    [233.08, 277.18, 349.23, 415.30, 466.16, 554.37],
    // Gb maj 9 (Gb, Bb, Db, F, Ab)
    [185.00, 233.08, 277.18, 349.23, 415.30, 466.16],
    // Ab add 9 (Ab, C, Eb, Bb)
    [207.65, 261.63, 311.13, 415.30, 466.16, 523.25],
    // F minor 7 (F, Ab, C, Eb)
    [174.61, 207.65, 261.63, 311.13, 349.23, 415.30],
  ];

  private currentChordIdx = 0;
  private noteInChord = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, warm music box / acoustic chime note
  private playRomanticNote(freq: number, duration: number = 3.5, gainMult: number = 1.0) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    // Dual oscillator: sine for warm fundamental + triangle for crystal chime overtone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now); // soft harmonic octave

    // Soft romantic envelope: smooth gentle attack and long dreamy decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.12 * gainMult, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Warm low-pass filter to sound like an intimate acoustic piano/rhodes
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(filter);
    filter.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // Sustained pad / cello bass bed
  private playPadBass(rootFreq: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const duration = 6.0;

    const padOsc = this.ctx.createOscillator();
    const padGain = this.ctx.createGain();
    const padFilter = this.ctx.createBiquadFilter();

    padOsc.type = 'sine';
    padOsc.frequency.setValueAtTime(rootFreq / 2, now);

    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(220, now);

    padGain.gain.setValueAtTime(0.001, now);
    padGain.gain.linearRampToValueAtTime(0.08, now + 1.2);
    padGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    padOsc.connect(padGain);
    padGain.connect(padFilter);
    padFilter.connect(this.masterGain);

    padOsc.start(now);
    padOsc.stop(now + duration);
  }

  private stepSynthesizer = () => {
    if (!this.isPlaying || this.isCustomSource) return;

    const chord = this.chordProgressions[this.currentChordIdx];

    // Every 4 notes, trigger warm bass pad
    if (this.noteInChord === 0) {
      this.playPadBass(chord[0]);
    }

    // Pick melodic arpeggio note
    const note = chord[this.noteInChord % chord.length];
    // Occasional sparkle octave
    const isSparkle = Math.random() > 0.65;
    const playedFreq = isSparkle ? note * 1.5 : note;
    this.playRomanticNote(playedFreq, 3.8, isSparkle ? 0.7 : 1.0);

    this.noteInChord++;
    if (this.noteInChord >= 4) {
      this.noteInChord = 0;
      this.currentChordIdx = (this.currentChordIdx + 1) % this.chordProgressions.length;
    }

    // Gentle variable pacing mimicking human emotional rubato playing
    const delay = 600 + Math.random() * 250;
    this.timerId = window.setTimeout(this.stepSynthesizer, delay);
  };

  public play() {
    this.initContext();
    this.isPlaying = true;

    if (this.isCustomSource && this.customAudio) {
      this.customAudio.play().catch(() => {
        // Fallback to procedural synth if audio file cannot be loaded
        this.isCustomSource = false;
        this.stepSynthesizer();
      });
    } else {
      if (this.timerId) clearTimeout(this.timerId);
      this.stepSynthesizer();
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public loadCustomAudio(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (!url) {
      this.isCustomSource = false;
      if (this.isPlaying) {
        this.stepSynthesizer();
      }
      return;
    }

    this.isCustomSource = true;
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    if (this.isPlaying) {
      this.customAudio.play().catch(() => {
        // fallback if play fails
        this.isCustomSource = false;
        this.stepSynthesizer();
      });
    }
  }

  public getAudioFrequencyData(): Uint8Array | null {
    if (!this.analyser) return null;
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

export const romanticAudio = new RomanticAudioEngine();
