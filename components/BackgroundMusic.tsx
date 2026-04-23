"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const backgroundMusicSrc = "/BACKGROUND.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || userPausedRef.current) {
      return;
    }

    audio.loop = true;
    audio.volume = 0.42;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const syncPlayingState = () => setIsPlaying(!audio.paused);
    const startAfterGesture = () => {
      void playMusic();
    };
    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible") {
        void playMusic();
      }
    };

    audio.volume = 0.42;
    void playMusic();

    audio.addEventListener("play", syncPlayingState);
    audio.addEventListener("pause", syncPlayingState);
    document.addEventListener("visibilitychange", resumeWhenVisible);
    window.addEventListener("pointerdown", startAfterGesture, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", startAfterGesture, { once: true });
    window.addEventListener("touchstart", startAfterGesture, {
      once: true,
      passive: true,
    });

    return () => {
      audio.removeEventListener("play", syncPlayingState);
      audio.removeEventListener("pause", syncPlayingState);
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      window.removeEventListener("pointerdown", startAfterGesture);
      window.removeEventListener("keydown", startAfterGesture);
      window.removeEventListener("touchstart", startAfterGesture);
    };
  }, [playMusic]);

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      userPausedRef.current = false;
      void playMusic();
      return;
    }

    userPausedRef.current = true;
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" src={backgroundMusicSrc} />
      <button
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        aria-pressed={isPlaying}
        className="fixed bottom-4 right-4 z-[45] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-white/72 text-[#8b5b58] shadow-[0_18px_50px_rgba(198,102,123,0.18)] backdrop-blur-xl transition hover:scale-105 hover:bg-white/86 hover:shadow-[0_24px_70px_rgba(255,145,174,0.28)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffb3c7]/55 sm:bottom-5 sm:right-5"
        onClick={toggleMusic}
        type="button"
      >
        <span className="sr-only">
          {isPlaying ? "Pause background music" : "Play background music"}
        </span>
        <span className="relative flex h-5 w-6 items-end justify-center gap-1">
          {[0, 1, 2].map((bar) => (
            <span
              key={bar}
              className={`w-1.5 rounded-full bg-[#ff8faf] shadow-[0_0_14px_rgba(255,143,175,0.6)] transition-all ${
                isPlaying ? "animate-pulse" : "opacity-45"
              }`}
              style={{
                height: isPlaying ? `${14 + bar * 4}px` : "8px",
              }}
            />
          ))}
        </span>
      </button>
    </>
  );
}
