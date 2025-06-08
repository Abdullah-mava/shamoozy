"use client";
import { useRef, useState, useEffect } from "react";
import './globals.css';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const [volume, setVolume] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false); // Track if user interacted

  // Play audio after user interaction (browser autoplay policy)
  useEffect(() => {
    if (audioRef.current && hasInteracted) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch((error) => {
        console.error("Audio play error:", error);
      });
    }
  }, [hasInteracted, isMuted, volume]);

  // Card tilt states
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor X inside card
    const y = e.clientY - rect.top;  // cursor Y inside card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotationX(-rotateX);
    setRotationY(rotateY);
  };

  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
  };

  // Touch handlers for mobile drag tilt
  let lastTouchX = 0;
  let lastTouchY = 0;

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault(); // prevent scrolling

    const touch = e.touches[0];
    if (!touch) return;

    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();

    // Calculate relative touch position inside card
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // max 10deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotationX(-rotateX);
    setRotationY(rotateY);
  };

  const handleTouchEnd = () => {
    resetRotation();
  };

  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        audioRef.current.muted = true;
        setIsMuted(true);
      } else {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden text-white"
      onClick={handleInteraction}
    >
      {/* Background GIF */}
      <img
        src="/5.gif"
        alt="Background"
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
      />

      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        src="/song.mp3"
        className="hidden"
      />

      {/* Dark overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-[-1]" />

      {/* Navbar */}
      <nav className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 w-80 text-center mb-8 w-full bg-gray-800/80 py-4 shadow-lg z-10">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <h1 className="text-5xl font-extrabold text-red-600">شموزی</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-xl">
          The sacred realm of chaos, memes, and questionable life choices.
        </p>

        {/* 3D Card */}
        <div className="card-container flex justify-center items-center mb-8 perspective-1000">
          <div
            ref={cardRef}
            className="card backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-6 w-80 text-center"
            style={{
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
              transition: "transform 0.1s ease",
              willChange: "transform",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetRotation}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
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
        <a href="https://discord.gg/Q9Zh2KYCxs" target="_blank" rel="noopener noreferrer">
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
