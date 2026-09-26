'use client';

import { useState, useRef, useEffect } from 'react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    
    const playAudioOnInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true); // Tandai bahwa audio sudah berhasil diputar
            // Hapus event listener setelah berhasil diputar
            window.removeEventListener('scroll', playAudioOnInteraction);
            window.removeEventListener('click', playAudioOnInteraction);
            window.removeEventListener('touchstart', playAudioOnInteraction);
            window.removeEventListener('keydown', playAudioOnInteraction);
          })
          .catch((err) => console.log("Gagal memutar audio:", err));
      }
    };

    // Dengarkan interaksi pertama pengguna
    window.addEventListener('scroll', playAudioOnInteraction);
    window.addEventListener('click', playAudioOnInteraction);
    window.addEventListener('touchstart', playAudioOnInteraction);
    window.addEventListener('keydown', playAudioOnInteraction);

    return () => {
      window.removeEventListener('scroll', playAudioOnInteraction);
      window.removeEventListener('click', playAudioOnInteraction);
      window.removeEventListener('touchstart', playAudioOnInteraction);
      window.removeEventListener('keydown', playAudioOnInteraction);
    };
  }, []);
  
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
      <audio ref={audioRef} loop src="/barbershop-scissors-sound.mp3" />

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