"use client";
import { useRef, useState, useEffect } from "react";
import './globals.css';  // Ensure correct path

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (audioRef.current && hasInteracted) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch((error) => {
        console.error("Audio play error:", error);
      });
    }
  }, [hasInteracted, isMuted, volume]);

  const handleInteraction = () => {
    setHasInteracted(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMute = !audioRef.current.muted;
      audioRef.current.muted = newMute;
      setIsMuted(newMute);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      const shouldMute = newVolume === 0;
      audioRef.current.muted = shouldMute;
      setIsMuted(shouldMute);
    }
  };

  // 3D Tilt (Mouse)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  // 3D Tilt (Touch)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleTouchEnd = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden text-white"
      onClick={handleInteraction}
    >
      {/* Background */}
      <img
        src="/5.gif"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
      />
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-[-1]" />

      {/* Audio */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        src="/song.mp3"
        className="hidden"
      />

      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg w-full py-4 z-10">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <h1 className="text-5xl font-extrabold text-red-600">شموزی</h1>
        </div>
      </nav>

      {/* Main */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-xl">
          The sacred realm of chaos, memes, and questionable life choices.
        </p>

        {/* 3D Card */}
        <div
  className="card-container flex justify-center items-center mb-8"
  style={{ perspective: "1000px" }}
  onPointerMove={(e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }}
  onPointerLeave={() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  }}
>
  <div
    ref={cardRef}
    className="card backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 w-80 text-center transition-transform duration-300 ease-out"
    style={{ transformStyle: "preserve-3d" }}
  >
    <h3 className="text-4xl font-extrabold text-white mb-3">شموزی</h3>
    <p className="text-gray-200 mb-5">
      Be part of our growing community and chat with us!
    </p>
    <a
      href="https://discord.gg/Q9Zh2KYCxs"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
    >
      Summon Shamoozy
    </a>
  </div>
</div>


        {/* Audio Controls */}
        <div className="fixed bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
          <button
            onClick={toggleMute}
            className="text-white text-xl hover:scale-110 transition-transform duration-200"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="h-1 w-32 bg-gray-300 rounded-full appearance-none
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md"
          />
        </div>

        {/* Discord Badge */}
        <a
          href="https://discord.gg/Q9Zh2KYCxs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-10"
            src="https://www.parti.ai/content/images/2023/03/image.png"
            alt="Join Discord"
          />
        </a>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur rounded-xl shadow-lg py-4 text-center text-sm text-gray-300 z-10">
        &copy; {new Date().getFullYear()} شموزی. All rights reserved.
      </footer>
    </div>
  );
}
