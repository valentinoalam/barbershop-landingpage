'use client';

import { useState, useRef } from 'react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Gagal memutar audio:", err));
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000 }}>
      {/* Element HTML5 Audio */}
      <audio ref={audioRef} autoPlay loop src="/barbershop-scissors-sound.mp3" />

      {/* Tombol Kontrol */}
      <button
        onClick={togglePlay}
        style={{
          padding: '5px 5px',
          borderRadius: '20px',
          border: '1px solid #ccc',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {isPlaying ? '🔊' : '🔈'}
      </button>
    </div>
  );
}