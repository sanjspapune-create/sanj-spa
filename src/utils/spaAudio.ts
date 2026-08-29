/**
 * Soothing ambient sound generator using Web Audio API
 * Generates gentle meditative tones and a subtle soft water stream texture.
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let intervalId: any = null;

export function toggleSpaAmbientAudio(onStateChange?: (playing: boolean) => void): boolean {
  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend();
    if (intervalId) clearInterval(intervalId);
    if (onStateChange) onStateChange(false);
    return false;
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
    startChimeSequence();
    if (onStateChange) onStateChange(true);
    return true;
  }

  // Initialize new AudioContext
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Create pink noise gentle stream
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.02; // Very gentle
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to sound like soft soothing stream
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(masterGain);
    whiteNoise.start();

    // Start gentle Tibetan singing bowl chime intervals
    startChimeSequence();

    if (onStateChange) onStateChange(true);
    return true;
  } catch (err) {
    console.warn('Web Audio API not allowed without user gesture', err);
    if (onStateChange) onStateChange(false);
    return false;
  }
}

function playZenChime(freq: number) {
  if (!audioCtx || !masterGain || audioCtx.state !== 'running') return;
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const chimeGain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);

  chimeGain.gain.setValueAtTime(0, now);
  chimeGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
  chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

  osc.connect(chimeGain);
  chimeGain.connect(masterGain);

  osc.start(now);
  osc.stop(now + 4.6);
}

function startChimeSequence() {
  const notes = [261.63, 329.63, 392.00, 523.25, 440.00]; // C4, E4, G4, C5, A4 harmonic pentatonic
  playZenChime(notes[0]);

  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    playZenChime(randomNote);
  }, 4500);
}
