"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface AudioContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  showPrompt: boolean;
  isVisible: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children, src }: { children: React.ReactNode; src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [hasStartedProperly, setHasStartedProperly] = useState(false);
  const pathname = usePathname();

  // Play the music seamlessly on these allowed paths
  const allowedPaths = [
    "/transition",
    "/envelope",
    "/gallery",
    "/photobooth",
    "/questions",
    "/reply",
    "/replay",
  ];
  const isVisible = allowedPaths.includes(pathname);

  // Handle visibility transitions
  useEffect(() => {
    if (!isVisible && audioRef.current) {
      audioRef.current.pause();
      // We don't reset currentTime so if they come back, it resumes.
      // But if user wants to reset, we can reset. The requirement says:
      // "Pertahankan posisi playback (currentTime) saat berpindah route."
      setIsPlaying(false);
      setShowPrompt(false);
    }
  }, [isVisible]);

  // Handle auto-play attempt when visible
  useEffect(() => {
    if (isVisible && audioRef.current && !hasStartedProperly) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowPrompt(false);
            setHasStartedProperly(true);
          })
          .catch(() => {
            // Autoplay prevented
            setIsPlaying(false);
            setShowPrompt(true);
            setHasStartedProperly(true);
          });
      }
    }
  }, [isVisible, hasStartedProperly]);

  // Global click listener for autoplay fallback
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (isVisible && !isPlaying && audioRef.current) {
         audioRef.current.play().then(() => {
           setIsPlaying(true);
           setShowPrompt(false);
         }).catch(() => {});
      }
      document.removeEventListener('click', handleFirstInteraction);
    };

    if (isVisible && showPrompt && !isPlaying) {
      document.addEventListener('click', handleFirstInteraction);
    }
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [isVisible, isPlaying, showPrompt]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowPrompt(false);
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay, showPrompt, isVisible }}>
      <audio ref={audioRef} src={src} loop />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
