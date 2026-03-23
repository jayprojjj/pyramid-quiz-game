import React, { useState, useRef, useEffect } from 'react';

// Joyful Egyptian-themed music using Web Audio API
// Upbeat, happy melody with rhythmic accompaniment
const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodesRef = useRef([]);
  const rhythmIntervalRef = useRef(null);
  const isPlayingRef = useRef(false);
  const isMutedRef = useRef(false);

  // Joyful major scale frequencies (C Major - happy, upbeat)
  const majorScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33]; // C4 to D5
  
  // Pentatonic scale for extra joyfulness
  const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
  
  // Bass line for rhythm
  const bassNotes = [130.81, 146.83, 164.81, 196.00]; // C3, D3, E3, G3

  const initAudio = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume audio context if it's suspended (browser policy)
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
  };

  const playJoyfulMusic = () => {
    const ctx = audioContextRef.current;
    
    if (!ctx || oscillatorsRef.current.length > 0) return;

    // Play a test sound to confirm audio is working
    const testOsc = ctx.createOscillator();
    const testGain = ctx.createGain();
    testOsc.frequency.value = 523.25; // C5
    testOsc.type = 'sine';
    testGain.gain.value = 0.5;
    testOsc.connect(testGain);
    testGain.connect(ctx.destination);
    testOsc.start();
    testOsc.stop(ctx.currentTime + 0.1);

    // Create upbeat bass rhythm
    let bassIndex = 0;
    rhythmIntervalRef.current = setInterval(() => {
      if (!isPlayingRef.current || isMutedRef.current) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.value = bassNotes[bassIndex % bassNotes.length];
      
      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.6, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.4);
      
      bassIndex++;
    }, 500); // Fast rhythm - every 500ms

    // Create joyful melody
    const playMelody = () => {
      if (!isPlayingRef.current || isMutedRef.current) return;
      
      // Play 2-3 note phrases for more musicality
      const phraseLength = Math.floor(Math.random() * 2) + 2;
      let noteTime = 0;
      
      for (let i = 0; i < phraseLength; i++) {
        setTimeout(() => {
          if (!isPlayingRef.current || isMutedRef.current) return;
          
          const note = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          // Use square wave for brighter, more playful sound
          osc.type = Math.random() > 0.5 ? 'square' : 'sawtooth';
          osc.frequency.value = note;
          
          const now = ctx.currentTime;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.5, now + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(now);
          osc.stop(now + 0.3);
        }, noteTime);
        
        noteTime += 250; // Quick succession for upbeat feel
      }
      
      // Schedule next phrase
      setTimeout(playMelody, Math.random() * 2000 + 1500);
    };

    // Start melody after a delay
    setTimeout(playMelody, 500);
  };

  const stopMusic = () => {
    if (rhythmIntervalRef.current) {
      clearInterval(rhythmIntervalRef.current);
      rhythmIntervalRef.current = null;
    }
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    oscillatorsRef.current = [];
    gainNodesRef.current = [];
  };

  const toggleMusic = async () => {
    if (isPlayingRef.current) {
      stopMusic();
      isPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      await initAudio();
      isPlayingRef.current = true;
      setIsPlaying(true);
      playJoyfulMusic();
    }
  };

  const toggleMute = () => {
    isMutedRef.current = !isMutedRef.current;
    setIsMuted(isMutedRef.current);
  };

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="music-controls">
      <button 
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        title={isPlaying ? 'Stop Music' : 'Play Music'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
      {isPlaying && (
        <button 
          className={`mute-btn ${isMuted ? 'muted' : ''}`}
          onClick={toggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🔉'}
        </button>
      )}
    </div>
  );
};

export default BackgroundMusic;
